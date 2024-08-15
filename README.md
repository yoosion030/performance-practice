# 성능 측정 개선 사후 보고서

<table>
    <tr>
        <td style="font-size: 20px">AS-IS</td> 
        <td style="font-size: 20px">TO-BE</td>
    </tr>
    <tr>
        <td>
            <img src="./report/ALL_AS_IS.png" width="500px" height="300px" />
        </td>
        <td>
            <img src="./report/ALL_TO_BE.png" width="500px" height="300px" />
        </td>
    </tr>
</table>

- First Contentful Paint(FCP): 1.9초 → 0.8초
- Largest Contentful Paint(LCP): 16.4초 → 2.2초
- Total Blocking Time(TBT): 910밀리초 → 0밀리초
- Cumulative Layout Shift(CLS): 0.516 → 0.001
- Speed Index: 2.7초 → 2.0초

## 성능

### 1. 렌더링 차단 리소스 제거

리소스가 페이지의 첫 페인트를 차단하고 있습니다. 중요한 JS/CSS를 인라인으로 전달하고 중요하지 않은 모든 JS/Style을 지연하는 것이 좋습니다.

개선 방식:
- GTM script async 속성 지정
- cookie consent script defer 속성 지정
- font script local font로 변경



### 2. 차세대 형식 이미지 지원 및 이미지 압축

WebP 및 AVIF와 같은 이미지 형식은 PNG나 JPEG보다 압축률이 높기 때문에 다운로드가 빠르고 데이터 소비량도 적습니다.

개선 방식:

- jpg 형식의 이미지를 차세대 형식인 webp 형식으로 변경하였음
- 이미지 파일 압축 및 viewport 만큼 이미지 크기 조정

리소스 2,300 KiB 절감 00% 개선

<table>
    <tr>
        <td style="font-size: 16px">AS-IS</td> 
        <td style="font-size: 16px">TO-BE</td>
    </tr>
    <tr>
        <td>
            <img src="./report/WEBP_AS_IS.png" />
        </td>
        <td>
            <img src="./report/WEBP_TO_BE.png" />
        </td>
    </tr>
</table>

### 3. 오프스크린 이미지 지연 로드

중요한 리소스의 로드가 모두 완료된 후에는 오프스크린 및 숨겨진 이미지를 지연 로드함으로써 상호작용 시작 시간을 줄이는 것이 좋습니다.

개선 방식: source 태그의 media 속성을 선언하여 특정 화면에 맞는 이미지만 불러오도록 변경  
LCP 16.4 초 -> 2.9 초 단축

```html
<picture>
  <source
    width="576"
    height="576"
    media="(max-width: 575px)"
    srcset="images/Hero_Mobile.webp"
  />
  <source
    width="960"
    height="770"
    media="(min-width: 576px) and (max-width: 960px)"
    srcset="images/Hero_Tablet.webp"
  />
  <img width="1920px" height="893px" src="images/Hero_Desktop.webp" />
</picture>
```

### 5. 이미지 크기 지정 & 대규모 레이아웃 시프팅 현상 해결

## 접근성 & 검색엔진 최적화

### 1. 제목 요소를 내림차순으로 표시

> 문서에서 heading 태그는 내림차순으로 표시되어야 하며 또한 건너뛰는 단계 없이 순차적으로 나타내야 합니다. ([참고자료](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Heading_Elements))

개선 방식: 각 정보에 맞는 마크업을 내림차순으로 표시
접근성 점수 82점 -> 94점 00% 개선

<table>
    <tr>
        <td style="font-size: 16px">AS-IS</td> 
        <td style="font-size: 16px">TO-BE</td>
    </tr>
    <tr>
        <td>
            <h5>h5</h5>
            <h4>h5</h4>
            <h3>h3</h3>
        </td>
        <td>
            <p>p</p>
            <h2>h2</h2>
            <p>p</p>
        </td>
    </tr>
</table>

### 2. 이미지 alt 속성 지정

> alt 속성은 사용자가 느린 네트워크 환경이나 src 속성값의 오류, 시각 장애인용 스크린 리더의 사용 등 어떤 이유로든 사용자가 이미지를 볼 수 없을 때 이미지 대신 제공할 대체 정보를 제공합니다. 이미지 정보를 제공하는 역할로 alt 속성은 접근성과 검색엔진을 위해 지정해야 합니다. ([참고자료](https://accessibility.naver.com/acc/guide_01))

접근성 점수 82점 -> 94점 00% 개선  
검색엔진 최적화 점수 82점 -> 92점 00% 개선

### 3. 메타 설명 추가

> `<meta name="description">` 요소는 검색엔진이 검색결과에 포함하는 페이지 콘텐츠의 요약을 제공합니다. 고품질의 고유한 메타 설명을 사용하면 페이지의 관련성을 높이고 검색 트래픽을 늘릴 수 있습니다. ([참고자료](https://developer.chrome.com/docs/lighthouse/seo/meta-description?utm_source=lighthouse&utm_medium=lr&hl=ko))

개선 방식: 서비스를 설명을 서술적으로 meta 정보에 추가  
검색엔진 최적화 점수 92점 -> 100점 00% 개선

```html
<meta
  name="description"
  content="Discover top-quality VR headsets from leading brands. 
    Shop our best-selling virtual reality devices for immersive gaming and entertainment experiences."
/>
```

### 4. 백그라운드 및 포그라운드 색상의 대비율 조정

> 글자색과 배경색의 대비가 떨어져 가독성에 문제가 생길 수 있다.

개선 방식: [색상 대비 분석기 사이트](https://dequeuniversity.com/rules/axe/4.9/color-contrast)에서 백그라운드에 맞는 대비 색상을 찾아 수정  
접근성 점수 92점 -> 100점 00% 개선

<table>
    <tr>
        <td style="font-size: 16px">AS-IS</td> 
        <td style="font-size: 16px">TO-BE</td>
    </tr>
    <tr>
        <td>
            <img src="./report/COLOR_AS_IS.png" width="700px" height="500px"/>
        </td>
        <td>
            <img src="./report/COLOR_TO_BE.png" width="700px" height="500px"/>
        </td>
    </tr>
</table>
