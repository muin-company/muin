# Changelog

All notable changes to MUIN Guard will be documented in this file.

## [0.3.0] - 2026-02-02

### Added
- **Gemini 지원** - gemini.google.com 모니터링
- ChatGPT content script 다중 selector 지원 (UI 변경 대응)

### Changed
- 배포 패키지 크기 최적화 (45KB)

## [0.2.0] - 2026-02-02

### Added
- **WebGPU LLM 통합**
  - Offscreen Document로 브라우저 내 AI 실행
  - Llama Guard 3 (1B) 지원
  - 팝업에서 원클릭 활성화
  
- **대시보드 UI**
  - 개요, 대화기록, 알림, 설정 4개 페이지
  - 반응형 디자인
  
- **탐지 패턴 대폭 확장** (30개+)
  - AWS, GitHub, OpenAI, Anthropic, Stripe, Slack 키
  - JWT 토큰
  - SQL/XSS/Command 인젝션
  - 추가 위험 명령어 (chmod 777, sudo rm, mkfs, dd)

- **테스트 자동화**
  - 13개 단위 테스트
  - GitHub Actions CI

- **배포 준비**
  - 크롬 웹스토어 설명
  - 개인정보처리방침
  - 랜딩 페이지
  - 아이콘 PNG (16/48/128px)

## [0.1.0] - 2026-02-02

### Added
- 초기 릴리즈
- **ChatGPT 지원** (chat.openai.com, chatgpt.com)
- **Claude 지원** (claude.ai)
- 기본 위험 탐지 (정규식)
  - 이메일, 전화번호, 신용카드
  - API 키, 비밀번호
  - rm -rf, DROP TABLE
- 팝업 UI
- 로컬 스토리지 저장
- 데스크톱 알림

---

## 버전 규칙

- **Major (X.0.0)**: 호환되지 않는 API 변경
- **Minor (0.X.0)**: 새 기능 추가 (하위 호환)
- **Patch (0.0.X)**: 버그 수정
