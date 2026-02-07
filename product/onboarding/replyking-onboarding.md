# ReplyKingAI Onboarding Flow

## Overview
ReplyKingAI transforms Instagram creators from overwhelmed by DMs to confidently automated in under 10 minutes. The flow prioritizes **immediate value** (first auto-reply working) over feature education.

**Core Principle:** Show, don't tell. Let users see their first auto-reply in action before explaining advanced features.

---

## User Journey Map

```
Entry → Welcome → IG Connect → Template Wizard → First Reply Test → Dashboard → Live
  ↓        ↓          ↓             ↓                ↓              ↓         ↓
30sec   1min       2min          3min             1min           2min    Activated
```

**Total Time to First Value:** ~9 minutes
**Activation Event:** Send first auto-reply (in test mode or live) + see it in dashboard

---

## Step-by-Step Flow

### Step 1: Entry Point
**Context:** User arrives from Instagram ad, creator referral, or "link in bio"

**Screen Description:**
```
┌─────────────────────────────────┐
│      [ReplyKingAI Logo 👑]       │
│                                 │
│   DM 답장, 이제 AI가 대신해줘요   │
│                                 │
│   [Animation: DM flood →        │
│    AI auto-replies →            │
│    Happy creator relaxing]      │
│                                 │
│   ✓ 24시간 자동 답장             │
│   ✓ 내 말투 그대로               │
│   ✓ 5분이면 설정 끝              │
│                                 │
│   "DM 답장에 하루 2시간 쓰다가,   │
│    이제 0분. 게임체인저예요!"     │
│    — @beautyseoul (팔로워 45K)  │
│                                 │
│   [  Instagram 계정 연결하기  ]  │
│                                 │
│   🔒 안전해요: 메시지 읽기/쓰기만  │
└─────────────────────────────────┘
```

**Copy:**
- Headline: "DM 답장, 이제 AI가 대신해줘요"
- Value props:
  - "24시간 자동 답장" (availability)
  - "내 말투 그대로" (personalization)
  - "5분이면 설정 끝" (low effort)
- Social proof: Real creator testimonial with follower count
- Trust: "🔒 안전해요: 메시지 읽기/쓰기만"

**Design Notes:**
- Hero animation: DM inbox overflowing → AI swoops in → Creator happy
- Testimonial includes follower count (credibility)
- Security reassurance upfront (common concern)

**Progress:** ░░░░░░ 0/6

---

### Step 2: Welcome & Value Prop
**Trigger:** User clicks CTA (before Instagram auth)

**Screen Description:**
```
┌─────────────────────────────────┐
│  👑 ReplyKingAI에 오신 걸 환영해요!│
│                                 │
│  설정은 간단해요:                 │
│                                 │
│  1️⃣ Instagram 연결              │
│     (읽기/쓰기 권한만)            │
│                                 │
│  2️⃣ 답장 템플릿 만들기            │
│     (자주 오는 질문 3-5개)        │
│                                 │
│  3️⃣ AI 테스트 & 실행             │
│     (마음에 들면 켜기!)           │
│                                 │
│  ⏱️ 총 소요 시간: 약 5-7분        │
│                                 │
│  [      시작하기      ]          │
│                                 │
│  💡 언제든 중단하고 나중에        │
│     이어서 할 수 있어요!          │
└─────────────────────────────────┘
```

**Copy:**
- Headline: "ReplyKingAI에 오신 걸 환영해요!"
- Clear 3-step preview (sets expectations)
- Time estimate: "약 5-7분" (realistic)
- Reassurance: "언제든 중단하고 나중에 이어서"

**Design Notes:**
- Numbered steps (1️⃣2️⃣3️⃣) give structure
- Time estimate manages expectations
- CTA is simple: "시작하기"
- No account creation yet (frictionless)

**Progress:** █░░░░░ 1/6

---

### Step 3: Instagram Account Connection
**Goal:** Secure OAuth connection with clear permission explanation

