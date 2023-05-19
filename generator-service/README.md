# 0. 시작하기 - 로컬에서 API 서버 편하게 시작하기.
### 1. Run start.bat
 - start.bat을 실행시키십시오.
### 2. docs 확인하기
 - fast api 기반 프로젝트이기에 127.0.0.1:7861/docs 로 접속하시면 스웨거 문서가 보입니다.

# 0. API 서버 작동하는 법
### 1. 환경 변수 세팅
 - python -m venv venv
 - source venv/Script/activate
 - pip install -r requirement.txt
 - pip install -r requirement_version.txt
 - python launch.py

### 2. Run python
 - python main.py

# 1. 서비스 설명

# 2. 사용 모델
## 1. CKPT
 - 보안상의 문제로 Safetensors 사용.
 - Anything V5v3 pretrained 모델을 기반 모델로 사용

# 부록:
### 이 API 서비스는 Stable diffusion Web UI를 기반으로 만들어졌습니다.

# [기반 지식] 생성 AI?

# 0. 다 똑같은 거 아니야?

## 0-1. 생성 AI 서비스의 종류

### Dall E

> 아마 가장 유명한 모델일 것이다.
> 
> 
> [DALL·E 2](https://openai.com/product/dall-e-2)
> 
- **Transformer** 언어 모델 + **GAN(Generative Adversarial Network)** 이미지 생성 모델
- 먼저 입력된 문장을 인코딩하여 의미를 추출하고, 그 다음 이를 디코딩하여 이미지를 생성함

### 미드 저니

> **전세계 1500만 구독자… 미술 대회 입상 경력 보유의 컬쳐 쇼크**
> 
> 
> [Midjourney](https://www.midjourney.com/)
> 
- Discord 기반 구독 형 생성 AI 서비스이다.
- 내부 로직이나 모델에 관련하여 공개된 부분은 없다.
- 오타쿠를 위한 니지 저니가 존재한다.
    
    [niji・journey](https://nijijourney.com/ko/)
    

### Stable Diffusion

> 오픈소스로 공개된 뮌헨 대학의 최고의 아웃 풋. 생성 AI의 희망이자 혁신 오픈소스
> 
> 
> [GitHub - Stability-AI/stablediffusion: High-Resolution Image Synthesis with Latent Diffusion Models](https://github.com/Stability-AI/stablediffusion)
> 
- Diffusion 모델을 기반으로 이미지를 생성 하는 생성 AI 이다.
- 2023.04 부 2.1 버전까지 공개되었고, 3.0에 들어갈 기술들이 개발되고 있다.
- Stable Diffusion Webui (by Automatic 1111) 을 기반으로 일반인들도 쉽게 쓸 수 있게 되었다.
    
    [GitHub - AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
    

# 1. 그래픽 AI의 기술적 차이

> 근본 중의 근본인 CNN부터 RNN, GAN, Diffusion 순으로 설명하고자 한다.
> 

## 1-1. CNN

- 편하게 이해하기 CNN편
    1. CNN은 쉽게 말해서, 특징을 추출하는 방법론이다.
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled.png)
        
    2. 이미지를 배열 데이터로 전환하고,
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%201.png)
        
        - 이 때, 흑백 이미지의 데이터는 2차원 배열, 컬러 이미지는 3차원 배열 (depth=3) 이다.
            - [TIP] 직접 CNN 구현 시, PNG 파일의 경우 RBG가 아니라 RBGA로 들어온다.
                - Transparent한 부분(보통은 배경)을 Black으로 자동 전환하기 때문에,
                White로 바꿔주는 로직을 추가하지 않으면 모델이 이미지 인식할 때, 뻑난다.
    3. 이렇게 배열 데이터에서 특정 패턴을 뽑아내기 위한 필터를 적용하여 특징들을 추출하고
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%202.png)
        
        - 이 때, 필터 값 배치 및 가중치는 랜덤이다.
    4. 특징을 추출한 배열 데이터를 Pooling으로 작게 만드는 과정을 반복한다.
    
- RNN과의 차이
    - RNN은 이어진 데이터에 대해 인식하는 데 특화되어 있다.
        - 즉, 앞 뒤의 관계성이 중요한 텍스트 데이터 및 음성 데이터 분석에 강점을 가진다.
    - CNN은 2차원 배열에서의 패턴인식에 특화되어있다.
        - 즉, 이미지 데이터 혹은 음성 데이터(음성 패턴을 이미지화 하여 분석)에 강점을 가진다.
        - 음성 인식 부분에서, 음성 그래프를 이미지 처럼 읽어 오는 방식이 상당히 참신했다.
            - 관련하여 배경 소음 속에서 아기의 울음소리를 인식하는 프로젝트가 있었다.

## 1-2. GAN

- 편하게 이해하기 GAN편
    
    쉽게 말해서, GAN은 두 놈을 싸움 붙여서 서로 성장시키는 모델이다.
    
    [[외부기고] [새로운 인공지능 기술 GAN] ② GAN의 개념과 이해 | 인사이트리포트 | 삼성SDS](https://www.samsungsds.com/kr/insights/generative-adversarial-network-ai-2.html)
    
    [1. GAN 소개 — PseudoLab Tutorial Book](https://pseudo-lab.github.io/Tutorial-Book/chapters/GAN/Ch1-Introduction.html)
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%203.png)
    
    1. 생성 모델은 가짜 데이터를 최대한 진짜처럼 보이게 만들고,
    2. 분류 모델은 가짜 데이터를 최대한 잘 가려내도록 한다.
    
    이러한 과정이 계속 반복되면서 성장하는 것이 GAN 모델이다.
    
- 구조를 도식화 하면 아래와 같다.
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%204.png)
    
- 사용하는 함수는 아래와 같다.
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%205.png)
    
    - 구분기(D):
    실제 데이터(x)를 입력하면 D(x)가 커지면서 log값이 커지면서 높은 확률값이 나오도록 하고, 가짜 데이터(G(z))를 입력하면 log값이 작아짐에 따라 낮은 확률값이 나오도록 학습
    - 생성기(G):
    Zero-Mean Gaussian 분포에서 노이즈 z를 멀티레이어 퍼셉트론에 통과시켜 샘플들을 생성하며 이 생성된 가짜 데이터 G(z)를 D에 input으로 넣었을 때 실제 데이터처럼 확률이 높게 나오도록 학습
    - 즉, 통짜로 생성한 이미지를 기반으로 분류기에 넣고 분류합니다.
- 결론적으로, 이미지가 진짜(1)인지 가짜(0)인지 구분하지 못하는 경계점(0.5)으로 가는 것이 목표.

## 1-3. Tansformer

- 편하게 이해하기 Dall E 편
    
    쉽게 말해서, 텍스트 기반으로 각 가중치에 맞게 적절한 이미지를 생성해줍니다.
    
- Dall E의 기반 매커니즘.
    - DALL E는 GPT를 기반으로 만든 모델입니다.
    즉, 다른 생성 AI와는 다르게 그 근본이 Text 모델이기 때문에 가지는 특성이 있습니다.
    - Dall E의 근본이 되는 Transformer는 기존의 RNN과 CNN 기반 모델과 달리, 
    **Attention 메커니즘**을 사용하여 입력 시퀀스의 모든 단어를 한 번에 처리할 수 있습니다. 
    이를 통해, 입력 시퀀스의 길이에 상관없이 일정한 수준의 성능을 보입니다.
        - Attention 매커니즘이란?
            
            Attention 메커니즘은 다음과 같은 방법으로 동작합니다.
            
            1. 쿼리(Query) 벡터와 키(Key) 벡터, 값(Value) 벡터를 생성합니다. 이때, 쿼리 벡터는 출력 시퀀스의 현재 단어를 나타내며, 키 벡터와 값 벡터는 입력 시퀀스의 각 단어를 나타냅니다.
            2. 각 단어의 중요도를 나타내는 가중치를 계산합니다. 이때, 쿼리 벡터와 각 단어의 키 벡터의 내적을 계산하여 중요도를 나타내는 스칼라 값을 생성합니다.
            3. 가중치와 값 벡터를 사용하여 출력 벡터를 계산합니다. 이때, 가중치와 값 벡터의 가중 평균을 계산하여 출력 벡터를 생성합니다.
    - 즉, 프롬프트에 대한 가중치가 자동으로 조정되는 특성을 가지기에 SD와 다르게 프롬프트에 대한 접근성이 높습니다.
        - 단, 다르게 말하면 프롬프트에 대한 조정치를 커스텀할 수 없습니다.

## 1-4. Stable Diffusion

- 편하게 이해하기. SD편
    
    쉽게 말해서, Ai 모델을 가스라이팅 하는 것이다.
    아무것도 없는 곳에서 “이건 ~~를 극한까지 노이즈화 시킨거다.” 라고 말하고
    그 아무것도 없는 노이즈부터 원본 이미지를 생성 시키는 방법이다.
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%206.png)
    
