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