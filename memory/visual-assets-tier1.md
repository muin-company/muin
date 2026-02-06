# Tier 1 도구 시각 자료 생성 작업

생성일: 2026-02-06
업데이트: 2026-02-06 15:32
상태: 준비 완료 (스크린샷/GIF 촬영 대기)

## 작업 개요

5개의 Tier 1 도구에 대한 시각 자료 생성:
1. roast - AI 코드 피드백
2. git-why - Git 커밋 분석
3. cron-explain - Cron 표현식 설명
4. json-to-types - JSON to TypeScript
5. curl-to-code - cURL to code

## 디렉토리 구조

✅ 생성 완료:
- `~/muin/apps/website/public/screenshots/{tool-name}/`
- `~/muin/apps/website/public/demos/{tool-name}/`

## 도구별 진행 상황

### 1. roast (CLI 도구)
- 타입: CLI, Node.js
- 위치: `~/muin/projects/roast`
- 설치: ✅ npm link 완료
- 상태: API 키 필요 (ANTHROPIC_API_KEY)

**특징:**
- AI 코드 리뷰어 (유머러스한 피드백)
- Claude API 사용
- 두 가지 모드: roast (기본), serious (--serious)

**스크린샷 시나리오:**
1. Help 화면: `roast --help`
2. 기본 사용: `roast examples/bad-code.js`
3. Serious 모드: `roast --serious examples/bad-code.js`
4. 여러 파일: `roast src/*.js`

**출력 예제 (README에서):**
```
🔥 CODE ROAST 🔥
Victim: bubble-sort.js (JavaScript)
──────────────────────────────────────────────────

🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use Array.prototype.toSorted() if you're on Node 20+
```

---

### 2. git-why (CLI 도구)
- 타입: CLI, Node.js
- 위치: `~/muin/projects/git-why`
- 설치: ✅ npm link 완료
- 상태: API 키 필요 (ANTHROPIC_API_KEY 또는 OPENAI_API_KEY)

**특징:**
- Git 히스토리 분석
- 특정 라인/파일/함수의 변경 이유 설명
- JSON 출력 지원

**스크린샷 시나리오:**
1. Help 화면: `git-why --help`
2. 특정 라인: `git-why src/auth.js:42`
3. 전체 파일: `git-why src/auth.js`
4. 함수 분석: `git-why --function validateUser src/auth.js`
5. Verbose 모드: `git-why --verbose src/auth.js:42`

---

### 3. cron-explain (CLI 도구) ✅
- 타입: CLI, Node.js
- 위치: `~/muin/projects/cron-explain`
- 설치: ✅ npm link 완료
- 상태: ✅ API 키 불필요, 즉시 사용 가능

**특징:**
- Cron 표현식 ↔️ 자연어 양방향 변환
- 예제 모음 제공
- 프리셋 지원 (@daily, @weekly 등)

**실제 테스트 완료:**

```bash
# Help
$ cron-explain --help
cron-explain - Convert between cron expressions and natural language

# Cron → 자연어
$ cron-explain "0 9 * * 1-5"
Input:  0 9 * * 1-5
Output: At 09:00 on Monday-Friday

$ cron-explain "*/15 * * * *"
Input:  */15 * * * *
Output: At every 15 minutes past every hour

$ cron-explain "0 */6 * * *"
Input:  0 */6 * * *
Output: At */6:00

$ cron-explain "@weekly"
Input:  @weekly
Output: At 00:00 on Sunday

# 자연어 → Cron
$ cron-explain "every Monday at 9am"
Input:  every Monday at 9am
Cron:   0 9 * * 1
Means:  At 09:00 on Monday

# 예제 모음
$ cron-explain --examples
Common Cron Patterns:

Every minute:        * * * * *
Every 15 minutes:    */15 * * * *
Every hour:          0 * * * *
Every day at noon:   0 12 * * *
Every Monday at 5am: 0 5 * * 1
Every weekday:       0 9 * * 1-5
First of month:      0 0 1 * *

Presets:
@hourly    ->  0 * * * *
@daily     ->  0 0 * * *
@weekly    ->  0 0 * * 0
@monthly   ->  0 0 1 * *
@yearly    ->  0 0 1 1 *
```

**스크린샷 시나리오:**
1. Help 화면 ✅
2. 간단한 표현식 변환 (매일 9시) ✅
3. 복잡한 표현식 (매 15분) ✅
4. 자연어 → Cron ✅
5. 예제 모음 화면 ✅

---