- LDM (Latent Diffusion Model):
    
    SD의 심장 같은 친구다. 원래도 효율적이던 Diffusion을 날아오르게 만든 기법
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%207.png)
    
    [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
    
    - LDM의 장점(중요하지는 않음): 쉽게 말해서, 가성비가 좋다.
        1. 효율적인 샘플링: 
        잠재 공간을 사용함으로써 더 효율적인 샘플링이 가능해집니다. 잠재 공간에서의 샘플링은 원본 이미지 공간에서의 샘플링보다 계산 비용이 적게 들고, 더 나은 확률 분포 추정이 가능합니다.
        2. 더 나은 이미지 품질: 
        잠재 공간에서의 확률 분포를 사용하여 샘플링하면, 생성된 이미지의 품질이 높아질 확률이 높습니다. 이는 학습된 확률 분포가 실제 이미지 분포와 가까워지기 때문입니다.
        3. 구조적인 이미지 생성: 
        LDM은 이미지의 구조와 특성을 잘 보존하면서 이미지를 생성할 수 있습니다. 잠재 공간에서의 샘플링과 변환은 이미지의 구조를 유지하면서 새로운 이미지를 생성하는 데 도움이 됩니다.
        4. 조건부 생성: 
        LDM은 조건부 생성을 지원합니다. 즉, 특정한 조건을 만족하는 이미지를 생성하는 것이 가능합니다. 예를 들어, 특정 클래스의 이미지나 특정 스타일의 이미지를 생성할 수 있습니다.
        5. 이미지 간의 보간: 
        잠재 공간에서의 거리가 이미지 간의 유사성을 나타내므로, 이미지 간의 보간이 가능합니다. 즉, 두 이미지 사이의 연속적인 변화를 나타내는 이미지 시퀀스를 생성할 수 있습니다.
- SD의 작동 방식
    
    ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%208.png)
    
    1. Latent Space(잠재 공간): 
    이미지의 특성을 표현하는 저차원 공간입니다. 
    잠재 공간에서의 점은 원본 이미지 공간에서의 이미지와 대응됩니다. 
    이 공간에서의 거리는 이미지 간의 유사성을 나타내며, 이미지 생성 과정은 이 잠재 공간에서의 샘플링과 변환을 통해 이루어집니다.
    → 쉽게 말해서 처음 시작이 점 한 개(.) 라면, 목표로 하는 그림을 위해서는 어떻게 그림을 그려나가야 하는지 나열되는 샘플링들과 비교해가는 장소
    2. Diffusion Process(디퓨전 과정):
    노이즈가 있는 이미지를 점차 더 깨끗한 이미지로 바꾸는 과정입니다. 
    LDM은 이 디퓨전 과정을 역으로 진행하여 이미지를 생성합니다. 
    이 과정에서 잠재 공간의 샘플링이 사용되며, 잠재 공간에서의 확률 분포를 따라 이미지가 생성됩니다.
    → 디 노이징 과정은, 샘플링 이미지 중에서 가장 합리적인 친구를 정하는 과정
    3. Neural Networks: 
    LDM은 딥러닝 모델을 사용하여 디퓨전 과정을 역으로 진행하고, 잠재 공간에서의 샘플링을 수행합니다. 
    이러한 딥러닝 모델은 이미지의 특성을 추출하고, 잠재 공간과 원본 이미지 공간 사이의 변환을 학습합니다. 또한, 생성 과정에서의 샘플링과 이미지 변환을 지원합니다.

# 2. Stable Diffusion 을 활용한 이미지 생성

> SD Webui의 기본 화면을 보도록 하자. 여기에 나온 각각의 가중치를 설명하도록 하겠다.
> 
> 
> ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%209.png)
> 

## 2-1. 프롬프트

