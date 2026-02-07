# MUIN Product Roadmap 2026

**Last Updated:** 2026-02-07  
**Owner:** MJ (COO)  
**Reviewed by:** ONE (CEO)

---

## Executive Summary

MUIN은 AI-first 개발자 도구와 교육 제품을 만드는 무인기업입니다. 현재 4개 주요 제품이 출시되었고, 24개 개발자 도구 포트폴리오가 운영 중입니다. 2026 Q1 목표는 검시AI 런칭과 개발자 도구 확장을 통한 월 매출 ₩10M 달성입니다.

**핵심 전략:**
- ✅ **AI-first:** 모든 제품에 AI 적용, 사람 코치/튜터 없음
- ✅ **Speed over perfection:** MVP → 시장 피드백 → 개선
- ✅ **Korean market first, then global:** 한국어 시장 검증 후 글로벌 확장
- ✅ **Freemium model:** 무료로 바이럴, 프리미엄으로 수익화

---

## Current Products (Shipped)

### 1. 검시AI (GumsiAI) - AI 검정고시 튜터

**Status:** 📋 **Planning Complete** → 🚀 **Ready to Build**

**What it is:**
- AI 기반 검정고시 학습 튜터
- 24/7 실시간 질문 답변
- 개인 맞춤 학습 경로
- 기출문제 풀이 + 해설

**Current Status:**
- ✅ Business plan complete
- ✅ Market research done (연 2만명+ 응시자, 성장 중)
- ✅ Competitor analysis complete (에듀윌, 시대에듀 등)
- ⏳ MVP design in progress
- ❌ Development not started

**Market Opportunity:**
- TAM: ₩225억/년 (검정고시 시장)
- Target: 5,000명 유저 (1년차)
- Revenue: ₩3.6억/년 (₩19,900/월 x 30% 전환)

**Next Steps:**
1. ✅ Domain: gumsi.muin.company 또는 gumsi.ai
2. 🔨 MVP 개발 (4주): AI 튜터 챗봇 + 기출문제 DB
3. 🧪 베타 테스트 (50-100명)
4. 🚀 런칭 (2026년 3월 목표)

**Dependencies:**
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (AI 튜터)
- Supabase 계정 (DB + Auth)
- 기출문제 데이터 수집 (최근 5년)

**Blockers:**
- ⚠️ API 비용 최적화 필요 (목표: ₩5,000/학생/월)
- ⚠️ 기출문제 저작권 확인 필요

---

### 2. muin.company - 회사 웹사이트

**Status:** ✅ **Shipped & Live**

**What it is:**
- MUIN 공식 웹사이트
- 블로그 (Day N 시리즈)
- 개발자 도구 카탈로그
- 회사 소개 및 비전

**Current Status:**
- ✅ Live at https://muin.company
- ✅ SSL enabled
- ✅ Blog posts (Day 0-4)
- ✅ Tools catalog (20 tools)
- ✅ English/Korean content

**Traffic (추정):**
- ~500 방문자/월 (초기)
- Primary sources: X (Twitter), HackerNews, Dev.to

**Next Steps:**
1. 📝 SEO 최적화 (meta tags, sitemap)
2. 📊 Analytics 추가 (Plausible or Simple Analytics)
3. 📰 블로그 콘텐츠 확대 (주 2회 발행)
4. 🎨 Tools 페이지 개선 (interactive demos)
5. 💌 Newsletter 구독 기능 추가

**Q1 Goals:**
- 2,000 monthly visitors
- 100 newsletter subscribers
- Top 10 in "AI company" search (Korean)

---

### 3. 할일봇 (TodoBot) - Telegram 할일 관리 봇

**Status:** ✅ **Shipped & Running**

**What it is:**
- Telegram 기반 AI 할일 관리 봇
- 자연어 처리 (GPT-4o-mini)
- 스마트 날짜 파싱
- 일일 요약 (매일 오전 9시)

**Current Status:**
- ✅ v1.0 shipped
- ✅ GitHub: https://github.com/muin-company/todobot
- ✅ Documentation complete (README, SETUP_GUIDE, PROJECT_SUMMARY)
- ✅ 3 deployment options (Railway, Render, Docker)
- ✅ Test suite passing (100% coverage)

**Users:**
- 현재 사용자: 1명 (ONE)
- Target: 100명 (Q1), 1,000명 (Q2)

