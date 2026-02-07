# Welcome Email #2 - Day 2

## Subject Line
{{first_name}}님, MUIN의 핵심 기능 3가지 알려드릴게요 ✨

## Preview Text
이미 사용해보셨나요? 놓치기 쉬운 강력한 기능들을 소개합니다.

---

## Email Body (Korean)

안녕하세요, {{first_name}}님!

어제 MUIN을 시작하신 후 어떠셨나요? 오늘은 **많은 분들이 놓치고 가는 강력한 기능**들을 소개하려고 합니다.

### 🔥 알아두면 좋은 핵심 기능 3가지

#### 1️⃣ 멀티모달 입력
텍스트뿐만 아니라 이미지, PDF, 음성까지 입력 가능합니다.

**활용 예시:**
- 손글씨 메모 사진 → 텍스트로 변환
- PDF 논문 업로드 → 핵심 요약
- 음성 녹음 → 회의록 자동 작성

[멀티모달 가이드 보기 →]({{multimodal_guide_url}})

#### 2️⃣ 프롬프트 템플릿
자주 쓰는 작업은 템플릿으로 저장해두세요. 한 번의 클릭으로 재사용할 수 있습니다.

**인기 템플릿:**
- 블로그 포스트 구조화
- SNS 콘텐츠 배리에이션
- 이메일 답장 자동화

[템플릿 갤러리 구경하기 →]({{template_gallery_url}})

#### 3️⃣ 워크플로우 자동화
여러 단계의 작업을 연결해서 자동화할 수 있습니다.

**예시 워크플로우:**
1. 문서 업로드 → 2. 요약 생성 → 3. SNS 포스팅 작성 → 4. 예약 발행

[워크플로우 만들어보기 →]({{workflow_url}})

### 💬 실제 사용자 후기

> "PDF 논문 10개를 한 번에 분석해서 비교표를 만들어줬어요. 직접 하면 하루 걸릴 일을 10분 만에 끝냈습니다."  
> — 김연구, 대학원생

> "템플릿 기능 덕분에 매일 SNS 콘텐츠 만드는 시간이 3시간에서 30분으로 줄었어요."  
> — 이마케터, 1인 창업가

### 🎯 오늘의 미션

하나만 골라서 직접 시도해보세요:
- [ ] 이미지나 PDF를 업로드해서 분석해보기
- [ ] 자주 쓸 만한 프롬프트를 템플릿으로 저장하기
- [ ] 간단한 2단계 워크플로우 만들어보기

[대시보드로 이동 →]({{dashboard_url}})

궁금한 점이 있으시면 언제든 답장해주세요. 2영업일 내에 답변드립니다!

**MUIN 팀 드림**

---

P.S. 다음 이메일에서는 MUIN을 사용해서 실제로 성과를 낸 사례들을 공유해드릴게요. 기대해주세요!

---

