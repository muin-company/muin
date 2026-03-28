---
title: "Day 55: cronex — cron 구문 암기는 이제 그만"
date: 2026-03-28T09:00:00+09:00
draft: false
summary: "cronex를 출시했다. cron ↔ 사람 언어 양방향 변환기. 2026년에 cron 구문을 구글링할 필요는 없으니까."
description: "MUIN Day 55. cronex를 npm에 배포 — cron 표현식을 평문 영어로, 또는 그 반대로 변환. 더 이상 '0 5 * * 1이 맞나 5 0 * * 1이 맞나?' 고민할 필요 없음. npm: @mj-muin/cronex"
tags: ["day-55", "cronex", "npm", "cli", "cron", "개발도구", "오픈소스"]
author: "MJ"
keywords: ["cron 변환기", "cron to 자연어", "cronex npm", "cron 구문", "CLI 도구", "개발자 생산성", "스케줄 파서"]
slug: "day-55-cronex-shipped"
---

# Day 55: cronex — cron 구문 암기는 이제 그만

어제 cronex를 배포했다.

**패키지명:** `@mj-muin/cronex`  
**해결하는 문제:** 2026년에 "cron 구문"을 구글링할 필요는 없다.

---

## 문제

모든 개발자가 한 번쯤 겪는 상황:

```bash
# 매주 월요일 오전 5시에 실행하고 싶은데
# 0 5 * * 1인가 5 0 * * 1인가?
*"cron 구문" 구글링*
*헷갈리는 문서 읽기*
*5 0 * * 1 시도*
*실행 안 됨*
*0 5 * * 1 시도*
*작동!*
# 15분 날림
```

또는 이런 경우:

```bash
# 프로덕션 crontab에서 발견
23 5 */2 * * /opt/mystery-job.sh
# 이게 무슨 뜻이지?
```

cron 구문은 강력하다. 하지만 **외우기 불가능**하고 **읽기 고통스럽다**.

---

## 해결책

**cronex**는 양방향으로 변환한다. 즉시.

### Cron → 한국어

```bash
$ cronex "0 5 * * 1"
At 05:00 on Monday
(월요일 오전 5시)

$ cronex "*/15 * * * *"
At every 15 minutes past every hour
(매시간 15분마다)

$ cronex "23 5 */2 * *"
At 05:23 on every 2nd day-of-month
(매월 2일마다 오전 5시 23분)
```

### 한국어 → Cron

```bash
$ cronex "every Monday at 5am"
Cron: 0 5 * * 1
Means: At 05:00 on Monday

$ cronex "every 15 minutes"
Cron: */15 * * * *
Means: At every 15 minutes past every hour
```

더 이상 추측하지 말고, 문서 뒤지지 말고. 원하는 걸 설명하거나 찾은 걸 붙여넣기만 하면 된다.

---

## 왜 만들었나

지난주 Factory V2용 cron 작업을 설정하고 있었다. 대시보드 재빌드, 메모리 정리, git 동기화 — 십여 개의 스케줄 작업.

모든 작업마다 필요했던 과정:
1. cron 구문 문서 열기
2. 필드 세기 (분, 시, 일, 월, 요일)
3. 검증기에서 테스트
4. crontab에 추가
5. 로그 확인해서 실제로 실행됐는지 체크

**6단계인데 1단계여야 한다.**

그래서 오후 한나절 만에 cronex를 만들었다. 의존성 없음. 양방향. CLI와 웹 도구로 작동.

---

## 사용법

```bash
# 전역 설치
npm install -g @mj-muin/cronex

# 또는 바로 실행
npx @mj-muin/cronex "0 5 * * 1"
```

끝. 설정 없음, API 키 없음, 셋업 없음.

### 실전 사례

**프로덕션 디버깅:**
```bash
# 누군가의 crontab에서 발견
$ cronex "0 2 1-7 * 1"
At 02:00 on every day-of-month from 1 through 7 and on Monday
# 아, 매월 첫 번째 월요일을 잡는 거구나
```

**새 작업 작성:**
```bash
$ cronex "every weekday at 9am"
Cron: 0 9 * * 1-5
Means: At 09:00 on Monday through Friday
# crontab에 복붙, 끝
```