> 생성하고자 하는 이미지를 설명하는 명령어다.
> 
> - 예시
>     
>     ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2010.png)
>     
>     (best quality), (masterpiece), (high resolution), (1boy:1.3), (Extremely detailed and beautiful face:1.5), perfect anatomy, (full body shot:1.5), hyper detail, ultra detailed cloths, Incredibly detailed, red upper reather wear, sword, red hair, short cut hair, silver plate armor, blue jean, blue eyes
>     
>     Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))
>     
>     Steps: 20, Sampler: DPM++ SDE Karras, CFG scale: 7, Seed: 3120790884, Size: 512x512, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE
>     
>     [ (best q …       ]: 반영할 속성
>     
>     [ lowers, …       ]: 거를 속성
>     
>     [ Steps: 2…       ]: 그 외 기타 세팅을 의미함. Seed를 고정하면 같은 이미지 생성도 가능
>     
> - Tip
>     - 동작은 ing를 붙여서 하는 것이 유용하다.
>         - 혹은 Poses나 Control Net을 활용하면 된다.
>     - 

### 이질성

- Prompt는 일반적인 Text와 다르다.
    - Tansformer 기반의 Dall E의 경우에는 기본 모델이 언어 처리에 특화되어있기에 상관 없지만,
    SD의 경우에는 각 프롬프트가 굉장히 민감하게 반응하기 때문에 조율이 필요하다.

### 가중치

- 각 프롬프트는 동일하게 반영되지 않는다.
    - 학습 과정에서 1000장의 이미지를 학습했다고 가정했을 때,
        - Black hair 이라는 속성이 800장에 들어가 있었고, Cur hair 속성이 단 2장일 때,
        Black hair, Cur hair은 서로 상충되지 않음에도(당연히 상충되면 black이 우선),
        Cur hair에 가중치를 주지 않을 경우 무시 당할 확률이 높아진다.
- 각 프롬프트에는 같이 사용되기 힘든 경우가 존재한다.
    - 이건 순전히 학습의 문제이다. 강제로 병합할 수는 있으나, 부작용이 발생할 수 있다.
    - 예를 들자면…
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2011.png)
        
        이 드레드락 헤어스타일을 보자. 노란색 드레드락, 그것도 흑인으로만 학습되어있던 것 같다.
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2012.png)
        
        전부 같은 Seed 값에 같은 Black_hair, Long_hair, {{ 헤어 스타일 종류 }} 로 입력했음에도
        혼자만 이질적인 아웃풋이 나왔다.
        
- 가중치 부과 Tip:
    - 1.4 이상으로 부여하면 그림이 어그러지는 경우가 발생한다.
    - ( ) 으로 주는 가중치는 1.1 이다. (( )) 처럼 2개를 주어지면 1.1 x 1.1 으로 반영되어 1.21이다.
    - (black_hair:1.3) 처럼 직접 가중치를 줄 수도 있다.

## 2-2. Sampling 설정

> 학습 혹은 생성 과정에서 각 시도의 세부 설정을 해주는 방식이다.
> 
> 
> 일단 외치고 가자. Karras!! 만세!! [https://research.nvidia.com/person/tero-karras](https://research.nvidia.com/person/tero-karras)
> 
> 샘플링에서는 머신 성능이 허락해주는 한, DPM 기반이 퀄리티가 좋다.
> 

### Sampling Method _ Basic

> 샘플링의 기초적인 방법론입니다.
> 
1. Euler: 오일러 방법은 미분 방정식의 수치해를 구하는 가장 기본적인 방법입니다. 이 방법은 간단하고 빠르지만, 오차가 누적되는 문제가 있습니다.
2. Euler a: 오일러 방법의 변형 중 하나로, 보다 정확한 해를 얻기 위해 개선된 방법입니다.
3. LMS (Least Mean Squares): 최소 평균 제곱 오차 방법은 오차의 제곱 평균을 최소화하는 방향으로 샘플링을 수행합니다. 노이즈에 강인한 방법이지만, 계산량이 많을 수 있습니다.
4. DDIM (Denoising Diffusion Implicit Models): 노이즈가 있는 이미지를 깨끗한 이미지로 만드는 denoising 과정을 역순으로 진행하여 이미지를 생성하는 방법입니다. 학습과 생성 과정이 모두 복잡하지만, 높은 품질의 이미지를 생성할 수 있습니다.
5. PLMS (Probabilistic Least Mean Squares): LMS 방법을 확률적으로 적용한 방식으로, 데이터의 불확실성을 고려한 샘플링이 가능합니다. 
6. DPM (Deep Probabilistic Model): 딥러닝을 활용하여 확률 모델링을 수행하는 기법입니다. 복잡한 이미지 생성이 가능하나, 학습 과정이 복잡하고 비용이 많이 듭니다.

### Sampling Method _ Ex

> 샘플링의 향상된 방법론입니다.
> 
> 
> ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2013.png)
> 
> 다시 한번 Karras 센세… 감사합니다… 
> 
- DPM++ : 
DPM을 발전시킨 모델입니다. 기본적으로 이걸 쓰시면 됩니다.
- DPM++ SDE: 
확률론적 미분 방정식(Stochastic Differential Equation, SDE)을 사용한 DPM++의 변형입니다.
더 정교한 확률 모델링을 수행하며, 이미지 생성 과정에서도 더 정확한 샘플링이 가능합니다.
- DPM++ SDE Karras:
Karras 가 제안한 DPM++ SDE의 변형으로, 저자가 제안한 특정한 개선 사항이 반영되었습니다.
알고리즘의 성능을 높이고, 학습 및 생성 과정을 더 효율적으로 만들었습니다.
→ 주로 현실적이고 자연스러운 이미지 생성에 사용됩니다.
- DPM++2M Karras:
두 가지 모드를 사용하여 이미지와 마스크 간의 복잡한 상호 작용을 모델링하며 더욱 세밀하고 다양한 이미지를 생성할 수 있습니다. 
또한, 이 모델은 이미지의 큰 구조와 작은 구조의 정보를 둘 다 활용하면서 생성된 이미지의 특성을 제어할 수 있는 기능을 제공합니다. 
→ 만화나 애니메이션 이미지의 캐릭터나 배경 등의 복잡한 디자인 요소에 적합합니다
- DPM++ 2S a Karras:
이미지의 큰 구조와 작은 구조의 정보를 모두 활용하면서 생성된 이미지의 특성을 제어할 수 있는 기능을 제공합니다.
이미지의 다양한 크기와 복잡성을 고려하여 다양한 종류의 캐릭터를 생성할 수 있으며, 특성 제어 기능을 통해 원하는 색상, 레이아웃, 모양 등을 자유롭게 설정할 수 있습니다.
→ 새로운 애니메이션 캐릭터를 쉽고 빠르게 생성할 수 있습니다.

### Sampling Steps