## HTML Template Suggestion

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUIN 핵심 기능</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; color: #ffffff; }
        .content { padding: 40px 30px; }
        .feature-card { background: #f7fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
        .feature-card h4 { margin-top: 0; color: #2d3748; }
        .testimonial { background: #edf2f7; border-left: 4px solid #48bb78; padding: 20px; margin: 20px 0; font-style: italic; }
        .testimonial-author { font-style: normal; font-weight: 600; margin-top: 10px; color: #2d3748; }
        .cta-button { display: inline-block; background: #667eea; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 5px; }
        .mission-checklist { background: #fff5f5; border: 2px dashed #fc8181; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .footer { background: #f7fafc; padding: 30px; text-align: center; font-size: 14px; color: #718096; }
        @media only screen and (max-width: 600px) {
            .content { padding: 30px 20px; }
            .cta-button { display: block; margin: 10px 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">핵심 기능 3가지 ✨</h2>
        </div>
        <div class="content">
            <p>안녕하세요, {{first_name}}님!</p>
            
            <p>어제 MUIN을 시작하신 후 어떠셨나요? 오늘은 <strong>많은 분들이 놓치고 가는 강력한 기능</strong>들을 소개하려고 합니다.</p>
            
            <h3 style="color: #2d3748;">🔥 알아두면 좋은 핵심 기능 3가지</h3>
            
            <div class="feature-card">
                <h4>1️⃣ 멀티모달 입력</h4>
                <p>텍스트뿐만 아니라 이미지, PDF, 음성까지 입력 가능합니다.</p>
                <p><strong>활용 예시:</strong></p>
                <ul>
                    <li>손글씨 메모 사진 → 텍스트로 변환</li>
                    <li>PDF 논문 업로드 → 핵심 요약</li>
                    <li>음성 녹음 → 회의록 자동 작성</li>
                </ul>
                <a href="{{multimodal_guide_url}}" style="color: #667eea; font-weight: 600;">멀티모달 가이드 보기 →</a>
            </div>
            
            <div class="feature-card">
                <h4>2️⃣ 프롬프트 템플릿</h4>
                <p>자주 쓰는 작업은 템플릿으로 저장해두세요. 한 번의 클릭으로 재사용할 수 있습니다.</p>
                <p><strong>인기 템플릿:</strong></p>
                <ul>
                    <li>블로그 포스트 구조화</li>
                    <li>SNS 콘텐츠 배리에이션</li>
                    <li>이메일 답장 자동화</li>
                </ul>
                <a href="{{template_gallery_url}}" style="color: #667eea; font-weight: 600;">템플릿 갤러리 구경하기 →</a>
            </div>
            
            <div class="feature-card">
                <h4>3️⃣ 워크플로우 자동화</h4>
                <p>여러 단계의 작업을 연결해서 자동화할 수 있습니다.</p>
                <p><strong>예시 워크플로우:</strong><br>
                1. 문서 업로드 → 2. 요약 생성 → 3. SNS 포스팅 작성 → 4. 예약 발행</p>
                <a href="{{workflow_url}}" style="color: #667eea; font-weight: 600;">워크플로우 만들어보기 →</a>
            </div>
            
            <h3 style="color: #2d3748;">💬 실제 사용자 후기</h3>
            
            <div class="testimonial">
                "PDF 논문 10개를 한 번에 분석해서 비교표를 만들어줬어요. 직접 하면 하루 걸릴 일을 10분 만에 끝냈습니다."
                <div class="testimonial-author">— 김연구, 대학원생</div>
            </div>
            
            <div class="testimonial">
                "템플릿 기능 덕분에 매일 SNS 콘텐츠 만드는 시간이 3시간에서 30분으로 줄었어요."
                <div class="testimonial-author">— 이마케터, 1인 창업가</div>
            </div>
            
            <div class="mission-checklist">
                <h3 style="margin-top: 0; color: #c53030;">🎯 오늘의 미션</h3>
                <p>하나만 골라서 직접 시도해보세요:</p>
                <ul style="list-style: none; padding-left: 0;">
                    <li>☐ 이미지나 PDF를 업로드해서 분석해보기</li>
                    <li>☐ 자주 쓸 만한 프롬프트를 템플릿으로 저장하기</li>
                    <li>☐ 간단한 2단계 워크플로우 만들어보기</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{dashboard_url}}" class="cta-button">대시보드로 이동 →</a>
            </div>
            
            <p>궁금한 점이 있으시면 언제든 답장해주세요. 2영업일 내에 답변드립니다!</p>
            
            <p><strong>MUIN 팀 드림</strong></p>
            
            <p style="font-size: 14px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                P.S. 다음 이메일에서는 MUIN을 사용해서 실제로 성과를 낸 사례들을 공유해드릴게요. 기대해주세요!
            </p>
        </div>
        <div class="footer">
            <p>이 이메일은 {{email}}으로 발송되었습니다.</p>
            <p><a href="{{unsubscribe_url}}">수신거부</a> | <a href="{{preferences_url}}">이메일 설정</a></p>
        </div>
    </div>
</body>
</html>
```

## Variables
- `{{first_name}}` - User's first name
- `{{email}}` - User's email address
- `{{dashboard_url}}` - Link to user dashboard
- `{{multimodal_guide_url}}` - Link to multimodal guide
- `{{template_gallery_url}}` - Link to template gallery
- `{{workflow_url}}` - Link to workflow builder
- `{{unsubscribe_url}}` - Unsubscribe link
- `{{preferences_url}}` - Email preferences link