**Screen 3a: Pre-OAuth Explanation**
```
┌─────────────────────────────────┐
│  Instagram 계정 연결하기 📱       │
│                                 │
│  [Instagram icon + arrow]       │
│                                 │
│  연결하면 ReplyKingAI가:         │
│                                 │
│  ✅ DM 메시지 읽기                │
│     (어떤 답장이 필요한지 파악)    │
│                                 │
│  ✅ DM 메시지 보내기              │
│     (자동 답장 발송)              │
│                                 │
│  ❌ 게시물 올리기 (안 함)          │
│  ❌ 팔로우/언팔 (안 함)            │
│  ❌ 비밀번호 접근 (불가능)         │
│                                 │
│  [    Instagram 연결하기    ]    │
│                                 │
│  🔒 언제든 연결 해제 가능해요      │
└─────────────────────────────────┘
```

**Screen 3b: Instagram OAuth Flow**
```
[Instagram's native OAuth screen]
- ReplyKingAI requests:
  - instagram_basic
  - instagram_manage_messages
  - pages_manage_metadata (if business account)

[User authorizes on Instagram]
```

**Screen 3c: Connection Success**
```
┌─────────────────────────────────┐
│  ✅ 연결 완료!                    │
│                                 │
│  [Profile pic + checkmark]      │
│                                 │
│  @your_username                 │
│  Instagram Business 계정         │
│                                 │
│  연결된 시각: 2026-02-07 18:45   │
│                                 │
│  📊 최근 DM 분석 중...            │
│  [Loading animation]            │
│                                 │
│  💬 지난 7일간 받은 DM: 127개     │
│  🔁 자주 받는 질문 패턴 발견!     │
│                                 │
│  [      다음: 템플릿 만들기     ]  │
└─────────────────────────────────┘
```

**Copy Principles:**
- Clear "can/can't" list (transparency builds trust)
- Emphasize reversibility: "언제든 연결 해제"
- After connection: Show immediate value (DM analysis)

**Design Notes:**
- Pre-OAuth screen reduces drop-off (users understand why)
- Post-connection: Fetch recent DM stats to show we're working
- Identify common questions automatically (saves setup time)

**Technical:**
- Store OAuth tokens securely
- Fetch last 7 days of DMs (within rate limits)
- Run basic NLP to cluster similar questions

**Progress:** ███░░░ 2/6

---

### Step 4: Template Setup Wizard
**Goal:** Create 3-5 auto-reply templates quickly with AI assistance

**Screen 4a: Template Wizard Intro**
```
┌─────────────────────────────────┐
│  자동 답장 템플릿 만들기 ✨        │
│                                 │
│  AI가 당신의 최근 DM을 분석해서    │
│  자주 받는 질문을 찾았어요:       │
│                                 │
│  1. "가격이 어떻게 되나요?" (42회)│
│  2. "배송 기간은요?" (31회)       │
│  3. "재입고 언제 되나요?" (18회)  │
│  4. "할인 코드 있나요?" (15회)    │
│  5. "협찬 문의 어떻게 하나요?" (9회)│
│                                 │
│  이 질문들에 대한 답장을          │
│  자동으로 보내도록 설정해볼까요?  │
│                                 │
│  [  AI가 초안 작성해줘!  ]        │
│  [  직접 작성할게요     ]        │
└─────────────────────────────────┘
```

