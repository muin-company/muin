# 검시AI Onboarding Flow

## Overview
검시AI onboarding transforms anxious test-takers into confident learners in under 5 minutes. The flow balances quick wins (first lesson completion) with personalized setup (level assessment, goal setting).

**Core Principle:** Get students to their first "aha moment" (completing a lesson and seeing progress) before asking for commitment.

---

## User Journey Map

```
Entry Point → Welcome → Quick Assessment → Goal Setting → First Lesson → Celebration → Dashboard
    ↓           ↓            ↓                ↓              ↓              ↓            ↓
  30sec      30sec        2min             1min          2min           30sec      Activated
```

**Total Time to First Value:** ~6 minutes
**Activation Event:** Complete first lesson + see progress visualization

---

## Step-by-Step Flow

### Step 1: Entry Point
**Context:** User arrives from ad, social post, or friend referral

**Screen Description:**
```
┌─────────────────────────────────┐
│         [검시AI Logo]            │
│                                 │
│   수능 영어, 이제 AI랑 1:1로      │
│                                 │
│   [Animation: Chat bubbles      │
│    showing AI explaining]       │
│                                 │
│   ✓ 실시간 AI 해설              │
│   ✓ 내 수준에 맞는 문제          │
│   ✓ 매일 10분이면 충분           │
│                                 │
│   [  카카오로 3초만에 시작하기  ]  │
│   [  Apple로 시작하기          ]  │
│                                 │
│   또는 이메일로 시작              │
└─────────────────────────────────┘
```

**Copy:**
- Headline: "수능 영어, 이제 AI랑 1:1로"
- Subheading: "실시간 해설 받으면서 내 수준에 딱 맞는 문제 풀기"
- CTA: "카카오로 3초만에 시작하기"

**Design Notes:**
- Hero animation loops: AI avatar explaining a problem → student lightbulb moment
- Social proof snippet: "이번 주 1,247명이 시작했어요"
- No account creation barrier yet

**Progress:** ░░░░░░░░░░ 0/5

---

### Step 2: Welcome & Permission
**Trigger:** After auth (Kakao/Apple/Email)

**Screen Description:**
```
┌─────────────────────────────────┐
│  👋 안녕하세요!                   │
│                                 │
│  저는 검시AI, 당신의 수능 영어     │
│  개인 튜터예요.                   │
│                                 │
│  시작하기 전에 딱 2가지만         │
│  알려주세요:                      │
│                                 │
│  📱 알림 받기                     │
│  매일 학습 리마인더를 보내드릴게요 │
│  (언제든 끌 수 있어요)            │
│                                 │
│  [  알림 받을래요  ] [  나중에  ] │
│                                 │
└─────────────────────────────────┘
```

**Copy:**
- Greeting: "👋 안녕하세요!"
- Intro: "저는 검시AI, 당신의 수능 영어 개인 튜터예요."
- Permission ask: "매일 학습 리마인더를 보내드릴게요"
- Reassurance: "(언제든 끌 수 있어요)"

**Design Notes:**
- Friendly AI avatar appears
- Clear opt-out option ("나중에") - no dark patterns
- Brief explanation of why (daily learning reminder)

**Progress:** ██░░░░░░░░ 1/5

---

### Step 3: Quick Level Assessment
**Goal:** Determine starting difficulty without overwhelming

**Screen 3a: Assessment Intro**
```
┌─────────────────────────────────┐
│  먼저, 지금 실력을 확인해볼까요?   │
│                                 │
│  [Illustration: Friendly quiz]  │
│                                 │
│  딱 3문제만 풀어보세요.            │
│  맞추는 게 중요한 게 아니라,       │
│  딱 맞는 난이도 찾는 거예요!       │
│                                 │
│  ⏱️ 약 2분 소요                  │
│                                 │
│  [      시작할게요!      ]        │
│                                 │
│  [    건너뛰기 (추천 안 함)   ]   │
└─────────────────────────────────┘
```