### 4. json-to-types (웹 도구)
- 타입: 웹 앱 (단일 HTML 파일)
- 위치: `~/muin/projects/json-to-types/index.html`
- 상태: 로컬 파일, 브라우저로 실행 가능

**특징:**
- JSON → TypeScript/Zod/Python 타입 변환
- 빌드 스텝 없음, 의존성 없음
- 클라이언트 사이드 동작

**스크린샷 시나리오:**
1. 초기 화면 (빈 상태)
2. JSON 입력 후 TypeScript 인터페이스 생성
3. JSON 입력 후 Zod 스키마 생성
4. 복잡한 중첩 객체 변환
5. 배열과 유니온 타입 처리

**테스트 JSON 예제:**
```json
{
  "user": {
    "id": 123,
    "profile": {
      "name": "John Doe",
      "email": "john@example.com",
      "tags": ["developer", "ai", "typescript"]
    },
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  }
}
```

---

### 5. curl-to-code (웹 도구)
- 타입: 웹 앱 (단일 HTML 파일)
- 위치: `~/muin/projects/curl-to-code/index.html`
- 상태: 로컬 파일, 브라우저로 실행 가능

**특징:**
- cURL 명령어 → 6개 언어 코드 변환 (Python, JavaScript, Go, PHP, Ruby, Node.js)
- 헤더, 인증, 바디 자동 처리
- 클라이언트 사이드 동작

**스크린샷 시나리오:**
1. 초기 화면 (빈 상태)
2. 간단한 GET 요청 변환
3. POST 요청 (JSON 바디 포함) 변환
4. 인증 헤더 포함 요청 변환
5. 여러 언어 탭 (Python, JavaScript, Go)

**테스트 cURL 예제:**
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token123' \
  -d '{"name":"John Doe","email":"john@example.com","role":"admin"}'
```

---

## 다음 단계

### CLI 도구 (roast, git-why, cron-explain)

1. **API 키 설정 (roast, git-why):**
   ```bash
   export ANTHROPIC_API_KEY="your-key-here"
   ```

2. **스크린샷 촬영 가이드:**
   - 터미널 설정:
     - 폰트: Monaco 또는 Menlo, 14-16pt
     - 테마: One Dark Pro 또는 Dracula (다크)
     - 배경: 약간의 투명도 (90-95%)
     - 터미널 크기: 100x30 정도
   
   - 캡처 방법:
     - macOS: `Cmd+Shift+4` → 영역 선택
     - 또는 iTerm2 내장 스크린샷 기능 사용
     - 파일명: `{tool-name}-{scenario}-{01-04}.png`
   
   - 저장 위치:
     ```
     ~/muin/apps/website/public/screenshots/roast/
     ~/muin/apps/website/public/screenshots/git-why/
     ~/muin/apps/website/public/screenshots/cron-explain/
     ```

3. **asciinema 데모 녹화:**
   ```bash
   # 설치
   brew install asciinema
   
   # 녹화
   asciinema rec ~/muin/apps/website/public/demos/cron-explain/demo.cast
   
   # 명령어 실행 후 Ctrl+D로 종료
   
   # GIF 변환 (필요시)
   # npm install -g asciicast2gif
   # asciicast2gif demo.cast demo.gif
   ```

### 웹 도구 (json-to-types, curl-to-code)

1. **브라우저 스크린샷:**
   - 브라우저: Chrome 또는 Safari
   - 화면 크기: 1920x1080 또는 1440x900
   - 개발자 도구: 닫기
   - 줌 레벨: 100% (Cmd+0)
   
   - 촬영 순서:
     1. 파일 열기: `open ~/muin/projects/{tool-name}/index.html`
     2. 초기 화면 캡처
     3. 예제 입력
     4. 결과 화면 캡처 (각 출력 타입별)
     5. 다양한 시나리오 반복
   
   - 저장 위치:
     ```
     ~/muin/apps/website/public/screenshots/json-to-types/
     ~/muin/apps/website/public/screenshots/curl-to-code/
     ```

2. **화면 녹화 (데모 GIF):**
   - macOS: QuickTime Player → 새로운 화면 기록
   - 또는: `screencapture -v output.mov`
   - GIF 변환: `ffmpeg -i demo.mov -vf "fps=10,scale=800:-1" demo.gif`

---

## OG 이미지 확인

각 프로젝트의 `og-image.png` 또는 `public/og.png` 확인 필요:

- [ ] roast: `~/muin/projects/roast/og-image.png`
- [ ] git-why: `~/muin/projects/git-why/og-image.png`
- [ ] cron-explain: `~/muin/projects/cron-explain/og-image.png`
- [ ] json-to-types: `~/muin/projects/json-to-types/og-image.png`
- [ ] curl-to-code: `~/muin/projects/curl-to-code/og-image.png`

OG 이미지 요구사항:
- 크기: 1200x630px
- 포맷: PNG 또는 JPG
- 내용: 도구 이름, 간단한 설명, 예제 또는 스크린샷
- 스타일: 깔끔하고 읽기 쉽게

---

## 완료된 작업

### ✅ 디렉토리 구조 생성
```
~/muin/apps/website/public/
├── screenshots/
│   ├── roast/
│   ├── git-why/
│   ├── cron-explain/
│   ├── json-to-types/
│   └── curl-to-code/
└── demos/
    ├── roast/
    ├── git-why/
    ├── cron-explain/
    ├── json-to-types/
    └── curl-to-code/