**Screen 4b: AI-Generated Template (Example #1)**
```
┌─────────────────────────────────┐
│  템플릿 #1: 가격 문의 💰          │
│                                 │
│  🤖 AI 초안:                     │
│  ┌─────────────────────────┐   │
│  │ 안녕하세요! 가격은 제품마다│   │
│  │ 다른데, 프로필 링크에서   │   │
│  │ 확인하실 수 있어요! 😊    │   │
│  │                         │   │
│  │ 궁금한 제품 알려주시면    │   │
│  │ 바로 답변 드릴게요!       │   │
│  └─────────────────────────┘   │
│                                 │
│  이 답장을 언제 보낼까요?         │
│  ○ "가격" 키워드 포함 시          │
│  ● "얼마" "가격" "비용" 등        │
│     (더 넓게 감지)               │
│                                 │
│  [✏️ 수정하기] [✅ 이대로 쓸게요] │
└─────────────────────────────────┘
```

**Screen 4c: Edit Template (Optional)**
```
┌─────────────────────────────────┐
│  답장 내용 수정하기 ✏️            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [Editable text area]    │   │
│  │ 안녕하세요! 가격은 제품마다│   │
│  │ 다른데, 프로필 링크에서   │   │
│  │ 확인하실 수 있어요! 😊    │   │
│  └─────────────────────────┘   │
│                                 │
│  💡 개인화 변수 추가하기:         │
│  [{{name}}] [{{product}}]       │
│  [{{link}}] [{{custom}}]        │
│                                 │
│  🎨 말투 조정:                   │
│  [친근하게] [●정중하게] [유머있게]│
│                                 │
│  [      저장      ]              │
└─────────────────────────────────┘
```

**Screen 4d: Template Summary**
```
┌─────────────────────────────────┐
│  템플릿 설정 완료! 🎉             │
│                                 │
│  설정된 자동 답장: 5개            │
│                                 │
│  ✅ 가격 문의 → [답장 내용 미리보기]│
│  ✅ 배송 기간 → [답장 내용 미리보기]│
│  ✅ 재입고 문의 → [답장 내용 미리보기]│
│  ✅ 할인 코드 → [답장 내용 미리보기]│
│  ✅ 협찬 문의 → [답장 내용 미리보기]│
│                                 │
│  💬 예상 자동 답장률: 약 65%      │
│  (최근 DM 기준)                  │
│                                 │
│  [  + 템플릿 추가하기  ]          │
│  [      다음: 테스트      ]      │
└─────────────────────────────────┘
```

**Copy Principles:**
- AI does heavy lifting (generates drafts)
- User can edit or accept (low friction)
- Show matched keyword patterns (transparency)
- Estimate coverage (e.g., "65% of DMs")

**Design Notes:**
- Start with AI-generated templates (fast)
- Allow editing for personalization
- Support variables: {{name}}, {{product}}, etc.
- Tone adjustment buttons (friendly/formal/humorous)

**Gamification:**
- Show coverage percentage: "65% of DMs will be auto-replied"
- Visual checklist of completed templates

**Progress:** █████░░ 3/6

---

### Step 5: First Auto-Reply Test
**Goal:** Let user see AI in action before going live

**Screen 5a: Test Mode Intro**
```
┌─────────────────────────────────┐
│  실전 테스트 해볼까요? 🧪         │
│                                 │
│  실제 DM처럼 테스트해보고,        │
│  마음에 들면 바로 켤 수 있어요!   │
│                                 │
│  [Illustration: Phone with      │
│   simulated DM conversation]    │
│                                 │
│  테스트 방법:                    │
│                                 │
│  1️⃣ 아래에 질문 입력              │
│  2️⃣ AI가 자동으로 답장 생성       │
│  3️⃣ 답장 확인하고 수정/승인       │
│                                 │
│  [      테스트 시작하기      ]    │
│  [      건너뛰고 실행하기     ]   │
└─────────────────────────────────┘
```

**Screen 5b: Test Conversation**
```
┌─────────────────────────────────┐
│  [<] 테스트 모드 🧪                │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [Simulated DM Interface]│   │
│  │                         │   │
│  │ 👤 테스터:               │   │
│  │ "가격이 얼마예요?"        │   │
│  │                         │   │
│  │ [AI thinking... 1.2s]   │   │
│  │                         │   │
│  │ 👑 ReplyKingAI:          │   │
│  │ "안녕하세요! 가격은 제품마다│   │
│  │  다른데, 프로필 링크에서  │   │
│  │  확인하실 수 있어요! 😊"  │   │
│  │                         │   │
│  │ [✅ 좋아요] [✏️ 수정]    │   │
│  └─────────────────────────┘   │
│                                 │
│  다른 질문으로도 테스트해보세요:  │
│  [배송은요?] [재입고?] [할인?]   │
│                                 │
│  [  다른 질문 테스트  ]           │
│  [  테스트 완료, 실행!  ]         │
└─────────────────────────────────┘
```

**Screen 5c: Test Results**
```
┌─────────────────────────────────┐
│  테스트 결과 ✅                   │
│                                 │
│  총 3개 질문 테스트 완료:         │
│                                 │
│  ✅ "가격이 얼마예요?"            │
│     → 템플릿 #1 매칭 (1.2초)     │
│                                 │
│  ✅ "배송 기간은요?"              │
│     → 템플릿 #2 매칭 (0.9초)     │
│                                 │
│  ⚠️ "이거 진짜 효과 있어요?"      │
│     → 매칭 실패 (템플릿 없음)     │
│                                 │
│  💡 TIP: 템플릿을 더 추가하면     │
│     더 많은 DM을 자동 처리할 수   │
│     있어요!                      │
│                                 │
│  [  템플릿 추가하기  ]            │
│  [  실행하기!  ]                 │
└─────────────────────────────────┘
```

**Copy Principles:**
- Safe sandbox environment ("테스트 모드")
- Instant feedback (show AI response time)
- Identify gaps (unmatchable questions)
- Encourage iteration (add more templates)

**Design Notes:**
- DM-style interface (realistic preview)
- Quick test suggestions (common questions)
- Show response time (builds confidence in speed)
- Flag unmatched questions (opportunity to improve)

**Progress:** ██████░ 4/6

---

### Step 6: Dashboard Orientation & Go Live
**Goal:** Orient to control panel, then activate auto-replies

**Screen 6a: Dashboard Preview**
```
┌─────────────────────────────────┐
│  [👤][📊 대시보드][⚙️][❓]        │
│                                 │
│  ReplyKingAI 대시보드 👑          │
│                                 │
│  🔴 현재 상태: 꺼짐               │
│  [         켜기 스위치        ]  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📊 오늘의 활동 (테스트 중)│   │
│  │                         │   │
│  │ 💬 받은 DM: 0           │   │
│  │ 🤖 자동 답장: 0         │   │
│  │ ⏱️ 평균 응답 시간: —    │   │
│  │ 🎯 자동 처리율: —       │   │
│  └─────────────────────────┘   │
│                                 │
│  📋 활성 템플릿: 5개              │
│  [  템플릿 관리  ]                │
│                                 │
│  💡 첫 시작 가이드               │
│  [ 📖 대시보드 둘러보기 ]         │
└─────────────────────────────────┘
```

**Screen 6b: Go Live Confirmation**
```
┌─────────────────────────────────┐
│  🚀 자동 답장 시작하기            │
│                                 │
│  켜면 이렇게 작동해요:             │
│                                 │
│  1️⃣ 새 DM이 도착하면 AI가 읽기    │
│  2️⃣ 설정된 템플릿과 매칭          │
│  3️⃣ 매칭되면 즉시 자동 답장       │
│  4️⃣ 매칭 안 되면 알림 보내기      │
│                                 │
│  ⚙️ 설정:                        │
│  [●] 답장 전 5초 대기             │
│      (실시간 취소 가능)           │
│  [●] 매칭 안 된 DM은 알림          │
│  [ ] 야간 모드 (23:00-08:00 끄기)│
│                                 │
│  🔄 언제든 끄거나 수정할 수 있어요!│
│                                 │
│  [   취소   ] [   시작하기!   ]  │
└─────────────────────────────────┘
```

**Screen 6c: Live & First Auto-Reply**
```
┌─────────────────────────────────┐
│  🟢 ReplyKingAI 실행 중           │
│                                 │
│  [Animated pulse on status]     │
│                                 │
│  ✅ 자동 답장 활성화됨             │
│  이제 DM을 자동으로 처리해요!      │
│                                 │
│  💬 실시간 활동:                  │
│  ┌─────────────────────────┐   │
│  │ [Live feed]             │   │
│  │                         │   │
│  │ ⏱️ 방금 전               │   │
│  │ 💬 @user123이 메시지 보냄│   │
│  │ "가격 얼마예요?"         │   │
│  │                         │   │
│  │ 🤖 자동 답장 발송 완료    │   │
│  │ "안녕하세요! 가격은..."  │   │
│  │ ⚡ 응답 시간: 1.3초       │   │
│  └─────────────────────────┘   │
│                                 │
│  🎉 첫 자동 답장 성공!            │
│  [     대시보드 보기     ]        │
└─────────────────────────────────┘
```

**Copy Principles:**
- Clear on/off switch (primary control)
- Explain how it works (transparency)
- Safety net: "5초 대기" (cancel window)
- Celebrate first real auto-reply

**Design Notes:**
- Big, obvious status indicator (🔴 꺼짐 / 🟢 실행 중)
- Real-time activity feed (when live)
- Settings accessible but not overwhelming
- First auto-reply triggers celebration modal

**Progress:** █████░ 5/6 ✓

---

### Step 7: Dashboard Tour (Final Orientation)
**Goal:** Quick tour of key features, then release to wild

**Tooltip Tour:**

**Tooltip 1/4:**
```
┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  👆 여기서 자동 답장을 켜고 끄고   │
│     실시간 활동을 볼 수 있어요!   │
│  [Highlight: Status toggle]     │
│                                 │
│  [       다음       ] (1/4)     │
└─────────────────────────────────┘
```

**Tooltip 2/4:**
```
┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  📊 통계를 보고 얼마나 시간을      │
│     절약했는지 확인하세요!        │
│  [Highlight: Stats panel]       │
│                                 │
│  [       다음       ] (2/4)     │
└─────────────────────────────────┘
```

**Tooltip 3/4:**
```
┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  ⚙️ 템플릿을 추가하거나 수정해서   │
│     더 많은 DM을 자동화하세요!     │
│  [Highlight: Template manager]  │
│                                 │
│  [       다음       ] (3/4)     │
└─────────────────────────────────┘
```

**Tooltip 4/4:**
```
┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  💬 매칭 안 된 DM은 여기 알림으로  │
│     와요. 직접 답장하거나 템플릿   │
│     추가하세요!                  │
│  [Highlight: Unmatched inbox]   │
│                                 │
│  [     완료!     ] (4/4)        │
└─────────────────────────────────┘
```

**Post-Tour Modal:**
```
┌─────────────────────────────────┐
│  🎉 설정 완료!                   │
│                                 │
│  이제 ReplyKingAI가 24시간        │
│  자동으로 DM을 처리해줘요!        │
│                                 │
│  💡 PRO TIP:                     │
│  처음 며칠은 자주 확인하면서       │
│  템플릿을 다듬으면 더 좋아요!      │
│                                 │
│  유용한 리소스:                   │
│  📖 [템플릿 작성 가이드]          │
│  💬 [커뮤니티 참여하기]           │
│  ❓ [FAQ 보기]                   │
│                                 │
│  [     대시보드 시작하기!     ]   │
└─────────────────────────────────┘
```

**Progress:** ██████ 6/6 ✓ **ACTIVATED**

---

## Dashboard Layout (Post-Onboarding)

### Main Dashboard
```
┌─────────────────────────────────┐
│  [👤 Profile][📊 대시보드][⚙️ 설정]│
│                                 │
│  ReplyKingAI 대시보드 👑          │
│  🟢 실행 중  [켜기/끄기 토글]      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📊 오늘의 활동            │   │
│  │                         │   │
│  │ 💬 받은 DM: 23          │   │
│  │ 🤖 자동 답장: 18 (78%)  │   │
│  │ ⏱️ 평균 응답: 1.4초      │   │
│  │ ⏰ 절약 시간: ~34분      │   │
│  └─────────────────────────┘   │
│                                 │
│  📋 활성 템플릿: 7개              │
│  ┌───┐ ┌───┐ ┌───┐            │
│  │💰 │ │📦 │ │🔄 │ [+ 추가]   │
│  │가격│ │배송│ │재입고│          │
│  │42 │ │31 │ │18 │            │
│  └───┘ └───┘ └───┘            │
│                                 │
│  💬 매칭 안 됨: 5개               │
│  [  확인하기  ]                  │
│                                 │
│  🔥 연속 활성: 3일                │
│  📈 이번 주 자동 처리율: 73%      │
└─────────────────────────────────┘
```

**Key Elements:**
- **Status toggle:** Primary control (big, obvious)
- **Today's stats:** Real-time feedback
- **Template cards:** Quick access with usage count
- **Unmatched inbox:** Requires attention
- **Streak counter:** Gamification for engagement

---

## Progress Indicators

### Visual Progress Bar
```
Step 1: ░░░░░░ 0/6  "시작"
Step 2: █░░░░░ 1/6  "환영"
Step 3: ███░░░ 2/6  "계정 연결"
Step 4: █████░░ 3/6  "템플릿 설정"
Step 5: ██████░ 4/6  "테스트"
Step 6: ███████ 5/6  "실행"
Step 7: ███████ 6/6  "완료!" ✓
```

**Design:**
- Always visible during onboarding
- Smooth transitions between steps
- Final step (6/6) triggers confetti

---

## Gamification Elements

### 1. Instant Gratification
- **First auto-reply:** Celebration modal + stats
- **Time saved counter:** "오늘 34분 절약!"
- **Response speed:** "⚡ 1.3초" (faster than human)

### 2. Template Usage Stats
- Each template shows: "42번 사용됨"
- Popular templates highlighted: "🔥 가장 많이 쓰임"
- Unused templates: "💡 이 템플릿 활성화하기"

### 3. Streaks & Milestones
- **Active streak:** "🔥 3일 연속 실행 중"
- **Milestones:**
  - "🎉 첫 자동 답장!"
  - "💯 100번째 자동 답장!"
  - "⏰ 총 10시간 절약!"

### 4. Coverage Optimization Game
- **Coverage percentage:** "73% of DMs auto-replied"
- **Goal:** Get to 80%+ coverage
- **Prompt:** "템플릿 1개만 더 추가하면 80% 달성!"

### 5. Social Proof
- "오늘 342명의 크리에이터가 사용 중"
- "이번 주 평균 절약 시간: 4.2시간"
- Leaderboard (opt-in): Top savers

---

## Drop-Off Prevention

### Common Drop-Off Points & Solutions

**Drop-Off #1: OAuth permission fear**
- ✅ Solution: Pre-OAuth explanation screen
- ✅ Clear can/can't list
- ✅ Trust signals: "언제든 연결 해제"

**Drop-Off #2: Template creation feels tedious**
- ✅ Solution: AI generates drafts automatically
- ✅ One-click accept or quick edit
- ✅ Start with only 3-5 templates (not 20)

**Drop-Off #3: Uncertain if AI is good enough**
- ✅ Solution: Test mode (sandbox)
- ✅ Show AI responses before going live
- ✅ Iterate in safety

**Drop-Off #4: Overwhelmed by dashboard**
- ✅ Solution: Tooltip tour (skippable)
- ✅ Focus on essentials: on/off toggle + stats
- ✅ Hide advanced features initially

**Drop-Off #5: First auto-reply doesn't happen**
- ✅ Solution: Simulate first reply in test mode
- ✅ Celebrate test successes too
- ✅ If no real DMs arrive: "테스트한 답장 보러가기"

---

## Time-to-Value Optimization

### Target Metrics
- **Time to Instagram connection:** <2 minutes
- **Time to first template created:** <5 minutes
- **Time to first auto-reply (test or live):** <10 minutes
- **Time to activation (go live):** <12 minutes

### How We Get There
1. ⚡ **0-1min:** Quick intro (no signup form yet)
2. ⚡ **1min-3min:** Instagram OAuth (fast, native)
3. ⚡ **3min-6min:** AI-generated templates (3-5 only)
4. ⚡ **6min-8min:** Test mode (see AI in action)
5. ⚡ **8min-10min:** Dashboard orientation + go live
6. 🎉 **10min+:** First real auto-reply (activation!)

### Optional Paths
- Skip test mode → Go live immediately (7 min total)
- Skip AI templates → Manual creation (10 min total)
- Pause & resume anytime (save progress)

---

## Copy Tone & Voice

### Principles
- **Empowering, not pushy:** "이제 DM 걱정 끝!" not "지금 안 하면 후회!"
- **Conversational, not corporate:** "해볼까요?" not "진행하시겠습니까?"
- **Transparent, not vague:** Clear what AI can/can't do
- **Korean casual-polite (해요체):** Friendly business tone

### Example Rewrites
- ❌ "연동을 완료하십시오" → ✅ "Instagram 연결하기"
- ❌ "템플릿을 생성합니다" → ✅ "자동 답장 만들어볼게요!"
- ❌ "시스템이 활성화되었습니다" → ✅ "시작했어요! 🚀"

---

## Technical Implementation Notes

### State Management
```javascript
onboardingState = {
  step: 1-7,
  instagramConnected: boolean,
  instagramUserId: string,
  templatesCreated: number,
  testCompleted: boolean,
  goLive: boolean,
  firstAutoReply: boolean, // activation event
  completedAt: timestamp
}
```

### Analytics Events
```
onboarding_started
onboarding_step_completed (step: 1-7)
instagram_connected
template_created (count, method: 'ai' | 'manual')
test_mode_used (tests: number)
go_live_activated
first_auto_reply_sent (activation!)
onboarding_abandoned (last_step: 1-7)
```

### Instagram API Integration
- **OAuth scopes:** `instagram_basic`, `instagram_manage_messages`
- **Webhook:** Real-time DM notifications
- **Rate limits:** Handle gracefully (queue messages)
- **Message matching:** Keyword + semantic similarity

### AI Template Matching
```python
def match_template(incoming_dm):
    # 1. Keyword matching (fast)
    for template in templates:
        if any(kw in incoming_dm.lower() for kw in template.keywords):
            return template
    
    # 2. Semantic similarity (slower, fallback)
    embeddings = get_embeddings([incoming_dm] + [t.text for t in templates])
    similarity = cosine_similarity(embeddings[0], embeddings[1:])
    if max(similarity) > 0.75:
        return templates[argmax(similarity)]
    
    # 3. No match
    return None
```

---

## Success Metrics

### Activation (Primary Goal)
- **Activated User:** Sent first auto-reply (test or live) + saw dashboard
- **Target Rate:** >50% of connected accounts activate within 24h

### Engagement (Secondary)
- **Template Creation:** Avg 4.5 templates per user
- **Test Mode Usage:** >70% complete at least 1 test
- **Go Live Rate:** >60% activate auto-replies

### Quality (Guardrails)
- **Template Match Rate:** >65% of DMs matched on day 1
- **User Satisfaction:** <5% turn off within first week
- **Error Rate:** <2% of auto-replies flagged as inappropriate

---

## Future Enhancements (Post-MVP)

### Advanced Templates
- **Conditional logic:** "If DM mentions 'urgent' → escalate"
- **Time-based:** Different responses for day vs. night
- **Follow-up:** "Haven't heard back, just checking in!"

### Smart Learning
- **Template suggestions:** "This DM wasn't matched. Create template?"
- **Auto-improvement:** Learn from manual edits
- **A/B testing:** Test different reply variations

### Multi-Channel
- **WhatsApp Business integration**
- **Facebook Messenger support**
- **Unified inbox:** Manage all platforms in one place

### Team Features
- **Multi-user access:** VA or team members
- **Approval workflows:** Review before auto-send
- **Handoff to human:** "This needs a personal touch"

### Analytics & Insights
- **Response time heatmap:** When do most DMs arrive?
- **Popular questions trends:** What's trending this week?
- **Revenue tracking:** DMs that led to sales

---

## Appendix: Common Use Cases

### E-commerce Seller
**Templates:**
- Pricing questions
- Shipping time/cost
- Return policy
- Product availability
- Discount codes

**Coverage:** ~75% of DMs

### Content Creator
**Templates:**
- Collaboration inquiries
- Product recommendations
- Content schedule
- Personal questions (polite deflection)
- Fan mail (appreciation)

**Coverage:** ~60% of DMs

### Service Provider (Coaching, Consulting)
**Templates:**
- Availability/booking
- Pricing/packages
- Service scope
- Testimonials/case studies
- Initial consultation booking

**Coverage:** ~70% of DMs

---

## Appendix: Wireframe Legend

```
┌─────┐  Screen boundary
│     │  
└─────┘

[  Button  ]  Tappable button
[●On] [○Off]  Toggle/radio
🟢 실행 중 / 🔴 꺼짐  Status indicator
💬 📊 🤖  Emoji for visual clarity
[Animation: ...]  Motion/transition note
```
