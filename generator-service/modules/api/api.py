import base64
import io
import time
import datetime
import uvicorn
import gradio as gr
from threading import Lock
from io import BytesIO
from fastapi import APIRouter, Depends, FastAPI, Request, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.encoders import jsonable_encoder
from secrets import compare_digest

import modules.shared as shared
from modules import sd_samplers, deepbooru, sd_hijack, images, scripts, ui, postprocessing
from modules.api.models import *
from modules.processing import StableDiffusionProcessingTxt2Img, StableDiffusionProcessingImg2Img, process_images
from modules.textual_inversion.textual_inversion import create_embedding, train_embedding
from modules.textual_inversion.preprocess import preprocess
from modules.hypernetworks.hypernetwork import create_hypernetwork, train_hypernetwork
from PIL import PngImagePlugin,Image
from modules.sd_models import checkpoints_list, unload_model_weights, reload_model_weights
from modules.sd_models_config import find_checkpoint_config_near_filename
from modules.realesrgan_model import get_realesrgan_models
from modules import devices
from typing import List
import piexif
import piexif.helper

### 신규 서비스용 Import 목록입니당
from fastapi import BackgroundTasks
from dotenv import load_dotenv
import boto3
import os
from datetime import datetime


### S3와 연동하기 위해서 AWS 키와 좌표를 받아옵니다.
load_dotenv()
dotenv_path = os.path.join(os.getcwd(), '../../.env')
load_dotenv(dotenv_path=dotenv_path)

ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