> 이미지 생성 과정에서 몇 개의 Sample을 만들 것이냐는 의미입니다.
> 
- 쉽게 말해서 각 생성 과정에서 몇 개의 샘플 중에서 선택할 거냐는 이야기 입니다.
    - 생성 과정에서 예시를 만들고, 그 중에서 평가 모델을 통해 더 정확한 친구를 고르는데,
    이 과정에서 나열할 예시의 개수를 정하는 설정 값입니다.
    - 일반적인 실사 기반 사진은 80~120도 추천하는 바 이지만,
    애니메이션이나 일러스트 같은 경우에는 20~30 정도의 값으로 하는 것을 추천합니다.
- 기본적으로 Steps가 높아질 수록 퀄리티와 디테일은 상승합니다.
    - 그 반작용으로 시간은 정많이 들어가며, 오히려 그림이 망가지는 경우도 있으니 
    무조건 높게 잡는 것은 지양하도록 합시다.

## 2-3. 기타 설정

> 생성 이미지의 각종 가중치
> 

### Width, Height

> 만들어지는 그림의 픽셀을 정해줍니다.
> 
- 기본적으로 학습은 512 X 512로 되어있기 때문에, 512x512의 효율이 가장 좋습니다.
- SD의 특성 상 처음부터 고화질로 만들어도 부하가 크게 걸리지는 않지만,
적당한 크기로 만들고 Upscale 하는 것이 합리적입니다.
- 512x828의 사이즈로 황금비를 나타내봅시다. 혹은 512x768도 좋은 선택입니다.

### CFG

> **classifier-free guidance:** 내가 준 프롬프트를 얼마나 빡쎄게 적용시키느냐의 정도
> 
- 이 CFG 스케일의 값이 높을 수록 생성 모델은 프롬프트를 더욱 강하게 적용시킨다.
- 가중치 값 부여
    - 7~8: 애니메이션, 배경, 2D 그래픽 등의 자료에 추천
    - 11(recommend): 실사 기반은 11 정도가 적당함.
    - 가중치가 너무 크게 할당되면 좋지 않음
        - 선이 굵어진다.
        - 그림이 어그러진다.
        - 그림들이 상호 어우러지지 못하는 경우가 발생

### Batch Count, Batch Size

> Ai 모델 학습 과정에서의 Epoch와 Batch Size와 비슷하다.
> 
- Batch Size:
    
    Batch size는 각각의 미니 배치에 포함되는 데이터 샘플의 수를 나타냅니다. 머신러닝 모델을 학습할 때, 전체 데이터셋을 사용하는 대신 일부분의 데이터만을 사용하여 경사하강법을 적용하는데, 이 때 사용되는 일부 데이터의 수를 batch size라고 합니다. 작은 배치 크기는 메모리 요구량을 줄이고, 계산 효율성을 높일 수 있습니다. 하지만 배치 크기가 너무 작으면 일반화 성능이 저하되거나, 수렴 속도가 느려질 수 있습니다. 따라서 적절한 배치 크기를 선택하는 것이 중요합니다.
    
- Batch Count:
    
    Batch count는 전체 데이터셋을 미니 배치로 나눌 때 생성되는 미니 배치의 총 개수를 나타냅니다. 전체 데이터 샘플 수를 batch size로 나눈 값이 batch count가 됩니다. Batch count는 일반적으로 한 번의 에포크(epoch) 동안 경사하강법이 적용되는 횟수를 결정합니다. 한 번의 에포크에서 모든 미니 배치에 대해 경사하강법을 적용하게 되며, 이 과정을 여러 번의 에포크 동안 반복하여 모델을 학습시킵니다.
    

### SEED

> 랜덤한 결과를 내기 위한 난수. SD에서는 초기 노이즈의 베이스가 된다.
> 
- 이를 고정시키면 다른 환경 요소가 같다는 가정 하에, 비슷한 이미지를 생성 할 수 있다.
    - 다른 요소들을 통일하면, 거의 비슷한 이미지가 나온다.
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2014.png)
        
    - 이를 활용하면, 특정 변수만 변경하여 다른 느낌을 줄 수 있다.
        
        ![Untitled](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/Untitled%2015.png)
        
    - 조금 더 활용하면 표정을 바꾸는 식으로 활용 가능하다.
        
        ![feeling_hash_test.gif](%5B%E1%84%80%E1%85%B5%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%B5%E1%86%A8%5D%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20AI%209a2c72d66b2247aa9042a2344cc12524/feeling_hash_test.gif)


# 프롬프트 딕셔너리

< 용어 정리 >

```
**Stable Diffusion:** 이미지 생성 AI의 혁신, 이후 SD로 약칭

**Model:** 사실 Model이 아니라 CKPT, 즉 체크 포인트다. SD 기반의 학습 내용을 저장해놓은 파일
**VAE:** 색 배합 및 색 배치를 위한 서브 모델이다. 가중치를 부여하지 않으면 색감이 안나온다
**Lora:** 특정한 그림체 혹은 특정한 모델에 대한 가중치를 독립적으로 주기 위한 장치. (병합 X)
```

## 0. 프롬프트 ?

- 프롬프트 제작 툴
    
    ### 1.  Novel ai
    
    [](https://novelai.app/)
    
    - 근본의 Novel ai 에서 지원하는 프롬프트 제작기 입니다.
    - Novel AI 또한 Stable Diffusion을 기반으로 하기 때문에 유용하다.

> 프롬프트란, AI와 소통하기 위한 언어다.
> 

자세한 내용은 [2-1. 프롬프트](https://www.notion.so/2-1-c536daf761674865bf4a938f65c8b735) 을 참고하도록 하자.

### 0-1. 왜 공부해야 하는건데? 프롬프트 엔지니어?

- SD와 Dall E 에서의 프롬프트의 값어치는 매우 다르다.
    - Dell E는 Transformer 모델이 기반이다.
    → Text 내의 문맥을 파악해서, 무엇이 중요한지 알아서 판단한다.’
    - SD는 직접 하나하나 가중치를 배정해야한다.
- 우리가 말하는 단어 ≠ AI 모델이 이해하는 단어
    - 같은 의미처럼 보여도, 프롬프트가 반영되는 방식이 매우 달라질 수 있다.
- [경험] 프롬프트의 가중치 뿐만 아니라 프롬프트의 순서 또한 생성되는 그림에 영향을 미친다.
- 결국 많은 경험을 통해 프롬프트에 대한 이해도를 올릴 수 밖에 없다.

## 1. 프롬프트 컨밴션:

> < **프롬프트 예시 >**
> 
> 
> (best quality), (masterpiece), (high resolution), (1girl:1.5), (Extremely detailed and beautiful face:1.7), perfect anatomy, hyper detail, ultra detailed cloths, Incredibly detailed, ((dress)), blond hair, long and cur and wavy hair, green eyes, a medieval dress, an aristocratic woman, a gentle smile, an emerald earring, an green emerald necklace, ((illustration)), a small chest, (fluttering hair by wind)
> 
> Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw)), crown, hairband
> 
> Steps: 10, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 1363903108, Size: 512x512, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE, Clip skip: 2, ENSD: 31337, ControlNet Enabled: True, ControlNet Preprocessor: depth_midas, ControlNet Model: controlnetPreTrained_depthV10 [400750f6], ControlNet Weight: 0.8, ControlNet Starting Step: 0, ControlNet Ending Step: 1, ControlNet Resize Mode: Resize and Fill, ControlNet Pixel Perfect: False, ControlNet Control Mode: My prompt is more important, ControlNet Preprocessor Parameters: "(512, 64, 64)"
> 