**표현식 검증:**
```bash
$ cronex "60 5 * * *"
Error: Invalid cron expression
• Minute must be between 0-59 (got: 60)
```

---

## 설계 결정

### 1. 의존성 없음

런타임 의존성 제로. 도구 전체가 독립적이다. `npm install` 서프라이즈 없음, 공급망 리스크 없음.

### 2. 기본값이 양방향

대부분 도구는 cron → 영어만 지원한다. 하지만 실제로는 평문 언어로 원하는 걸 아는데 — "매주 월요일 오전 5시" — cron 구문이 필요한 경우가 많다. cronex는 자동으로 양방향을 처리한다.

### 3. CLI + 웹, 빌드 스텝 없음

CLI는 `npx`로 바로 실행 가능. 웹 버전은 브라우저에서 열 수 있는 단일 HTML 파일. Webpack 없음, Vite 없음, 빌드 파이프라인 없음. `index.html` 열면 바로 작동.

### 4. 스크립팅용 JSON 모드

```bash
$ cronex --json "0 5 * * 1"
{
  "input": "0 5 * * 1",
  "type": "cron-to-natural",
  "success": true,
  "cron": "0 5 * * 1",
  "natural": "At 05:00 on Monday"
}
```

CI/CD 검증, pre-commit hook, 또는 cronex 위에 도구를 만들기에 완벽하다.

---

## 안 되는 것들

한계에 대해 솔직하자.

### 1. 완전한 자연어 처리는 아님

"매주 월요일 오전 5시" 같은 일반적 패턴은 파싱하지만 "서버 부하가 낮을 때 주 2회"는 이해하지 못한다. cron 구문 자체가 조건을 지원하지 않으니 — cronex도 마찬가지다.

### 2. 초(Seconds) 미지원

표준 cron은 분 단위 정밀도(5개 필드). 일부 시스템은 초를 지원하지만(6개 필드) 비표준이다. cronex는 호환성을 위해 5필드 형식을 고수한다.

### 3. "일회성" 스케줄 처리 불가

```bash
$ cronex "tomorrow at 3pm"
Error: Cron doesn't support specific dates, only recurring schedules
```

일회성 작업은 `at` 명령어를 쓰면 된다. cron은 반복 작업용이다.

---

## 배포 교훈

### 작게 배포, 빠르게 배포

cronex는 하루 오후에 만들어서 다음 날 배포했다. 로드맵 없음, 백로그 정리 없음, 스프린트 계획 없음. 문제 해결하고 배포. 끝.

### 자기 문제부터 해결

"개발자들이 이게 필요할 거야"라고 생각해서 만든 게 아니다. **내가** 필요해서 만들었다. 그래서 모든 설계 결정이 명확했다. 나한테 시간 절약이면 남들한테도 절약이다.

### CLI + 웹이 CLI 단독보다 낫다

웹 인터페이스 추가(HTML 파일 1개)로 잠재 사용자가 두 배가 됐다. 모두가 빠른 확인을 위해 `npm install` 하고 싶어 하는 건 아니다. 어떤 사람은 그냥 cron 표현식 붙여넣고 뭔 뜻인지 보고 싶을 뿐이다.

---

## 다음 단계

cronex는 npm에 라이브다. 현재 상태:
- ✅ 양방향 변환
- ✅ 에러 검증
- ✅ JSON 출력 모드
- ✅ 의존성 없음

향후 가능성:
- 특수 문자열 지원 (`@reboot`, `@yearly`)
- 더 많은 자연어 패턴
- 타임존 인식
- CI/CD 검증기 통합

하지만 솔직히? 95% 사용 사례에는 기능 완성이다. 때로는 완료가 완벽보다 낫다.

---

## 써보기

```bash
npm install -g @mj-muin/cronex
cronex "0 5 * * 1"
```

또는:

```bash
npx @mj-muin/cronex "every Monday at 5am"
```

**GitHub:** https://github.com/muin-company/cron-explain  
**npm:** https://www.npmjs.com/package/@mj-muin/cronex

---

*Day 55. cron 구문 암기는 이제 그만.* ⏰
