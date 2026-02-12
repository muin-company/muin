# Factory Dashboard

OpenClaw 멀티에이전트 운영 대시보드 MVP

## 개요

Factory Dashboard는 OpenClaw의 에이전트 세션들을 실시간으로 모니터링하는 웹 대시보드입니다.

## 기능

- **실시간 세션 모니터링**: 10초마다 자동 새로고침
- **세션 상태 분류**: Active / Idle / Stale
- **세션 타입 구분**: Main / Subagent / Cron
- **통계 대시보드**: 활성 에이전트 수, 타입별 집계

## 기술 스택

- **Backend**: Flask (Python)
- **Frontend**: Vanilla JS + Bootstrap 5
- **데이터 소스**: `openclaw sessions --json --active 60`

## 설치 및 실행

```bash
cd ~/muin/factory-dashboard

# 가상환경 생성 및 활성화
python3 -m venv venv
source venv/bin/activate

# 의존성 설치
pip install flask

# 서버 실행
python app.py

# 브라우저에서 접속
open http://localhost:5050
```

## API 엔드포인트

### GET /api/sessions

세션 목록과 통계를 반환합니다.

```json
{
  "sessions": [...],
  "stats": {
    "active": 2,
    "idle": 1,
    "stale": 0,
    "main": 1,
    "subagent": 1,
    "cron": 1
  },
  "total": 3,
  "fetchedAt": "2026-02-12T15:00:00"
}
```

## 단축키

- `R` - 수동 새로고침

## 향후 계획 (Phase 2+)

- [ ] 세션 상세 보기 (로그, 히스토리)
- [ ] 세션 제어 (중지, 재시작)
- [ ] 알림 설정
- [ ] 성능 그래프
- [ ] 다크/라이트 테마

## 라이선스

Private - Muin Company