**Next Steps:**
1. 🎯 Public beta launch (Product Hunt)
2. 📱 Web dashboard (Next.js)
3. 🔁 반복 할일 기능 (매일, 매주)
4. 👥 그룹 채팅 지원 (팀 할일 공유)
5. 📈 통계 & 리포트

**Monetization (Future):**
- Free: 50 할일/월
- Pro (₩5,000/월): 무제한 할일, 우선순위, 통계
- Team (₩20,000/월): 팀 공유, 관리자 기능

**Revenue Target (2026 Q2):**
- 1,000 users x 10% conversion x ₩5,000 = ₩500,000/월

---

### 4. ReplyKingAI - 소셜미디어 댓글 관리 AI

**Status:** 🚧 **In Development**

**What it is:**
- YouTube, Instagram, Twitter 댓글 자동 분석
- AI 기반 답변 생성
- 템플릿 관리
- 감정 분석 & 우선순위 정렬

**Current Status:**
- ✅ API specification complete
- ✅ Database schema designed
- ✅ Competitor research done (Grok, manual tools)
- ⏳ Backend development 50%
- ❌ Frontend not started

**Market Opportunity:**
- TAM: ₩2조+ (소셜미디어 마케팅 도구 시장)
- Target: 크리에이터, 소규모 비즈니스, 인플루언서

**Next Steps:**
1. 🔨 Backend API 완성 (2주)
2. 🎨 Frontend dashboard (Next.js, 3주)
3. 🧪 베타 테스트 (YouTube 크리에이터 10명)
4. 🚀 런칭 (2026년 3월)

**Pricing:**
- Free: 100 댓글/월 분석
- Starter (₩29,000/월): 1,000 댓글/월, 자동 답변
- Pro (₩99,000/월): 무제한, 템플릿, 분석

**Revenue Target (2026 Q2):**
- 200 Starter users x ₩29,000 = ₩5,800,000/월
- 50 Pro users x ₩99,000 = ₩4,950,000/월
- **Total: ₩10,750,000/월**

**Dependencies:**
- YouTube Data API key
- Instagram Graph API access
- Twitter API v2 access
- `OPENAI_API_KEY` (댓글 분석)

**Blockers:**
- ⚠️ Instagram API approval 필요 (비즈니스 계정 검증)
- ⚠️ Twitter API 비용 (Basic tier $100/월)

---

### 5. Developer Tools (24 tools) - 개발자 유틸리티 포트폴리오

**Status:** ✅ **20 Tools Shipped, 4 In Progress**

#### **Shipped Tools (20):**

**CLI Tools (11):**
1. ✅ **roast** - AI 코드 리뷰어
2. ✅ **oops** - 에러 해결사
3. ✅ **cron-explain** - Cron 표현식 변환기
4. ✅ **git-why** - Git 히스토리 설명 도구
5. ✅ **depcheck-lite** - 사용하지 않는 의존성 찾기
6. ✅ **lockcheck** - Lockfile 보안 스캐너
7. ✅ **bundlesize** - 번들 크기 모니터링
8. ✅ **envdiff** - .env 파일 비교 도구
9. ✅ **gitig** - .gitignore 생성 도구
10. ✅ **licensecheck** - 라이선스 스캐너
11. ✅ **commitlint-lite** - 커밋 메시지 린터

**Web Tools (7):**
12. ✅ **json-to-types** - JSON → TypeScript/Zod 변환
13. ✅ **curl-to-code** - cURL → 코드 변환 (6개 언어)
14. ✅ **cron-explain (web)** - Cron 표현식 변환 웹 도구
15. ✅ **tsconfig-helper** - tsconfig.json 도우미
16. ✅ **pkgsize** - npm 패키지 크기 확인
17. ✅ **readme-gen** - README 자동 생성
18. ✅ **portguard** - 포트 모니터 및 관리

**Chrome Extensions (2):**
19. ✅ **Tab Bankruptcy** - 오래된 탭 자동 닫기
20. ✅ **Copy as Markdown** - 페이지 내용 → Markdown 복사

#### **In Progress (4):**

21. ⏳ **ai-audit** - AI 사용 코드베이스 감사
22. ⏳ **muin-guard** - AI 대화 보호 Chrome 확장 (v0.3.0 in review)
23. ⏳ **muin-guard-bot** - MUIN Guard Telegram 봇
24. ⏳ **unenv** - .env 파일 관리자 (sync, validate)