### 1. 용어 정리

1. Positive? Negative?
    
    > SD 2.0 이후 Negative 지원:
    즉 해당 그림에 나오지 않았으면 하는 프롬프트도 반영할 수 있게 되었다.
    > 
    1. Positive: 내가 그림에 반영하고 싶은 속성
        
        > 예시: `(best quality), (masterpiece), (high resolution)...`
        > 
    2. Negative: 내가 그림에 반영하고 싶지 않은 속성
        
        > 예시: `lowres, ((bad anatomy)), ((bad hands))…`
        > 
2. Steps
    
    > 예시: `Steps: 10`
    > 
    - 한번에 몇 개의 샘플을 만들어서 비교할 것이냐 입니다.
    - 이에 비례하여 퀄리티와 시간이 증가합니다. 30 정도가 무난합니다.
3. Sampler
    
    > 예시: `Sampler: DPM++ 2M Karras`
    > 
    - 어떤 방식으로 샘플링을 할 것인지 정합니다.
    - DPM++ 2M Karras 혹은 DPM++ SDE Karras 가 최적의 선택입니다.
4. CFG scale
    
    > 예시: `CFG scale: 7`
    > 
    - 프롬프트를 얼마나 강하게 적용시킬 것인지를 정합니다.
    - 배경이나 2D 이미지는 7~8, 실사나 3D 이미지는 11 정도를 권장합니다.
5. Seed
    
    > 예시: `Seed: 1363903108`
    > 
    - 난수이자, 그림체 고정을 위한 변수입니다.
6. Size
    
    > 예시: `Size: 512x512`
    > 
    - 만들어지는 이미지의 사이즈 (px)을 정해줍니다.
7. Model hash
    
    > 예시: `Model hash: 7f96a1a9ca`
    > 
    - 사용되는 모델을 구분하기 위한 해쉬값입니다.
8. Model
    
    > 예시: `Model :AnythingV5V3_v5PrtRE`
    > 
9. Clip skip
    
    > 예시: `Clip skip: 2`
    > 
10. ENSD
    
    > 예시: `ENSD: 31337`
    > 
    - = Eta Noise Seed Delta
    - 쉽게 말해서 Seed가 +31337 만큼 바뀝니다.
11. ControlNet
    
    > 생성되는 이미지의 자세를 조정해주는 Extension에 대한 값입니다.
    > 
    - ControlNet Enabled: True
    - ControlNet Preprocessor: depth_midas
    - **ControlNet Model: controlnetPreTrained_depthV10 [400750f6]**
    - **ControlNet Weight: 0.8**
    - ControlNet Starting Step: 0
    - ControlNet Ending Step: 1
    - ControlNet Resize Mode: Resize and Fill
    - ControlNet Pixel Perfect: False
    - **ControlNet Control Mode: My prompt is more important**
    - ControlNet Preprocessor Parameters: "(512, 64, 64)"
    
    → 쉽게 말해서 저희는 특정 캐릭터의 다른 포즈를 보고 싶은 것이므로,
    최대한 값을 고정하고, 0.8의 가중치만 주고 이미지 손실을 최소화 하는 방향으로 진행합니다.
    

### 2. 문법 정리

> SD Webui, 즉 Latent SD를 기반으로 문법을 정리합니다. 타 모델과는 상이합니다.
> 
1. 가중치 배정
    - ( )
        - default : 1.1배의 + 가중치를 배정합니다.
            - ( 프롬프트 : 숫자 ) = 숫자만큼의 가중치를 배정합니다.
            - ex) (black hair: 1.3)
        - (( )) : 1.1 * 1.1 = 1.21 배의 가중치를 배정합니다.
        - ex) (black hair, (cur hair)) = 흑발 1.1배 + 곱슬 1.21배
    - [ ]
        - default: 0.9 배의 - 가중치를 배정합니다.
        - 세부 로직은 ( ) 와 동일합니다!
    - 프롬프트A | 프롬프트B
        - A 와 B를 번갈아가면서 반영합니다.
        - 10개의 이미지를 만든다고 했을 때, 홀수번째는 A를, 짝수번째는 B를 반영한 이미지 생성
    - 프롬프트A:프롬프트B:숫자(0~1)
        - A와 B 중에서 가중치를 조절합니다.
        - 숫자가 커질수록 앞의 가중치를 주게되고, 적을 수록 뒤의 가중치를 주게됩니다.
        - ex) young:old:0.2 → 프론트 혹은 백 단에서 스크롤을 통해 유연하게 값을 조정 가능 young : old = 8 : 2
2. 같은 분류에 속하는 것은 하나만 선택 가능
    - 예를 들어 헤어스타일에서 Long_hair을 선택하고 Twin tail을 선택했을 시,
        - 프롬프트에는 long hair, twin tail 이라고 들어갈 것.
        - 이 상황에서 Long hair의 pony tail을 선택하면 상충되는 상황.
        - 고로 **내부 로직**으로 선택할 수 없게 해야 함.

### 3. 지원 색상 배정

- 지원 색상 목록
    - 검은색: `black`
    - 파란색: `blue`
    - 갈색 : `brown`
    - 황금색 : `golden`
    - ~~금발(약간 자연스러움): `blonde`~~
    - 회색: `gray`
    - 초록색: `green`
    - 주황색: `orange`
    - 분홍색: `pink`
    - 보라색: `purple`
    - 빨간색: `red`
    - 흰색: `white`
    - 노란색: `yellow`

## 2. 각 부위 별 프롬프트

### 1. 헤어 스타일

