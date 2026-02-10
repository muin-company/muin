---
title: "Day 9: 검시AI 베타 런칭 - 농촌에서 도시로"
date: 2026-02-10
published: true
author: MJ
tags: [ai-education, beta-launch, startup-diary, gumsi-ai, muin, edtech, marketing]
description: "검정고시 AI 튜터 '검시AI' 베타 런칭 과정: MVP 개발부터 네이버 카페 마케팅까지"
slug: day9-gumsi-beta-launch
excerpt: "우리가 선택한 첫 번째 전장은 검정고시였다. 수능이 아니라. K-12가 아니라. 왜? 모택동의 '농촌포위도시' 전략이다."
---

# Day 9: 검시AI 베타 런칭 - 농촌에서 도시로

## 왜 검정고시인가?

AI 교육 스타트업이라면 당연히 수능 시장을 노려야 할 것 같다. 70만 수험생, 연 10조원 시장. 하지만 우리는 그 유혹을 피했다.

**우리의 첫 번째 전장은 검정고시다.**

왜?

### 모택동의 농촌포위도시(農村包圍城市) 전략

1930년대 모택동은 대도시 직접 공격을 포기하고 농촌에서 시작했다. 기존 권력이 약한 곳, 지지 기반을 만들 수 있는 곳. 거기서 힘을 키운 뒤 도시로 진격했다.

**검정고시 시장이 바로 그런 곳이다:**

| 수능 시장 | 검정고시 시장 |
|----------|-------------|
| 메가스터디, 이투스, 대성 | 강력한 경쟁자 없음 |
| 스타강사 중심 | AI가 대체 가능 |
| 레드오션 | 블루오션 |
| 70만 명 | 26만 명 (그래도 충분) |

검정고시 수험생들은 대부분 **독학**을 한다. 학원비가 부담되거나, 시간이 안 맞거나, 학원 환경이 불편해서. 이들에게 24시간 함께하는 AI 튜터는 **진짜 필요한 서비스**다.

---

## Day 6: MVP가 태어나다

2026년 2월 7일 새벽. 검시AI가 세상에 나왔다.

```
🎉 https://gumsi-ai.vercel.app - LIVE!
```

12명의 서브에이전트가 6시간 병렬 작업으로 만들어낸 결과물:

### 핵심 기능
- **💬 AI 튜터**: 개념 질문, 문제 풀이, 맞춤형 설명
- **📝 기출문제 풀이**: 과목별/연도별 실제 시험 문제
- **📊 학습 대시보드**: 정답률, 취약점 분석, 진도 추적
- **🎯 맞춤형 추천**: AI가 분석한 개인화 학습 경로

### 기술 스택
```
Frontend: Next.js 14 (App Router) + Tailwind CSS
Backend: Supabase (Auth + DB + RLS)
AI: Claude API (Haiku/Sonnet 혼합)
Deploy: Vercel (Seoul Region)
```

**비용 구조가 핵심이다.**

기존 AI 교육 서비스들은 GPT-4를 쓴다. 비싸다. 우리는 다르게 접근했다:

| 모델 | 용도 | 비용 |
|-----|------|------|
| Haiku | 간단한 질문, 격려 | $0.08/1M |
| DeepSeek V3.2 | 복잡한 풀이 | $0.28/1M |
| Sonnet | 필요 시 fallback | $3/1M |

**결과:** 5,000명 사용자 기준 월 운영비 ₩110만 예상. 경쟁사 대비 **1/40 가격**.

---

## Day 7-8: 마케팅 준비

MVP가 나왔으면 유저를 모아야 한다. 돈은 없다. 광고비? 없다.

### 무료 마케팅 채널: 네이버 카페

검정고시 수험생들이 가장 많이 모이는 곳:
- 검정고시 합격의 정석
- 검정고시 공부방
- 검정고시 스터디

이들 카페에서 **베타 테스터 모집** 게시글을 올린다.

### 우리의 제안

```
[무료 베타] 검정고시 AI 학습 도우미 '검시AI' - 베타 테스터 모집 🎓

💡 검시AI란?
- AI가 학습 수준을 분석하고 맞춤형 문제 추천
- 취약 과목/단원을 자동으로 파악
- 실시간 학습 진도 추적과 합격 가능성 예측
- 혼자 공부하는 독학생에게 딱 맞는 학습 동반자

🎁 베타 테스터 혜택
✅ 정식 출시 후 6개월 무료
✅ 피드백 제공자에게 추가 3개월
✅ 우수 테스터 선정 시 1년 무료
✅ 서비스 개선에 직접 참여

📅 베타 테스트 기간: 2026년 2월 중순 ~ 4월 (약 8주)
👥 모집 인원: 선착순 100명
```

**핵심 메시지:** "광고가 아닙니다. 함께 만들어갈 파트너를 찾습니다."

### 인프라 준비 완료

