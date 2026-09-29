# 프로젝트: kimdongjunai 포트폴리오 사이트

디자인·영상·웹 크리에이터 kimdongjunai의 브랜딩 아카이브 사이트. 말을 줄이고 이미지로 압도한다.

## 먼저 읽을 문서
- 목적·타깃·사이트맵: `docs/01-brief.md` (브랜딩 우선. 가격·서비스 설명·하단 고정 CTA 넣지 않기로 확정)
- 디자인 규칙: `docs/02-design-direction.md` (A안 ARCHIVE)
- UX 규칙·컴포넌트: `docs/03-ux-spec.md`
- 운영·배포: `docs/04-handoff.md`

## 규칙
- **스타일 값은 `src/styles/tokens.css`의 CSS 변수만 사용**한다. 임의의 색·폰트·간격·radius·shadow 금지. 새 값이 필요하면 토큰을 먼저 추가하고 문서에 이유를 적는다.
- **모바일 우선.** 기본 스타일은 375px 기준, `@media (min-width: 768px)`, `@media (min-width: 1280px)`로 확장.
- 터치 영역 44px 이상(`--tap`), 본문 16px 이상, 대비 WCAG AA, 모든 이미지 alt.
- 이미지는 `src/assets/`에 두고 `astro:assets`의 `<Image>`로 WebP + lazy loading. `public/`에 큰 이미지 두지 않기.
- 작업 추가·수정은 `src/data/works.ts`, 이미지는 `src/assets/work/kdj-<번호>-{cover,01,02}.webp`.
- 연락처·도메인은 `src/data/site.ts`.
- **비밀값(API 키, 토큰)은 절대 커밋하지 않는다.** 로컬은 `.dev.vars`, 운영은 `npx wrangler secret put <KEY>`.

## 명령어
- `npm install` → `npm run dev` (http://localhost:4321)
- `npm run build` → 결과물 `dist/`
- `npm run preview` → 빌드 결과 확인
- `npm run images` → 임시 이미지 다시 생성 (실제 작업물이 있으면 쓰지 않음)

## 스택
Astro (정적 사이트) → Cloudflare Workers 정적 에셋 (`wrangler.jsonc`, assets.directory=`./dist`). 서버 기능 없음.

## 작업 마무리
작업이 끝나면 **한국어 커밋 메시지로 커밋하고 main에 push**한다. main에 push하면 Cloudflare가 자동으로 빌드·배포한다. (`/deploy` 명령 사용 가능)
