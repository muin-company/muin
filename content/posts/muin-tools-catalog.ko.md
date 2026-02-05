---
title: "MUIN 도구 카탈로그: 우리가 만든 개발자 도구 20개"
date: 2026-02-06
draft: false
tags: ["muin", "tools", "developer", "open-source"]
---

# MUIN 도구 카탈로그: 우리가 만든 개발자 도구 20개

개발자 도구 20개를 만들었습니다. 뭘 만들었고 어떻게 쓰는지 정리했습니다.

---

## CLI 도구

### roast
유머 섞인 AI 코드 리뷰어. 코드에 대한 솔직한 피드백을 받으세요.

```bash
npm install -g @muin/roast
roast src/
```

**예시:**
```bash
$ roast index.js
🔥 이 함수는 중간관리자보다 책임이 많네요
🔥 상태를 제안처럼 다루시네요, 계약서가 아니라
🔥 에러 핸들링? 들어본 적 없어요
```

[GitHub](https://github.com/muin-company/roast)

---

### oops
에러 메시지 해결사. 에러를 붙여넣으면 해결책을 알려줍니다.

```bash
npm install -g @muin/oops
oops "TypeError: Cannot read property 'map' of undefined"
```

**예시:**
```bash
$ oops "EADDRINUSE: address already in use :::3000"
✓ 포트 3000이 이미 사용 중입니다
→ 해결책 1: 포트 3000을 사용하는 프로세스 종료
  $ lsof -ti:3000 | xargs kill -9
→ 해결책 2: 다른 포트 사용
  $ PORT=3001 npm start
```

[GitHub](https://github.com/muin-company/oops)

---

### cron-explain
Cron 표현식 변환기. Cron 문법을 사람이 읽을 수 있는 언어로 번역합니다.

```bash
npm install -g @muin/cron-explain
cron-explain "0 */6 * * *"
```

**예시:**
```bash
$ cron-explain "0 9 * * 1-5"
평일 오전 9시마다
```

웹 도구로도 제공: [muin.company/tools/cron-explain](https://muin.company/tools/cron-explain/)

[GitHub](https://github.com/muin-company/cron-explain)

---

### unenv
.env 파일 관리자. 환경 변수를 정리하고, 검증하고, 동기화합니다.

```bash
npm install -g @muin/unenv
unenv sync
```

**예시:**
```bash
$ unenv validate
✓ 필수 변수 모두 존재
✗ 누락: DATABASE_URL
✗ 잘못된 형식: API_KEY (예상 형식: sk-...)
```

[GitHub](https://github.com/muin-company/unenv)

---

### git-why
Git 히스토리 설명 도구. 이 코드가 왜 존재하는지 이해할 수 있습니다.

```bash
npm install -g @muin/git-why
git-why src/index.js:42
```

**예시:**
```bash
$ git-why utils.js:15
📝 커밋 a3f2c1에서 추가: "이벤트 핸들러의 경쟁 상태 수정"
👤 작성자: jane@example.com
📅 2개월 전
🔗 이슈 #127 관련: 사용자가 중복 이벤트를 경험하는 문제
```

[GitHub](https://github.com/muin-company/git-why)

---

### portguard
포트 모니터 및 관리자. 어떤 프로세스가 어디서 실행 중인지 확인하고, 포트로 프로세스를 종료합니다.

```bash
npm install -g @muin/portguard
portguard status
```

**예시:**
```bash
$ portguard status
3000 → node (PID 1234) - Next.js 개발 서버
5432 → postgres (PID 5678) - PostgreSQL
8080 → java (PID 9012) - Spring Boot 앱

$ portguard kill 3000
✓ 포트 3000의 프로세스 1234 종료됨
```

[GitHub](https://github.com/muin-company/portguard)

---

### readme-gen
프로젝트 구조를 분석해서 README 파일을 자동 생성합니다.

```bash
npm install -g readme-gen
readme-gen
```

**예시:**
```bash
$ readme-gen
Analyzing project...
Detected project type: node
README generated: README.md

$ cat README.md
# my-project
Node.js project with Express
...
```

[GitHub](https://github.com/muin-company/readme-gen)

---

### depcheck-lite
사용하지 않는 의존성 찾기. 빠르고 가벼운 정규식 기반 검사.

```bash
npm install -g depcheck-lite
depcheck-lite
```

**예시:**
```bash
$ depcheck-lite
Found 2 unused dependencies:

  - lodash
  - moment

Total: 2/47
(0.3 seconds)
```

[GitHub](https://github.com/muin-company/depcheck-lite)

---

### lockcheck
Lockfile 보안 스캐너. 의심스러운 레지스트리, 누락된 해시, 중복 버전 감지.

```bash
npm install -g lockcheck
lockcheck
```

**예시:**
```bash
$ lockcheck
⚠️  Warnings:

  - Package evil-package@1.0.0 uses non-standard registry
    URL: https://malicious-registry.com/evil-package/-/evil-package-1.0.0.tgz
  - Package lodash has 2 different versions: 4.17.20, 4.17.21

$ lockcheck --strict  # CI에서 경고를 에러로 처리
```

[GitHub](https://github.com/muin-company/lockcheck)

---

### bundlesize
번들 크기 모니터링. 빌드가 비대해지기 전에 잡아냅니다.

```bash
npm install --save-dev @muin/bundlesize
npx bundlesize --init
```

**예시:**
```bash
$ npx bundlesize
Bundle Size Check Results:

File                     Raw          Gzip         Limit        Status
------------------------ ------------ ------------ ------------ ------
dist/main.abc123.js      245.67KB     89.34KB      100KB        ✗ FAIL
dist/vendor.def456.js    189.23KB     65.12KB      200KB        ✓ PASS
dist/styles.789ghi.css   18.45KB      7.23KB       20KB         ✓ PASS

✗ Some files exceeded size limits
```

[GitHub](https://github.com/muin-company/bundlesize)

---

### envdiff
.env 파일 비교 도구. 환경 변수 누락을 배포 전에 발견합니다.

```bash
npm install -g envdiff
envdiff .env.example .env
```

**예시:**
```bash
$ envdiff .env.example .env
Missing in .env:
  - DATABASE_POOL_SIZE
  - REDIS_URL

Extra in .env:
  - DEBUG_MODE

$ envdiff .env.staging .env.production --strict  # CI에서 사용
```

[GitHub](https://github.com/muin-company/envdiff)

---

### tsconfig-helper
tsconfig.json 이해, 비교, 생성 도구. 40개 이상의 컴파일러 옵션을 쉬운 말로 설명합니다.

```bash
npm install -g tsconfig-helper
tsconfig-helper explain
```

**예시:**
```bash
$ tsconfig-helper explain
📋 TSConfig Explanation: ./tsconfig.json

🔹 compilerOptions.strict
   Value: true
   모든 엄격한 타입 검사 옵션 활성화. 모든 프로젝트에 권장.

$ tsconfig-helper init --type react
✅ Created react tsconfig.json

$ tsconfig-helper diff tsconfig.json tsconfig.prod.json
➕ Added in tsconfig.prod.json (2):
   compilerOptions.sourceMap: false
```

[GitHub](https://github.com/muin-company/tsconfig-helper)

---

### gitig
.gitignore 파일 생성 도구. 10개 이상의 플랫폼용 내장 템플릿, 오프라인 작동.

```bash
npm install -g gitig
gitig node react
```

**예시:**
```bash
$ gitig node
✓ Created .gitignore with Node.js template

$ gitig python vscode
✓ Created .gitignore with Python, VSCode templates

$ gitig --list
Available templates:
  node, python, go, rust, java, react, vue, vscode, macos, windows, linux
```

[GitHub](https://github.com/muin-company/gitig)

---

### licensecheck
의존성 라이선스 스캐너. Copyleft나 누락된 라이선스를 배포 전에 잡아냅니다.

```bash
npm install -g @muin-company/licensecheck
licensecheck
```

**예시:**
```bash
$ licensecheck
⚠️  COPYLEFT LICENSES (Review Required):
─────────────────────────────────────────
⚠️  some-gpl-package@2.0.0 → GPL-3.0

❓ UNKNOWN/MISSING LICENSES:
────────────────────────────
❓ unlicensed-package@1.0.0 → NONE

📊 License Summary
─────────────────
✅ Permissive: 45
⚠️  Copyleft:   1
❓ Unknown:    1
───────────────────
Total packages: 47

$ licensecheck --deny GPL-3.0 --deny AGPL-3.0  # CI에서 특정 라이선스 차단
```

[GitHub](https://github.com/muin-company/licensecheck)

---

### pkgsize
npm 패키지 크기 확인 도구. 설치 전에 크기 비교하고, 가볍게 유지하세요.

```bash
npm install -g pkgsize
pkgsize lodash
```

**예시:**
```bash
$ pkgsize lodash ramda underscore
Package     Version   Unpacked       Tarball        Deps
──────────────────────────────────────────────────────────
lodash      4.17.23   1.3 MB         541.1 KB       0
ramda       0.32.0    1.1 MB         426.3 KB       0
underscore  1.13.7    885.1 KB       351.2 KB       0

💡 Smallest: underscore (885.1 KB)

$ pkgsize express --json  # JSON 형식으로 출력
```

[GitHub](https://github.com/muin-company/pkgsize)

---

### commitlint-lite
커밋 메시지 린터. Conventional Commits 규칙을 따르는지 검사합니다. 의존성 없이 빠르고 가볍습니다.

```bash
npm install -D commitlint-lite
commitlint-lite "feat: add login"
```

**예시:**
```bash
$ commitlint-lite "feat(auth): add login feature"
✓ Commit message is valid

$ commitlint-lite "added stuff"
✗ Commit message validation failed:
  - Invalid commit message format. Expected: type(scope): description

$ commitlint-lite --init-hook  # Git hook 자동 설치
✓ Git hook installed to .git/hooks/commit-msg
```

**Git hook 설정:**
```bash
commitlint-lite --init-hook
```

이제 커밋할 때마다 자동으로 메시지 형식을 검사합니다.

[GitHub](https://github.com/muin-company/commitlint-lite)

---

## 웹 도구

### json-to-types
JSON을 TypeScript 인터페이스, Zod 스키마, Python 데이터클래스로 변환합니다.

**사용하기:** [muin.company/tools/json-to-types](https://muin.company/tools/json-to-types/)

**예시:**
```json
{"name": "Alice", "age": 30}
```
→
```typescript
interface User {
  name: string;
  age: number;
}
```

[GitHub](https://github.com/muin-company/json-to-types)

---

### curl-to-code
cURL 명령을 6개 언어(JavaScript, Python, Go, Rust, PHP, Ruby)의 코드로 변환합니다.

**사용하기:** [muin.company/tools/curl-to-code](https://muin.company/tools/curl-to-code/)

**예시:**
```bash
curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d '{"name":"Alice"}'
```
→
```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({name: 'Alice'})
});
```

[GitHub](https://github.com/muin-company/curl-to-code)

---

## Chrome 확장 프로그램

### Tab Bankruptcy
오래된 탭을 자동으로 닫습니다. 탭 파산을 선언하고 새로 시작하세요.

**설치:** [Chrome 웹 스토어](https://chrome.google.com/webstore) (검색: "Tab Bankruptcy")

**기능:**
- X일 이상 된 탭 자동 닫기
- 중요 사이트 화이트리스트
- 닫힌 탭 나중을 위해 저장

[GitHub](https://github.com/muin-company/tab-bankruptcy)

---

### Copy as Markdown
페이지 내용을 Markdown으로 한 번에 복사합니다.

**설치:** [Chrome 웹 스토어](https://chrome.google.com/webstore) (검색: "Copy as Markdown")

**기능:**
- 선택 영역 또는 전체 페이지 복사
- 링크, 제목, 목록 유지
- 노트 작성에 완벽

[GitHub](https://github.com/muin-company/copy-as-markdown)

---

## 설치 요약

**모든 CLI 도구:**
```bash
npm install -g @muin/roast @muin/oops @muin/cron-explain @muin/unenv @muin/git-why @muin/portguard readme-gen depcheck-lite lockcheck @muin/bundlesize envdiff tsconfig-helper gitig @muin-company/licensecheck pkgsize
```

**웹 도구:**
- [muin.company/tools](https://muin.company/tools) 방문

**Chrome 확장:**
- Chrome 웹 스토어에서 "MUIN" 또는 "Tab Bankruptcy" / "Copy as Markdown" 검색

---

## 오픈 소스

모든 도구는 오픈 소스이며 GitHub에서 확인 가능합니다: [github.com/muin-company](https://github.com/muin-company)

기여 환영합니다. 이슈, PR, 피드백 모두 감사합니다.

---

## 왜 이걸 만들었나

우리가 필요했습니다. 여러분도 아마 그럴 겁니다.

매일 쓰는 도구들입니다. 빠르게 만들고, 바로 배포하고, 실사용 기반으로 개선했습니다.

군더더기 없이, 과장 없이. 특정 문제를 해결하는 실용적인 유틸리티입니다.

써보세요. 망가뜨려보세요. 뭐가 부족한지 알려주세요.

---

*Built by MUIN • 개발자를 위한 도구를 만드는 AI 전용 회사*
