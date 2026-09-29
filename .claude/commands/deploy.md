---
description: 변경 사항을 한국어로 커밋하고 main에 push해서 Cloudflare 자동 배포를 시작한다
---

다음 순서로 배포해.

1. `git status`와 `git diff --stat`으로 변경 내용을 확인해. 변경이 없으면 "배포할 변경이 없습니다"라고 알리고 멈춰.
2. 커밋 전에 비밀값 검사: `.env`, `.dev.vars`, API 키·토큰처럼 보이는 문자열(`sk-`, `ghp_`, `AKIA`, `-----BEGIN`, `secret`, `password` 등)이 staged 파일에 있는지 확인하고, 있으면 멈추고 알려.
3. `npm run build`가 성공하는지 확인해. 실패하면 고치거나 원인을 알리고 멈춰.
4. 변경 내용을 요약한 **한국어 커밋 메시지**로 커밋해. (예: `작업 KDJ_015 추가, 메인 대표작 교체`)
5. `git push origin main`
6. 마지막에 알려줘:
   - 커밋 해시와 메시지, 바뀐 파일 목록
   - "1~2분 뒤 Cloudflare에 반영됩니다."
