# 04. 인수인계

작성일: 2026-09-29

## 주소
| 항목 | 값 |
|---|---|
| GitHub 리포 | https://github.com/user59371474/claude1 (private) |
| Cloudflare Worker | `claude1` |
| 운영 URL | https://claude1.user59371474.workers.dev |
| 운영 브랜치 | `main` (push하면 자동 배포) |

> 커스텀 도메인을 연결하면 `src/data/site.ts`의 `url`을 새 주소로 바꾸고 다시 배포해야 sitemap·OG·canonical 주소가 맞춰진다.

## Cloudflare 연결 (최초 1회, 직접)
1. Cloudflare 대시보드 → Workers & Pages → `claude1` Worker (없으면 Create → Import a repository)
2. Settings → Build → **Connect** → GitHub에서 `user59371474/claude1` 선택
3. 설정값
   - Branch: `main`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. 저장 후 첫 빌드가 끝나면 운영 URL 확인

## 수정 방법
| 바꾸고 싶은 것 | 파일 |
|---|---|
| 작업 추가·수정 | `src/data/works.ts` (배열 맨 앞에 추가) |
| 작업 이미지 | `src/assets/work/kdj-<번호>-cover.webp` (정사각), `-01.webp`, `-02.webp` (16:9 권장) |
| 메인 대표작 | `works.ts`에서 `featured: true`, 이미지 `src/assets/work/feature.webp` |
| 이메일·인스타·도메인 | `src/data/site.ts` |
| 색·폰트·간격 | `src/styles/tokens.css` (여기만 수정) |
| 소개 문구·클라이언트 | `src/pages/info.astro` |

이미지는 JPG/PNG를 넣어도 빌드할 때 WebP로 자동 변환·리사이즈된다. 파일 이름만 규칙대로 맞추면 된다.

## 배포 방법
- Claude Code에서 수정 후 `/deploy` 한 줄 → 한국어 커밋 → main push → 1~2분 뒤 반영
- 직접 할 때: `git add -A && git commit -m "변경 내용" && git push origin main`

## 비밀값
현재 없음 (서버 기능 없는 정적 사이트). 나중에 생기면 이름만 여기에 기록하고 값은 `npx wrangler secret put <이름>`으로 등록.

## 아직 임시인 값
- 이메일 `hello@kimdongjunai.com`, 인스타그램 주소 (`src/data/site.ts`)
- 작업 12개의 이름·클라이언트·역할 (`src/data/works.ts`)
- 모든 작업 이미지 (임시 그래픽, `npm run images`로 생성)

## 배포 전 체크리스트 (2026-09-29 로컬 점검)
| 항목 | 결과 |
|---|---|
| 반응형 375 / 768 / 1280px | 통과 — 모든 페이지 가로 넘침 없음, 터치 영역 44px 이상 |
| 링크·동작 | 통과 — 분야 필터, 그리드·목록 전환, 모바일 메뉴(ESC 닫기·포커스 가둠), 이메일 복사, 이전/다음 작업 |
| 폼 | 해당 없음 (폼 없음) |
| 404 | 통과 — 없는 주소에서 404 상태 코드와 전용 페이지 (`not_found_handling: 404-page`) |
| OG | 통과 — 모든 페이지 og:title/description/image(1200×630 PNG). 운영 URL 확정 후 카카오톡 공유로 한 번 더 확인 필요 |
| SEO | 페이지별 title/description, canonical, sitemap.xml, robots.txt, 파비콘 |
| 이미지 | WebP + srcset, 첫 화면 외 lazy loading, 모든 이미지 alt |
| 비밀값 | 없음 — .env/.dev.vars 없음, 키·토큰 패턴 검사 통과, .gitignore 적용 |
