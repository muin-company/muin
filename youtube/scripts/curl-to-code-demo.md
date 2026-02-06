# cURL to Code - 두 번째 YouTube 영상 스크립트

## 영상 정보
- **제목:** cURL 명령어 → 코드 변환, 5초만에 끝내기
- **길이:** 약 90초
- **스타일:** 데모 + 나레이션
- **도구:** curl-to-code

---

## 스크립트

### [0:00-0:08] 인트로 - 문제 제시
**화면:** 긴 curl 명령어가 터미널에 보임 (헤더, 인증 토큰 등 복잡한 것)
**나레이션:**
"API 문서에 나온 curl 예제, 이걸 코드로 어떻게 옮기죠?"

### [0:08-0:15] 문제 강조
**화면:** curl 명령어 옆에 개발자가 수동으로 fetch/axios 코드 작성하는 모습
**나레이션:**
"헤더 하나하나 복사하고, 쿼리 파라미터 파싱하고... 시간 낭비."

### [0:15-0:25] 솔루션 소개
**화면:** curl-to-code.muin.company 웹사이트
**나레이션:**
"curl-to-code. curl 명령어 붙여넣으면 원하는 언어 코드가 바로 나옵니다."

### [0:25-0:50] 데모 1 - 기본 사용
**화면:** 웹사이트에서 실제 curl 명령어 입력 → JavaScript (fetch) 코드 생성
**나레이션:**
"curl 명령어를 복사해서 붙여넣으면... 끝. JavaScript fetch 코드가 바로 나옵니다.
헤더도 자동으로, Authorization 토큰도 알아서 변환돼요."

### [0:50-1:05] 데모 2 - 다양한 언어 지원
**화면:** 언어 선택 드롭다운 → Python requests, Go net/http, Rust reqwest 등으로 전환
**나레이션:**
"JavaScript만? 아니죠. Python requests, Go, Rust도 됩니다.
같은 API를 다른 언어로 바로 테스트할 수 있어요."

### [1:05-1:20] 데모 3 - 편의 기능
**화면:** POST 요청 + JSON 바디 예제, 복사 버튼, 옵션 설정
**나레이션:**
"POST 요청? JSON 바디도 완벽하게 처리합니다.
async/await 쓸지, 에러 핸들링 넣을지 옵션으로 선택하세요."

### [1:20-1:30] 아웃트로 - CTA
**화면:** 웹사이트 URL 강조 + "다음 영상: roast 또는 oops?" 티저
**나레이션:**
"curl-to-code.muin.company. 무료, 바로 사용.
구독하시면 더 유용한 개발 도구 계속 소개해드릴게요!"

---

## TTS용 전체 스크립트 (한국어 - 한 번에 읽기)

API 문서에 나온 curl 예제, 이걸 코드로 어떻게 옮기죠?

헤더 하나하나 복사하고, 쿼리 파라미터 파싱하고... 시간 낭비.

curl-to-code. curl 명령어 붙여넣으면 원하는 언어 코드가 바로 나옵니다.

curl 명령어를 복사해서 붙여넣으면... 끝. JavaScript fetch 코드가 바로 나옵니다.
헤더도 자동으로, Authorization 토큰도 알아서 변환돼요.

JavaScript만? 아니죠. Python requests, Go, Rust도 됩니다.
같은 API를 다른 언어로 바로 테스트할 수 있어요.

POST 요청? JSON 바디도 완벽하게 처리합니다.
async/await 쓸지, 에러 핸들링 넣을지 옵션으로 선택하세요.

curl-to-code.muin.company. 무료, 바로 사용.
구독하시면 더 유용한 개발 도구 계속 소개해드릴게요!

---

## 촬영 가이드: 캡처할 주요 화면

### 1. 문제 제시 장면
- **화면 1:** 터미널에 긴 curl 명령어
```bash
curl -X POST 'https://api.example.com/users?page=1&limit=10' \
  -H 'Authorization: Bearer eyJhbGc...' \
  -H 'Content-Type: application/json' \
  -d '{"name":"John","email":"john@example.com"}'
```

### 2. 수동 변환 장면 (문제 강조)
- **화면 2:** VS Code에서 개발자가 fetch 코드를 수동으로 작성 중
  - curl 터미널 창 옆에 에디터 배치
  - 헤더를 하나씩 복사-붙여넣기하는 모습

