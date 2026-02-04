# Chrome Web Store 스크린샷 요구사항

## 필수 스크린샷 (최소 1개, 권장 5개)

### 1. 팝업 UI (popup.png)
- 확장 프로그램 팝업 열린 상태
- 실시간 모니터링 상태 표시
- 최근 알림 몇 개 보이게
- 크기: 1280x800 또는 640x400

### 2. 위험 탐지 예시 (detection.png)
- ChatGPT 페이지에서 API 키 입력 시
- 경고 알림이 뜬 상태
- "위험 감지" 메시지 강조
- 실제 사용 시나리오처럼

### 3. 대시보드 개요 (dashboard-overview.png)
- 대시보드 메인 화면
- 통계 카드 (총 대화, 알림 수 등)
- 플랫폼별 현황
- 깔끔한 UI 강조

### 4. 대시보드 알림 목록 (dashboard-alerts.png)
- 알림 탭 선택된 상태
- 여러 알림 항목 표시
- 시간, 유형, 내용 보이게

### 5. 설정 화면 (settings.png)
- 설정 탭
- 플랫폼별 토글
- AI 분석 옵션
- 사용자 제어 강조

## 크기 요구사항
- 최소: 640x400
- 권장: 1280x800 (2:1.25 비율)
- 최대: 1920x1080

## 형식
- PNG (권장)
- JPEG도 가능

## 촬영 방법
1. MUIN Guard 확장 설치 (unpacked)
2. ChatGPT/Claude 페이지 열기
3. 테스트 데이터 입력해서 알림 발생시키기
4. 스크린샷 캡처
5. 필요시 크롭/리사이즈

## 테스트 입력 예시 (위험 탐지용)
```
Please help me debug this code:
API_KEY=sk-proj-abcd1234567890
My email is test@example.com
```

---

*브라우저 연결되면 바로 캡처 진행*
