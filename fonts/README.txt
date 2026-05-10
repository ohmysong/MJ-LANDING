MAISON PRIVÉ – CUSTOM FONTS
────────────────────────────

이 폴더에 폰트 파일을 넣으면 자동 적용됩니다.

지원 형식: .woff2 (권장), .woff, .ttf, .otf

── 적용 방법 ──────────────────────────────────

1. 이 폴더에 폰트 파일 복사
   예: MPSerif-Light.woff2, MPSans-Regular.woff2 등

2. src/styles/fonts.css 파일 열기

3. 사용할 폰트에 해당하는 @font-face 블록의
   /* */ 주석을 제거하여 활성화

4. font-family 이름을 실제 파일에 맞게 수정

5. src/styles/globals.css 상단의 CSS 변수 수정:
   --font-serif: 'MPSerif', Georgia, serif;
   --font-sans:  'MPSans', sans-serif;

── 예시 파일명 구조 ──────────────────────────────

Serif (헤딩):
  MPSerif-Light.woff2
  MPSerif-LightItalic.woff2
  MPSerif-Regular.woff2
  MPSerif-Italic.woff2

Sans (본문/UI):
  MPSans-Light.woff2
  MPSans-Regular.woff2
  MPSans-Medium.woff2
  MPSans-SemiBold.woff2

──────────────────────────────────────────────────
Google Fonts 기본값: Cormorant Garamond + Montserrat
폰트 파일 없이도 온라인에서 정상 렌더링됩니다.
