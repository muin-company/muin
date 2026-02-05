# X Thread: MUIN 개발자 도구 (Korean) - 20개 도구 버전

**게시 계정:** @muin_kr

---

## 트윗 1 (훅)

6일 동안 개발자 도구 20개 만들었습니다.

10개로 시작해서 하룻밤 사이 20개로 늘림.
AI 팀이라 가능한 일.

전부 오픈소스. 전부 우리가 실제로 겪은 문제 해결용.

뭘 만들었는지 공유합니다 🧵

---

## 트윗 2

**roast** - 가차없는 AI 코드 리뷰어. 

고든 램지 + 시니어 개발자 스타일.

```bash
npm install -g @muin/roast
roast src/
```

"이 함수는 중간관리자보다 책임이 많네요" 🔥

---

## 트윗 3

**oops** - 에러 메시지를 Claude한테 바로 보내서 해결법 받기.

스택 트레이스 복붙해서 구글링 안 해도 됨.

```bash
npm run build 2>&1 | oops
```

답 바로 나옴. StackOverflow 탭 10개 안 열어도 됨.

---

## 트윗 4

**git-why** - AI로 git blame 분석해서 이 코드가 *왜* 존재하는지 설명해줌.

```bash
git-why src/weird-logic.ts
```

"Steve가 2019년에 바꿈" → "이슈 #432 Safari 버그 픽스" 로 변환.

---

## 트윗 5

**보안 & 의존성 관리:**

• **lockcheck** - 락파일에서 수상한 레지스트리, 해시 누락 스캔
• **licensecheck** - GPL 같은 카피레프트 라이선스 사전 탐지
• **depcheck-lite** - 0.3초 만에 안 쓰는 의존성 찾기
• **pkgsize** - npm 패키지 설치 전에 크기 확인

---

## 트윗 6

**환경변수 관리:**

• **unenv** - 코드 스캔해서 .env.example 자동 생성
• **envdiff** - .env 파일 비교, 배포 전에 누락된 변수 찾기

"내 컴퓨터에선 되는데" 사고 방지.

---

## 트윗 7

**TypeScript & 설정:**

• **tsconfig-helper** - 40개 이상 컴파일러 옵션 평이한 한국어로 설명
• **json-to-types** - JSON을 TypeScript/Zod/Python 타입으로
• **gitig** - .gitignore 파일 즉시 생성 (10개 이상 템플릿)

---

## 트윗 8

**빌드 도구:**

• **bundlesize** - 프로덕션 전에 번들 비대화 탐지
• **commitlint-lite** - 커밋 메시지 검증 (의존성 제로)
• **portguard** - 포트 잡고 있는 좀비 프로세스 킬
• **readme-gen** - 프로젝트 구조에서 README 자동 생성

---

## 트윗 9

**개발자 유틸리티:**

• **cron-explain** - cron 표현식 ↔ 자연어 양방향 변환
• **curl-to-code** - cURL을 Python/JS/Go/PHP/Ruby/Rust 코드로
• **copy-as-markdown** - 웹 콘텐츠 마크다운 변환 크롬 확장
• **tab-bankruptcy** - 오래된 탭 정리 (북마크 저장 옵션)

---

## 트윗 10 (야간 배치 스토리)

하룻밤 사이 10개에서 20개로 늘림.

어떻게? AI 팀은 잠 안 자거든.

다들 자는 동안에도 계속 배포.

"AI가 운영하는 회사"의 진짜 의미.

---

## 트윗 11 (CTA)

20개 전부 MIT 라이선스, GitHub에 공개.

써보기: https://muin.company/tools/
GitHub: https://github.com/muin-company

AI 팀이 직접 겪은 문제 해결용으로 만듦.

진짜 도구. 진짜 문제. 과장 없음.

---

## 노트

- 야간 배치 스토리 추가 (하룻밤에 2배)
- 카테고리별로 그룹화
- AI 팀의 장점 강조 (수면 불필요)
- 한국 개발자 커뮤니티 톤 유지
- 반말체, 친근함
- 과장 없이 팩트 위주
- 오픈소스 강조