**Screen 3b: Assessment Question (×3)**
```
┌─────────────────────────────────┐
│  [Progress: ▓▓░ 1/3]            │
│                                 │
│  다음 빈칸에 들어갈 가장 적절한 것은? │
│                                 │
│  The scientist's hypothesis was │
│  _____ by the experimental data.│
│                                 │
│  ① supported                    │
│  ② rejected                     │
│  ③ confused                     │
│  ④ ignored                      │
│                                 │
│  [       답 선택하기       ]      │
│                                 │
│  💡 모르겠으면 그냥 찍어도 돼요!   │
└─────────────────────────────────┘
```

**Screen 3c: Level Result**
```
┌─────────────────────────────────┐
│  🎯 당신의 시작 레벨은...          │
│                                 │
│  [Animation: Level reveal]      │
│                                 │
│      ⭐⭐⭐ Level 3              │
│      "중급 학습자"               │
│                                 │
│  이 레벨에서 시작하면             │
│  너무 쉽지도, 어렵지도 않게        │
│  실력을 키울 수 있어요!           │
│                                 │
│  [      좋아요, 시작할게요!     ]  │
│  [      레벨 조정하기          ]  │
└─────────────────────────────────┘
```

**Copy Principles:**
- Emphasize "finding the right fit" not "testing ability"
- Low stakes: "맞추는 게 중요한 게 아니라"
- Celebrate result regardless of level
- Allow manual adjustment

**Gamification:**
- Smooth level reveal animation
- Star rating visual (accessible, not judgmental)
- Encouraging language for all levels

**Progress:** ████░░░░░░ 2/5

---

### Step 4: Goal Setting
**Purpose:** Build commitment through self-declared goals

**Screen Description:**
```
┌─────────────────────────────────┐
│  목표를 정하면 더 잘 할 수 있어요! │
│                                 │
│  언제 시험 보세요?                │
│                                 │
│  ○ 3개월 이내                    │
│  ○ 6개월 이내                    │
│  ○ 1년 이내                      │
│  ● 아직 미정                     │
│                                 │
│  목표 점수는요?                   │
│                                 │
│  [  1등급  ] [  2등급  ] [ 3등급 ]│
│  [  4등급  ] [  더 높이고 싶어요 ]│
│                                 │
│  매일 몇 분 투자할 수 있어요?      │
│                                 │
│  [ 5분 ] [●10분] [ 20분 ] [30분+]│
│                                 │
│  [      다음      ]              │
└─────────────────────────────────┘
```

**Copy:**
- Headline: "목표를 정하면 더 잘 할 수 있어요!"
- No judgment: Allow "아직 미정" options
- Realistic time: Default to 10min (achievable)

**Design Notes:**
- Pre-select moderate defaults (미정, 10분)
- Visual feedback on selection
- Use this data to personalize dashboard/reminders

**Progress:** ██████░░░░ 3/5

---

### Step 5: First Lesson (The Magic Moment)
**Critical:** This is where activation happens

**Screen 5a: Lesson Intro**
```
┌─────────────────────────────────┐
│  🚀 첫 레슨 시작!                 │
│                                 │
│  [Animated book opening]        │
│                                 │
│  오늘의 주제: "빈칸 추론"          │
│                                 │
│  이 레슨에서 배울 것:              │
│  ✓ 문맥으로 빈칸 예측하기          │
│  ✓ 함정 답 피하는 법              │
│  ✓ 시간 단축 전략                │
│                                 │
│  💬 막히면 AI가 바로 설명해줘요!   │
│                                 │
│  [      레슨 시작하기      ]      │
└─────────────────────────────────┘
```

**Screen 5b: Interactive Problem**
```
┌─────────────────────────────────┐
│  [🏠][📚 빈칸추론][💬][👤]        │
│  ┌─────────────────────────┐   │
│  │ 문제 1/3  ⏱️ 02:30        │   │
│  │                         │   │
│  │ The researcher's method │   │
│  │ was _____ because it... │   │
│  │                         │   │
│  │ ① innovative            │   │
│  │ ② flawed               │   │
│  │ ③ traditional          │   │
│  │ ④ expensive            │   │
│  └─────────────────────────┘   │
│                                 │
│  💡 힌트 받기                    │
│  🤖 AI 해설 듣기                 │
│                                 │
│  [    정답 제출하기    ]          │
└─────────────────────────────────┘
```

