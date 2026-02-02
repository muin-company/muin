# Contributing to MUIN Guard

MUIN Guard에 기여해주셔서 감사합니다! 🛡️

## 시작하기

### 개발 환경 설정

```bash
# 1. 저장소 클론
git clone https://github.com/muin-company/muin.git
cd muin/projects/muin-guard

# 2. 의존성 설치 (선택)
npm install

# 3. 확장 로드
# chrome://extensions → 개발자 모드 → extension 폴더 로드
```

### 명령어

```bash
npm test    # 테스트 실행
npm run lint   # 코드 린트
npm run build  # 배포 패키지 생성
```

## 기여 방법

### 버그 리포트

1. 이슈 검색하여 중복 확인
2. 새 이슈 생성
3. 다음 정보 포함:
   - 브라우저 버전
   - 확장 버전
   - 재현 단계
   - 예상 동작 vs 실제 동작

### 기능 제안

1. 이슈로 아이디어 공유
2. 논의 후 구현 여부 결정
3. 승인되면 PR 진행

### Pull Request

1. Fork & Clone
2. Feature branch 생성: `git checkout -b feature/amazing-feature`
3. 변경 사항 커밋: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. PR 생성

### 커밋 메시지 규칙

```
<type>: <subject>

feat: 새 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 스타일 (포맷팅 등)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 등
```

## 코드 스타일

- ESLint 규칙 준수
- 2 spaces 들여쓰기
- 세미콜론 사용
- 싱글 쿼트 선호

## 테스트

- 새 기능에는 테스트 추가
- 기존 테스트 통과 확인
- `npm test` 실행

## 디렉토리 구조

```
extension/
├── manifest.json      # 확장 메타데이터
├── background.js      # Service Worker
├── content-scripts/   # 플랫폼별 스크립트
├── popup/             # 팝업 UI
├── dashboard/         # 대시보드 UI
├── offscreen/         # WebGPU LLM
├── utils/             # 유틸리티
└── tests/             # 테스트
```

## 문의

- 이슈: GitHub Issues
- 이메일: mj@muin.company

---

감사합니다! 🙏
