from webui import *
from modules.api.api import *
from modules.api.models import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

initialize()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# setup_middleware(app)
api = create_api(app)

# modules.script_callbacks.app_started_callback(None, app)
print("Gemini API 서버 CUDA 적용 여부를 확인합니다..")
print("CUDA available:", torch.cuda.is_available())
print("CUDA device count:", torch.cuda.device_count())
if torch.cuda.is_available():
    print("Current CUDA device:", torch.cuda.current_device())
    print("CUDA device name:", torch.cuda.get_device_name(torch.cuda.current_device()))
print(f"Startup time: {startup_timer.summary()}.")


@app.get("/ml_api/")
def main():
    return "IMALIVE"


@app.post("/ml_api/gemini")
async def gemini(req: StableDiffusionTxt2GeminiProcessingAPI, background_tasks: BackgroundTasks):
    response = Api.makegeminiapi(req, background_tasks)
    return response

@app.post("/ml_api/background")
async def background(txt2backgroundreq: StableDiffusionTxt2BackgroundProcessingAPI, background_tasks: BackgroundTasks):
    print(txt2backgroundreq)
    response = Api.makebackgroundapi(txt2backgroundreq, background_tasks)
    return response


@app.post("/ml_api/pose")
async def pose(req: StableDiffusionTxt2BackgroundProcessingAPI, background_tasks: BackgroundTasks):
    return Api.makebackgroundapi(req, background_tasks)

@app.post("/ml_api/emotion")
async def emotion(req: StableDiffusionEmotionProcessingAPI, background_tasks: BackgroundTasks):
    return Api.makefaceapi(req, background_tasks)


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000, reload=True, workers=4)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=7860)
