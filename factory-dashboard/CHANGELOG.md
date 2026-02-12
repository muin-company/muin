# Changelog

## [2.0.0] - 2026-02-13

### ✨ Added
- **실시간 서브에이전트 상태 표시 개선**
  - 세션별 토큰 사용량 상세 표시 (Input/Output/Context)
  - 세션별 비용 계산 및 표시
  - 타입별 아이콘 & 색상 구분 강화
  
- **태스크 큐 시각화**
  - 활성 서브에이전트 목록 표시
  - 태스크 상태 실시간 업데이트
  - 활성/대기 태스크 시각적 구분 (애니메이션)
  
- **비용/토큰 추적 UI**
  - 입력/출력 토큰 집계
  - 실시간 비용 계산 (Claude Opus 4.5: $15/1M input, $75/1M output)
  - 세션별 비용 breakdown
  - 비용 임계치별 색상 구분 (High/Medium/Low)
  
- **통계 카드 확장**
  - Total Cost (USD) 카드 추가
  - Total Tokens 카드 추가
  - 6개 통계 카드로 확장

- **API 개선**
  - `tokenStats` 객체 추가 (totalInput, totalOutput, totalContext, totalCost)
  - `taskQueue` 배열 추가 (활성 서브에이전트 목록)
  - `/api/health` 헬스 체크 엔드포인트 추가
  - 세션별 `cost` 필드 추가

### 🎨 Improved
- UI/UX 대폭 개선
  - 그라데이션 배경 적용
  - 카드 호버 애니메이션 강화
  - 태스크 큐 펄스 애니메이션
  - 반응형 디자인 개선
  - 스크롤바 커스텀 스타일링
  - 토큰 포맷팅 개선 (k, M 단위)
  
- 코드 구조 개선
  - `calculate_cost()` 함수 추가
  - `extract_task_name()` 함수 추가
  - 프론트엔드 코드 모듈화

### 📝 Documentation
- README.md 대폭 확장
  - 상세한 기능 설명
  - API 문서 추가
  - 배포 가이드 추가 (systemd, Docker)
  - 문제 해결 섹션 추가
  - 향후 계획 (Phase 3+) 추가
  
- CHANGELOG.md 추가

### 🔧 Technical
- Flask 앱 구조 개선
- JavaScript 모듈화
- CSS 변수 정리
- 에러 핸들링 강화

---

## [1.0.0] - 2026-02-12 (Day 11)

### 🎉 Initial Release
- 기본 세션 모니터링
- 세션 타입/상태 분류
- 10초 자동 새로고침
- 통계 대시보드 (Active/Idle/Stale/Total)
- Bootstrap 5 UI
- Flask API 백엔드