**Current Status:**
- ✅ 20 tools live and published
- ✅ All tools have comprehensive README
- ✅ GitHub repos created
- ⏳ npm packages published (11/11 CLI tools)
- ⏳ Chrome Web Store submission (1/2 extensions)

**Usage Stats (Estimated):**
- Total downloads: ~2,000 (all tools combined)
- Most popular: `json-to-types` (~500 uses/month)
- GitHub stars: ~150 total

**Next Steps:**

**Week 1 (Feb 8-14):**
1. 🚀 Finish remaining 4 tools
2. 📦 Publish all npm packages
3. 🌐 Submit Chrome extensions to store
4. 📝 Write announcement blog post

**Month 1 (Feb):**
1. 🎯 Product Hunt launch (1 tool/week)
2. 📊 Add usage analytics (optional telemetry)
3. 🐛 Bug fixes based on user feedback
4. 📚 Video tutorials (YouTube Shorts)

**Month 2-3 (Mar-Apr):**
1. 🔧 Premium features for select tools (bundle analysis, AI explanations)
2. 💰 Monetization experiment (freemium model)
3. 🎨 Unified branding across all tools
4. 🌍 Internationalization (English + Korean)

**Expansion Plans:**

**Q1 2026 (New Tools):**
- **git-undo** - Interactive undo for git mistakes
- **secretscan** - Scan for accidentally committed secrets
- **explain-cli** - Pipe any command → AI explanation
- **regex-tester (web)** - Regex tester with highlighting

**Q2 2026 (Platform):**
- **MUIN Tools Hub** - Central platform for all tools
- **VS Code Extension** - Bundle popular tools in VS Code
- **API access** - API for tools (json-to-types, curl-to-code, etc.)

**Monetization Strategy:**

**Free Tier:**
- All basic functionality
- Community support
- GitHub/npm downloads

**Pro Tier (₩10,000/월 or $10/월):**
- Advanced features (AI-powered explanations)
- Priority support
- No rate limits
- Early access to new tools

**Enterprise (Custom pricing):**
- On-premise deployment
- Custom integrations
- SLA support
- Team management

**Revenue Target:**
- Q1 2026: ₩1M/월 (100 Pro users)
- Q2 2026: ₩5M/월 (500 Pro users)
- Q4 2026: ₩20M/월 (2,000 Pro users)

**Dependencies:**
- GitHub Actions (CI/CD)
- npm account (package publishing)
- Chrome Developer account ($5 one-time)
- Domain: muin.company (already owned)

---

## Next 7 Days (Feb 8-14, 2026)

### **Prioritized Task List**

#### **Day 1 (Feb 8, Sat) - 검시AI Kickoff**
- [ ] Domain 확보: `gumsi.ai` 구매 또는 `gumsi.muin.company` 설정
- [ ] Figma 와이어프레임 작성 (AI 튜터 챗봇 UI)
- [ ] Supabase 프로젝트 생성
- [ ] 기출문제 수집 시작 (최근 3년, 국/영/수/사/과)

#### **Day 2-3 (Feb 9-10, Sun-Mon) - 검시AI MVP Backend**
- [ ] Supabase DB 스키마 설계 (users, questions, answers, progress)
- [ ] Claude API 통합 (튜터 챗봇)
- [ ] 기출문제 임베딩 (벡터 검색)
- [ ] REST API 엔드포인트 (질문/답변, 진도 저장)

#### **Day 4-5 (Feb 11-12, Tue-Wed) - 검시AI MVP Frontend**
- [ ] Next.js 프로젝트 생성
- [ ] 챗봇 UI 구현 (채팅 인터페이스)
- [ ] 기출문제 풀이 페이지
- [ ] 진도 대시보드

#### **Day 6 (Feb 13, Thu) - Developer Tools Cleanup**
- [ ] 미완성 도구 4개 완성 (ai-audit, muin-guard, muin-guard-bot, unenv)
- [ ] 모든 npm 패키지 버전 체크 및 업데이트
- [ ] Chrome 확장 프로그램 스토어 제출

#### **Day 7 (Feb 14, Fri) - ReplyKingAI Backend Sprint**
- [ ] Backend API 완성 (댓글 분석, 템플릿 매칭)
- [ ] YouTube API 통합 테스트
- [ ] Webhook 설정 (댓글 수신)

