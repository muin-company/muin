# Welcome Email #1 - Immediate Send

## Subject Line
MUIN에 오신 걸 환영합니다! 🚀

## Preview Text
5분 안에 시작할 수 있어요. 첫 번째 AI 도구를 바로 사용해보세요.

---

## Email Body (Korean)

안녕하세요, {{first_name}}님!

**MUIN 가족이 되어주셔서 진심으로 감사합니다.** 🎉

MUIN은 일상과 업무에서 AI를 쉽고 자연스럽게 사용할 수 있도록 돕는 플랫폼입니다. 복잡한 설정 없이, 지금 바로 시작할 수 있어요.

### 🚀 3분 만에 시작하기

1. **계정 확인** - 이 이메일을 받으셨다면 이미 완료!
2. **첫 번째 도구 선택** - 검시AI, 투고AI, 블로그AI 중 하나를 골라보세요
3. **바로 사용** - 로그인 후 곧바로 작업 시작

[지금 시작하기 →]({{dashboard_url}})

### 💡 추천 첫 번째 작업

- **검시AI**: 논문이나 긴 문서를 분석하고 핵심만 추출
- **투고AI**: 아이디어를 SNS 포스팅으로 변환
- **블로그AI**: 주제만 입력하면 초안 작성

### 📚 유용한 리소스

- [5분 퀵스타트 가이드]({{quickstart_url}})
- [자주 묻는 질문]({{faq_url}})
- [커뮤니티 가이드]({{community_url}})

궁금한 점이 있으시면 언제든 이 이메일에 답장해주세요. 저희가 직접 답변드립니다.

다시 한번 환영합니다!

**MUIN 팀 드림**

---

P.S. 앞으로 며칠간 MUIN을 최대한 활용하는 방법을 단계별로 안내드릴게요. 다음 이메일을 기대해주세요!

---

## HTML Template Suggestion

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUIN에 오신 걸 환영합니다</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; }
        .cta-button { display: inline-block; background: #667eea; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .steps { background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
        .footer { background: #f7fafc; padding: 30px; text-align: center; font-size: 14px; color: #718096; }
        @media only screen and (max-width: 600px) {
            .content { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MUIN에 오신 걸 환영합니다! 🚀</h1>
        </div>
        <div class="content">
            <p>안녕하세요, {{first_name}}님!</p>
            <p><strong>MUIN 가족이 되어주셔서 진심으로 감사합니다.</strong> 🎉</p>
            
            <p>MUIN은 일상과 업무에서 AI를 쉽고 자연스럽게 사용할 수 있도록 돕는 플랫폼입니다. 복잡한 설정 없이, 지금 바로 시작할 수 있어요.</p>
            
            <div style="text-align: center;">
                <a href="{{dashboard_url}}" class="cta-button">지금 시작하기 →</a>
            </div>
            
            <div class="steps">
                <h3 style="margin-top: 0;">🚀 3분 만에 시작하기</h3>
                <ol>
                    <li><strong>계정 확인</strong> - 이 이메일을 받으셨다면 이미 완료!</li>
                    <li><strong>첫 번째 도구 선택</strong> - 검시AI, 투고AI, 블로그AI 중 하나를 골라보세요</li>
                    <li><strong>바로 사용</strong> - 로그인 후 곧바로 작업 시작</li>
                </ol>
            </div>
            
            <h3>💡 추천 첫 번째 작업</h3>
            <ul>
                <li><strong>검시AI</strong>: 논문이나 긴 문서를 분석하고 핵심만 추출</li>
                <li><strong>투고AI</strong>: 아이디어를 SNS 포스팅으로 변환</li>
                <li><strong>블로그AI</strong>: 주제만 입력하면 초안 작성</li>
            </ul>
            
            <p>궁금한 점이 있으시면 언제든 이 이메일에 답장해주세요. 저희가 직접 답변드립니다.</p>
            
            <p>다시 한번 환영합니다!</p>
            <p><strong>MUIN 팀 드림</strong></p>
            
            <p style="font-size: 14px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                P.S. 앞으로 며칠간 MUIN을 최대한 활용하는 방법을 단계별로 안내드릴게요. 다음 이메일을 기대해주세요!
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
- `{{quickstart_url}}` - Link to quickstart guide
- `{{faq_url}}` - Link to FAQ page
- `{{community_url}}` - Link to community
- `{{unsubscribe_url}}` - Unsubscribe link
- `{{preferences_url}}` - Email preferences link
