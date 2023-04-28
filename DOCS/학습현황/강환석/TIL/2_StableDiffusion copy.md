# 2. Stable Diffusion 을 활용한 이미지 생성
> SD Webui의 기본 화면을 보도록 하자. 여기에 나온 각각의 가중치를 설명하도록 하겠다.
> 
> 
> <img src=".\asset\CNN_9.png" width="500" >
> 

## 2-1. 프롬프트
> 생성하고자 하는 이미지를 설명하는 명령어다.
> 
> - 예시
>     <img src=".\asset\CNN_11.png" width="500" >
> 
>     
>     (best quality), (masterpiece), (high resolution), (1boy:1.3), (Extremely detailed and beautiful face:1.5), perfect anatomy, (full body shot:1.5), hyper detail, ultra detailed cloths, Incredibly detailed, red upper reather wear, sword, red hair, short cut hair, silver plate armor, blue jean, blue eyes
>     
>       ==============================================
>
>     Negative prompt: lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))
>     
>       ==============================================
>
>     Steps: 20, Sampler: DPM++ SDE Karras, CFG scale: 7, Seed: 3120790884, Size: 512x512, Model hash: 7f96a1a9ca, Model: AnythingV5V3_v5PrtRE
>     
>
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
        
        <img src=".\asset\CNN_15.png" width="200" height="200">
        
        이 드레드락 헤어스타일을 보자. 노란색 드레드락, 그것도 흑인으로만 학습되어있던 것 같다.
        
        <img src=".\asset\CNN_16.png" width="500" >
        
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
> <img src=".\asset\CNN_10.png" width="100" >
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
        
        <img src=".\asset\CNN_12.png" width="500" >
        
    - 이를 활용하면, 특정 변수만 변경하여 다른 느낌을 줄 수 있다.
        
        <img src=".\asset\CNN_13.png" width="500" >
        
    - 조금 더 활용하면 표정을 바꾸는 식으로 활용 가능하다.
        
        <img src=".\asset\CNN_14.gif" width="300" >