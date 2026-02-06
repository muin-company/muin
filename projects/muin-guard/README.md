# 무인가드 (MUIN Guard)

> 🛡️ AI 시대의 안랩 — 개인 무료, 기업 유료

[![Test](https://github.com/muin-company/muin/actions/workflows/test.yml/badge.svg)](https://github.com/muin-company/muin/actions)
[![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)](https://github.com/muin-company/muin/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 한 줄 요약

AI와 대화할 때 개인정보, API 키, 위험 명령어를 실시간으로 탐지하는 크롬 확장 프로그램.

**100% 로컬 저장 — 서버 전송 없음 — 프라이버시 보장**

---

## 🚀 Quick Start

### 방법 1: 직접 설치 (개발자용)

```bash
# 1. 저장소 클론
git clone https://github.com/muin-company/muin.git
cd muin/projects/muin-guard/extension

# 2. 크롬에서 로드
# chrome://extensions → 개발자 모드 ON → 압축해제된 확장 프로그램 로드
```

### 방법 2: 배포 패키지

1. [dist/muin-guard-v0.3.0.zip](dist/muin-guard-v0.3.0.zip) 다운로드
2. 압축 해제
3. `chrome://extensions` → 압축해제된 확장 프로그램 로드

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **실시간 탐지** | ChatGPT, Claude, Gemini 대화 자동 모니터링 |
| 🔐 **30+ 패턴** | 개인정보, API 키, 위험 명령어, 인젝션 공격 |
| 🧠 **AI 분석** | WebGPU LLM으로 더 정교한 분석 (선택) |
| 📊 **대시보드** | 대화 기록, 알림, 설정 관리 |
| 🔒 **100% 로컬** | 모든 데이터는 브라우저에만 저장 |

---

## 🎯 지원 플랫폼

- ✅ **ChatGPT** (chat.openai.com, chatgpt.com)
- ✅ **Claude** (claude.ai)
- ✅ **Gemini** (gemini.google.com)

---

## 🔍 탐지 패턴

### 개인정보
- 이메일, 전화번호, 신용카드 번호
- 주민등록번호, 여권번호
- 내부 IP 주소 (192.168.x.x, 10.x.x.x)

### API 키 & 시크릿
- OpenAI (`sk-...`)
- Anthropic (`sk-ant-...`)
- AWS (`AKIA...`)
- GitHub (`ghp_...`, `gho_...`)
- Stripe (`sk_live_...`, `pk_live_...`)
- Slack (`xox...`)
- JWT 토큰

### 위험 명령어
- `rm -rf /`, `DROP TABLE`, `DROP DATABASE`
- `chmod 777`, `sudo rm`, `mkfs`
- `dd if=... of=/dev/`

### 인젝션 공격
- SQL 인젝션 (`UNION SELECT`, `OR 1=1`)
- XSS (`<script>`, `javascript:`)
- Command 인젝션

### 의심스러운 URL
- 단축 URL (bit.ly, tinyurl 등)
- IP 주소 직접 접속
- 데이터 유출 경로

---

## 📁 프로젝트 구조

```
muin-guard/
├── extension/           # 크롬 확장
│   ├── manifest.json
│   ├── background.js
│   ├── content-scripts/
│   │   ├── chatgpt.js
│   │   ├── claude.js
│   │   └── gemini.js
│   ├── popup/
│   ├── dashboard/
│   ├── offscreen/       # WebGPU LLM
│   └── utils/
│       ├── detector.js
│       └── storage.js
├── landing/             # 랜딩 페이지
├── store/               # 웹스토어 자료
├── dist/                # 배포 패키지
└── research/            # 기술 조사
```

---

## 🧠 AI 분석 (WebGPU LLM)

무료 버전에서도 로컬 LLM 분석을 제공합니다.

1. 팝업에서 "AI 분석 활성화" 클릭
2. Llama Guard 3 (1B) 자동 다운로드 (~700MB)
3. 이후 모든 대화를 AI가 분석

**특징:**
- WebGPU로 브라우저 내 실행
- 서버 전송 없음
- 첫 로딩만 느리고 이후 캐싱

---

## 🛡️ 프라이버시

**우리는 사용자의 데이터를 수집하지 않습니다.**

- ✅ 모든 분석은 브라우저 내에서 실행
- ✅ 서버 전송 완전 차단
- ✅ 언제든 원클릭 데이터 삭제
- ✅ 오픈소스로 투명하게 공개

자세한 내용: [개인정보처리방침](store/privacy-policy.md)

---

## 📖 실전 예제

### 예제 1: 코드 리뷰 요청 시 API 키 노출 방지

**시나리오:** ChatGPT에 코드 리뷰를 부탁하다가 실수로 API 키 포함

**대화:**
```
나: 이 코드 리뷰 부탁해:

const stripe = require('stripe')('sk_live_51H...');
const payment = await stripe.charges.create({
  amount: 2000,
  currency: 'usd'
});
```

**무인가드 반응:**
```
⚠️ 경고: Stripe Live API Key 감지!

탐지 위치: 메시지 본문
패턴: sk_live_51H...
위험도: 🔴 높음

권장 조치:
1. 메시지 전송 취소
2. API 키를 환경변수로 교체
3. Stripe 대시보드에서 키 재발급
```

**결과:**
- ✅ 실수로 키 노출 방지
- ✅ 올바른 코딩 습관 학습
- ✅ 보안 사고 사전 차단

---

### 예제 2: 개인정보가 포함된 디버그 로그

**시나리오:** 에러 디버깅을 위해 로그를 복붙했는데 개인정보 포함

**대화:**
```
나: 이 에러 좀 봐줘:

Error: User registration failed
  at registerUser (auth.js:42)
  Request body: {
    email: "john.doe@company.com",
    phone: "010-1234-5678",
    ssn: "901234-1234567"
  }
```

**무인가드 반응:**
```
⚠️ 경고: 3개의 민감 정보 감지!

1. 이메일: john.doe@company.com (🟡 보통)
2. 전화번호: 010-1234-5678 (🟡 보통)
3. 주민등록번호: 901234-1234567 (🔴 높음)

권장 조치:
- 개인정보를 마스킹 후 재전송
- 예: email: "user@***.com", ssn: "******-*******"
```

**수정 후:**
```
나: 이 에러 좀 봐줘:

Error: User registration failed
  at registerUser (auth.js:42)
  Request body: {
    email: "user@***.com",
    phone: "010-****-****",
    ssn: "******-*******"
  }
```

**결과:** GDPR/개인정보보호법 위반 방지

---

### 예제 3: 위험한 명령어 질문

**시나리오:** 리눅스 명령어 관련 질문 중 실수로 위험 명령어 입력

**대화:**
```
나: 서버 정리하려는데 이 명령어 맞아?

sudo rm -rf / --no-preserve-root

디스크 용량 확보하려고 하는데...
```

**무인가드 반응:**
```
🚨 위험: 시스템 파괴 명령어 감지!

탐지: rm -rf /
위험도: 🔴 매우 높음

경고:
이 명령어는 전체 시스템을 삭제합니다!
절대 실행하지 마세요!

올바른 방법:
- 불필요한 파일만 삭제: find /tmp -mtime +7 -delete
- 로그 정리: journalctl --vacuum-time=7d
- 디스크 분석: du -sh /* | sort -h
```

**결과:** 실수로 서버 날리는 사고 방지

---

### 예제 4: SQL 쿼리 최적화 질문 중 인젝션 패턴

**시나리오:** SQL 쿼리 도움을 요청하다가 인젝션 취약점 노출

**대화:**
```
나: 이 쿼리가 느린데 어떻게 개선할까?

SELECT * FROM users 
WHERE email = '$userInput' OR 1=1--

성능이 안 좋아서 고민이야.
```

**무인가드 반응:**
```
⚠️ 경고: SQL Injection 패턴 감지!

탐지: OR 1=1--
공격 유형: Always-True Condition
위험도: 🔴 높음

보안 이슈:
이 쿼리는 SQL Injection 공격에 취약합니다.
모든 사용자 데이터가 노출될 수 있습니다.

안전한 방법:
- Prepared Statement 사용
- 예: WHERE email = ?
- ORM 사용 (Sequelize, TypeORM 등)
```

**수정 후:**
```
나: 이 쿼리가 느린데 어떻게 개선할까?

// Prepared statement 사용
const query = "SELECT * FROM users WHERE email = ?";
db.execute(query, [userInput]);

성능 개선 방법 알려줘.
```

**결과:** 보안 취약점 사전 차단 + 학습

---

### 예제 5: 회사 내부 정보 공유 실수

**시나리오:** 업무 관련 질문 중 내부 IP, 서버 정보 노출

**대화:**
```
나: 서버 연결이 안 되는데 도와줘:

Internal API: http://192.168.1.100:8080/api/v1/users
Database: mongodb://admin:password123@10.0.0.50:27017
AWS Key: AKIAIOSFODNN7EXAMPLE

연결이 timeout 나는데 왜 그럴까?
```

**무인가드 반응:**
```
🚨 심각: 4개의 민감 정보 감지!

1. 내부 IP 주소: 192.168.1.100 (🟡 보통)
2. 내부 IP 주소: 10.0.0.50 (🟡 보통)
3. DB 비밀번호: password123 (🔴 높음)
4. AWS Access Key: AKIA... (🔴 높음)

위험:
- 회사 네트워크 구조 노출
- 인증 정보 유출
- 외부 공격 가능성 증가

권장 조치:
1. 메시지 삭제
2. DB 비밀번호 즉시 변경
3. AWS 키 회전 (revoke & regenerate)
4. 정보를 마스킹 후 재질문
```

**수정 후:**
```
나: 서버 연결이 안 되는데 도와줘:

Internal API: http://[내부IP]:8080/api/v1/users
Database: mongodb://[사용자]:[비밀번호]@[IP]:27017

연결이 timeout 나는데 일반적인 원인이 뭘까?
```

**결과:** 회사 보안 정책 준수

---

### 예제 6: GitHub 토큰 복사 실수

**시나리오:** Git 설정 도움 요청 중 토큰 노출

**대화:**
```
나: GitHub Actions 설정이 안 되는데 이게 맞아?

env:
  GITHUB_TOKEN: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  NPM_TOKEN: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

워크플로우가 실패해.
```

**무인가드 반응:**
```
⚠️ 경고: 2개의 액세스 토큰 감지!

1. GitHub Personal Access Token (🔴 높음)
2. NPM Access Token (🔴 높음)

즉시 조치 필요:
1. GitHub 토큰 삭제:
   Settings → Developer settings → Personal access tokens → Revoke

2. NPM 토큰 회전:
   npm token revoke <token>

3. GitHub Actions Secrets 사용:
   Settings → Secrets → New repository secret

올바른 방법:
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**결과:** 토큰 유출 방지 + CI/CD 보안 학습

---

### 예제 7: AI 분석으로 미묘한 위험 탐지

**시나리오:** 정규표현식으로 잡히지 않는 미묘한 보안 이슈

**대화:**
```
나: 이 함수 어때?

function deleteUser(userId) {
  // 관리자가 모든 사용자 삭제 가능하도록
  if (req.user.role === "admin") {
    return db.users.delete({ id: userId });
  }
  // 본인 계정만 삭제 가능
  return db.users.delete({ id: req.user.id });
}
```

**무인가드 AI 분석:**
```
🧠 AI 분석 결과:

위험 요소 발견:
1. 권한 검증 로직 취약점
   - 관리자가 자기 자신을 삭제할 수 있음
   - 마지막 관리자 삭제 시 시스템 잠김

2. 권장 개선사항:
   - 관리자 삭제 전 카운트 체크
   - 본인 계정 삭제 시 2차 인증 요구
   - 삭제 대신 비활성화(soft delete) 고려

위험도: 🟡 보통
카테고리: 접근 제어
```

**결과:** 미묘한 로직 오류도 AI가 탐지

---

### 예제 8: 대시보드로 히스토리 관리

**시나리오:** 일주일 동안의 AI 대화 중 위험 패턴 리뷰

**대시보드 화면:**
```
📊 지난 7일간 활동

총 대화: 127개
탐지된 위험: 15건

위험 분류:
🔴 높음: 6건 (API 키 3, DB 비밀번호 2, 위험 명령어 1)
🟡 보통: 7건 (이메일 5, 내부 IP 2)
🟢 낮음: 2건 (단축 URL 2)

가장 많은 위험:
1. OpenAI API 키 (3회)
2. 이메일 주소 (5회)
3. 내부 IP (2회)

권장 조치:
- API 키는 .env 파일 사용 습관화
- 이메일은 예제용 더미 데이터 사용
```

**대시보드 기능:**
- 📅 날짜별 필터링
- 🔍 키워드 검색
- 📥 CSV 내보내기
- 🗑️ 전체 기록 삭제

**활용:**
- 보안 감사 자료로 사용
- 팀 보안 교육 자료
- 개인 보안 습관 개선

---

## 💡 사용 팁

### 개발자를 위한 팁

1. **`.env` 파일 습관화**
   - API 키는 항상 환경변수로
   - `.env.example` 만들어서 공유

2. **더미 데이터 사용**
   - 테스트 데이터: `user@example.com`, `010-0000-0000`
   - 실제 사용자 정보 절대 금지

3. **마스킹 습관**
   - 로그 공유 전 `***` 처리
   - 스크린샷 찍을 때도 확인

### 기업 사용자를 위한 팁

1. **팀 전체 설치 권장**
   - 보안 교육 툴로 활용
   - 실수 방지 효과 큰 폭 상승

2. **대시보드 정기 리뷰**
   - 주간 보안 회의 때 확인
   - 반복되는 위험 패턴 개선

3. **정책과 연계**
   - 무인가드 알림 = 보안 정책 위반 시그널
   - 교육 자료로 활용

---

## 🧪 테스트

```bash
cd extension/tests
node detector.test.js
```

---

## 📋 로드맵

- [x] MVP - ChatGPT 지원
- [x] Claude, Gemini 지원
- [x] WebGPU LLM 통합
- [x] 대시보드 UI
- [x] 30+ 탐지 패턴
- [ ] 크롬 웹스토어 출시
- [ ] Firefox 지원
- [ ] 기업용 대시보드

---

## 🏢 MUIN 소개

**무인기업(MUIN)** 은 AI로만 운영되는 실험적 기업입니다.

- **슬로건:** 일하는 AI, 누리는 인간
- **웹사이트:** https://muin.company
- **블로그:** https://blog.muin.company
- **GitHub:** https://github.com/muin-company

---

## 📄 라이선스

MIT License

---

## 🤝 기여

이슈와 PR을 환영합니다!

1. Fork
2. Feature branch 생성
3. Commit
4. Push
5. PR 생성

---

*Built with 🛡️ by MJ @ MUIN*