> 값을 받을 때, 상위 값으로 Long hair / Short hair 로 분절 된다.
> 
> 
> Long hair — pony tail, … , twin tail : {{긴 머리}} 를 기반으로 {{하위 스타일}}
> 
> Short hair — pony tail, … , twin tail : {{짧은 머리}} 를 기반으로 {{하위 스타일}}
> 

```
(best quality), (masterpiece), (high resolution), hyper detail, ultra detailed face, Incredibly detailed hair,
**-> Long hair / Short hair : 둘중 하나만 반영**
**{{ 여기에 세부 헤어 스타일 들어옴 }}**
black hair, long hair, pony_tail
```

- 헤어 스타일 + 머리 길이 통합
    - 스트레이트: **`straight hair`**
    - 포니 테일: `pony tail`
        - long medium short는 생략 이후 다른 스타일 동일
    - 트윈 테일: `twin tail`
    - 사이드 테일: `side pony tail`
    - 곱슬 머리: `cur hair`
    - 헝클어진 머리: `messy hair`
    - 웨이브 머리: **`wavy hair`**
    - 히메컷: **`hime_cut`**
    - 드릴 머리: **`drill hair`**
    - 헤어 번: `hair bun`
    - 더블 번: `double bun hair style`
    - 땋은 머리: `b**raides**`
    - 양갈래 땋은 머리: **`twin braides`**
    - 드레드락: `(dreadlocks:1.3)`
- 3. 머리 색
    
    > 투톤 헤어도 가능. 
    색을 두 개 정하면 투톤 헤어
    > 
    > 
    > 색을 한 개 정하면 단색
    > 
    - 상위 색상과 동일. 두 개 까지 선정 가능
    - default : random
    

### 2. 얼굴 속성

> 현재로서는 [눈] 은 {{색깔}} 만 구현하고자 하고 있음
> 

```python
(best quality), (masterpiece), (high resolution), hyper detail, ultra detailed face, Incredibly detailed hair,
{{ 여기에 헤어 스타일 들어옴 }}

{{ 여기에 눈 색상 데이터 적어줌 default:random color eyes}}
```

- 1. 눈(홍체) 색상
    - 색상 내역 동일하게 진행. 오드아이는 이미지가 많이 뻑나서 고려 X
- 2. 표정
    - empty eyes	죽은 눈(더 심함)
        - + despair face	절망한 표정
    - heart in pupils	하트 눈
        - + ecstasy face	황홀한 표정
    - blush	홍조,부끄러운 표정
    - sad face	슬픈 표정
    - crying	우는 얼굴
        - + tears 눈물
    - bright face	해맑은 표정
        - smile	미소
    - angry face	화난 표정
    - evil face	사악한 표정
    - serious face	심각한 표정
    - shameful face	부끄러운 표정
    - sleepy face	졸린 표정
    

### 3. 기타 속성

> 종족을 배정하지 못하고 있는 Alpha 버전을 기준으로 작성합니다.
> 

```python
(best quality), (masterpiece), (high resolution), hyper detail, ultra detailed face, Incredibly detailed hair,
{{ 여기에 헤어 스타일 들어옴 }}

{{ 여기에 눈 색상 데이터 적어줌 default:random color eyes}}

{{ 여기에 특수 취향 넣어줌 }}
```

- 각 모에 속성을 나열하고 반영합니다. 종족적으로 반영하지 못하는 부분을 반영합니다.
    - 고양이 귀: `cat ears`
    - 사이버 펑크: **`cyberpunk`**
    - 수인: `Furry`
    - 프롬프트 사용해보면서 추후 추가…

### 4. 의상

> 간결한 의상 위주로 준비했습니다.
> 
> 
> 의상 세트를 제시하고, 색상을 선택할 수 있게 합니다.
> 
> “{{색상}} {{의상 이름}}”
> 
> ex) 메이드복 세트 → 핑크색 → 반영(pink maid uniform)
> 
> ex) 중세 기사 복장 → 초록색 → 반영(green plate armor)
> 
> ex) 드레스 → 검정색 → 반영(black dress)
> 

```python
(best quality), (masterpiece), (high resolution), hyper detail, ultra detailed face, Incredibly detailed hair,
{{ 여기에 헤어 스타일 들어옴 }}

{{ 여기에 눈 색상 데이터 적어줌 default:random color eyes}}

{{ 여기에 특수 취향 넣어줌 }}

{{ 여기에 의상 넣어줌 }}
```

- 0. 색상
    - 위와 동일하게 반영됩니다.
- 1. 의상 세트 종류
    - kimono: 기모노
    - plate armor: 갑옷
    - maid uniform: 메이드복
    - **formal school uniform: 교복 (위험하면 놉놉)**
    - **hanbok: 한복**
    - overalls, hard hat: 작업복 세트
    - shirt, jeans: 티셔츠 + 청바지
    - **military operator: 무장한 병사 (현대판)**
    - **hooded furry pajamas: 동물 파자마**
    - **tuxedo: 턱시도**
    - **wedding dress: 웨딩 드레스**
    - **sweatsuit: 운동복**
    - **police uniform: 경찰 제복**
    - **spacesuit: 우주복**
    - **trench coat: 트랜치 코트**
    - 프롬프트 사용해보면서 추후 추가…
    

### 5. 소품

> 의상과 안 맞는 소품일 경우 쉽지 않습니다.
> 
> 
> 손에 들고 있는 소품일 경우 손이 어그러질 위험이 있습니다.
> 
> 소품은 뭐… 여러 개 선택은 가능하지만, 추천은 하지 않습니다. 몇 개는 씹히기 때문에…
> 

```python
(best quality), (masterpiece), (high resolution), hyper detail, ultra detailed face, Incredibly detailed hair,
{{ 여기에 헤어 스타일 들어옴 }}

{{ 여기에 눈 색상 데이터 적어줌 default:random color eyes}}

{{ 여기에 특수 취향 넣어줌 }}

{{ 여기에 의상 넣어줌 }}

{{ 여기에 소품 넣어줌 }}
```

- 소품 종류
    - **sunglasses: 썬글라스**
    - **gloves: 장갑**
    - **earrings: 귀걸이**
    - **choker: 초커**
    - **wing: 날개**
    - **halo: 천사 링**
    - **hair ribbon: 헤어 리본**
    - **hair band: 헤어 밴드**
    - **fedora: 페도라(중절모)**
    - 프롬프트 사용해보면서 추후 추가…

## 3. 조건 별 기본 프롬프트 프리셋

> 기본적으로 넣어주면 퀄리티가 상승하고, 에러가 덜 납니다.
> 

### 1. 사람 초상화

