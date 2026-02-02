# WebGPU LLM 옵션 조사

## 목표
- 브라우저에서 WebGPU로 경량 LLM 실행
- AI 대화 안전성 분석
- 무료 버전에서도 제공

---

## 1. WebLLM (MLC-AI)

**GitHub:** https://github.com/mlc-ai/web-llm

**장점:**
- WebGPU 네이티브 최적화
- 다양한 모델 지원 (Llama, Phi, Gemma, Mistral)
- 양자화 지원 (q4f16, q4f32)
- npm 패키지로 쉬운 통합

**지원 모델 (경량):**
| 모델 | 크기 | VRAM | 용도 |
|------|------|------|------|
| Phi-3.5-mini-instruct | 3.8B | ~2.6GB | 범용 |
| SmolLM2-1.7B | 1.7B | ~1.2GB | 초경량 |
| TinyLlama-1.1B | 1.1B | ~0.8GB | 가장 작음 |
| Llama-3.2-1B | 1B | ~0.7GB | Meta 공식 |
| Qwen2.5-0.5B | 0.5B | ~0.4GB | 초소형 |

**Safety 특화:**
| 모델 | 크기 | 용도 |
|------|------|------|
| Llama-Guard-3-1B | 1B | 입출력 안전성 분류 |
| ShieldGemma-2B | 2B | Google safety |

**설치:**
```bash
npm install @mlc-ai/web-llm
```

**사용 예:**
```javascript
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const engine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC");

const response = await engine.chat.completions.create({
  messages: [
    { role: "system", content: "You are a safety classifier..." },
    { role: "user", content: textToAnalyze }
  ]
});
```

---

## 2. Transformers.js

**GitHub:** https://github.com/xenova/transformers.js

**장점:**
- HuggingFace 생태계
- 더 많은 소형 모델 지원
- ONNX 최적화

**단점:**
- WebGPU 지원이 실험적 (v3+)
- WebLLM보다 느릴 수 있음

**사용 모델:**
- distilbert-base-uncased-finetuned-sst-2 (감정)
- toxic-bert (독성)
- 커스텀 safety 분류기

---

## 3. 크롬 확장에서의 제약

**문제점:**
1. Service Worker에서 WebGPU 제한적
2. Content Script에서도 제한
3. 모델 파일 크기 (500MB+)

**해결책:**
1. **Offscreen Document** 사용 (Manifest V3)
   - 숨겨진 HTML 페이지에서 WebGPU 사용
   - Service Worker와 메시지로 통신

2. **IndexedDB 캐싱**
   - 모델 한번 다운로드 후 로컬 저장
   - 다음 실행 시 빠른 로딩

3. **Lazy Loading**
   - 처음에는 정규식만
   - 사용자가 원할 때 LLM 로드

---

## 4. 권장 구현 전략

### Phase 1: 기본 (현재)
- 정규식 기반 탐지
- 즉시 동작

### Phase 2: WebGPU LLM
```
1. Offscreen Document 생성
2. WebLLM 초기화 (Qwen2.5-0.5B 또는 Llama-3.2-1B)
3. 모델 IndexedDB 캐싱
4. Content Script → Background → Offscreen → LLM 분석
```

### 모델 선택 기준
| 우선순위 | 모델 | 이유 |
|----------|------|------|
| 1 | Llama-Guard-3-1B | Safety 특화, 1B로 가벼움 |
| 2 | Qwen2.5-0.5B | 가장 작음, 범용 |
| 3 | SmolLM2-1.7B | 밸런스 |

---

## 5. PoC 계획

1. Offscreen Document 셋업
2. WebLLM 로딩 테스트
3. Llama-Guard-3-1B 로 safety 분류 테스트
4. 성능 측정 (로딩 시간, 추론 시간, 메모리)

---

*Created: 2026-02-02*