**Dependencies for Week:**
- ✅ `OPENAI_API_KEY` 또는 `ANTHROPIC_API_KEY` (이미 있음)
- ⏳ Supabase 계정 생성 (무료)
- ⏳ YouTube Data API key 발급
- ⏳ `gumsi.ai` 도메인 구매 ($12/년)
- ⏳ Chrome Developer 계정 ($5 one-time)

**Blockers:**
- ⚠️ 기출문제 저작권 확인 필요 (법적 검토)
- ⚠️ ONE의 검시AI 디자인 승인 필요

**Daily Standup (MJ → ONE via Telegram):**
- **매일 18:00** - 진행 상황 보고
- **매일 22:00** - 다음날 계획 공유

---

## Next 30 Days (Feb 8 - Mar 9, 2026)

### **Product Improvements**

**검시AI:**
- ✅ MVP 개발 완료 (Week 1-2)
- 🧪 베타 테스트 (Week 3)
- 🚀 소프트 런칭 (Week 4)
- 📊 첫 50명 유저 확보
- 📝 합격 후기 1건 이상

**muin.company:**
- 📰 블로그 포스팅 8회 (주 2회)
- 📊 Analytics 추가
- 🎨 Tools 페이지 인터랙티브 데모
- 📧 Newsletter 구독 기능

**할일봇:**
- 🎯 Product Hunt 런칭
- 📱 Web dashboard beta
- 🔁 반복 할일 기능
- 📊 사용자 통계 페이지

**ReplyKingAI:**
- 🔨 Backend API 100% 완성
- 🎨 Frontend dashboard alpha
- 🧪 YouTube 크리에이터 5명 베타 테스트
- 📊 첫 10개 댓글 자동 답변 성공

**Developer Tools:**
- 📦 24개 도구 모두 publish
- 🎯 Product Hunt 런칭 (1 tool/week x 4)
- 📺 YouTube 튜토리얼 5개
- 📈 npm downloads 5,000+

---

### **New Products to Build**

**Priority 1 (High Impact, Quick Build):**

1. **AI Audit** (완성도: 60%)
   - AI 사용 코드베이스 감사
   - ChatGPT, Claude 사용 흔적 탐지
   - 비용 추정 및 최적화 제안
   - **Build time:** 2일
   - **Launch:** Week 2

2. **MUIN Guard** (완성도: 80%)
   - AI 대화 보호 Chrome 확장
   - PII, API 키, 위험 명령어 탐지
   - Chrome Web Store 제출 준비 완료
   - **Build time:** 1일
   - **Launch:** Week 1

3. **Git-Undo** (완성도: 0%)
   - Interactive undo for git mistakes
   - 실수 복구 자동화
   - **Build time:** 1일
   - **Launch:** Week 3

**Priority 2 (Strategic):**

4. **SecretScan** (완성도: 0%)
   - 코드베이스 시크릿 스캔
   - GitHub Actions 통합
   - **Build time:** 2일
   - **Launch:** Week 4

5. **Explain-CLI** (완성도: 0%)
   - Any command → AI explanation
   - Pipe support: `ls -la | explain`
   - **Build time:** 1일
   - **Launch:** Month 2

**Priority 3 (Exploration):**

6. **MUIN Vault** (European AI)
   - EU-only AI assistant
   - GDPR-compliant
   - Open-source models (Mistral, Qwen)
   - **Build time:** 2주
   - **Launch:** Q2 2026

---

### **Marketing Milestones**

**Week 1-2:**
- [ ] 검시AI 런칭 준비 (랜딩페이지, 베타 신청)
- [ ] X (Twitter) 포스팅 10회 (검시AI 티저)
- [ ] 네이버 카페 리서치 (검정고시 커뮤니티)

**Week 3:**
- [ ] 검시AI 베타 테스트 모집 (50명)
- [ ] Product Hunt 첫 런칭 (Developer Tool 1개)
- [ ] Dev.to 블로그 포스팅 2회

**Week 4:**
- [ ] 검시AI 소프트 런칭
- [ ] HackerNews Show HN 포스팅 (검시AI)
- [ ] YouTube 숏폼 3개 (AI 검정고시 문제 푸는 영상)

**Marketing Channels:**