**Screen 5c: Instant Feedback**
```
┌─────────────────────────────────┐
│  ✅ 정답이에요!                   │
│                                 │
│  [AI Avatar appears]            │
│                                 │
│  💬 좋아요! 'innovative'가 정답인 │
│     이유는 'new method'라는      │
│     힌트가 앞 문장에 있었기 때문이죠.│
│                                 │
│  [Key phrase highlights in text]│
│                                 │
│  🎯 이번 문제 TIP:                │
│  앞뒤 문장에서 '원인-결과' 관계를   │
│  찾아보세요!                      │
│                                 │
│  [      다음 문제      ]          │
└─────────────────────────────────┘
```

**Copy Principles:**
- Immediate, specific feedback
- AI explanation in conversational tone
- Extract learning tip from each problem
- Celebrate correct answers enthusiastically

**Gamification Elements:**
- Timer (optional, can be hidden)
- Instant AI feedback loop
- Progress through lesson (1/3, 2/3, 3/3)
- Streak counter starts here

**Progress:** ████████░░ 4/5

---

### Step 6: First Win Celebration
**Purpose:** Create dopamine hit, cement activation

**Screen Description:**
```
┌─────────────────────────────────┐
│                                 │
│  [Confetti animation 🎉]        │
│                                 │
│      첫 레슨 완료! 🎊            │
│                                 │
│  ┌─────────────────────────┐   │
│  │   오늘의 성과              │   │
│  │                         │   │
│  │   📝 문제 풀이: 3/3      │   │
│  │   ✅ 정답률: 100%        │   │
│  │   ⏱️ 소요 시간: 4분 20초  │   │
│  │   🔥 연속 학습: 1일       │   │
│  │                         │   │
│  │   [Progress ring visual] │   │
│  │      Level 3             │   │
│  │   ▓▓░░░░░░ 3 XP         │   │
│  └─────────────────────────┘   │
│                                 │
│  🏆 뱃지 획득: "첫 발걸음"        │
│                                 │
│  [   대시보드 보러가기   ]        │
│  [   한 레슨 더 풀기    ]        │
└─────────────────────────────────┘
```

**Copy:**
- Headline: "첫 레슨 완료! 🎊"
- Stats shown:
  - Problems solved
  - Accuracy
  - Time spent
  - Streak started
- First badge unlocked: "첫 발걸음"

**Gamification:**
- Confetti animation
- Stats summary (builds awareness of progress)
- XP bar visualization
- First badge unlock
- Clear next actions (dashboard or another lesson)

**Design Notes:**
- Make this feel BIG even though it's just one lesson
- Show tangible progress (XP bar moved)
- Dual CTA: let motivated users continue, but guide most to dashboard

**Progress:** ██████████ 5/5 ✓

---

### Step 7: Dashboard Orientation (Final Step)
**Goal:** Orient user to home base, show what's next

**Screen Description:**
```
┌─────────────────────────────────┐
│  [👤][🔍][🏠 홈][📊][⚙️]         │
│                                 │
│  안녕하세요, [이름]님! 👋          │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 오늘의 목표               │   │
│  │ ▓▓▓▓▓░░░░░ 1/2 레슨      │   │
│  │ "한 레슨만 더!"           │   │
│  └─────────────────────────┘   │
│                                 │
│  📚 추천 레슨                    │
│  ┌───┐ ┌───┐ ┌───┐            │
│  │📖 │ │📖 │ │📖 │            │
│  │빈칸│ │주제│ │순서│            │
│  │추론│ │찾기│ │배열│            │
│  └───┘ └───┘ └───┘            │
│                                 │
│  🔥 연속 학습: 1일                │
│  ⭐ 내 레벨: 3 (진행중...)       │
│  🏆 뱃지: 1개 획득               │
│                                 │
│  [Tooltip: "여기서 매일 시작하세요!"]│
└─────────────────────────────────┘
```

