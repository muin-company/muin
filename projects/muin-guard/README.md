# 무인가드 (MUIN Guard)

> 🛡️ AI 시대의 안랩 — 개인 무료, 기업 유료

[![Test](https://github.com/muin-company/muin/actions/workflows/test.yml/badge.svg)](https://github.com/muin-company/muin/actions)

## 한 줄 요약

AI 에이전트의 행동을 감시하고, 위험을 탐지하고, 사용자를 보호하는 크롬 확장 프로그램.

## 🚀 Quick Start

```bash
# 1. 저장소 클론
git clone https://github.com/muin-company/muin.git
cd muin/projects/muin-guard/extension

# 2. 크롬에서 로드
# chrome://extensions → 개발자 모드 → 압축해제된 확장 프로그램 로드
```

## ✨ 주요 기능

- **실시간 모니터링**: ChatGPT, Claude 대화 자동 감지
- **위험 탐지**: 개인정보, API 키, 위험 명령어 탐지
- **100% 로컬**: 모든 데이터는 브라우저에만 저장 (서버 전송 없음)
- **AI 분석 (선택)**: WebGPU LLM으로 더 정교한 분석
- **대시보드**: 대화 기록, 알림, 설정 관리

## 왜 필요한가?

AI 에이전트가 점점 더 많은 권한을 갖게 됨:
- 이메일 전송
- 결제
- 파일 접근
- 외부 API 호출

**문제:** 사용자는 AI가 실제로 뭘 했는지 모름.

**해결:** 무인가드가 모든 행동을 로깅하고, 위험 패턴을 탐지하고, 알려줌.

---

## 제품 라인업

### 1. 개인용 (무료)

**MUIN Guard - Chrome Extension**

- ChatGPT, Claude, Gemini 등 AI 대화 로깅
- 위험 패턴 탐지 & 알림
  - 개인정보 노출 시도
  - 의심스러운 URL/코드
  - 비정상적 요청 패턴
- 대시보드에서 히스토리 확인
- 로컬 저장 (프라이버시)

**목표:**
- 인지도 구축
- 사용자 피드백 수집
- 기업 고객 유입 경로

### 2. 기업용 (유료)

**MUIN Guard Enterprise**

- 전사 AI 에이전트 통합 모니터링
- 실시간 위험 탐지 & 자동 차단
- 컴플라이언스 리포트 (감사용)
- 정책 설정 (이건 허용, 저건 차단)
- SSO, 팀 관리
- SLA & 지원

**가격 (가설):**
- Team: $20/user/month
- Enterprise: 협의

### 3. 부가 서비스

**레드팀 서비스**
- 고객사 AI 시스템 취약점 테스트
- "당신의 AI 뚫어볼게요"
- 프로젝트 단위 과금

**컨설팅**
- AI 도입 시 안전 체크리스트
- 정책 수립 지원

---

## 기술 스택 (MVP)

### Chrome Extension

```
/muin-guard-extension
├── manifest.json       # Manifest V3
├── background.js       # Service Worker
├── content.js          # 페이지 인젝션
├── popup/              # 팝업 UI
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── dashboard/          # 대시보드 (로컬)
└── utils/
    ├── logger.js       # 대화 로깅
    ├── detector.js     # 위험 탐지
    └── storage.js      # 로컬 저장
```

### 탐지 패턴 (v1)

1. **개인정보 노출**
   - 이메일, 전화번호, 주소, 카드번호 패턴
   - AI 응답에 포함 시 경고

2. **의심스러운 URL**
   - 알려진 피싱/악성 도메인
   - 단축 URL 경고

3. **위험 코드**
   - 시스템 명령어 (rm -rf, format 등)
   - 네트워크 요청 코드

4. **권한 상승 시도**
   - "모든 파일 접근", "관리자 권한" 등 키워드

---

## 로드맵

### Phase 1: MVP (2주)
- [ ] 크롬 확장 기본 구조
- [ ] ChatGPT 대화 로깅
- [ ] 기본 위험 탐지 (정규식)
- [ ] 로컬 대시보드

### Phase 2: 확장 (1개월)
- [ ] Claude, Gemini 지원
- [ ] 탐지 패턴 고도화
- [ ] 알림 시스템
- [ ] 크롬 웹스토어 배포

### Phase 3: 기업용 (2-3개월)
- [ ] 클라우드 동기화 (opt-in)
- [ ] 팀 대시보드
- [ ] 정책 설정
- [ ] 결제 시스템

---

## 경쟁 분석

| 경쟁자 | 설명 | 차별점 |
|--------|------|--------|
| 없음 (직접 경쟁) | AI 에이전트 감시 전문 없음 | 선점 기회 |
| DLP 솔루션 | 전통적 데이터 유출 방지 | AI 특화 아님 |
| AI 플랫폼 내장 | OpenAI, Anthropic 자체 로깅 | 사용자 통제 아님, 크로스 플랫폼 아님 |

---

## 이름 후보

1. **무인가드 (MUIN Guard)** ← 현재 1순위
2. 무인워치 (MUIN Watch)
3. 가디언 (Guardian)
4. AI 파수꾼

---

## 다음 단계

1. [ ] 이름 확정
2. [ ] 크롬 확장 MVP 개발 시작
3. [ ] 랜딩 페이지 제작
4. [ ] 사업 계획서 업데이트

---

*Created: 2026-02-02*