| Channel | Target Audience | Frequency | Cost |
|---------|----------------|-----------|------|
| X (Twitter) | Developers, AI enthusiasts | Daily | Free |
| Product Hunt | Early adopters | 1/week | Free |
| HackerNews | Developers | 1/month | Free |
| Dev.to | Developers | 2/week | Free |
| YouTube Shorts | Students, developers | 3/week | Free |
| 네이버 카페 | 검정고시 수험생 | 2/week | Free |
| Reddit (r/devtools) | Developers | 1/week | Free |

**Content Calendar (30 days):**

| Date | Content | Platform | Goal |
|------|---------|----------|------|
| Feb 8 | 검시AI 티저 | X, 블로그 | Awareness |
| Feb 10 | Developer Tools 종합 | Dev.to | Traffic |
| Feb 12 | JSON-to-Types PH 런칭 | Product Hunt | Users |
| Feb 15 | 검시AI 베타 모집 | X, 네이버 카페 | Signups |
| Feb 18 | 할일봇 PH 런칭 | Product Hunt | Users |
| Feb 20 | "6일 만에 20개 도구" | HackerNews | Backlinks |
| Feb 25 | 검시AI 소프트 런칭 | All channels | Users |
| Mar 1 | ReplyKingAI 티저 | X, YouTube | Awareness |

---

## Q1 2026 Goals (Jan-Mar)

### **Revenue Targets**

| Product | Users | Conversion | ARPU | Monthly Revenue |
|---------|-------|------------|------|-----------------|
| 검시AI | 500 | 20% | ₩19,900 | ₩1,990,000 |
| 할일봇 | 200 | 10% | ₩5,000 | ₩100,000 |
| ReplyKingAI | 50 | 40% | ₩50,000 | ₩1,000,000 |
| Developer Tools | 200 | 5% | ₩10,000 | ₩100,000 |
| **Total** | **950** | - | - | **₩3,190,000/월** |

**Q1 Revenue Goal: ₩10M cumulative**
- January: ₩500K (baseline)
- February: ₩2M (검시AI beta)
- March: ₩3.2M (검시AI launch)
- **Q1 Total: ₩5.7M** (57% of goal)

**Stretch Goal: ₩15M** (150% of goal)

---

### **User Acquisition Targets**

| Product | Q1 Target | Channel Strategy |
|---------|-----------|------------------|
| 검시AI | 500 free + 100 paid | 네이버 카페, YouTube, 바이럴 |
| 할일봇 | 200 free + 20 paid | Product Hunt, Telegram communities |
| ReplyKingAI | 50 free + 20 paid | YouTube 크리에이터 직접 연락 |
| Developer Tools | 5,000 downloads + 10 paid | Product Hunt, HackerNews, Dev.to |

**Total Users: 5,750+ (free + paid)**

---

### **Product Portfolio Expansion**

**Q1 Product Count:**
- ✅ Shipped: 24 products
- 🚀 New: 5-10 products
- **Q1 Total: 30-35 products**

**New Product Categories:**
- ✅ Education (검시AI)
- ✅ SaaS Tools (ReplyKingAI)
- ✅ Developer Tools (24 tools)
- 🆕 Security (MUIN Guard, SecretScan)
- 🆕 AI Safety (AI Audit)

---

## Product Principles

### 1. **AI-first (No human coaches)**

**Why:**
- 인건비 0 → 파괴적 가격 가능
- 24/7 운영 가능
- 무한 확장 가능

**Implementation:**
- 모든 제품에 LLM 통합 (Claude, GPT-4)
- 사람은 전략/승인만, 실행은 AI
- 고객 응대도 AI (챗봇, 이메일)

**Examples:**
- 검시AI: AI 튜터만, 사람 강사 없음
- ReplyKingAI: AI가 댓글 답변 생성
- 할일봇: AI가 자연어 파싱

---

### 2. **Speed over perfection**

**Why:**
- 시장 피드백 > 완벽한 계획
- Fast iteration > slow planning
- 실패 빠르게, 배우기 빠르게

**Implementation:**
- MVP 2주 이내
- Beta 1주 이내
- Launch 4주 이내

**Examples:**
- 할일봇: 2시간 개발, 바로 배포
- Developer Tools: 24시간 빌드
- 검시AI: 4주 MVP → 런칭

**Metrics:**
- Idea → MVP: < 2 weeks
- MVP → Beta: < 1 week
- Beta → Launch: < 2 weeks
- **Total: < 5 weeks** (idea to market)

---

### 3. **Korean market first, then global**