(portrait:1.3),(best quality),(masterpiece),(high resolution),illustration,perfect_anatomy,perfect_finger,hyper detail,high quality, super detail,(finely detailed beautiful eyes and detailed face),ultra detailed cloths,solo

(nsfw:2), lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)),

### 2. 배경 화면

{extremely detailed CG unity 8k wallpaper}, {{{only background}}}, {{masterpiece}}, {{{best quality}}}, {{ultra-detailed}}, {best illustration}, {best shadow}, {{an extremely delicate and beautiful}}, {{{dynamic angle}}}, {{{glow white particles}}}, {{cinematic light}}, **high resolution illustration**, (high resolution), Incredibly detail, high quality, intricate details, hyper detailsuper detail, 

human, man, men, woman, 1girl, 2girls, 3girls, 4girls, 5girls, multiple girls, 1boy, 2boys, 3boys, 4boys, 5boys, multiple boys,

## 4. 예시 캐릭터 프리셋

> 원래는 각종 프롬프트를 반영해서 수정하게 하려고 했으나, Hyper Text 기능을 활용할 예정
> 

### 1. LoL / 아리 (반영도: 상)

> `ahri_league_of_legends,`
> 
> 
> ![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%B7%E1%84%91%E1%85%B3%E1%84%90%E1%85%B3%20%E1%84%83%E1%85%B5%E1%86%A8%E1%84%89%E1%85%A7%E1%84%82%E1%85%A5%E1%84%85%E1%85%B5%2084b8a4518a8241c4a7d67a411e3d65f8/Untitled.png)
> 
> - EXIF
>     
>     (portrait),(best quality),(masterpiece),(high resolution),(Extremely detailed and beautiful face),perfect anatomy,perfect finger,hyper detail,ultra detailed cloths,Incredibly detailed,
>     
>     **ahri_league_of_legends,**
>     
>     1girl,solo,
>     
>     short hair,black hair,cur hair,
>     
>     fox tail,fox ear,
>     
>     hanbok,
>     
>     Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))
>     
>     Steps: 13, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 1960455555, Size: 507x676, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE
>     

### 2. 강철의 연금술사 / 에드워드 에릭 (반영도 하)

> `Edward Elric Fullmetal Alchemist,`
> 
> 
> ![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%B7%E1%84%91%E1%85%B3%E1%84%90%E1%85%B3%20%E1%84%83%E1%85%B5%E1%86%A8%E1%84%89%E1%85%A7%E1%84%82%E1%85%A5%E1%84%85%E1%85%B5%2084b8a4518a8241c4a7d67a411e3d65f8/Untitled%201.png)
> 
> - EXIF
>     
>     (portrait),(best quality),(masterpiece),(high resolution),(Extremely detailed and beautiful face),perfect anatomy,perfect finger,hyper detail,ultra detailed cloths,Incredibly detailed,
>     
>     Edward Elric Fullmetal Alchemist,
>     
>     1boy,solo,
>     
>     Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))
>     
>     Steps: 13, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 1430793979, Size: 507x676, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE
>     

### 3. 이누야샤 / 이누야샤 (반영도 하)

> `inuyasha`
> 
> 
> ![Untitled](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%B7%E1%84%91%E1%85%B3%E1%84%90%E1%85%B3%20%E1%84%83%E1%85%B5%E1%86%A8%E1%84%89%E1%85%A7%E1%84%82%E1%85%A5%E1%84%85%E1%85%B5%2084b8a4518a8241c4a7d67a411e3d65f8/Untitled%202.png)
> 
> - EXIF
>     
>     (portrait),(best quality),(masterpiece),(high resolution),(Extremely detailed and beautiful face),perfect anatomy,perfect finger,hyper detail,ultra detailed cloths,Incredibly detailed,
>     
>     inuyasha,
>     
>     1boy,solo,
>     
>     long hair, white hair,
>     
>     hanbok,
>     
>     animal ears,
>     
>     Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))
>     
>     Steps: 13, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 2214400908, Size: 507x676, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE
>



# Stable Diffusion web UI
A browser interface based on Gradio library for Stable Diffusion.

![](screenshot.png)

## Features
[Detailed feature showcase with images](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features):
- Original txt2img and img2img modes
- One click install and run script (but you still must install python and git)
- Outpainting
- Inpainting
- Color Sketch
- Prompt Matrix
- Stable Diffusion Upscale
- Attention, specify parts of text that the model should pay more attention to
    - a man in a `((tuxedo))` - will pay more attention to tuxedo
    - a man in a `(tuxedo:1.21)` - alternative syntax
    - select text and press `Ctrl+Up` or `Ctrl+Down` to automatically adjust attention to selected text (code contributed by anonymous user)
- Loopback, run img2img processing multiple times
- X/Y/Z plot, a way to draw a 3 dimensional plot of images with different parameters
- Textual Inversion
    - have as many embeddings as you want and use any names you like for them
    - use multiple embeddings with different numbers of vectors per token
    - works with half precision floating point numbers
    - train embeddings on 8GB (also reports of 6GB working)
- Extras tab with:
    - GFPGAN, neural network that fixes faces
    - CodeFormer, face restoration tool as an alternative to GFPGAN
    - RealESRGAN, neural network upscaler
    - ESRGAN, neural network upscaler with a lot of third party models
    - SwinIR and Swin2SR ([see here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/2092)), neural network upscalers
    - LDSR, Latent diffusion super resolution upscaling
- Resizing aspect ratio options
- Sampling method selection
    - Adjust sampler eta values (noise multiplier)
    - More advanced noise setting options
- Interrupt processing at any time
- 4GB video card support (also reports of 2GB working)
- Correct seeds for batches
- Live prompt token length validation
- Generation parameters
     - parameters you used to generate images are saved with that image
     - in PNG chunks for PNG, in EXIF for JPEG
     - can drag the image to PNG info tab to restore generation parameters and automatically copy them into UI
     - can be disabled in settings
     - drag and drop an image/text-parameters to promptbox
- Read Generation Parameters Button, loads parameters in promptbox to UI
- Settings page
- Running arbitrary python code from UI (must run with `--allow-code` to enable)
- Mouseover hints for most UI elements
- Possible to change defaults/mix/max/step values for UI elements via text config
- Tiling support, a checkbox to create images that can be tiled like textures
- Progress bar and live image generation preview
    - Can use a separate neural network to produce previews with almost none VRAM or compute requirement