### 3. 웹사이트 인트로
- **화면 3:** curl-to-code.muin.company 랜딩 페이지
  - 깔끔한 UI
  - 왼쪽: curl 입력 영역, 오른쪽: 코드 출력 영역

### 4. 기본 데모 (GET 요청)
- **화면 4:** curl GET 요청 입력
```bash
curl -X GET 'https://api.github.com/users/octocat' \
  -H 'Accept: application/json' \
  -H 'Authorization: token ghp_xxx'
```
- **화면 5:** JavaScript (fetch) 코드 출력
```javascript
const response = await fetch('https://api.github.com/users/octocat', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'token ghp_xxx'
  }
});
```

### 5. 언어 전환 데모
- **화면 6:** 언어 선택 드롭다운 클릭
  - JavaScript (fetch)
  - JavaScript (axios)
  - Python (requests)
  - Go (net/http)
  - Rust (reqwest)
  - 등등
- **화면 7:** Python requests 코드로 전환
```python
import requests

response = requests.get(
    'https://api.github.com/users/octocat',
    headers={
        'Accept': 'application/json',
        'Authorization': 'token ghp_xxx'
    }
)
```
- **화면 8:** Go net/http 코드로 전환 (빠르게)

### 6. POST 요청 데모
- **화면 9:** POST + JSON 바디 curl 입력
```bash
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com"}'
```
- **화면 10:** 변환된 코드 (JSON.stringify 등 제대로 처리)

### 7. 옵션 설정
- **화면 11:** 옵션 패널 열기
  - ✓ Include error handling
  - ✓ Use async/await
  - ✓ Add comments
- **화면 12:** 옵션 적용된 코드 (try-catch, 주석 포함)

### 8. 복사 및 공유
- **화면 13:** "Copy to clipboard" 버튼 클릭 → 체크 표시 애니메이션
- **화면 14:** (선택) 공유 링크 생성

### 9. 아웃트로
- **화면 15:** curl-to-code.muin.company URL 크게 표시
- **화면 16:** (티저) "다음 영상: code roaster 🔥 또는 oops 🐛?"

---

## 썸네일 컨셉

### 디자인 1: Before/After 분할
- **왼쪽:** 복잡한 curl 명령어 (터미널 스타일, 초록색 텍스트)
  - 텍스트: "😩 curl -X POST..."
- **가운데:** 큰 화살표 → 또는 ⚡
- **오른쪽:** 깔끔한 JavaScript 코드 (에디터 스타일)
  - 텍스트: "✨ const response = ..."
- **상단 텍스트:** "cURL → Code in 5 Seconds"
- **컬러:** 다크 배경 (#1e1e1e), 강조 색상 (오렌지 또는 파란색)

### 디자인 2: 터미널 → 코드 변환 애니메이션 프리즈
- 터미널 창에서 코드 에디터로 "날아가는" 모션의 한 프레임
- 중앙에 큰 "⚡ 5초" 텍스트
- 하단에 "curl-to-code.muin.company"

### 디자인 3: 다중 언어 쇼케이스
- 중앙에 curl 명령어
- 주변에 여러 언어 로고가 원형 배치 (JS, Python, Go, Rust...)
- 텍스트: "One cURL → Any Language"

### 추천: 디자인 1
- 가장 직관적
- Before/After가 명확
- json-to-types 썸네일과 스타일 통일 가능

---

## 제작 노트

### 영상 포인트
1. **속도감:** 변환이 즉각적이라는 걸 강조
2. **다양성:** 여러 언어 지원이 핵심 차별점
3. **실용성:** 실제 API 예제 사용 (GitHub API 등)

### 촬영 팁
- 화면 녹화: 1920x1080 이상
- 마우스 커서를 부드럽게 움직이기
- 각 전환마다 1-2초 pause (편집 여유)
- 폰트 크기: 에디터는 16pt 이상

### 편집 포인트
- 타이핑 장면은 타임랩스 (2-3배속)
- 언어 전환은 빠른 컷으로 (0.5초 간격)
- 배경음악: 밝고 리드미컬한 테크 음악

### 다음 영상 후보
- **roast:** 코드 리뷰/critique 도구 → 유머 가능성 높음
- **oops:** 에러 해결 도구 → 공감대 강함

### SEO 키워드
- cURL to code converter
- curl 명령어 변환
- API 코드 생성기
- curl JavaScript Python converter
