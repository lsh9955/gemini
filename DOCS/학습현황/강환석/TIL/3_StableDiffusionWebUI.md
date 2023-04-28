> 손 쉽게 이미지를 만들어보자.
> 
> 
> 이후 Stable Diffusion → [SD] 로 지칭합니다.
> 

## ⚠️ 본 설명서는 Stable Diffusion 본체가 아니라 ⚠️
## ⚠️     Web UI로 사용하는 방법을 공유합니다.    ⚠️

## 1.  [SD] Webui 버전을 Clone 해봅시다.

> Automatic1111의 깃 허브 주소
> [GitHub - AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui/)
> 
1. 평범하게 Git 에서 **Code**로 들어가서 **Clone용 HTTPS 주소**를 받아옵니다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a79d3999-75c2-4a9c-8f20-7631f16aa23a/Untitled.png)
    
2. Git bash에서 `git clone [https://github.com/AUTOMATIC1111/stable-diffusion-webui.git](https://github.com/AUTOMATIC1111/stable-diffusion-webui.git)` 입력!

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/34c19521-8006-4ff1-9f57-977b660eff90/Untitled.png)

## 2. 로컬에서 실행해보기! (Original [SD])

1. `Webui-**user**.bat` 실행!  
    
    > ⚠️ webui.bat이 아니라. Webui-**user**.bat 이다. ⚠️
    > 
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/759b2b64-0545-4a99-8cd5-f51b55f45351/Untitled.png)
    
2. 배치파일이 모든 필요 파일을 설치하고 자동으로 서버를 구축할 때 까지 기다린다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6d12d01-3da9-44d9-886d-3d8c20cb7b4f/Untitled.png)
    
    이런 식으로 나온다면, 정답이다. 아쉽게도 이 Webui는 자동으로 Web을 켜주지 않습니다.
    
3. [http://127.0.0.1:7860/](http://127.0.0.1:7860/) 을 통해 Web UI로 진입한다.
4. 이런 화면이 나오면 정답
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1fd82c37-881a-42ac-935b-cce2ba9878cf/Untitled.png)
    

### 3. 그림 생성해보기

### [중요] 이론적인 부분은 [[기반 지식] 생성 AI?](https://www.notion.so/AI-62f7f825142440809cc47b88543a8709) 을 참고해주세요

**대충 UI는 이렇습니다.**
<img src=".\asset\Webui.png" width="500" >
1. **사용할 모델을 정해주는 곳**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc449ead-d30e-4a90-a09d-dc6026a86c01/Untitled.png)
    
    - 사용할 다양한 모델들을 적용해볼 수 있습니다.
        - 각 모델들은 다양한 특성을 지니며, [SD] 덕분에 일정 수준 이상의 퀄리티는 보장됩니다
        - Hugging Face 에서 각종 모델을 다운 받을 수 있습니다.
            
            [Hugging Face – The AI community building the future.](https://huggingface.co/)
            
            - Anything 4.0:
                
                [andite/anything-v4.0 · Hugging Face](https://huggingface.co/andite/anything-v4.0)
                
        - Civitai 에서 각종 모델을 다운 받을 수 있습니다.
            
            [Civitai | Stable Diffusion models, embeddings, hypernetworks and more](https://civitai.com/)
            
            - AnythingV5:
                
                [万象熔炉 | Anything V5/V3 | Stable Diffusion Checkpoint | Civitai](https://civitai.com/models/9409/or-anything-v5v3)
                
                ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/79728ca4-5ca8-4c9b-8d70-3040ca88fc25/Untitled.png)
                
            - pastel-mix:
                
                [Pastel-Mix [Stylized Anime Model] - Fantasy.ai | Stable Diffusion Checkpoint | Civitai](https://civitai.com/models/5414/pastel-mix-stylized-anime-model-fantasyai)
                
                ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4172450-703f-4222-9804-7ae28cbf1f35/Untitled.png)
                
        
2. **활용할 기능**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d34f9ab1-03e0-443c-9b54-4db13059676a/Untitled.png)
    
    - **txt2img**
        - 프롬프트를 기반으로 이미지를 만듭니다. 가장 많이 쓰는 기능.
        - 이 기능을 기반으로 유저가 뽑고 싶은 이미지를 생성해주려고 합니다.
    - **img2img**
        - 이미 있는 이미지를 기반으로 프롬프트를 추가 혹은 변경하여 재생성 합니다.
        - 이 기능을 기반으로 유저가 입력한 사진 → 새로운 구도의 사진 생성 기능을 지원하려고 합니다.
    - **extras**
        - 
    - **png info**
        - **만들어진** 이미지를 넣으면, 해당 이미지를 만들기 위해 사용되었던 가중치 값을 반환
        - Exif 라고도 합니당
    - 기타 잡잡
3. **반영하고 싶은 속성 (Positive Prompt)**
    
    > [프롬프트 딕셔너리](https://www.notion.so/84b8a4518a8241c4a7d67a411e3d65f8) 참고!
    > 
    
4. **거르고 싶은 속성 (Negative Prompt)**
    
    > [프롬프트 딕셔너리](https://www.notion.so/84b8a4518a8241c4a7d67a411e3d65f8) 참고!
    > 
    
5. **사용할 샘플링 모델**
    - 20~30 개 정도로 생성합니다.
6. **생성 이미지 개수**
    - 한번에 몇 개 씩 만드냐는 설정입니다!
    - 1 개가 가장 효율이 안 좋고, 여러 개 만들 때, 그림 단위 당 소요 시간이 가장 짧아집니다.
7. **만들기**
    - 이미지를 생성합니당!
8. **생성 이미지가 나오는 곳**
    - 아래에 이미지가 나오게 되는데, 해당 Webui가 위치한 폴더의 output 폴더에도 생성됩니다.