- Negative prompt, an extra text field that allows you to list what you don't want to see in generated image
- Styles, a way to save part of prompt and easily apply them via dropdown later
- Variations, a way to generate same image but with tiny differences
- Seed resizing, a way to generate same image but at slightly different resolution
- CLIP interrogator, a button that tries to guess prompt from an image
- Prompt Editing, a way to change prompt mid-generation, say to start making a watermelon and switch to anime girl midway
- Batch Processing, process a group of files using img2img
- Img2img Alternative, reverse Euler method of cross attention control
- Highres Fix, a convenience option to produce high resolution pictures in one click without usual distortions
- Reloading checkpoints on the fly
- Checkpoint Merger, a tab that allows you to merge up to 3 checkpoints into one
- [Custom scripts](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Custom-Scripts) with many extensions from community
- [Composable-Diffusion](https://energy-based-model.github.io/Compositional-Visual-Generation-with-Composable-Diffusion-Models/), a way to use multiple prompts at once
     - separate prompts using uppercase `AND`
     - also supports weights for prompts: `a cat :1.2 AND a dog AND a penguin :2.2`
- No token limit for prompts (original stable diffusion lets you use up to 75 tokens)
- DeepDanbooru integration, creates danbooru style tags for anime prompts
- [xformers](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Xformers), major speed increase for select cards: (add `--xformers` to commandline args)
- via extension: [History tab](https://github.com/yfszzx/stable-diffusion-webui-images-browser): view, direct and delete images conveniently within the UI
- Generate forever option
- Training tab
     - hypernetworks and embeddings options
     - Preprocessing images: cropping, mirroring, autotagging using BLIP or deepdanbooru (for anime)
- Clip skip
- Hypernetworks
- Loras (same as Hypernetworks but more pretty)
- A sparate UI where you can choose, with preview, which embeddings, hypernetworks or Loras to add to your prompt 
- Can select to load a different VAE from settings screen
- Estimated completion time in progress bar
- API
- Support for dedicated [inpainting model](https://github.com/runwayml/stable-diffusion#inpainting-with-stable-diffusion) by RunwayML
- via extension: [Aesthetic Gradients](https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients), a way to generate images with a specific aesthetic by using clip images embeds (implementation of [https://github.com/vicgalle/stable-diffusion-aesthetic-gradients](https://github.com/vicgalle/stable-diffusion-aesthetic-gradients))
- [Stable Diffusion 2.0](https://github.com/Stability-AI/stablediffusion) support - see [wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#stable-diffusion-20) for instructions
- [Alt-Diffusion](https://arxiv.org/abs/2211.06679) support - see [wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#alt-diffusion) for instructions
- Now without any bad letters!
- Load checkpoints in safetensors format
- Eased resolution restriction: generated image's domension must be a multiple of 8 rather than 64
- Now with a license!
- Reorder elements in the UI from settings screen

## Installation and Running
Make sure the required [dependencies](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies) are met and follow the instructions available for both [NVidia](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-NVidia-GPUs) (recommended) and [AMD](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-AMD-GPUs) GPUs.

Alternatively, use online services (like Google Colab):

- [List of Online Services](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Online-Services)

### Automatic Installation on Windows
1. Install [Python 3.10.6](https://www.python.org/downloads/windows/), checking "Add Python to PATH".
2. Install [git](https://git-scm.com/download/win).
3. Download the stable-diffusion-webui repository, for example by running `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git`.
4. Run `webui-user.bat` from Windows Explorer as normal, non-administrator, user.

### Automatic Installation on Linux
1. Install the dependencies:
```bash
# Debian-based:
sudo apt install wget git python3 python3-venv
# Red Hat-based:
sudo dnf install wget git python3
# Arch-based:
sudo pacman -S wget git python3
```
2. To install in `/home/$(whoami)/stable-diffusion-webui/`, run:
```bash
bash <(wget -qO- https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/webui.sh)
```
3. Run `webui.sh`.
### Installation on Apple Silicon

Find the instructions [here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon).

## Contributing
Here's how to add code to this repo: [Contributing](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Contributing)

## Documentation
The documentation was moved from this README over to the project's [wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki).

## Credits
Licenses for borrowed code can be found in `Settings -> Licenses` screen, and also in `html/licenses.html` file.

- Stable Diffusion - https://github.com/CompVis/stable-diffusion, https://github.com/CompVis/taming-transformers
- k-diffusion - https://github.com/crowsonkb/k-diffusion.git
- GFPGAN - https://github.com/TencentARC/GFPGAN.git
- CodeFormer - https://github.com/sczhou/CodeFormer
- ESRGAN - https://github.com/xinntao/ESRGAN
- SwinIR - https://github.com/JingyunLiang/SwinIR
- Swin2SR - https://github.com/mv-lab/swin2sr
- LDSR - https://github.com/Hafiidz/latent-diffusion
- MiDaS - https://github.com/isl-org/MiDaS
- Ideas for optimizations - https://github.com/basujindal/stable-diffusion
- Cross Attention layer optimization - Doggettx - https://github.com/Doggettx/stable-diffusion, original idea for prompt editing.
- Cross Attention layer optimization - InvokeAI, lstein - https://github.com/invoke-ai/InvokeAI (originally http://github.com/lstein/stable-diffusion)
- Sub-quadratic Cross Attention layer optimization - Alex Birch (https://github.com/Birch-san/diffusers/pull/1), Amin Rezaei (https://github.com/AminRezaei0x443/memory-efficient-attention)
- Textual Inversion - Rinon Gal - https://github.com/rinongal/textual_inversion (we're not using his code, but we are using his ideas).
- Idea for SD upscale - https://github.com/jquesnelle/txt2imghd
- Noise generation for outpainting mk2 - https://github.com/parlance-zz/g-diffuser-bot
- CLIP interrogator idea and borrowing some code - https://github.com/pharmapsychotic/clip-interrogator
- Idea for Composable Diffusion - https://github.com/energy-based-model/Compositional-Visual-Generation-with-Composable-Diffusion-Models-PyTorch
- xformers - https://github.com/facebookresearch/xformers
- DeepDanbooru - interrogator for anime diffusers https://github.com/KichangKim/DeepDanbooru
- Sampling in float32 precision from a float16 UNet - marunine for the idea, Birch-san for the example Diffusers implementation (https://github.com/Birch-san/diffusers-play/tree/92feee6)
- Instruct pix2pix - Tim Brooks (star), Aleksander Holynski (star), Alexei A. Efros (no star) - https://github.com/timothybrooks/instruct-pix2pix
- Security advice - RyotaK
- UniPC sampler - Wenliang Zhao - https://github.com/wl-zhao/UniPC
- Initial Gradio script - posted on 4chan by an Anonymous user. Thank you Anonymous user.
- (You)