```

### ✅ 예제 출력 파일 생성

**cron-explain (4개 파일):**
- example-01-help.txt
- example-02-basic.txt
- example-03-natural-to-cron.txt
- example-04-examples.txt

**roast (3개 파일):**
- example-01-help.txt
- example-02-roast-mode.txt
- example-03-serious-mode.txt

**git-why (2개 파일):**
- example-01-help.txt
- example-02-line-analysis.txt

**json-to-types (3개 파일):**
- example-input-01.json
- example-output-01-typescript.ts
- example-output-01-zod.ts

**curl-to-code (3개 파일):**
- example-input-01.sh
- example-output-01-python.py
- example-output-01-javascript.js

### ✅ 문서 작성
- SCREENSHOT_GUIDE.md: 스크린샷 촬영 가이드 (완전한 단계별 지침)
- visual-assets-tier1.md: 작업 진행 상황 및 요구사항

---

## 체크리스트

### cron-explain ✅✅✅
- [x] CLI 설치 완료
- [x] 실제 테스트 완료
- [x] 사용 예제 확보 (4개 파일)
- [ ] 터미널 스크린샷 4장 (준비됨 - SCREENSHOT_GUIDE.md 참조)
- [ ] asciinema 데모 녹화 (스크립트 준비됨)
- [ ] OG 이미지 확인/생성

### roast ✅✅
- [x] CLI 설치 완료
- [x] 사용 예제 확보 (3개 파일, README 기반)
- [ ] API 키 설정 (실제 실행 필요시)
- [ ] 터미널 스크린샷 4장 (준비됨 - SCREENSHOT_GUIDE.md 참조)
- [ ] asciinema 데모 녹화 (스크립트 준비됨)
- [ ] OG 이미지 확인/생성

### git-why ✅✅
- [x] CLI 설치 완료
- [x] 사용 예제 확보 (2개 파일, README 기반)
- [ ] API 키 설정 (실제 실행 필요시)
- [ ] 터미널 스크린샷 4장 (준비됨 - SCREENSHOT_GUIDE.md 참조)
- [ ] asciinema 데모 녹화 (스크립트 준비됨)
- [ ] OG 이미지 확인/생성

### json-to-types ✅✅
- [x] 프로젝트 위치 확인
- [x] 예제 파일 준비 (3개 파일)
- [ ] 브라우저에서 테스트
- [ ] 스크린샷 4장 (준비됨 - SCREENSHOT_GUIDE.md 참조)
- [ ] 사용 데모 GIF (가이드 준비됨)
- [ ] OG 이미지 확인/생성

### curl-to-code ✅✅
- [x] 프로젝트 위치 확인
- [x] 예제 파일 준비 (3개 파일)
- [ ] 브라우저에서 테스트
- [ ] 스크린샷 4장 (준비됨 - SCREENSHOT_GUIDE.md 참조)
- [ ] 사용 데모 GIF (가이드 준비됨)
- [ ] OG 이미지 확인/생성

---

## 참고사항

- **API 키 관리**: roast, git-why는 실제 API 호출이 필요하므로 비용 발생 가능
- **터미널 테마**: 다크 모드 우선, 라이트 모드는 선택사항
- **파일 크기**: 스크린샷은 PNG (최적화), GIF는 800px 너비 이하로 제한
- **일관성**: 모든 스크린샷의 터미널 설정 동일하게 유지

---

## 완료 기준

- [ ] 5개 도구 각각 스크린샷 3-4장
- [ ] 5개 도구 각각 데모 GIF 1개
- [ ] OG 이미지 5개 확인 또는 생성
- [ ] 모든 파일이 올바른 위치에 저장
- [ ] README나 문서에 스크린샷 링크 추가 (선택사항)