**Why:**
- 경쟁 낮음 (AI 제품 초기 단계)
- 언어 장벽 (한국어 AI 적합성 높음)
- 빠른 검증 가능

**Implementation:**
- 모든 제품 한국어 우선
- 한국 시장 PMF 확인 후 영어 버전
- 글로벌은 Q2-Q3

**Examples:**
- 검시AI: 한국 검정고시 → 글로벌 GED/SAT
- 할일봇: 한국어 → 영어/일본어
- ReplyKingAI: 한국 크리에이터 → 글로벌

**Timeline:**
- Q1: Korean only
- Q2: Korean + English
- Q3: Multi-language (JP, CN)

---

### 4. **Freemium model**

**Why:**
- 바이럴 확산 (무료)
- 수익화 (유료 전환)
- 낮은 진입 장벽

**Implementation:**
- Free tier: 충분히 유용하게
- Paid tier: 파워유저 기능
- Enterprise: 맞춤형

**Conversion Targets:**
- 검시AI: 20% (무료 → 유료)
- 할일봇: 10%
- ReplyKingAI: 40%
- Developer Tools: 5%

**Free → Paid Triggers:**
- 사용량 제한 (검시AI: 하루 5질문)
- 고급 기능 (할일봇: 통계, 반복 할일)
- 우선 지원 (ReplyKingAI: 빠른 답변)

---

## Success Metrics

### **Product Metrics**

| Metric | Q1 Target | Measure |
|--------|-----------|---------|
| Products shipped | 30+ | Count |
| Total users (free) | 5,000+ | Signups |
| Paying users | 150+ | Subscriptions |
| Monthly revenue | ₩10M+ | MRR |
| User retention (30-day) | 40%+ | Cohort analysis |
| NPS | 40+ | Survey |

### **Marketing Metrics**

| Metric | Q1 Target | Measure |
|--------|-----------|---------|
| Website traffic | 5,000/월 | Google Analytics |
| Newsletter subscribers | 200+ | Email list |
| Twitter followers | 500+ | @muincompany |
| Product Hunt followers | 100+ | PH profile |
| GitHub stars (total) | 500+ | All repos |

### **Operational Metrics**

| Metric | Q1 Target | Measure |
|--------|-----------|---------|
| Code commits | 1,000+ | GitHub |
| Blog posts | 24+ | muin.company/blog |
| Customer support response | < 2h | Average |
| Uptime | 99.9%+ | StatusPage |

---

## Risks & Mitigation

### **Technical Risks**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API 비용 폭등 | High | Medium | 캐싱, 로컬 모델 대비 |
| 서버 장애 | Medium | Low | Supabase auto-scaling |
| AI 답변 오류 | High | Medium | 검증 시스템, 사람 리뷰 |

### **Market Risks**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| 대형 업체 진입 | High | Low | 속도, 가격 경쟁력 |
| 규제 변화 | Medium | Medium | 법률 자문, B2B 대비 |
| 유료 전환 저조 | High | Medium | 프리미엄 기능 강화 |

### **Operational Risks**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ONE 부재 시 의사결정 | Medium | Low | 명확한 권한 위임 |
| 자금 부족 | High | Low | 비용 최소화, 무료 도구 |
| 번아웃 | Medium | Medium | 자동화, 우선순위 관리 |

---

## Conclusion

MUIN은 2026 Q1에 **4개 제품 런칭**과 **24개 개발자 도구 포트폴리오 완성**을 목표로 합니다. AI-first 전략으로 빠르게 제품을 출시하고, 한국 시장에서 PMF를 찾은 후 글로벌로 확장합니다.

**핵심 성공 요인:**
1. ✅ **Speed** - 빠른 MVP, 빠른 피드백, 빠른 개선
2. ✅ **AI-first** - 모든 제품에 AI 적용, 사람 비용 0
3. ✅ **Freemium** - 무료로 바이럴, 유료로 수익화
4. ✅ **Korean first** - 한국 시장 검증 후 글로벌

**Next Immediate Action:**
1. 🚀 검시AI domain 확보 (today)
2. 🔨 검시AI MVP 개발 시작 (this weekend)
3. 📦 Developer Tools 마무리 (this week)
4. 🎯 Product Hunt 첫 런칭 (next week)

**Let's build. 🚀**

---

*Document owner: MJ (COO)*  
*Reviewed: ONE (CEO)*  
*Last updated: 2026-02-07*
