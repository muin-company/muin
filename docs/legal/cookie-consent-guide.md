# Cookie Consent Implementation Guide

A comprehensive guide for implementing GDPR and CCPA-compliant cookie consent banners and mechanisms.

---

## Table of Contents

1. [Understanding Cookies and Legal Requirements](#1-understanding-cookies-and-legal-requirements)
2. [Cookie Categories](#2-cookie-categories)
3. [Cookie Consent Banner Copy](#3-cookie-consent-banner-copy)
4. [React Implementation](#4-react-implementation)
5. [Opt-Out Mechanisms](#5-opt-out-mechanisms)
6. [Cookie Policy Template](#6-cookie-policy-template)
7. [Testing and Compliance](#7-testing-and-compliance)

---

## 1. Understanding Cookies and Legal Requirements

### What are Cookies?

Cookies are small text files stored on a user's device by websites to remember information about the user. They can be:
- **Session cookies:** Temporary, deleted when browser closes
- **Persistent cookies:** Remain until expiration or deletion
- **First-party cookies:** Set by the website you're visiting
- **Third-party cookies:** Set by external domains (ads, analytics)

### Legal Requirements

#### GDPR (EU)
- **ePrivacy Directive (Cookie Law):** Requires prior consent for non-essential cookies
- **Consent must be:** Freely given, specific, informed, unambiguous, and obtained before cookies are set
- **Essential cookies:** Can be set without consent (strictly necessary for service)
- **Pre-ticked boxes:** Not allowed
- **Cookie walls:** Discouraged (blocking access until consent given)

#### CCPA (California)
- **Right to Opt-Out:** Users must have clear way to opt-out of sale of personal information
- **"Do Not Sell My Personal Information"** link required if you sell data
- **Less stringent than GDPR:** Opt-out (vs. GDPR's opt-in)

#### Other Regulations
- **PECR (UK):** Similar to ePrivacy Directive
- **LGPD (Brazil):** Requires consent for non-essential cookies
- **POPIA (South Africa):** Consent-based approach

### Key Principles

1. **Granular Consent:** Users can choose which cookie categories to accept
2. **Easy to Refuse:** Declining should be as easy as accepting
3. **Clear Information:** Users understand what they're consenting to
4. **Withdrawable:** Users can change preferences anytime
5. **No Pre-Consent Loading:** Don't load non-essential cookies until consent given
6. **Audit Trail:** Keep records of consent (who, when, what)

---

## 2. Cookie Categories

### 2.1 Essential (Strictly Necessary)

**Purpose:** Required for basic website functionality  
**Consent Required:** ❌ No  
**Can Block:** ❌ No

**Examples:**
- Session management (login state)
- Shopping cart
- Security tokens (CSRF protection)
- Load balancing
- Cookie consent preferences

**Note:** You must still inform users about essential cookies, but you don't need consent.

### 2.2 Functional (Preferences)

**Purpose:** Remember user preferences and choices  
**Consent Required:** ✅ Yes  
**Can Block:** ✅ Yes

**Examples:**
- Language selection
- Region/currency preferences
- Theme (dark/light mode)
- Font size adjustments
- Video player settings

**Impact if Blocked:** Users will have default settings each visit.

### 2.3 Analytics (Performance)

**Purpose:** Understand how visitors use the website  
**Consent Required:** ✅ Yes (unless fully anonymized*)  
**Can Block:** ✅ Yes

**Examples:**
- Google Analytics
- Mixpanel
- Hotjar (heatmaps)
- Custom analytics
- A/B testing tools

**Note:** *Some argue fully anonymized analytics (IP anonymization, no cross-site tracking) don't require consent, but best practice is to obtain consent.

### 2.4 Marketing (Advertising/Targeting)

**Purpose:** Track visitors across websites to deliver targeted ads  
**Consent Required:** ✅ Yes  
**Can Block:** ✅ Yes

**Examples:**
- Google Ads
- Facebook Pixel
- LinkedIn Insight Tag
- Retargeting pixels
- Affiliate tracking

**Impact if Blocked:** No personalized ads, no retargeting campaigns.

---

## 3. Cookie Consent Banner Copy

### 3.1 Minimal Banner (Simple)

**Best for:** Simple websites with few cookies

```
🍪 We use cookies

We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking "Accept All," you agree to our website's cookie use as described in our Cookie Policy.

[Cookie Settings] [Reject All] [Accept All]
```

### 3.2 Detailed Banner (Recommended)

**Best for:** Most websites

```
🍪 Cookie Preferences

We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Choose which cookies you're happy for us to use.

Essential: Always active
These cookies are necessary for the website to function and cannot be switched off.

Analytics: [ Toggle ]
Help us understand how visitors interact with our website.
Examples: Google Analytics, Mixpanel

Functional: [ Toggle ]
Remember your preferences and choices.
Examples: Language, theme settings

Marketing: [ Toggle ]
Used to deliver personalized advertisements.
Examples: Facebook Pixel, Google Ads

[More Information] [Reject All] [Accept Selected] [Accept All]
```

### 3.3 Granular Options (Advanced)

**Best for:** Complex websites with many third-party integrations

```
🍪 Manage Cookie Preferences

We respect your privacy. You have full control over which cookies we use.

✅ Essential Cookies (Always Active)
Required for basic functionality. Cannot be disabled.
• Session management
• Security tokens
• Cookie consent preferences

○ Analytics Cookies
Help us improve our website by collecting usage data.
  ☐ Google Analytics - Visitor statistics and behavior
  ☐ Hotjar - Heatmaps and session recordings
  ☐ Mixpanel - Product analytics

○ Functional Cookies
Remember your preferences for a better experience.
  ☐ Language and region preferences
  ☐ Theme settings (dark/light mode)

○ Marketing Cookies
Deliver personalized ads and measure campaign effectiveness.
  ☐ Google Ads - Advertising and retargeting
  ☐ Facebook Pixel - Social media advertising
  ☐ LinkedIn Insight Tag - B2B advertising

[Privacy Policy] [Cookie Policy] [Save Preferences] [Accept All]
```

### 3.4 Language Considerations

**Tone:** Friendly but informative  
**Length:** Brief but comprehensive  
**Clarity:** Avoid legal jargon

**Do:**
- ✅ "We use cookies to make our site work better"
- ✅ "You can change your mind anytime"
- ✅ "Help us improve by sharing usage data"

**Don't:**
- ❌ "Pursuant to GDPR Article 6(1)(a)..."
- ❌ "Stochastic behavioral profiling mechanisms"
- ❌ Walls of legal text

---

## 4. React Implementation

### 4.1 Basic Cookie Consent Component

```jsx
// CookieBanner.jsx
import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load existing preferences
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs.preferences);
      loadCookies(savedPrefs.preferences);
    }
  }, []);

  const loadCookies = (prefs) => {
    // Load analytics cookies
    if (prefs.analytics) {
      loadGoogleAnalytics();
    }

    // Load functional cookies
    if (prefs.functional) {
      loadFunctionalCookies();
    }

    // Load marketing cookies
    if (prefs.marketing) {
      loadMarketingCookies();
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    saveConsent(allAccepted);
    loadCookies(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    saveConsent(onlyEssential);
    setShowBanner(false);
  };

  const saveConsent = (prefs) => {
    const consent = {
      timestamp: new Date().toISOString(),
      preferences: prefs,
      version: '1.0', // Track consent version for audit
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <h3>🍪 We use cookies</h3>
        <p>
          We use essential cookies to make our site work. With your consent, we may also 
          use non-essential cookies to improve user experience and analyze website traffic.
        </p>
        <div className="cookie-banner-actions">
          <button onClick={handleRejectAll} className="btn-secondary">
            Reject All
          </button>
          <button onClick={() => setShowBanner('settings')} className="btn-secondary">
            Cookie Settings
          </button>
          <button onClick={handleAcceptAll} className="btn-primary">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
```

### 4.2 Advanced Cookie Consent with Settings Modal

```jsx
// CookieConsent.jsx
import React, { useState, useEffect } from 'react';
import CookieBanner from './CookieBanner';
import CookieSettings from './CookieSettings';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedConsent = JSON.parse(consent);
      setPreferences(savedConsent.preferences);
      initializeCookies(savedConsent.preferences);
    }
  }, []);

  const initializeCookies = (prefs) => {
    // Essential cookies (always loaded)
    // Nothing needed here as they load by default

    // Analytics
    if (prefs.analytics) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    // Functional
    if (prefs.functional) {
      // Load functional scripts
    }

    // Marketing
    if (prefs.marketing) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const savePreferences = (prefs) => {
    const consent = {
      timestamp: new Date().toISOString(),
      preferences: prefs,
      version: '1.0',
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setPreferences(prefs);
    initializeCookies(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {showBanner && (
        <CookieBanner
          onAcceptAll={() => savePreferences({
            essential: true,
            analytics: true,
            functional: true,
            marketing: true,
          })}
          onRejectAll={() => savePreferences({
            essential: true,
            analytics: false,
            functional: false,
            marketing: false,
          })}
          onOpenSettings={() => {
            setShowBanner(false);
            setShowSettings(true);
          }}
        />
      )}
      {showSettings && (
        <CookieSettings
          preferences={preferences}
          onSave={savePreferences}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

export default CookieConsent;
```

### 4.3 Cookie Settings Modal Component

```jsx
// CookieSettings.jsx
import React, { useState } from 'react';
import './CookieSettings.css';

const CookieSettings = ({ preferences, onSave, onClose }) => {
  const [prefs, setPrefs] = useState(preferences);

  const togglePreference = (category) => {
    setPrefs({
      ...prefs,
      [category]: !prefs[category],
    });
  };

  const handleSave = () => {
    onSave(prefs);
  };

  return (
    <div className="cookie-settings-overlay">
      <div className="cookie-settings-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>Cookie Preferences</h2>
        <p>
          We use cookies to enhance your browsing experience. You can choose which 
          categories of cookies you want to allow.
        </p>

        <div className="cookie-category">
          <div className="category-header">
            <h3>Essential Cookies</h3>
            <span className="always-active">Always Active</span>
          </div>
          <p className="category-description">
            These cookies are necessary for the website to function and cannot be 
            switched off in our systems. They are usually only set in response to 
            actions made by you such as setting your privacy preferences, logging 
            in, or filling in forms.
          </p>
          <details>
            <summary>View cookies</summary>
            <ul>
              <li><strong>session_id</strong> - Maintains your login session</li>
              <li><strong>csrf_token</strong> - Security protection</li>
              <li><strong>cookieConsent</strong> - Stores your cookie preferences</li>
            </ul>
          </details>
        </div>

        <div className="cookie-category">
          <div className="category-header">
            <h3>Analytics Cookies</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={() => togglePreference('analytics')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <p className="category-description">
            These cookies allow us to count visits and traffic sources so we can 
            measure and improve the performance of our site. They help us know which 
            pages are the most and least popular and see how visitors move around 
            the site.
          </p>
          <details>
            <summary>View cookies</summary>
            <ul>
              <li><strong>_ga</strong> - Google Analytics - Visitor identification</li>
              <li><strong>_gid</strong> - Google Analytics - Session identification</li>
              <li><strong>_gat</strong> - Google Analytics - Request throttling</li>
            </ul>
          </details>
        </div>

        <div className="cookie-category">
          <div className="category-header">
            <h3>Functional Cookies</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={prefs.functional}
                onChange={() => togglePreference('functional')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <p className="category-description">
            These cookies enable enhanced functionality and personalization, such as 
            remembering your language preference or region selection. If you do not 
            allow these cookies, some or all of these services may not function properly.
          </p>
          <details>
            <summary>View cookies</summary>
            <ul>
              <li><strong>lang</strong> - Language preference</li>
              <li><strong>theme</strong> - Dark/light mode preference</li>
              <li><strong>region</strong> - Geographic region selection</li>
            </ul>
          </details>
        </div>

        <div className="cookie-category">
          <div className="category-header">
            <h3>Marketing Cookies</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={() => togglePreference('marketing')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <p className="category-description">
            These cookies may be set through our site by our advertising partners. 
            They may be used to build a profile of your interests and show you 
            relevant ads on other sites. They do not store directly personal 
            information but are based on uniquely identifying your browser and device.
          </p>
          <details>
            <summary>View cookies</summary>
            <ul>
              <li><strong>_fbp</strong> - Facebook Pixel - Ad targeting</li>
              <li><strong>IDE</strong> - Google DoubleClick - Ad serving</li>
              <li><strong>fr</strong> - Facebook - Ad delivery and measurement</li>
            </ul>
          </details>
        </div>

        <div className="modal-footer">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
          <div className="action-buttons">
            <button onClick={() => onSave({
              essential: true,
              analytics: false,
              functional: false,
              marketing: false,
            })} className="btn-secondary">
              Reject All
            </button>
            <button onClick={handleSave} className="btn-primary">
              Save Preferences
            </button>
            <button onClick={() => {
              setPrefs({
                essential: true,
                analytics: true,
                functional: true,
                marketing: true,
              });
              handleSave();
            }} className="btn-primary">
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
```

### 4.4 CSS Styling

```css
/* CookieBanner.css */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 1.5rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.cookie-banner-content {
  max-width: 1200px;
  margin: 0 auto;
}

.cookie-banner h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.cookie-banner p {
  margin: 0 0 1rem 0;
  line-height: 1.5;
  opacity: 0.9;
}

.cookie-banner-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #0066cc;
  color: white;
}

.btn-primary:hover {
  background: #0052a3;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

/* CookieSettings.css */
.cookie-settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.cookie-settings-modal {
  background: white;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
}

.close-button:hover {
  color: #000;
}

.cookie-category {
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.always-active {
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
}

.category-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0.5rem 0;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0066cc;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

details {
  margin-top: 0.5rem;
}

details summary {
  cursor: pointer;
  color: #0066cc;
  font-size: 0.85rem;
}

details ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}

details li {
  font-size: 0.85rem;
  color: #666;
  margin: 0.25rem 0;
}

.modal-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.modal-footer a {
  color: #0066cc;
  text-decoration: none;
  font-size: 0.9rem;
}

.modal-footer a:hover {
  text-decoration: underline;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cookie-banner-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons {
    flex-direction: column;
  }
}
```

### 4.5 Google Consent Mode Integration

```javascript
// googleConsentMode.js
// Initialize Google Consent Mode before any Google tags load

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Default consent state (denied)
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted', // Usually granted by default
  wait_for_update: 500,
});

// Update consent based on user choice
export const updateGoogleConsent = (preferences) => {
  gtag('consent', 'update', {
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    functionality_storage: preferences.functional ? 'granted' : 'denied',
    personalization_storage: preferences.functional ? 'granted' : 'denied',
  });
};
```

---

## 5. Opt-Out Mechanisms

### 5.1 Cookie Preferences Link

Add a persistent link to allow users to change their preferences anytime:

```jsx
// App.jsx
import { useState } from 'react';
import CookieSettings from './CookieSettings';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app">
      {/* Your app content */}
      
      {/* Footer with cookie preferences link */}
      <footer>
        <button onClick={() => setShowSettings(true)}>
          Cookie Preferences
        </button>
        {/* Other footer links */}
      </footer>

      {showSettings && (
        <CookieSettings
          preferences={getCurrentPreferences()}
          onSave={savePreferences}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
```

### 5.2 Google Analytics Opt-Out

```html
<!-- Add this to allow users to opt-out of Google Analytics specifically -->
<a href="javascript:gaOptout()">Click here to opt-out of Google Analytics</a>

<script>
// Disable tracking if the opt-out cookie exists
var disableStr = 'ga-disable-UA-XXXXXXXX-X'; // Replace with your GA property ID
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}

// Opt-out function
function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
  alert('Google Analytics tracking has been disabled');
}
</script>
```

### 5.3 Do Not Track Browser Setting

Respect the browser's "Do Not Track" (DNT) setting:

```javascript
// respectDNT.js
export const shouldTrack = () => {
  // Check if Do Not Track is enabled
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    return false;
  }
  
  // Check cookie consent
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    return false;
  }
  
  const { preferences } = JSON.parse(consent);
  return preferences.analytics || false;
};

// Usage
if (shouldTrack()) {
  loadGoogleAnalytics();
}
```

---

## 6. Cookie Policy Template

Include this in your website's footer or privacy section:

```markdown
# Cookie Policy

**Last Updated:** [DATE]

## What Are Cookies?

Cookies are small text files that are placed on your computer or mobile device when 
you visit a website. They are widely used to make websites work more efficiently and 
provide information to website owners.

## How We Use Cookies

We use cookies for the following purposes:

### Essential Cookies (Always Active)
These cookies are necessary for the website to function and cannot be switched off.

| Cookie Name | Purpose | Duration |
|-------------|---------|----------|
| session_id | Maintains your login session | Session |
| csrf_token | Security protection against cross-site attacks | Session |
| cookieConsent | Stores your cookie preferences | 1 year |

### Analytics Cookies
With your consent, we use analytics cookies to understand how visitors interact with 
our website.

| Cookie Name | Purpose | Provider | Duration |
|-------------|---------|----------|----------|
| _ga | Distinguishes unique users | Google Analytics | 2 years |
| _gid | Distinguishes unique users | Google Analytics | 24 hours |
| _gat | Throttles request rate | Google Analytics | 1 minute |

**Third-Party Privacy Policy:** [Google Analytics Privacy Policy](https://policies.google.com/privacy)

### Functional Cookies
These cookies remember your preferences and choices.

| Cookie Name | Purpose | Duration |
|-------------|---------|----------|
| lang | Language preference | 1 year |
| theme | Dark/light mode selection | 1 year |
| region | Geographic region | 1 year |

### Marketing Cookies
With your consent, we use marketing cookies for advertising purposes.

| Cookie Name | Purpose | Provider | Duration |
|-------------|---------|----------|----------|
| _fbp | Facebook advertising | Facebook | 3 months |
| IDE | Ad targeting | Google DoubleClick | 1 year |
| fr | Ad delivery and measurement | Facebook | 3 months |

**Third-Party Privacy Policies:**
- [Facebook Privacy Policy](https://www.facebook.com/privacy/explanation)
- [Google Ads Privacy Policy](https://policies.google.com/technologies/ads)

## Managing Cookies

### Via Our Website
You can manage your cookie preferences at any time by clicking the "Cookie Preferences" 
link in our footer or [here](#cookie-settings).

### Via Your Browser
You can also control cookies through your browser settings:

- **Chrome:** Settings > Privacy and security > Cookies and other site data
- **Firefox:** Settings > Privacy & Security > Cookies and Site Data
- **Safari:** Preferences > Privacy > Manage Website Data
- **Edge:** Settings > Privacy, search, and services > Cookies and site permissions

**Note:** Blocking all cookies may impact your experience and prevent certain features 
from working properly.

### Opt-Out Tools
- [Google Analytics Opt-out](https://tools.google.com/dlpage/gaoptout)
- [Network Advertising Initiative Opt-out](http://optout.networkadvertising.org/)
- [Digital Advertising Alliance Opt-out](http://optout.aboutads.info/)

## Changes to This Policy

We may update this Cookie Policy from time to time. We will notify you of any changes 
by posting the new policy on this page with an updated "Last Updated" date.

## Contact Us

If you have questions about our use of cookies, please contact us:
- Email: [PRIVACY_EMAIL]
- Address: [COMPANY_ADDRESS]
```

---

## 7. Testing and Compliance

### 7.1 Testing Checklist

- [ ] **Banner appears on first visit** (no existing consent)
- [ ] **Banner does not appear** if consent already given
- [ ] **Reject All works** - only essential cookies loaded
- [ ] **Accept All works** - all cookies loaded
- [ ] **Granular selection works** - only selected categories loaded
- [ ] **Preferences persist** across page loads and sessions
- [ ] **Can change preferences** via settings link
- [ ] **No cookies loaded before consent** (except essential)
- [ ] **Third-party scripts respect consent** (Google Consent Mode, etc.)
- [ ] **Mobile responsive** - banner and modal work on small screens
- [ ] **Accessibility** - keyboard navigation, screen readers

### 7.2 Compliance Tools

- **Cookie Scanners:**
  - [Cookiebot Cookie Scanner](https://www.cookiebot.com/en/cookie-scanner/)
  - [OneTrust Cookie Compliance](https://www.onetrust.com/products/cookie-consent/)
  - [CookieServe](https://www.cookieserve.com/)

- **Browser Extensions:**
  - EditThisCookie (view and edit cookies)
  - Cookie-Editor
  - Ghostery (see trackers)

- **GDPR Compliance Checkers:**
  - [GDPR Checklist](https://gdprchecklist.io/)
  - [ICO Cookie Checker](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/)

### 7.3 Common Pitfalls to Avoid

❌ **Pre-ticked consent boxes** - Users must actively opt-in  
❌ **Loading analytics before consent** - Wait for user choice  
❌ **"Cookie walls"** - Don't block access entirely without consent (discouraged)  
❌ **Hiding reject button** - Make it as easy to reject as accept  
❌ **Unclear language** - Use plain, simple terms  
❌ **No way to change preferences** - Always provide settings link  
❌ **Not respecting DNT** - Consider honoring Do Not Track signals  
❌ **Missing cookie policy** - Document all cookies used  

### 7.4 Audit Schedule

- **Monthly:** Review cookie list, remove unused cookies
- **Quarterly:** Test consent flow, check third-party compliance
- **Annually:** Full compliance audit, update cookie policy
- **After changes:** Re-test whenever adding new tracking tools

---

## Summary

**Key Takeaways:**

1. **Obtain consent before loading non-essential cookies**
2. **Provide granular control** (let users choose categories)
3. **Make rejection as easy as acceptance**
4. **Document all cookies** in a cookie policy
5. **Allow users to change preferences anytime**
6. **Respect Do Not Track and other privacy signals**
7. **Test regularly** to ensure compliance

**Quick Implementation Steps:**

1. Categorize your cookies (essential, analytics, functional, marketing)
2. Implement consent banner with clear options
3. Block non-essential cookies until consent given
4. Integrate with third-party tools (Google Consent Mode, etc.)
5. Add cookie preferences link in footer
6. Create detailed cookie policy page
7. Test thoroughly and monitor compliance

---

**Additional Resources:**

- [GDPR Cookie Consent Guide](https://gdpr.eu/cookies/)
- [ICO Guidance on Cookies](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/)
- [Google Consent Mode](https://support.google.com/analytics/answer/9976101)
- [IAB Europe Transparency & Consent Framework](https://iabeurope.eu/transparency-consent-framework/)

**Disclaimer:** This guide is for informational purposes and does not constitute legal 
advice. Cookie consent requirements vary by jurisdiction. Consult legal counsel for 
compliance guidance specific to your situation.