**First-Time Overlay:**
```
┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  👆 여기서 매일 학습을 시작해요    │
│  [Highlight: Today's Goal]      │
│                                 │
│  [       다음       ] (1/3)     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  📊 여기서 내 성장을 확인하세요    │
│  [Highlight: Stats tab]         │
│                                 │
│  [       다음       ] (2/3)     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💡 대시보드 둘러보기             │
│                                 │
│  🔥 매일 풀면 연속 학습 스트릭이   │
│     쌓여요! 끊기지 않게 해보세요!  │
│  [Highlight: Streak counter]    │
│                                 │
│  [     시작할게요!     ] (3/3)   │
└─────────────────────────────────┘
```

**Copy Principles:**
- Personalized greeting with name
- Clear daily goal (achievable: 1-2 lessons)
- Highlight streak mechanic (retention driver)
- Brief 3-step tooltip tour

**Design Notes:**
- Don't overwhelm with features
- Focus on: Today's goal, recommended lessons, streak
- Tooltip tour skippable but encouraged
- Clear visual hierarchy

---

## Progress Indicators Throughout Flow

### Visual Progress Bar
```
Step 1: ░░░░░░░░░░ 0/5  "시작하기"
Step 2: ██░░░░░░░░ 1/5  "환영합니다"
Step 3: ████░░░░░░ 2/5  "레벨 확인"
Step 4: ██████░░░░ 3/5  "목표 설정"
Step 5: ████████░░ 4/5  "첫 레슨"
Step 6: ██████████ 5/5  "완료!"
```

**Design:**
- Always visible at top of screen during onboarding
- Shows both progress bar and step count
- Step labels give context
- Completion (5/5) triggers confetti

### Micro-Progress Within Steps
- Assessment: "1/3" "2/3" "3/3"
- Lesson problems: "문제 1/3" "문제 2/3" "문제 3/3"
- Tooltip tour: "(1/3)" "(2/3)" "(3/3)"

---

## Gamification Elements

### 1. Immediate Feedback Loop
- ✅ Correct answer → Instant praise + explanation
- ❌ Wrong answer → "괜찮아요!" + gentle correction
- Every answer → Learning tip extracted

### 2. XP & Leveling System
- First lesson: +3 XP
- XP bar visualization
- Level up = unlock new content

### 3. Streak Mechanic (Retention Engine)
- Starts at Day 1 after first lesson
- Visible on dashboard
- Push notification: "🔥 3일 스트릭! 끊지 마세요!"

### 4. Badges & Achievements
- "첫 발걸음": Complete first lesson
- "3일 연속": 3-day streak
- "완벽주의자": 100% accuracy in a lesson
- "속도광": Complete lesson in under 5 min

### 5. Progress Visualization
- Level progress ring (circular, satisfying)
- Daily goal completion bar
- Weekly heatmap (calendar view)

### 6. Social Proof Nudges
- "이번 주 1,247명이 시작했어요"
- "같은 레벨 학생들의 평균 정답률: 78%"
- "오늘 456명이 레슨 완료했어요"

---

## Drop-Off Prevention

### Common Drop-Off Points & Solutions

**Drop-Off #1: Long signup form**
- ✅ Solution: Social login (Kakao/Apple) → 3 seconds
- ✅ Minimal fields: Only ask name after first lesson

**Drop-Off #2: Assessment feels like a test**
- ✅ Solution: Frame as "finding your level" not "testing you"
- ✅ Low stakes language: "맞추는 게 중요한 게 아니라"
- ✅ Only 3 questions (not 10+)

**Drop-Off #3: Too many questions before value**
- ✅ Solution: Ask goal AFTER assessment, not before
- ✅ Pre-select sensible defaults

**Drop-Off #4: First lesson too hard/easy**
- ✅ Solution: Adaptive difficulty from assessment
- ✅ "Too hard/easy?" feedback button in lesson

**Drop-Off #5: Celebration screen feels "salesy"**
- ✅ Solution: No paywall here! Pure celebration
- ✅ Show progress stats, not "upgrade now"

---

## Time-to-Value Optimization

### Target Metrics
- **Time to first lesson start:** <3 minutes
- **Time to first lesson completion:** <6 minutes  
- **Time to "aha moment":** <7 minutes (seeing first progress stats)