s3 = boto3.client("s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)


### 선언용 변수들

# 배경의 기본 프롬프트 입니다.
background_default_prompt = "(8k),((only background)),((masterpiece)),(best quality),(ultra-detailed),(best illustration)," \
                            "(best quality),(high resolution),hyper detail,ultra detailed,Incredibly detailed,"

# basic_url = "http://192.168.31.73:8081"
# basic_url = "http://192.168.31.73:8081"


# 포즈의 리스트 입니다.
pose_list = ["sample", "shooting", "victory", "squad"]


def upscaler_to_index(name: str):
    try:
        return [x.name.lower() for x in shared.sd_upscalers].index(name.lower())
    except:
        raise HTTPException(status_code=400, detail=f"Invalid upscaler, needs to be one of these: {' , '.join([x.name for x in sd_upscalers])}")

def script_name_to_index(name, scripts):
    try:
        return [script.title().lower() for script in scripts].index(name.lower())
    except:
        raise HTTPException(status_code=422, detail=f"Script '{name}' not found")

def validate_sampler_name(name):
    config = sd_samplers.all_samplers_map.get(name, None)
    if config is None:
        raise HTTPException(status_code=404, detail="Sampler not found")

    return name

def setUpscalers(req: dict):
    reqDict = vars(req)
    reqDict['extras_upscaler_1'] = reqDict.pop('upscaler_1', None)
    reqDict['extras_upscaler_2'] = reqDict.pop('upscaler_2', None)
    return reqDict

def decode_base64_to_image(encoding):
    if encoding.startswith("data:image/"):
        encoding = encoding.split(";")[1].split(",")[1]
    try:
        image = Image.open(BytesIO(base64.b64decode(encoding)))
        return image
    except Exception as err:
        raise HTTPException(status_code=500, detail="Invalid encoded image")

def encode_pil_to_base64(image):
    with io.BytesIO() as output_bytes:

        if opts.samples_format.lower() == 'png':
            use_metadata = False
            metadata = PngImagePlugin.PngInfo()
            for key, value in image.info.items():
                if isinstance(key, str) and isinstance(value, str):
                    metadata.add_text(key, value)
                    use_metadata = True
            image.save(output_bytes, format="PNG", pnginfo=(metadata if use_metadata else None), quality=opts.jpeg_quality)

        elif opts.samples_format.lower() in ("jpg", "jpeg", "webp"):
            parameters = image.info.get('parameters', None)
            exif_bytes = piexif.dump({
                "Exif": { piexif.ExifIFD.UserComment: piexif.helper.UserComment.dump(parameters or "", encoding="unicode") }
            })
            if opts.samples_format.lower() in ("jpg", "jpeg"):
                image.save(output_bytes, format="JPEG", exif = exif_bytes, quality=opts.jpeg_quality)
            else:
                image.save(output_bytes, format="WEBP", exif = exif_bytes, quality=opts.jpeg_quality)

        else:
            raise HTTPException(status_code=500, detail="Invalid image format")

        bytes_data = output_bytes.getvalue()

    return base64.b64encode(bytes_data)

def api_middleware(app: FastAPI):
    rich_available = True
    try:
        import anyio # importing just so it can be placed on silent list
        import starlette # importing just so it can be placed on silent list
        from rich.console import Console
        console = Console()
    except:
        import traceback
        rich_available = False

    @app.middleware("http")
    async def log_and_time(req: Request, call_next):
        ts = time.time()
        res: Response = await call_next(req)
        duration = str(round(time.time() - ts, 4))
        res.headers["X-Process-Time"] = duration
        endpoint = req.scope.get('path', 'err')
        if shared.cmd_opts.api_log and endpoint.startswith('/sdapi'):
            print('API {t} {code} {prot}/{ver} {method} {endpoint} {cli} {duration}'.format(
                t = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f"),
                code = res.status_code,
                ver = req.scope.get('http_version', '0.0'),
                cli = req.scope.get('client', ('0:0.0.0', 0))[0],
                prot = req.scope.get('scheme', 'err'),
                method = req.scope.get('method', 'err'),
                endpoint = endpoint,
                duration = duration,
            ))
        return res

    def handle_exception(request: Request, e: Exception):
        err = {
            "error": type(e).__name__,
            "detail": vars(e).get('detail', ''),
            "body": vars(e).get('body', ''),
            "errors": str(e),
        }
        if not isinstance(e, HTTPException): # do not print backtrace on known httpexceptions
            print(f"API error: {request.method}: {request.url} {err}")
            if rich_available:
                console.print_exception(show_locals=True, max_frames=2, extra_lines=1, suppress=[anyio, starlette], word_wrap=False, width=min([console.width, 200]))
            else:
                traceback.print_exc()
        return JSONResponse(status_code=vars(e).get('status_code', 500), content=jsonable_encoder(err))

    @app.middleware("http")
    async def exception_handling(request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as e:
            return handle_exception(request, e)

    @app.exception_handler(Exception)
    async def fastapi_exception_handler(request: Request, e: Exception):
        return handle_exception(request, e)

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, e: HTTPException):
        return handle_exception(request, e)


class Api:
    def __init__(self, app: FastAPI, queue_lock: Lock):
        if shared.cmd_opts.api_auth:
            self.credentials = dict()
            for auth in shared.cmd_opts.api_auth.split(","):
                user, password = auth.split(":")
                self.credentials[user] = password

        self.router = APIRouter()
        self.app = app
        self.queue_lock = queue_lock
        api_middleware(self.app)
        ### 직접 작성한 Sample API
        self.add_api_route("/ml_api/get_sample", self.getsampleapi, methods=["GET"], response_model=GetSampleResponse)
        self.add_api_route("/ml_api/gemini", self.makegeminiapi, methods=["POST"], response_model=TextToGeminiResponse)
        self.add_api_route("/ml_api/background", self.makebackgroundapi, methods=["POST"], response_model=TextToBackgroundResponse)
        self.add_api_route("/ml_api/emotion", self.makefaceapi, methods=["POST"], response_model=GeminiFaceResponse)
        self.add_api_route("/ml_api/pose", self.makeposeapi, methods=["POST"], response_model=GeminiPoseResponse)
        self.add_api_route("/sdapi/v1/txt2img", self.text2imgapi, methods=["POST"], response_model=TextToImageResponse)
        self.add_api_route("/sdapi/v1/img2img", self.img2imgapi, methods=["POST"], response_model=ImageToImageResponse)
        self.add_api_route("/sdapi/v1/extra-single-image", self.extras_single_image_api, methods=["POST"], response_model=ExtrasSingleImageResponse)
        self.add_api_route("/sdapi/v1/extra-batch-images", self.extras_batch_images_api, methods=["POST"], response_model=ExtrasBatchImagesResponse)
        self.add_api_route("/sdapi/v1/png-info", self.pnginfoapi, methods=["POST"], response_model=PNGInfoResponse)
        self.add_api_route("/sdapi/v1/progress", self.progressapi, methods=["GET"], response_model=ProgressResponse)
        self.add_api_route("/sdapi/v1/interrogate", self.interrogateapi, methods=["POST"])
        self.add_api_route("/sdapi/v1/interrupt", self.interruptapi, methods=["POST"])
        self.add_api_route("/sdapi/v1/skip", self.skip, methods=["POST"])
        self.add_api_route("/sdapi/v1/options", self.get_config, methods=["GET"], response_model=OptionsModel)
        self.add_api_route("/sdapi/v1/options", self.set_config, methods=["POST"])
        self.add_api_route("/sdapi/v1/cmd-flags", self.get_cmd_flags, methods=["GET"], response_model=FlagsModel)
        self.add_api_route("/sdapi/v1/samplers", self.get_samplers, methods=["GET"], response_model=List[SamplerItem])
        self.add_api_route("/sdapi/v1/upscalers", self.get_upscalers, methods=["GET"], response_model=List[UpscalerItem])
        self.add_api_route("/sdapi/v1/sd-models", self.get_sd_models, methods=["GET"], response_model=List[SDModelItem])
        self.add_api_route("/sdapi/v1/hypernetworks", self.get_hypernetworks, methods=["GET"], response_model=List[HypernetworkItem])
        self.add_api_route("/sdapi/v1/face-restorers", self.get_face_restorers, methods=["GET"], response_model=List[FaceRestorerItem])
        self.add_api_route("/sdapi/v1/realesrgan-models", self.get_realesrgan_models, methods=["GET"], response_model=List[RealesrganItem])
        self.add_api_route("/sdapi/v1/prompt-styles", self.get_prompt_styles, methods=["GET"], response_model=List[PromptStyleItem])
        self.add_api_route("/sdapi/v1/embeddings", self.get_embeddings, methods=["GET"], response_model=EmbeddingsResponse)
        self.add_api_route("/sdapi/v1/refresh-checkpoints", self.refresh_checkpoints, methods=["POST"])
        self.add_api_route("/sdapi/v1/create/embedding", self.create_embedding, methods=["POST"], response_model=CreateResponse)
        self.add_api_route("/sdapi/v1/create/hypernetwork", self.create_hypernetwork, methods=["POST"], response_model=CreateResponse)
        self.add_api_route("/sdapi/v1/preprocess", self.preprocess, methods=["POST"], response_model=PreprocessResponse)
        self.add_api_route("/sdapi/v1/train/embedding", self.train_embedding, methods=["POST"], response_model=TrainResponse)
        self.add_api_route("/sdapi/v1/train/hypernetwork", self.train_hypernetwork, methods=["POST"], response_model=TrainResponse)
        self.add_api_route("/sdapi/v1/memory", self.get_memory, methods=["GET"], response_model=MemoryResponse)
        self.add_api_route("/sdapi/v1/unload-checkpoint", self.unloadapi, methods=["POST"])
        self.add_api_route("/sdapi/v1/reload-checkpoint", self.reloadapi, methods=["POST"])
        self.add_api_route("/sdapi/v1/scripts", self.get_scripts_list, methods=["GET"], response_model=ScriptsList)

        self.default_script_arg_txt2img = []
        self.default_script_arg_img2img = []

    ### Gemini용 함수 로직을 추가합니다.

    ## 통신 세팅 확인용 Sample 입니다.
    def getsampleapi(self):
        return FileResponse("./asset/sample_img.png")

    ## 제미니를 만드는 로직입니다. makegeminiapi -> back 으로 보내서 뒤에서 작업합니다.
    def back_makegeminiapi(self, txt2geminireq:StableDiffusionTxt2GeminiProcessingAPI, object_name):
        username = txt2geminireq.username
        # scripts.scripts_txt2img를 가져와 script_runner 변수에 할당합니다.
        script_runner = scripts.scripts_txt2img

        # script_runner의 스크립트가 초기화되지 않은 경우 초기화를 수행합니다.
        if not script_runner.scripts:
            script_runner.initialize_scripts(False)
            ui.create_ui()

        # default_script_arg_txt2img가 초기화되지 않은 경우 초기화를 수행합니다.
        if not self.default_script_arg_txt2img:
            self.default_script_arg_txt2img = self.init_default_script_args(script_runner)

        # txt2imgreq에서 선택 가능한 스크립트와 해당 인덱스를 가져옵니다.
        selectable_scripts, selectable_script_idx = self.get_selectable_script(txt2geminireq.script_name, script_runner)

        # txt2imgreq를 update하여 Sampler, save_images 및 grid 저장 여부를 재정의합니다.
        populate = txt2geminireq.copy(update={
            "sampler_name": "DPM++ SDE Karras",
            "do_not_save_samples": not txt2geminireq.save_images,
            "do_not_save_grid": not txt2geminireq.save_images,
        })

        # Sampler 이름이 지정된 경우 샘플러 인덱스를 None으로 설정하여 나중에 경고를 방지합니다.
        if populate.sampler_name:
            populate.sampler_index = None

        # txt2imgreq의 script_name, script_args 및 alwayson_scripts를 제거합니다. 이후 pipeline에 바로 제공합니다.
        args = vars(populate)
        args.pop('script_name', None)
        args.pop('script_args', None)
        args.pop('alwayson_scripts', None)

        # script_args를 가져와 초기화합니다.
        script_args = self.init_script_args(txt2geminireq, self.default_script_arg_txt2img, selectable_scripts,
                                            selectable_script_idx, script_runner)

        # send_images와 save_images를 args에서 제거합니다.
        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        # FastAPI 앱 인스턴스의 queue_lock을 사용하여 처리를 실행합니다.
        with self.queue_lock:
            print(f"=== Caution! {username}의 제미니를 생성하고 있어요. ===")
            # StableDiffusionProcessingTxt2Img 인스턴스를 생성합니다.
            p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_txt2img_grids
            p.outpath_samples = opts.outdir_txt2img_samples

            # shared state를 시작합니다.
            shared.state.begin()

            # 선택 가능한 스크립트가 있는 경우 해당 스크립트를 실행합니다.
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_txt2img.run(p, *p.script_args)  # Need to pass args as list here
            # 선택 가능한 스크립트가 없는 경우 이미지 처리 함수를 실행합니다.
            else:
                p.script_args = tuple(script_args)  # Need to pass args as tuple here
                processed = process_images(p)

            # shared state를 종료합니다.
            shared.state.end()
        print("===========image_Done===============")
        # processed에서 반환
        shared.state.end()

        # 이미지를 Base64로 인코딩하여 리스트에 저장합니다. -> S3에 업로드하고 링크를 전송합니다
        # b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []
        if send_images:
            print("===========Sending Start===============")
            file = processed
            file_extension = "png"
            content_type = f"image/{file_extension}"

            image_data = io.BytesIO()
            processed.images[0].save(image_data, format='PNG')
            image_data.seek(0)
            print("=============Request Start===============")
            response = s3.upload_fileobj(image_data, BUCKET_NAME, object_name, ExtraArgs={'ContentType': content_type})
            print("=============Request Done=============")
            print(f"response: {response}")
            url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
            print("=============URL Catch=============")
            print(f"url: {url}")
        else:
            url = []


        import requests
        import json

        result = processed.js()
        response_data = json.loads(result)
        get_seed = response_data['seed']
        print(f"==== seed :{get_seed} ======")
        headers = {"Content-Type": "application/json"}
        data = {
            "username": txt2geminireq.username,
            "tagIds": txt2geminireq.tag_ids,
            "imageUrl": url,
            "prompt": txt2geminireq.prompt,
            "seed": get_seed
        }

        print(f"요청이 잘 반영되었어요! {username}의 제미니가 생성되었습니다!")
        ### 완성되면 JAVA 백엔드 쪽으로 완성 되었다고, [유저 ID,
        response = requests.post("https://mygemini.co.kr/user-service/complete/gemini", data=json.dumps(data), headers=headers)
        # response = requests.post("http://192.168.31.73:8081/user-service/complete/gemini", data=json.dumps(data), headers=headers)
        print(response)
        print("### Make Gemmini 로직 완료! ###")

    # @app.post("/task") -> API 통합용 데코레이터
    def makegeminiapi(self, txt2geminireq:StableDiffusionTxt2GeminiProcessingAPI, background_tasks: BackgroundTasks):
        username = txt2geminireq.username
        tag_ids = txt2geminireq.tag_ids
        print(tag_ids)
        now = datetime.now()
        timestamp = now.strftime("%Y%m%d_%H%M%S%f")
        object_name = f"gemini/{timestamp}_{username}.png"
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        background_tasks.add_task(self.back_makegeminiapi, txt2geminireq, object_name)
        print(url)
        return {
            "imageUrl": url
        }
        # return {
        #     "prompt": txt2geminireq.prompt,
        #     "tag_ids": tag_ids,
        #     "info": f"{user_id}의 제미니가 생성되고 있어요!"
        # }
        ## 제미니를 만드는 로직입니다. makeapi -> back 으로 보내서 뒤에서 작업합니다.

    ##############################
    ### Make Gemmini 로직 작성! ###
    ##############################


### @app.post("/task") -> API 통합용 데코레이터
    def back_makebackgoundapi(self, txt2backgroundreq : StableDiffusionTxt2BackgroundProcessingAPI,
                              background_object_name, korean, description):

        txt2backgroundreq.width = 960
        txt2backgroundreq.height = 540
        script_runner = scripts.scripts_txt2img

        # script_runner의 스크립트가 초기화되지 않은 경우 초기화를 수행합니다.
        if not script_runner.scripts:
            script_runner.initialize_scripts(False)
            ui.create_ui()

        # default_script_arg_txt2img가 초기화되지 않은 경우 초기화를 수행합니다.
        if not self.default_script_arg_txt2img:
            self.default_script_arg_txt2img = self.init_default_script_args(script_runner)

        # req에서 선택 가능한 스크립트와 해당 인덱스를 가져옵니다.
        selectable_scripts, selectable_script_idx = self.get_selectable_script(txt2backgroundreq.script_name,
                                                                               script_runner)

        # txt2imgreq를 update하여 Sampler, save_images 및 grid 저장 여부를 재정의합니다.
        populate = txt2backgroundreq.copy(update={
            "sampler_name": "DPM++ SDE Karras",
        })

        # Sampler 이름이 지정된 경우 샘플러 인덱스를 None으로 설정하여 나중에 경고를 방지합니다.
        if populate.sampler_name:
            populate.sampler_index = None

        # txt2imgreq의 script_name, script_args 및 alwayson_scripts를 제거합니다. 이후 pipeline에 바로 제공합니다.
        args = vars(populate)
        args.pop('script_name', None)
        args.pop('script_args', None)
        args.pop('alwayson_scripts', None)

        # script_args를 가져와 초기화합니다.
        script_args = self.init_script_args(txt2backgroundreq, self.default_script_arg_txt2img, selectable_scripts,
                                            selectable_script_idx, script_runner)

        # send_images와 save_images를 args에서 제거합니다.
        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        # FastAPI 앱 인스턴스의 queue_lock을 사용하여 처리를 실행합니다.
        with self.queue_lock:
            # StableDiffusionProcessingTxt2Img 인스턴스를 생성합니다.
            p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_txt2img_grids
            p.outpath_samples = opts.outdir_txt2img_samples

            # shared state를 시작합니다.
            shared.state.begin()

            # 선택 가능한 스크립트가 있는 경우 해당 스크립트를 실행합니다.
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_txt2img.run(p, *p.script_args)  # Need to pass args as list here
            # 선택 가능한 스크립트가 없는 경우 이미지 처리 함수를 실행합니다.
            else:
                p.script_args = tuple(script_args)  # Need to pass args as tuple here
                processed = process_images(p)

            # shared state를 종료합니다.
            shared.state.end()
        print("===========image_Done===============")
        # processed에서 반환
        shared.state.end()

        # 이미지를 Base64로 인코딩하여 리스트에 저장합니다. -> S3에 업로드하고 링크를 전송합니다
        # b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []
        print("===========Sending Start===============")
        file_extension = "png"
        content_type = f"image/{file_extension}"

        image_data = io.BytesIO()
        processed.images[0].save(image_data, format='PNG')
        image_data.seek(0)
        print("=============Request Start===============")
        response = s3.upload_fileobj(image_data, BUCKET_NAME, background_object_name, ExtraArgs={'ContentType': content_type})
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{background_object_name}"

        import requests
        import json
        headers = {"Content-Type": "application/json"}
        data = {
            "backgroundUrl": txt2backgroundreq.background_url,
            "username": txt2backgroundreq.username,
            "imageUrl": url,
            "korean": korean,
            "description": description,
        }

        ### 완성되면 JAVA 백엔드 쪽으로 완성 되었다고 보내주기
        # response = requests.post("https://mygemini.co.kr/user-service/complete/background", data=json.dumps(data), headers=headers)
        # response = requests.post("http://192.168.31.73:8081/user-service/complete/background", data=json.dumps(data), headers=headers)
        print(response)
        print("### Make background 로직 완료! ###")


    def makebackgroundapi(self, txt2backgroundreq : StableDiffusionTxt2BackgroundProcessingAPI, background_tasks: BackgroundTasks):
        import urllib.request
        import urllib.parse
        import re
        import json
        description = "입력 값 오류로 인한 디폴트 배경"
        korean = "배경 관련 스크립트 미 입력"
        if txt2backgroundreq.description == "":
            print("prompt를 입력하지 않았어요! 기본 배경으로 생성됩니다!")
            txt2backgroundreq.prompt = background_default_prompt + "night sky with a lot of stars"
        else:
            korean = str(txt2backgroundreq.description)
            print("번역 로직을 들어가요!")
            papago_client_id = "jLiBiaLoioA7J1K4WOuJ"  # 개발자센터에서 발급받은 Client ID 값
            papago_client_secret = "bYUxVHCzNT"  # 개발자센터에서 발급받은 Client Secret 값
            txt2backgroundreq.prompt = re.sub('[^ㄱ-ㅎㅏ-ㅣ가-힣0-9., ]', '', txt2backgroundreq.description)
            print(f"정제된 스트링이야! {txt2backgroundreq.prompt}")
            encText = urllib.parse.quote(txt2backgroundreq.prompt)
            papago_data = "source=ko&target=en&text=" + encText
            papago_url = "https://openapi.naver.com/v1/papago/n2mt"
            request = urllib.request.Request(papago_url)
            request.add_header("X-Naver-Client-Id", papago_client_id)
            request.add_header("X-Naver-Client-Secret", papago_client_secret)
            response = urllib.request.urlopen(request, data=papago_data.encode("utf-8"))
            rescode = response.getcode()

            print(response)
            if (rescode == 200):
                response_body = response.read().decode('utf-8')
                response_data = json.loads(response_body)
                translated_text = response_data['message']['result']['translatedText']
                description = translated_text
                description = description.replace(",", " and")
                description = description.replace(".", ",")
                print(f"정제된 원문: {txt2backgroundreq.prompt}")
                print(f"prompt: {description} 으로 생성된 배경화면이예요!")
                txt2backgroundreq.prompt = background_default_prompt + description
                print("생성에 사용된 prompt야!")
                print(txt2backgroundreq.prompt)
            else:
                print("Error Code:" + rescode)
                print("잘못된 prompt를 입력했어요~ 기본 배경으로 생성됩니당~")
                txt2backgroundreq.prompt = background_default_prompt + "night sky with a lot of stars"

        print(f"원문 : {korean}")
        print(f"번역 완료 : {description}")

        now = datetime.now()
        timestamp = now.strftime("%Y%m%d_%H%M%S%f")
        background_object_name = f"gemini/{timestamp}_background.png"
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{background_object_name}"
        # scripts.scripts_txt2img를 가져와 script_runner 변수에 할당합니다.

        background_tasks.add_task(self.back_makebackgoundapi, txt2backgroundreq, background_object_name, korean, description)

        return {
            "imageUrl": url
        }

    # headers = {"Content-Type": "application/json"}
    # data = {
    #     "imageUrl": url,
    #     "description": description,
    #     "korean": korean
    # }

    ################################
    ### Make Background 로직 작성! ###
    ################################


    def back_makeposeapi(self, GeminiPosereq:StableDiffusionMakePoseProcessingAPI, object_name, make_pose, url_list, pose_idx):
        pose_asset_dir = os.path.join(os.getcwd(), "pose_asset", pose_idx)
        txt_files = ["0.txt", "1.txt", "2.txt", "3.txt"]

        gemini_id = GeminiPosereq.geminis[make_pose]
        pose_prompt = GeminiPosereq.gemini_prompt[make_pose]
        pose_seed = GeminiPosereq.gemini_seed[make_pose]

        with open(os.path.join(pose_asset_dir, txt_files[make_pose]), "r") as file:
            txt_value = file.read()

        GeminiPosereq.alwayson_scripts["controlnet"]["args"][0]["input_image"] = str(txt_value)
        print(f"이거로 만들거야!!!!!! : {txt_files[make_pose]}")
        now = datetime.now()
        GeminiPosereq.prompt = pose_prompt
        GeminiPosereq.seed = pose_seed



        # scripts.scripts_txt2img를 가져와 script_runner 변수에 할당합니다.
        script_runner = scripts.scripts_txt2img

        # script_runner의 스크립트가 초기화되지 않은 경우 초기화를 수행합니다.
        if not script_runner.scripts:
            script_runner.initialize_scripts(False)
            ui.create_ui()

        # default_script_arg_txt2img가 초기화되지 않은 경우 초기화를 수행합니다.
        if not self.default_script_arg_txt2img:
            self.default_script_arg_txt2img = self.init_default_script_args(script_runner)

        # txt2imgreq에서 선택 가능한 스크립트와 해당 인덱스를 가져옵니다.
        selectable_scripts, selectable_script_idx = self.get_selectable_script(GeminiPosereq.script_name, script_runner)

        # txt2imgreq를 update하여 Sampler, save_images 및 grid 저장 여부를 재정의합니다.
        populate = GeminiPosereq.copy(update={
            "sampler_name": "DPM++ SDE Karras",
        })

        # Sampler 이름이 지정된 경우 샘플러 인덱스를 None으로 설정하여 나중에 경고를 방지합니다.
        if populate.sampler_name:
            populate.sampler_index = None

        # txt2imgreq의 script_name, script_args 및 alwayson_scripts를 제거합니다. 이후 pipeline에 바로 제공합니다.
        args = vars(populate)
        args.pop('script_name', None)
        args.pop('script_args', None)
        args.pop('alwayson_scripts', None)

        # script_args를 가져와 초기화합니다.
        script_args = self.init_script_args(GeminiPosereq, self.default_script_arg_txt2img, selectable_scripts,
                                            selectable_script_idx, script_runner)

        # send_images와 save_images를 args에서 제거합니다.
        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        # FastAPI 앱 인스턴스의 queue_lock을 사용하여 처리를 실행합니다.
        with self.queue_lock:
            # StableDiffusionProcessingTxt2Img 인스턴스를 생성합니다.
            p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_txt2img_grids
            p.outpath_samples = opts.outdir_txt2img_samples

            # shared state를 시작합니다.
            shared.state.begin()

            # 선택 가능한 스크립트가 있는 경우 해당 스크립트를 실행합니다.
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_txt2img.run(p, *p.script_args)  # Need to pass args as list here
            # 선택 가능한 스크립트가 없는 경우 이미지 처리 함수를 실행합니다.
            else:
                p.script_args = tuple(script_args)  # Need to pass args as tuple here
                processed = process_images(p)

            # shared state를 종료합니다.
            shared.state.end()
        print("===========image_Done===============")
        # processed에서 반환
        shared.state.end()


        # 이미지를 Base64로 인코딩하여 리스트에 저장합니다. -> S3에 업로드하고 링크를 전송합니다
        # b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []
        print("===========Sending Start===============")
        file_extension = "png"
        content_type = f"image/{file_extension}"
        image_data = io.BytesIO()
        processed.images[0].save(image_data, format='PNG')
        image_data.seek(0)
        response = s3.upload_fileobj(image_data, BUCKET_NAME, object_name, ExtraArgs={'ContentType': content_type})
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        print(f"url: {url}")
        print(f"make_pose: {make_pose}")
        print(f"url_list: {url_list}")
        if make_pose == 3:
            import requests
            import json
            headers = {"Content-Type": "application/json"}
            data = {
                "backgroundUrl": GeminiPosereq.background_url,
                "geminis": GeminiPosereq.geminis,
                "imageUrls": url_list
            }
            print(data)
            ### 완성되면 JAVA 백엔드 쪽으로 완성 되었다고 보내주기
            response = requests.post("https://mygemini.co.kr/user-service/complete/pose", data=json.dumps(data),headers=headers)
            # response = requests.post("http://192.168.31.73:8081/user-service/complete/pose", data=json.dumps(data),headers=headers)
            print(response)
            print("### Make pose 로직 완료! ###")


### @app.post("/task") -> API 통합용 데코레이터
    def makeposeapi(self, makeposereq:StableDiffusionMakePoseProcessingAPI, background_tasks: BackgroundTasks):

        base_prompt = "(illustration),(portrait),(best quality), (masterpiece), (high resolution), (Extremely detailed and beautiful face:1.3), perfect anatomy, hyper detail, ultra detailed face, Incredibly detailed,1girl,long hair,black hair,"
        base_seed = 3120790884

        if len(makeposereq.geminis) < 4:
            add_id = 4 - len(makeposereq.geminis)
            for adding in range(add_id):
                makeposereq.geminis.append(1)
        elif len(makeposereq.geminis) > 4:
            makeposereq.geminis = makeposereq.geminis[:4]

        if len(makeposereq.gemini_prompt) < 4:
            add_pt = 4 - len(makeposereq.gemini_prompt)
            for adding in range(add_pt):
                makeposereq.gemini_prompt.append(base_prompt)
        elif len(makeposereq.gemini_prompt) > 4:
            makeposereq.gemini_prompt = makeposereq.gemini_prompt[:4]

        if len(makeposereq.gemini_seed) < 4:
            add_pt = 4 - len(makeposereq.gemini_seed)
            for adding in range(add_pt):
                makeposereq.gemini_seed.append(base_seed)
        elif len(makeposereq.gemini_seed) > 4:
            makeposereq.gemini_seed = makeposereq.gemini_seed[:4]

        url_list = []
        if makeposereq.pose_id < 0 or makeposereq.pose_id > len(pose_list):
            print("유효한 포즈 idx 값이 아닙니다.")
            makeposereq.pose_id = 0
            pose_idx = pose_list[makeposereq.pose_id]
            print(f"잘못된 포즈 요청이 들어와서, 샘플 포즈의 제미니들이 생성되고 있어요!")
        else:
            pose_idx = pose_list[makeposereq.pose_id]
            print(f"{pose_idx} 포즈의 제미니들이 생성되고 있어요!")



        for make_pose in range(4):
            gemini_id = makeposereq.geminis[make_pose]
            now = datetime.now()
            timestamp = now.strftime("%Y%m%d_%H%M%S%f")
            object_name = f"gemini/{timestamp}_{gemini_id}.png"
            url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
            url_list.append(url)
            background_tasks.add_task(self.back_makeposeapi, makeposereq, object_name, make_pose, url_list, pose_idx)
        print(f"Pose URL List : {url_list}")
        return {
            "backgroundUrl": makeposereq.background_url,
            "geminis": makeposereq.geminis,
            "imageUrls": url_list
        }


        ## 제미니를 만드는 로직입니다. makeapi -> back 으로 보내서 뒤에서 작업합니다.




    ################################
    ### Make Background 로직 작성! ###
    ################################


    ## 제미니를 만드는 로직입니다. makegeminiapi -> back 으로 보내서 뒤에서 작업합니다.

    def back_makefaceapi(self, emotionreq: StableDiffusionEmotionProcessingAPI, object_name, make_emotion):

        emotion_prompt = emotionreq.gemini_prompt[make_emotion]

        emotionreq.prompt = emotion_prompt

        # scripts.scripts_txt2img를 가져와 script_runner 변수에 할당합니다.
        script_runner = scripts.scripts_txt2img

        # script_runner의 스크립트가 초기화되지 않은 경우 초기화를 수행합니다.
        if not script_runner.scripts:
            script_runner.initialize_scripts(False)
            ui.create_ui()

        # default_script_arg_txt2img가 초기화되지 않은 경우 초기화를 수행합니다.
        if not self.default_script_arg_txt2img:
            self.default_script_arg_txt2img = self.init_default_script_args(script_runner)

        # txt2imgreq에서 선택 가능한 스크립트와 해당 인덱스를 가져옵니다.
        selectable_scripts, selectable_script_idx = self.get_selectable_script(emotionreq.script_name, script_runner)

        # txt2imgreq를 update하여 Sampler, save_images 및 grid 저장 여부를 재정의합니다.
        populate = emotionreq.copy(update={
            "sampler_name": "DPM++ SDE Karras",
        })

        # Sampler 이름이 지정된 경우 샘플러 인덱스를 None으로 설정하여 나중에 경고를 방지합니다.
        if populate.sampler_name:
            populate.sampler_index = None

        # txt2imgreq의 script_name, script_args 및 alwayson_scripts를 제거합니다. 이후 pipeline에 바로 제공합니다.
        args = vars(populate)
        args.pop('script_name', None)
        args.pop('script_args', None)
        args.pop('alwayson_scripts', None)

        # script_args를 가져와 초기화합니다.
        script_args = self.init_script_args(emotionreq, self.default_script_arg_txt2img, selectable_scripts,
                                            selectable_script_idx, script_runner)

        # send_images와 save_images를 args에서 제거합니다.
        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        # FastAPI 앱 인스턴스의 queue_lock을 사용하여 처리를 실행합니다.
        with self.queue_lock:
            # StableDiffusionProcessingTxt2Img 인스턴스를 생성합니다.
            p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_txt2img_grids
            p.outpath_samples = opts.outdir_txt2img_samples

            # shared state를 시작합니다.
            shared.state.begin()

            # 선택 가능한 스크립트가 있는 경우 해당 스크립트를 실행합니다.
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_txt2img.run(p, *p.script_args)  # Need to pass args as list here
            # 선택 가능한 스크립트가 없는 경우 이미지 처리 함수를 실행합니다.
            else:
                p.script_args = tuple(script_args)  # Need to pass args as tuple here
                processed = process_images(p)

            # shared state를 종료합니다.
            shared.state.end()
        print("===========image_Done===============")
        # processed에서 반환
        shared.state.end()

        # 이미지를 Base64로 인코딩하여 리스트에 저장합니다. -> S3에 업로드하고 링크를 전송합니다
        # b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []
        print("===========Sending Start===============")
        file_extension = "png"
        content_type = f"image/{file_extension}"
        image_data = io.BytesIO()
        processed.images[0].save(image_data, format='PNG')
        image_data.seek(0)
        response = s3.upload_fileobj(image_data, BUCKET_NAME, object_name, ExtraArgs={'ContentType': content_type})
        url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        print(f"url: {url}")
        # if make_emotion == 3:
        #     import requests
        #     import json
        #     headers = {"Content-Type": "application/json"}
        #     data = {
        #         "period": emotionreq.period,
        #         "geminiNo": emotionreq.gemini_number,
        #         "imageUrls": url_list
        #     }
        #     print(data)
        #     ### 완성되면 JAVA 백엔드 쪽으로 완성 되었다고 보내주기
        #     # response = requests.post("https://mygemini.co.kr/user-service/complete/emotion", data=json.dumps(data),headers=headers)
        #     period_type = str(emotionreq.period)
        #     response = requests.post("http://192.168.31.73:8081/user-service/complete/emotion/"+period_type, data=json.dumps(data),headers=headers)
        #
        #     print(response)
        #     print("### Make pose 로직 완료! ###")

    # @app.post("/task") -> API 통합용 데코레이터
    def makefaceapi(self, emotionreq:StableDiffusionEmotionProcessingAPI, background_tasks: BackgroundTasks):
        gemini_number = emotionreq.gemini_number
        url_list = []
        print(f"gemini_prompt: {emotionreq.gemini_prompt}")
        for make_face in range(4):
            now = datetime.now()
            timestamp = now.strftime("%Y%m%d_%H%M%S%f")
            object_name = f"gemini/{timestamp}_{gemini_number}.png"
            url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
            url_list.append(url)
            background_tasks.add_task(self.back_makefaceapi, emotionreq, object_name, make_face)
        print(f"Pose URL List : {url_list}")
        return {
            "geminiNo": gemini_number,
            "imageUrls": url_list
        }

        # now = datetime.now()
        # timestamp = now.strftime("%Y%m%d_%H%M%S%f")
        # object_name = f"gemini/{timestamp}_emotions.png"
        # url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        #
        # ## 제미니를 만드는 로직입니다. makeapi -> back 으로 보내서 뒤에서 작업합니다.
        # script_runner = scripts.scripts_txt2img
        # if not script_runner.scripts:
        #     script_runner.initialize_scripts(False)
        #     ui.create_ui()
        # if not self.default_script_arg_txt2img:
        #     self.default_script_arg_txt2img = self.init_default_script_args(script_runner)
        # selectable_scripts, selectable_script_idx = self.get_selectable_script(emotionreq.script_name, script_runner)
        #
        # populate = emotionreq.copy(update={
        #     "sampler_name": "DPM++ SDE Karras",
        #     "do_not_save_samples": False,
        #     "do_not_save_grid": True,
        # })
        #
        # if populate.sampler_name:
        #     populate.sampler_index = None  # prevent a warning later on
        #
        # args = vars(populate)
        # args.pop('script_name', None)
        # args.pop('script_args', None) # will refeed them to the pipeline directly after initializing them
        # args.pop('alwayson_scripts', None)
        #
        # script_args = self.init_script_args(emotionreq, self.default_script_arg_txt2img, selectable_scripts, selectable_script_idx, script_runner)
        #
        # send_images = args.pop('send_images', True)
        # args.pop('save_images', None)
        #
        # with self.queue_lock:
        #     p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
        #     p.scripts = script_runner
        #     p.outpath_grids = opts.outdir_txt2img_grids
        #     p.outpath_samples = opts.outdir_txt2img_samples
        #
        #     shared.state.begin()
        #     if selectable_scripts != None:
        #         p.script_args = script_args
        #         processed = scripts.scripts_txt2img.run(p, *p.script_args) # Need to pass args as list here
        #     else:
        #         p.script_args = tuple(script_args) # Need to pass args as tuple here
        #         processed = process_images(p)
        #     shared.state.end()
        #
        # print("===========Sending Start===============")
        # file_extension = "png"
        # content_type = f"image/{file_extension}"
        #
        # image_data = io.BytesIO()
        # processed.images[0].save(image_data, format='PNG')
        # image_data.seek(0)
        # print("=============Request Start===============")
        # response = s3.upload_fileobj(image_data, BUCKET_NAME, object_name, ExtraArgs={'ContentType': content_type})
        # print("=============Request Done=============")
        # print(f"response: {response}")
        # url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
        # print("=============URL Catch=============")
        # print(f"url: {url}")
        #
        # return {
        #     "status": 200,
        #     "img_url": url
        # }


########################################################################################################################


    def add_api_route(self, path: str, endpoint, **kwargs):
        if shared.cmd_opts.api_auth:
            return self.app.add_api_route(path, endpoint, dependencies=[Depends(self.auth)], **kwargs)
        return self.app.add_api_route(path, endpoint, **kwargs)

    def auth(self, credentials: HTTPBasicCredentials = Depends(HTTPBasic())):
        if credentials.username in self.credentials:
            if compare_digest(credentials.password, self.credentials[credentials.username]):
                return True

        raise HTTPException(status_code=401, detail="Incorrect username or password", headers={"WWW-Authenticate": "Basic"})

    def get_selectable_script(self, script_name, script_runner):
        if script_name is None or script_name == "":
            return None, None

        script_idx = script_name_to_index(script_name, script_runner.selectable_scripts)
        script = script_runner.selectable_scripts[script_idx]
        return script, script_idx
    
    def get_scripts_list(self):
        t2ilist = [str(title.lower()) for title in scripts.scripts_txt2img.titles]
        i2ilist = [str(title.lower()) for title in scripts.scripts_img2img.titles]

        return ScriptsList(txt2img = t2ilist, img2img = i2ilist)  

    def get_script(self, script_name, script_runner):
        if script_name is None or script_name == "":
            return None, None
        
        script_idx = script_name_to_index(script_name, script_runner.scripts)
        return script_runner.scripts[script_idx]

    def init_default_script_args(self, script_runner):
        #find max idx from the scripts in runner and generate a none array to init script_args
        last_arg_index = 1
        for script in script_runner.scripts:
            if last_arg_index < script.args_to:
                last_arg_index = script.args_to
        # None everywhere except position 0 to initialize script args
        script_args = [None]*last_arg_index
        script_args[0] = 0

        # get default values
        with gr.Blocks(): # will throw errors calling ui function without this
            for script in script_runner.scripts:
                if script.ui(script.is_img2img):
                    ui_default_values = []
                    for elem in script.ui(script.is_img2img):
                        ui_default_values.append(elem.value)
                    script_args[script.args_from:script.args_to] = ui_default_values
        return script_args

    def init_script_args(self, request, default_script_args, selectable_scripts, selectable_idx, script_runner):
        script_args = default_script_args.copy()
        # position 0 in script_arg is the idx+1 of the selectable script that is going to be run when using scripts.scripts_*2img.run()
        if selectable_scripts:
            script_args[selectable_scripts.args_from:selectable_scripts.args_to] = request.script_args
            script_args[0] = selectable_idx + 1

        # Now check for always on scripts
        if request.alwayson_scripts and (len(request.alwayson_scripts) > 0):
            for alwayson_script_name in request.alwayson_scripts.keys():
                alwayson_script = self.get_script(alwayson_script_name, script_runner)
                if alwayson_script == None:
                    raise HTTPException(status_code=422, detail=f"always on script {alwayson_script_name} not found")
                # Selectable script in always on script param check
                if alwayson_script.alwayson == False:
                    raise HTTPException(status_code=422, detail=f"Cannot have a selectable script in the always on scripts params")
                # always on script with no arg should always run so you don't really need to add them to the requests
                if "args" in request.alwayson_scripts[alwayson_script_name]:
                    # min between arg length in scriptrunner and arg length in the request
                    for idx in range(0, min((alwayson_script.args_to - alwayson_script.args_from), len(request.alwayson_scripts[alwayson_script_name]["args"]))):
                        script_args[alwayson_script.args_from + idx] = request.alwayson_scripts[alwayson_script_name]["args"][idx]
        return script_args

    def text2imgapi(self, txt2imgreq: StableDiffusionTxt2ImgProcessingAPI):
        script_runner = scripts.scripts_txt2img
        if not script_runner.scripts:
            script_runner.initialize_scripts(False)
            ui.create_ui()
        if not self.default_script_arg_txt2img:
            self.default_script_arg_txt2img = self.init_default_script_args(script_runner)
        selectable_scripts, selectable_script_idx = self.get_selectable_script(txt2imgreq.script_name, script_runner)

        populate = txt2imgreq.copy(update={  # Override __init__ params
            "sampler_name": validate_sampler_name(txt2imgreq.sampler_name or txt2imgreq.sampler_index),
            "do_not_save_samples": not txt2imgreq.save_images,
            "do_not_save_grid": not txt2imgreq.save_images,
        })
        if populate.sampler_name:
            populate.sampler_index = None  # prevent a warning later on

        args = vars(populate)
        args.pop('script_name', None)
        args.pop('script_args', None) # will refeed them to the pipeline directly after initializing them
        args.pop('alwayson_scripts', None)

        script_args = self.init_script_args(txt2imgreq, self.default_script_arg_txt2img, selectable_scripts, selectable_script_idx, script_runner)

        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        with self.queue_lock:
            p = StableDiffusionProcessingTxt2Img(sd_model=shared.sd_model, **args)
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_txt2img_grids
            p.outpath_samples = opts.outdir_txt2img_samples

            shared.state.begin()
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_txt2img.run(p, *p.script_args) # Need to pass args as list here
            else:
                p.script_args = tuple(script_args) # Need to pass args as tuple here
                processed = process_images(p)
            shared.state.end()

        b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []

        return TextToImageResponse(images=b64images, parameters=vars(txt2imgreq), info=processed.js())

    def img2imgapi(self, img2imgreq: StableDiffusionImg2ImgProcessingAPI):
        init_images = img2imgreq.init_images
        if init_images is None:
            raise HTTPException(status_code=404, detail="Init image not found")

        mask = img2imgreq.mask
        if mask:
            mask = decode_base64_to_image(mask)

        script_runner = scripts.scripts_img2img
        if not script_runner.scripts:
            script_runner.initialize_scripts(True)
            ui.create_ui()
        if not self.default_script_arg_img2img:
            self.default_script_arg_img2img = self.init_default_script_args(script_runner)
        selectable_scripts, selectable_script_idx = self.get_selectable_script(img2imgreq.script_name, script_runner)

        populate = img2imgreq.copy(update={  # Override __init__ params
            "sampler_name": validate_sampler_name(img2imgreq.sampler_name or img2imgreq.sampler_index),
            "do_not_save_samples": not img2imgreq.save_images,
            "do_not_save_grid": not img2imgreq.save_images,
            "mask": mask,
        })
        if populate.sampler_name:
            populate.sampler_index = None  # prevent a warning later on

        args = vars(populate)
        args.pop('include_init_images', None)  # this is meant to be done by "exclude": True in model, but it's for a reason that I cannot determine.
        args.pop('script_name', None)
        args.pop('script_args', None)  # will refeed them to the pipeline directly after initializing them
        args.pop('alwayson_scripts', None)

        script_args = self.init_script_args(img2imgreq, self.default_script_arg_img2img, selectable_scripts, selectable_script_idx, script_runner)

        send_images = args.pop('send_images', True)
        args.pop('save_images', None)

        with self.queue_lock:
            p = StableDiffusionProcessingImg2Img(sd_model=shared.sd_model, **args)
            p.init_images = [decode_base64_to_image(x) for x in init_images]
            p.scripts = script_runner
            p.outpath_grids = opts.outdir_img2img_grids
            p.outpath_samples = opts.outdir_img2img_samples

            shared.state.begin()
            if selectable_scripts != None:
                p.script_args = script_args
                processed = scripts.scripts_img2img.run(p, *p.script_args) # Need to pass args as list here
            else:
                p.script_args = tuple(script_args) # Need to pass args as tuple here
                processed = process_images(p)
            shared.state.end()

        b64images = list(map(encode_pil_to_base64, processed.images)) if send_images else []

        if not img2imgreq.include_init_images:
            img2imgreq.init_images = None
            img2imgreq.mask = None

        return ImageToImageResponse(images=b64images, parameters=vars(img2imgreq), info=processed.js())

    def extras_single_image_api(self, req: ExtrasSingleImageRequest):
        reqDict = setUpscalers(req)

        reqDict['image'] = decode_base64_to_image(reqDict['image'])

        with self.queue_lock:
            result = postprocessing.run_extras(extras_mode=0, image_folder="", input_dir="", output_dir="", save_output=False, **reqDict)

        return ExtrasSingleImageResponse(image=encode_pil_to_base64(result[0][0]), html_info=result[1])

    def extras_batch_images_api(self, req: ExtrasBatchImagesRequest):
        reqDict = setUpscalers(req)

        image_list = reqDict.pop('imageList', [])
        image_folder = [decode_base64_to_image(x.data) for x in image_list]

        with self.queue_lock:
            result = postprocessing.run_extras(extras_mode=1, image_folder=image_folder, image="", input_dir="", output_dir="", save_output=False, **reqDict)

        return ExtrasBatchImagesResponse(images=list(map(encode_pil_to_base64, result[0])), html_info=result[1])

    def pnginfoapi(self, req: PNGInfoRequest):
        if(not req.image.strip()):
            return PNGInfoResponse(info="")

        image = decode_base64_to_image(req.image.strip())
        if image is None:
            return PNGInfoResponse(info="")

        geninfo, items = images.read_info_from_image(image)
        if geninfo is None:
            geninfo = ""

        items = {**{'parameters': geninfo}, **items}

        return PNGInfoResponse(info=geninfo, items=items)

    def progressapi(self, req: ProgressRequest = Depends()):
        # copy from check_progress_call of ui.py

        if shared.state.job_count == 0:
            return ProgressResponse(progress=0, eta_relative=0, state=shared.state.dict(), textinfo=shared.state.textinfo)

        # avoid dividing zero
        progress = 0.01

        if shared.state.job_count > 0:
            progress += shared.state.job_no / shared.state.job_count
        if shared.state.sampling_steps > 0:
            progress += 1 / shared.state.job_count * shared.state.sampling_step / shared.state.sampling_steps

        time_since_start = time.time() - shared.state.time_start
        eta = (time_since_start/progress)
        eta_relative = eta-time_since_start

        progress = min(progress, 1)

        shared.state.set_current_image()

        current_image = None
        if shared.state.current_image and not req.skip_current_image:
            current_image = encode_pil_to_base64(shared.state.current_image)

        return ProgressResponse(progress=progress, eta_relative=eta_relative, state=shared.state.dict(), current_image=current_image, textinfo=shared.state.textinfo)

    def interrogateapi(self, interrogatereq: InterrogateRequest):
        image_b64 = interrogatereq.image
        if image_b64 is None:
            raise HTTPException(status_code=404, detail="Image not found")

        img = decode_base64_to_image(image_b64)
        img = img.convert('RGB')

        # Override object param
        with self.queue_lock:
            if interrogatereq.model == "clip":
                processed = shared.interrogator.interrogate(img)
            elif interrogatereq.model == "deepdanbooru":
                processed = deepbooru.model.tag(img)
            else:
                raise HTTPException(status_code=404, detail="Model not found")

        return InterrogateResponse(caption=processed)

    def interruptapi(self):
        shared.state.interrupt()

        return {}

    def unloadapi(self):
        unload_model_weights()

        return {}

    def reloadapi(self):
        reload_model_weights()

        return {}

    def skip(self):
        shared.state.skip()

    def get_config(self):
        options = {}
        for key in shared.opts.data.keys():
            metadata = shared.opts.data_labels.get(key)
            if(metadata is not None):
                options.update({key: shared.opts.data.get(key, shared.opts.data_labels.get(key).default)})
            else:
                options.update({key: shared.opts.data.get(key, None)})

        return options

    def set_config(self, req: Dict[str, Any]):
        for k, v in req.items():
            shared.opts.set(k, v)

        shared.opts.save(shared.config_filename)
        return

    def get_cmd_flags(self):
        return vars(shared.cmd_opts)

    def get_samplers(self):
        return [{"name": sampler[0], "aliases":sampler[2], "options":sampler[3]} for sampler in sd_samplers.all_samplers]

    def get_upscalers(self):
        return [
            {
                "name": upscaler.name,
                "model_name": upscaler.scaler.model_name,
                "model_path": upscaler.data_path,
                "model_url": None,
                "scale": upscaler.scale,
            }
            for upscaler in shared.sd_upscalers
        ]

    def get_sd_models(self):
        return [{"title": x.title, "model_name": x.model_name, "hash": x.shorthash, "sha256": x.sha256, "filename": x.filename, "config": find_checkpoint_config_near_filename(x)} for x in checkpoints_list.values()]

    def get_hypernetworks(self):
        return [{"name": name, "path": shared.hypernetworks[name]} for name in shared.hypernetworks]

    def get_face_restorers(self):
        return [{"name":x.name(), "cmd_dir": getattr(x, "cmd_dir", None)} for x in shared.face_restorers]

    def get_realesrgan_models(self):
        return [{"name":x.name,"path":x.data_path, "scale":x.scale} for x in get_realesrgan_models(None)]

    def get_prompt_styles(self):
        styleList = []
        for k in shared.prompt_styles.styles:
            style = shared.prompt_styles.styles[k]
            styleList.append({"name":style[0], "prompt": style[1], "negative_prompt": style[2]})

        return styleList

    def get_embeddings(self):
        db = sd_hijack.model_hijack.embedding_db

        def convert_embedding(embedding):
            return {
                "step": embedding.step,
                "sd_checkpoint": embedding.sd_checkpoint,
                "sd_checkpoint_name": embedding.sd_checkpoint_name,
                "shape": embedding.shape,
                "vectors": embedding.vectors,
            }

        def convert_embeddings(embeddings):
            return {embedding.name: convert_embedding(embedding) for embedding in embeddings.values()}

        return {
            "loaded": convert_embeddings(db.word_embeddings),
            "skipped": convert_embeddings(db.skipped_embeddings),
        }

    def refresh_checkpoints(self):
        shared.refresh_checkpoints()

    def create_embedding(self, args: dict):
        try:
            shared.state.begin()
            filename = create_embedding(**args) # create empty embedding
            sd_hijack.model_hijack.embedding_db.load_textual_inversion_embeddings() # reload embeddings so new one can be immediately used
            shared.state.end()
            return CreateResponse(info = "create embedding filename: {filename}".format(filename = filename))
        except AssertionError as e:
            shared.state.end()
            return TrainResponse(info = "create embedding error: {error}".format(error = e))

    def create_hypernetwork(self, args: dict):
        try:
            shared.state.begin()
            filename = create_hypernetwork(**args) # create empty embedding
            shared.state.end()
            return CreateResponse(info = "create hypernetwork filename: {filename}".format(filename = filename))
        except AssertionError as e:
            shared.state.end()
            return TrainResponse(info = "create hypernetwork error: {error}".format(error = e))

    def preprocess(self, args: dict):
        try:
            shared.state.begin()
            preprocess(**args) # quick operation unless blip/booru interrogation is enabled
            shared.state.end()
            return PreprocessResponse(info = 'preprocess complete')
        except KeyError as e:
            shared.state.end()
            return PreprocessResponse(info = "preprocess error: invalid token: {error}".format(error = e))
        except AssertionError as e:
            shared.state.end()
            return PreprocessResponse(info = "preprocess error: {error}".format(error = e))
        except FileNotFoundError as e:
            shared.state.end()
            return PreprocessResponse(info = 'preprocess error: {error}'.format(error = e))

    def train_embedding(self, args: dict):
        try:
            shared.state.begin()
            apply_optimizations = shared.opts.training_xattention_optimizations
            error = None
            filename = ''
            if not apply_optimizations:
                sd_hijack.undo_optimizations()
            try:
                embedding, filename = train_embedding(**args) # can take a long time to complete
            except Exception as e:
                error = e
            finally:
                if not apply_optimizations:
                    sd_hijack.apply_optimizations()
                shared.state.end()
            return TrainResponse(info = "train embedding complete: filename: {filename} error: {error}".format(filename = filename, error = error))
        except AssertionError as msg:
            shared.state.end()
            return TrainResponse(info = "train embedding error: {msg}".format(msg = msg))

    def train_hypernetwork(self, args: dict):
        try:
            shared.state.begin()
            shared.loaded_hypernetworks = []
            apply_optimizations = shared.opts.training_xattention_optimizations
            error = None
            filename = ''
            if not apply_optimizations:
                sd_hijack.undo_optimizations()
            try:
                hypernetwork, filename = train_hypernetwork(**args)
            except Exception as e:
                error = e
            finally:
                shared.sd_model.cond_stage_model.to(devices.device)
                shared.sd_model.first_stage_model.to(devices.device)
                if not apply_optimizations:
                    sd_hijack.apply_optimizations()
                shared.state.end()
            return TrainResponse(info="train embedding complete: filename: {filename} error: {error}".format(filename=filename, error=error))
        except AssertionError as msg:
            shared.state.end()
            return TrainResponse(info="train embedding error: {error}".format(error=error))

    def get_memory(self):
        try:
            import os, psutil
            process = psutil.Process(os.getpid())
            res = process.memory_info() # only rss is cross-platform guaranteed so we dont rely on other values
            ram_total = 100 * res.rss / process.memory_percent() # and total memory is calculated as actual value is not cross-platform safe
            ram = { 'free': ram_total - res.rss, 'used': res.rss, 'total': ram_total }
        except Exception as err:
            ram = { 'error': f'{err}' }
        try:
            import torch
            if torch.cuda.is_available():
                s = torch.cuda.mem_get_info()
                system = { 'free': s[0], 'used': s[1] - s[0], 'total': s[1] }
                s = dict(torch.cuda.memory_stats(shared.device))
                allocated = { 'current': s['allocated_bytes.all.current'], 'peak': s['allocated_bytes.all.peak'] }
                reserved = { 'current': s['reserved_bytes.all.current'], 'peak': s['reserved_bytes.all.peak'] }
                active = { 'current': s['active_bytes.all.current'], 'peak': s['active_bytes.all.peak'] }
                inactive = { 'current': s['inactive_split_bytes.all.current'], 'peak': s['inactive_split_bytes.all.peak'] }
                warnings = { 'retries': s['num_alloc_retries'], 'oom': s['num_ooms'] }
                cuda = {
                    'system': system,
                    'active': active,
                    'allocated': allocated,
                    'reserved': reserved,
                    'inactive': inactive,
                    'events': warnings,
                }
            else:
                cuda = { 'error': 'unavailable' }
        except Exception as err:
            cuda = { 'error': f'{err}' }
        return MemoryResponse(ram = ram, cuda = cuda)

    def launch(self, server_name, port):
        self.app.include_router(self.router)
        uvicorn.run(self.app, host="0.0.0.0", port=port)

