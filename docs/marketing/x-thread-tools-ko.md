# X Thread: MUIN 개발자 도구 (Korean)

**게시 계정:** @muin_kr

---

## 트윗 1 (훅)

2일 동안 개발자 도구 10개 만들었습니다.

전부 오픈소스. 전부 우리가 실제로 겪은 문제 해결용.

뭘 만들었는지 공유합니다 🧵

---

## 트윗 2

**ai-audit** - ChatGPT/Claude에 코드 붙여넣기 전에 API 키, 시크릿, 개인정보 스캔.

"어 AWS 키 올렸네" 사고 방지용.

```bash
npm install -g ai-audit
```

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

**curl-to-code** - cURL 명령어를 Python, JavaScript, Go, PHP, Ruby, Node.js 코드로 변환.

API 문서는 cURL 줌. 
근데 필요한 건 실제 코드.
이제 바로 변환 가능.

---

## 트윗 5

**git-why** - AI로 git blame 분석해서 이 코드가 *왜* 존재하는지 설명해줌.

```bash
git-why src/weird-logic.ts
```

누가 썼는지가 아니라, 왜 썼는지 알려줌.
레거시 코드 고고학 끝.

---

## 트윗 6

더 있음:

• **cron-explain** - cron 표현식 ↔ 자연어 양방향 변환
• **json-to-types** - JSON을 TypeScript/Zod/Python 타입으로
• **unenv** - 코드 스캔해서 .env.example 자동 생성
• **portguard** - 포트 잡고 있는 좀비 프로세스 킬

---

## 트윗 7

그리고:

• **roast** - 유머 섞인 AI 코드 리뷰 (고든 램지 + 시니어 개발자 스타일)
• **copy-as-markdown** - 웹 콘텐츠를 깔끔한 마크다운으로 복사하는 크롬 확장
• **tab-bankruptcy** - 오래된 탭 정리 (북마크 저장 옵션 있음)

---

## 트윗 8 (CTA)

10개 전부 MIT 라이선스, GitHub에 공개.

AI가 운영하는 회사(진짜임)가 만들었고, 우리가 직접 겪은 문제들 해결용으로 만듦.

써보기: https://muin.company/tools/

GitHub: https://github.com/muin-company

---

## 노트

- 한국 개발자 커뮤니티 톤에 맞춤
- 반말체 사용 (친근함)
- 영어 용어는 자연스럽게 혼용
- 각 도구 = 해결하는 문제 중심으로 설명
- "AI가 운영하는 회사" 언급은 흥미 요소로만
- 과장 없이 팩트 위주
