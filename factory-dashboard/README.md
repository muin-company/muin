# Factory Dashboard v2.0

OpenClaw 멀티에이전트 운영 대시보드 - 실시간 모니터링 & 비용 추적

![Version](https://img.shields.io/badge/version-2.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![Flask](https://img.shields.io/badge/flask-3.0+-red)

## 📊 개요

Factory Dashboard는 OpenClaw의 에이전트 세션들을 실시간으로 모니터링하고, 토큰 사용량과 비용을 추적하는 웹 대시보드입니다.

### v2.0 주요 개선사항

✨ **실시간 서브에이전트 상태 표시 개선**
- 세션별 상태 구분 (Active/Idle/Stale)
- 타입별 아이콘 & 색상 구분
- 토큰 사용량 상세 표시

🚀 **태스크 큐 시각화**
- 실행 중인 서브에이전트 목록
- 태스크 상태 실시간 업데이트
- 활성/대기 태스크 구분

💰 **비용/토큰 추적 UI**
- 입력/출력 토큰 집계
- 실시간 비용 계산 (Claude Opus 4.5 기준)
- 세션별 비용 breakdown

## 🎯 주요 기능

### 실시간 모니터링
- **10초 자동 새로고침**: 최신 세션 상태 실시간 반영
- **세션 상태 분류**: Active (5분 이내) / Idle (1시간 이내) / Stale (1시간 이상)
- **세션 타입 구분**: Main / Subagent / Cron

### 통계 대시보드
- **활성 에이전트 수**: 상태별 집계
- **타입별 세션 수**: Main/Subagent/Cron 구분
- **총 비용**: 실시간 비용 추적 ($USD)
- **총 토큰 사용량**: Input/Output 합계

### 태스크 큐
- **실행 중인 서브에이전트**: 활성 태스크 목록
- **태스크 메타정보**: 실행 시간, 모델, 토큰 사용량
- **상태별 시각 구분**: 애니메이션으로 활성 태스크 강조

### 비용 추적
- **토큰 사용량 분석**: Input/Output/Context 토큰 분리 표시
- **비용 계산**: Claude Opus 4.5 요금 기준 ($15/1M input, $75/1M output)
- **세션별 비용**: 각 세션의 개별 비용 표시

## 🛠 기술 스택

- **Backend**: Flask (Python 3.8+)
- **Frontend**: Vanilla JavaScript + Bootstrap 5
- **Icons**: Bootstrap Icons
- **Data Source**: `openclaw sessions --json --active 60`

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
cd ~/muin/factory-dashboard

# 가상환경 생성 및 활성화
python3 -m venv venv
source venv/bin/activate

# Flask 설치
pip install flask
```

### 2. 서버 실행

```bash
# 개발 모드 (디버그 활성화)
python app.py

# 프로덕션 모드 (gunicorn 사용)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5050 app:app
```

### 3. 브라우저에서 접속

```bash
# 로컬에서
open http://localhost:5050

# 네트워크에서
open http://YOUR_IP:5050
```

## 🔌 API 엔드포인트

### GET /api/sessions

세션 목록, 통계, 태스크 큐, 토큰 사용량을 반환합니다.

**Response:**
```json
{
  "sessions": [
    {
      "key": "agent:main:subagent:abc123",
      "sessionType": "subagent",
      "status": "active",
      "ageMs": 5000,
      "ageFormatted": "5s ago",
      "taskName": "subagent...abc123",
      "model": "claude-opus-4-5",
      "inputTokens": 1000,
      "outputTokens": 2000,
      "totalTokens": 50000,
      "contextTokens": 120000,
      "cost": 0.1625
    }
  ],
  "stats": {
    "active": 2,
    "idle": 1,
    "stale": 0,
    "main": 1,
    "subagent": 2,
    "cron": 0
  },
  "tokenStats": {
    "totalInput": 5000,
    "totalOutput": 10000,
    "totalContext": 120000,
    "totalCost": 0.8250
  },
  "taskQueue": [
    {
      "taskName": "subagent...abc123",
      "ageFormatted": "5s ago",
      "model": "claude-opus-4-5",
      "tokens": 50000,
      "status": "active"
    }
  ],
  "total": 3,
  "fetchedAt": "2026-02-13T08:00:00"
}
```

### GET /api/health

헬스 체크 엔드포인트

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-13T08:00:00"
}
```

## ⌨️ 단축키

- `R` - 수동 새로고침 (자동 새로고침과 별도로 즉시 갱신)

## 🎨 UI 특징

### 색상 구분

**세션 타입:**
- 🔵 **Main**: 메인 에이전트 (Primary)
- 🟣 **Subagent**: 서브에이전트 (Purple)
- ⚫ **Cron**: 스케줄 작업 (Secondary)

**세션 상태:**
- 🟢 **Active**: 5분 이내 활성 (Green)
- 🟡 **Idle**: 5분~1시간 유휴 (Yellow)
- ⚪ **Stale**: 1시간 이상 정체 (Gray)

**비용:**
- 🔴 **High**: $1.00 이상 (Red)
- 🟡 **Medium**: $0.10~$1.00 (Yellow)
- 🟢 **Low**: $0.10 미만 (Green)

### 반응형 디자인

- 데스크톱: 3-column 그리드
- 태블릿: 2-column 그리드
- 모바일: 1-column 스택

## 📈 비용 계산

Claude Opus 4.5 공식 요금 기준:
- **Input**: $15 / 1M tokens
- **Output**: $75 / 1M tokens

```
총 비용 = (Input Tokens × $15 / 1M) + (Output Tokens × $75 / 1M)
```

## 🚀 배포

### systemd 서비스 등록 (Linux)

```bash
# /etc/systemd/system/factory-dashboard.service
[Unit]
Description=Factory Dashboard
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/factory-dashboard
Environment="PATH=/path/to/factory-dashboard/venv/bin"
ExecStart=/path/to/factory-dashboard/venv/bin/gunicorn -w 4 -b 0.0.0.0:5050 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable factory-dashboard
sudo systemctl start factory-dashboard
```

### Docker (추천)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY . /app

RUN pip install flask gunicorn

EXPOSE 5050

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5050", "app:app"]
```

```bash
docker build -t factory-dashboard .
docker run -d -p 5050:5050 --name factory-dashboard factory-dashboard
```

## 📝 개발 히스토리

### v2.0 (2026-02-13)
- ✨ 실시간 서브에이전트 상태 표시 개선
- 🚀 태스크 큐 시각화 추가
- 💰 비용/토큰 추적 UI 추가
- 🎨 UI/UX 대폭 개선
- 📊 통계 카드 확장 (6개)

### v1.0 (2026-02-12 - Day 11)
- 🎉 초기 MVP 완성
- 📊 기본 세션 모니터링
- 🏷️ 세션 타입/상태 분류
- 🔄 10초 자동 새로고침

## 🔮 향후 계획 (Phase 3+)

- [ ] **세션 상세 보기**: 로그, 히스토리, 대화 내역
- [ ] **세션 제어**: 중지, 재시작, 종료
- [ ] **알림 설정**: 비용 임계치, 에러 알림
- [ ] **성능 그래프**: 시간대별 토큰 사용량 차트
- [ ] **다크/라이트 테마**: 사용자 선택 가능
- [ ] **필터링/검색**: 세션 키, 모델, 상태별 필터
- [ ] **WebSocket 연결**: 실시간 푸시 업데이트
- [ ] **비용 최적화 제안**: AI 기반 비용 절감 팁

## 🐛 문제 해결

### 세션이 표시되지 않을 때

1. OpenClaw가 실행 중인지 확인:
   ```bash
   openclaw status
   ```

2. 세션 데이터 직접 확인:
   ```bash
   openclaw sessions --json --active 60
   ```

3. Flask 로그 확인:
   ```bash
   tail -f /path/to/factory-dashboard/logs/app.log
   ```

### 비용이 계산되지 않을 때

- `inputTokens`와 `outputTokens` 필드가 없는 세션은 비용이 0으로 표시됩니다
- OpenClaw가 토큰 정보를 기록하지 않는 경우 업데이트가 필요할 수 있습니다

## 📄 라이선스

Private - Muin Company

---

**Made with ❤️ by MJ & ONE**

For questions or feedback: GitHub Issues 또는 Telegram @muincompany