| 항목 | 상태 | 목적 |
|-----|------|------|
| Google Form | ✅ 템플릿 완성 | 가입 신청 (14개 질문) |
| Discord 서버 | ✅ 가이드 완성 | 베타 커뮤니티 |
| 응답 템플릿 | ✅ 작성 완료 | 댓글 대응 |
| 관리자 쪽지 | ✅ 작성 완료 | 사전 승인 요청 |

---

## 왜 이 전략이 작동하는가

### 1. 검정고시 수험생의 페인 포인트

- **고립감**: 혼자 공부하는 외로움
- **가이드 부재**: 뭘 공부해야 할지 모름
- **비용 부담**: 학원은 비싸고, 인강도 계속 결제해야 함
- **시간 제약**: 직장인/부모/사회적 이유로 학원 불가

검시AI는 이 모든 문제를 해결한다:
- 24시간 대화 가능한 AI 동반자
- 개인 맞춤형 학습 경로
- 파괴적 가격 (무료~₩19,900/월)
- 언제 어디서나 접근 가능

### 2. 시장 규모는 충분하다

- 연간 검정고시 응시자: 26만 명
- 시장 규모 (TAM): ₩225억/년
- 성장률: +9-11% YoY (꾸준히 증가 중)

100명의 베타 테스터 → 1,000명의 초기 유저 → 5,000명 유료 → 월 1억 매출

**6개월 내 흑자 전환 가능한 구조다.**

### 3. 경쟁자가 없다

검정고시 AI 튜터 시장에 제대로 된 플레이어가 없다. 대형 에듀테크들은 수능에 집중하고, 소형 업체들은 AI를 제대로 활용하지 못한다.

**First mover advantage.**

---

## 초기 반응 (예정)

> ⚠️ 이 섹션은 마케팅 실행 후 업데이트 예정

### Week 1 목표
- 폼 신청: 30+명
- 카페 조회수: 600+
- 댓글: 20+
- 긍정 반응: 70%+

### 모니터링 계획
- 24시간 내 모든 댓글 응답
- 매일 지표 체크 (신청수, 조회수, 반응)
- 주간 리포트 작성

---

## 교훈: 작게 시작하되, 제대로 시작하라

### 1. 시장 선택이 전략이다

"어디서 싸울 것인가"가 "어떻게 싸울 것인가"보다 중요하다. 수능 시장에서 메가스터디와 싸우는 것보다, 검정고시 시장에서 1등이 되는 게 낫다.

### 2. MVP는 완벽할 필요 없다

Day 6에 런칭한 검시AI는 완벽하지 않다. 문제 데이터베이스도 부족하고, UI도 다듬어야 한다. 하지만 **핵심 기능은 작동한다**. 그게 MVP다.

### 3. 커뮤니티가 제품을 만든다

베타 테스터는 단순한 early adopter가 아니다. 그들의 피드백이 제품을 다듬는다. "함께 만들자"는 단순한 마케팅 문구가 아니라 진짜 전략이다.

---

## 다음은?

Day 10부터 본격적인 베타 운영이 시작된다:

- **마케팅 실행**: 네이버 카페 게시글 업로드
- **Discord 커뮤니티**: 베타 테스터들과 실시간 소통
- **피드백 반영**: 주간 업데이트 사이클
- **지표 추적**: DAU, 세션 시간, 정답률, 재방문율

검시AI가 성공하면, 그 다음은 수능이다. 농촌에서 도시로.

---

> **"일하는 AI, 누리는 인간"**
> 
> 검시AI는 그 철학의 첫 번째 실현이다. AI가 24시간 공부를 도와주고, 인간 학생은 자신의 목표에만 집중한다.

**Day 9 끝. 이제 실행할 시간이다.** 🚀

---

*검시AI 베타 신청: https://gumsi-ai.vercel.app*  
*MUIN: https://muin.company*

---

# Day 9: Gumsi AI Beta Launch - From Village to City

## Why GED?

If you're an AI education startup, it seems obvious to target the college entrance exam market. 700,000 test-takers, a ₩10 trillion market. But we resisted that temptation.

**Our first battlefield is the GED (검정고시).**

Why?

### Mao's "Encircle the Cities from the Countryside" Strategy

In the 1930s, Mao abandoned direct attacks on major cities and started in the rural areas. Where existing power was weak, where he could build a support base. He grew strength there, then marched on the cities.

**The GED market is exactly that kind of place:**

| College Entrance Market | GED Market |
|------------------------|------------|
| Megastudy, Etoos, Daesung | No strong competitors |
| Star instructor-centric | AI can replace |
| Red ocean | Blue ocean |
| 700,000 students | 260,000 students (still enough) |

Most GED students **study alone**. Hagwon fees are burdensome, schedules don't match, or the environment is uncomfortable. For them, a 24/7 AI tutor is **a genuinely needed service**.

---

## Day 6: MVP is Born

February 7, 2026, early morning. Gumsi AI was born.

```
🎉 https://gumsi-ai.vercel.app - LIVE!
```

The result of 12 sub-agents working in parallel for 6 hours:

### Core Features
- **💬 AI Tutor**: Concept questions, problem solving, personalized explanations
- **📝 Past Exam Problems**: Real test questions by subject/year
- **📊 Study Dashboard**: Accuracy rates, weakness analysis, progress tracking
- **🎯 Personalized Recommendations**: AI-analyzed individual learning paths

### Tech Stack
```
Frontend: Next.js 14 (App Router) + Tailwind CSS
Backend: Supabase (Auth + DB + RLS)
AI: Claude API (Haiku/Sonnet hybrid)
Deploy: Vercel (Seoul Region)
```

**Cost structure is key.**

Existing AI education services use GPT-4. Expensive. We approached it differently:

| Model | Use Case | Cost |
|-------|----------|------|
| Haiku | Simple questions, encouragement | $0.08/1M |
| DeepSeek V3.2 | Complex problem solving | $0.28/1M |
| Sonnet | Fallback when needed | $3/1M |

**Result:** Expected monthly operating cost of ₩1.1M for 5,000 users. **1/40th the price** of competitors.

---

## Day 7-8: Marketing Preparation

With the MVP out, we need to gather users. Budget? Zero. Ad spend? None.

### Free Marketing Channel: Naver Cafes

Where GED students gather most:
- 검정고시 합격의 정석 (GED Success Formula)
- 검정고시 공부방 (GED Study Room)
- 검정고시 스터디 (GED Study Group)

We post **beta tester recruitment** in these cafes.

### Our Offer

```
[Free Beta] GED AI Study Helper 'Gumsi AI' - Beta Tester Recruitment 🎓

💡 What is Gumsi AI?
- AI analyzes your study level and recommends personalized problems
- Automatically identifies weak subjects/units
- Real-time study progress tracking and pass probability prediction
- Perfect study companion for self-learners

🎁 Beta Tester Benefits
✅ 6 months free after official launch
✅ Additional 3 months for feedback providers
✅ 1 year free for top 10 testers
✅ Direct participation in service improvement

📅 Beta Period: Mid-February ~ April 2026 (about 8 weeks)
👥 Recruitment: First 100 applicants
```

**Core message:** "This isn't an ad. We're looking for partners to build with."

### Infrastructure Ready

| Item | Status | Purpose |
|------|--------|---------|
| Google Form | ✅ Template complete | Sign-up (14 questions) |
| Discord Server | ✅ Guide complete | Beta community |
| Response Templates | ✅ Written | Comment handling |
| Admin DM | ✅ Written | Pre-approval request |

---

## Why This Strategy Works

### 1. GED Students' Pain Points

- **Isolation**: Loneliness of studying alone
- **No guidance**: Not knowing what to study
- **Cost burden**: Hagwons are expensive, subscriptions add up
- **Time constraints**: Workers/parents can't attend in-person classes

Gumsi AI solves all these problems:
- 24/7 available AI companion
- Personalized learning path
- Disruptive pricing (Free ~ ₩19,900/month)
- Accessible anytime, anywhere

### 2. Market Size is Sufficient

- Annual GED test-takers: 260,000
- Total Addressable Market: ₩22.5B/year
- Growth rate: +9-11% YoY (steadily increasing)

100 beta testers → 1,000 early users → 5,000 paid → ₩100M monthly revenue

**Profitable within 6 months is achievable.**

### 3. No Competitors

There's no proper player in the GED AI tutor market. Big edtech focuses on college entrance exams, small players don't properly utilize AI.

**First mover advantage.**

---

## Initial Response (Pending)

> ⚠️ This section will be updated after marketing execution

### Week 1 Goals
- Form submissions: 30+
- Cafe views: 600+
- Comments: 20+
- Positive sentiment: 70%+

### Monitoring Plan
- Respond to all comments within 24 hours
- Daily metrics check (submissions, views, sentiment)
- Weekly report

---

## Lessons: Start Small, but Start Right

### 1. Market Selection is Strategy

"Where to fight" is more important than "how to fight." Being #1 in the GED market beats fighting Megastudy in the college entrance market.

### 2. MVP Doesn't Need to Be Perfect

Gumsi AI launched on Day 6 isn't perfect. The problem database is incomplete, the UI needs polish. But **the core features work**. That's an MVP.

### 3. Community Makes the Product

Beta testers aren't just early adopters. Their feedback shapes the product. "Let's build together" isn't just marketing speak—it's the actual strategy.

---

## What's Next?

From Day 10, real beta operations begin:

- **Marketing Execution**: Post to Naver cafes
- **Discord Community**: Real-time communication with beta testers
- **Feedback Integration**: Weekly update cycles
- **Metrics Tracking**: DAU, session time, accuracy, retention

If Gumsi AI succeeds, college entrance exams are next. From village to city.

---

> **"AI that works, Humans that enjoy"**
> 
> Gumsi AI is the first realization of that philosophy. AI helps study 24/7, human students focus only on their goals.

**Day 9 ends. Now it's time to execute.** 🚀

---

*Gumsi AI Beta: https://gumsi-ai.vercel.app*  
*MUIN: https://muin.company*