### How We Get There
1. ⚡ **0-30s:** One-tap social login (no form)
2. ⚡ **30s-1min:** Quick welcome + permission (skip notification ask)
3. ⚡ **1min-3min:** 3-question assessment (not 10)
4. ⚡ **3min-4min:** Quick goal setting (pre-selected defaults)
5. ⚡ **4min-6min:** First lesson (3 problems, AI help)
6. 🎉 **6min-7min:** Celebration + stats

### Optional Paths
- Skip assessment → Manual level selection → First lesson (4 min total)
- Skip goal setting → Use defaults → First lesson (5 min total)

---

## Copy Tone & Voice

### Principles
- **Encouraging, not condescending:** "좋아요!" not "대단해요!" (too much)
- **Friend, not teacher:** "같이 해봐요" not "학습하십시오"
- **Realistic, not overpromising:** "매일 10분이면 충분" not "1주일에 1등급!"
- **Korean casual-polite (해요체):** Natural for student-tutor relationship

### Example Rewrites
- ❌ "회원가입을 완료하세요" → ✅ "시작해볼까요?"
- ❌ "테스트를 시작합니다" → ✅ "지금 실력 확인해볼게요!"
- ❌ "축하합니다" → ✅ "해냈어요! 🎉"

---

## Technical Implementation Notes

### State Management
```javascript
onboardingState = {
  step: 1-6,
  assessmentLevel: 1-5,
  goals: {
    examDate: "3mo" | "6mo" | "1yr" | "TBD",
    targetGrade: 1-4 | null,
    dailyMinutes: 5 | 10 | 20 | 30
  },
  firstLessonCompleted: boolean,
  completedAt: timestamp
}
```

### Analytics Events
```
onboarding_started
onboarding_step_completed (step: 1-6)
assessment_completed (level: 1-5)
first_lesson_started
first_lesson_completed (time: seconds, accuracy: percent)
onboarding_abandoned (last_step: 1-6)
```

### Personalization Hooks
- Use `assessmentLevel` → Recommend appropriate lessons
- Use `dailyMinutes` → Set daily goal (1-3 lessons)
- Use `targetGrade` → Show relevant tips, milestone tracking

---

## Success Metrics

### Activation (Primary Goal)
- **Activated User:** Completed first lesson + saw celebration screen
- **Target Rate:** >60% of signups within 24h

### Engagement (Secondary)
- **Lesson Completion Rate:** >80% of started lessons finished
- **Day 1 Retention:** >40% return next day
- **7-Day Streak:** >20% reach 7-day streak

### Quality (Guardrails)
- **Assessment Completion:** >75% complete 3-question assessment
- **Goal Setting Completion:** >85% set at least one goal
- **Perceived Difficulty:** <10% report "too hard/easy" in first lesson

---

## Future Enhancements (Post-MVP)

### Personalization Layer
- **Learning style quiz:** Visual vs. auditory vs. kinesthetic
- **Time preference:** Morning bird vs. night owl → Custom reminder times
- **Motivation type:** Achievement vs. growth vs. social

### Social Features
- **Invite friends:** "초대하면 둘 다 3일 스트릭 보호권 받아요!"
- **Study groups:** Join virtual study rooms
- **Leaderboard:** Weekly top performers (opt-in)

### Adaptive Onboarding
- **Version A:** Short assessment (3Q) → Quick start
- **Version B:** Longer assessment (5Q) → More accurate level
- A/B test to find optimal length

### Micro-Commitments
- **After goal setting:** "매일 오전 9시에 알림 받을래요?" → Set specific reminder
- **After first lesson:** "내일도 같은 시간에 할까요?" → Schedule next session

---

## Appendix: Wireframe Legend

```
┌─────┐  Screen boundary
│     │  
└─────┘

[  Button  ]  Tappable button
[●Selected] [○Unselected]  Radio buttons
▓▓▓░░░  Progress bar (filled + empty)
💬 🎯 🔥  Emoji for visual clarity
[Animation: ...]  Motion/transition note
```
