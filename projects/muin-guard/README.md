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
