# GDPR Compliance Checklist

**General Data Protection Regulation (GDPR) - EU Regulation 2016/679**

This checklist helps ensure compliance with GDPR requirements for organizations that process personal data of individuals in the European Economic Area (EEA).

---

## 1. Understanding GDPR Scope

### 1.1 Territorial Scope
- [ ] **Material Scope Check:** Do you process personal data of individuals in the EEA?
- [ ] **Establishment in EEA:** Do you have an establishment (office, subsidiary) in the EEA?
- [ ] **Targeting EEA Residents:** Do you offer goods/services to or monitor behavior of EEA residents?
- [ ] **Data Processor Role:** Are you processing data on behalf of others who fall under GDPR?

**Action Required If YES:** GDPR applies to your organization.

### 1.2 Key Definitions
- [ ] **Personal Data:** Any information relating to an identified or identifiable natural person
  - Examples: Names, email addresses, IP addresses, location data, online identifiers
- [ ] **Special Categories (Sensitive Data):** Racial/ethnic origin, political opinions, religious beliefs, health data, biometric data, sexual orientation
- [ ] **Data Controller:** Determines the purposes and means of processing personal data
- [ ] **Data Processor:** Processes personal data on behalf of the controller

---

## 2. Data Inventory and Mapping

### 2.1 Data Inventory
Create a comprehensive inventory of all personal data you collect, process, and store.

| Data Category | Purpose | Legal Basis | Retention Period | Location | Access Control |
|---------------|---------|-------------|------------------|----------|----------------|
| Account info (name, email) | Service provision | Contract | Active + 30 days | AWS EU-West-1 | Role-based |
| Payment info | Billing | Contract | 7 years (legal) | Stripe | Payment team only |
| Usage analytics | Service improvement | Legitimate interest | 2 years | Google Analytics | Marketing team |
| IP addresses | Security | Legitimate interest | 90 days | Logs server | DevOps |
| Marketing preferences | Communications | Consent | Until withdrawal | CRM system | Marketing |

#### Checklist:
- [ ] **Document all data types** collected (directly and indirectly)
- [ ] **Identify data sources** (users, third parties, public sources)
- [ ] **Map data flows** (where data comes from, where it goes, who accesses it)
- [ ] **Classify data sensitivity** (regular personal data vs. special categories)
- [ ] **Document retention periods** for each data type
- [ ] **Identify third-party processors** (cloud providers, analytics, payment processors)

### 2.2 Data Flow Mapping
- [ ] **Create data flow diagrams** showing how data moves through your systems
- [ ] **Document cross-border transfers** (data leaving the EEA)
- [ ] **Identify data entry points** (forms, APIs, integrations)
- [ ] **Map data sharing** (internal teams, external partners)

**Tools:** Spreadsheets, data mapping software (OneTrust, TrustArc), flowchart tools

---

## 3. Legal Basis for Processing

You must have a legal basis for every processing activity. GDPR provides six lawful bases:

### 3.1 Legal Bases (Article 6)
- [ ] **Consent:** Freely given, specific, informed, and unambiguous
  - Use for: Marketing emails, optional features, non-essential cookies
  - Requirements: Clear affirmative action, easy to withdraw, separate from other terms
  
- [ ] **Contract:** Processing necessary to perform a contract with the data subject
  - Use for: Account creation, service delivery, payment processing
  
- [ ] **Legal Obligation:** Required by law (e.g., tax records, financial reporting)
  - Use for: Compliance with legal requirements
  
- [ ] **Vital Interests:** Necessary to protect someone's life
  - Use for: Emergency medical situations (rare in most businesses)
  
- [ ] **Public Task:** Performing a task in the public interest or official authority
  - Use for: Government and public sector activities
  
- [ ] **Legitimate Interests:** Necessary for your legitimate interests (unless overridden by individual's rights)
  - Use for: Fraud prevention, security, analytics, product improvement
  - Requirement: Conduct Legitimate Interest Assessment (LIA)

### 3.2 Legal Basis Documentation
- [ ] **Document legal basis** for each processing activity in your data inventory
- [ ] **Conduct Legitimate Interest Assessments (LIAs)** when relying on legitimate interests
- [ ] **Implement consent mechanisms** for consent-based processing (see Section 4)
- [ ] **Review and update** legal bases annually or when processing changes

---

## 4. Consent Mechanisms

### 4.1 Valid Consent Requirements
- [ ] **Freely Given:** No coercion, bundled consent for separate purposes is not allowed
- [ ] **Specific:** Separate consent for different purposes
- [ ] **Informed:** Clear information about what data is collected and how it's used
- [ ] **Unambiguous:** Clear affirmative action (no pre-ticked boxes)
- [ ] **Withdrawable:** Easy to withdraw consent at any time
- [ ] **Age Verification:** Children under 16 (or lower age set by member state, minimum 13) require parental consent

### 4.2 Implementation Checklist
- [ ] **Consent forms** use plain language and are easy to understand
- [ ] **Granular consent options** for different purposes (e.g., separate checkboxes for marketing vs. product updates)
- [ ] **Pre-ticked boxes removed** (users must actively opt-in)
- [ ] **Consent records maintained** (who consented, when, to what, how)
- [ ] **Easy withdrawal mechanism** (same level of ease as giving consent)
- [ ] **Parental consent mechanism** for services directed at children

### 4.3 Consent Record Keeping
Maintain records of:
- Who gave consent
- When consent was given
- What information was provided at the time
- How consent was obtained
- Whether consent has been withdrawn

**Tool Examples:** Consent management platforms (OneTrust, Cookiebot, Osano)

---

## 5. Privacy by Design and by Default

### 5.1 Privacy by Design (Article 25)
Integrate data protection into all processing activities and business practices from the outset.

- [ ] **Data minimization:** Collect only necessary data
- [ ] **Purpose limitation:** Use data only for specified purposes
- [ ] **Storage limitation:** Delete data when no longer needed
- [ ] **Pseudonymization/Anonymization:** Use where possible to reduce risk
- [ ] **Encryption:** Implement encryption for data in transit and at rest
- [ ] **Access controls:** Role-based access, principle of least privilege
- [ ] **Regular security assessments:** Penetration testing, vulnerability scans

### 5.2 Privacy by Default
Default settings should provide the highest level of privacy.

- [ ] **Minimal data collection** by default (users opt-in for additional data collection)
- [ ] **Shortest retention periods** by default
- [ ] **Least privilege access** by default
- [ ] **Privacy-friendly default settings** (e.g., marketing communications opt-in, not opt-out)

### 5.3 Data Protection Impact Assessment (DPIA)
Conduct DPIAs for high-risk processing activities:

- [ ] **Identify high-risk processing:**
  - Large-scale processing of special categories or criminal data
  - Systematic monitoring of publicly accessible areas (e.g., CCTV)
  - Automated decision-making with legal or significant effects
  - Processing vulnerable individuals' data (children, employees)
  - Innovative technologies (AI, biometrics)
  - Cross-border data transfers outside EEA
  
- [ ] **Conduct DPIA before processing begins:**
  - Describe the processing operation and purposes
  - Assess necessity and proportionality
  - Identify and assess risks to individuals
  - Document mitigation measures
  
- [ ] **Consult DPO** (if applicable) during DPIA
- [ ] **Consult supervisory authority** if high risk cannot be mitigated

**Template:** ICO DPIA template, CNIL DPIA guides

---

## 6. Data Subject Rights

GDPR grants individuals extensive rights. You must have processes to handle requests.

### 6.1 Rights to Implement
- [ ] **Right of Access (Article 15):** Provide copy of personal data and processing information
  - Response time: 1 month (extendable by 2 months if complex)
  - Free of charge (can charge reasonable fee for excessive requests)
  
- [ ] **Right to Rectification (Article 16):** Correct inaccurate or incomplete data
  - Response time: 1 month
  
- [ ] **Right to Erasure / "Right to be Forgotten" (Article 17):** Delete data under certain conditions
  - Conditions: Consent withdrawn, no longer necessary, unlawful processing, etc.
  - Exceptions: Legal obligations, legal claims, freedom of expression
  
- [ ] **Right to Restriction (Article 18):** Limit processing under certain conditions
  - Store but not process data (e.g., during dispute over accuracy)
  
- [ ] **Right to Data Portability (Article 20):** Receive data in structured, machine-readable format
  - Applies to: Consent or contract-based processing, automated processing
  - Format: CSV, JSON, XML, etc.
  
- [ ] **Right to Object (Article 21):** Object to processing based on legitimate interests or direct marketing
  - Direct marketing: Must stop immediately
  - Legitimate interests: Must demonstrate compelling grounds to continue
  
- [ ] **Rights Related to Automated Decision-Making (Article 22):** Right not to be subject to solely automated decisions with legal/significant effects
  - Exceptions: Necessary for contract, authorized by law, explicit consent
  - Safeguards: Human intervention, ability to contest decision

### 6.2 Request Handling Process
- [ ] **Identify requests:** Provide clear contact information (email, form, portal)
- [ ] **Verify identity:** Implement secure identity verification to prevent unauthorized disclosure
- [ ] **Respond within 1 month** (extendable to 3 months for complex requests)
- [ ] **No charge** for legitimate requests (can refuse or charge for manifestly unfounded/excessive requests)
- [ ] **Log all requests** (date received, type of request, response date, actions taken)
- [ ] **Train staff** on handling data subject requests

**Tools:** Data subject request portals, case management systems

---

## 7. Data Breach Procedures

### 7.1 Breach Detection
- [ ] **Define "personal data breach":** Breach of security leading to destruction, loss, alteration, unauthorized disclosure, or access
- [ ] **Implement monitoring:** Security logging, intrusion detection, anomaly detection
- [ ] **Establish incident response team:** Designate roles and responsibilities

### 7.2 Breach Notification Requirements
- [ ] **Notify supervisory authority within 72 hours** of becoming aware (Article 33)
  - Required if breach poses risk to individuals' rights and freedoms
  - Exception: If breach unlikely to result in risk
  - Late notification: Provide reasons for delay
  
- [ ] **Notify affected individuals without undue delay** (Article 34)
  - Required if breach poses high risk to individuals
  - Exception: Mitigating measures taken (e.g., encryption), disproportionate effort, or public communication
  
- [ ] **Document all breaches** (regardless of notification requirement)
  - Facts of the breach, effects, remedial actions

### 7.3 Breach Response Plan
- [ ] **Containment:** Immediately stop the breach and prevent further damage
- [ ] **Assessment:** Evaluate scope, severity, and risk to individuals
- [ ] **Notification:** Notify authority and individuals as required
- [ ] **Documentation:** Record all actions taken
- [ ] **Review:** Conduct post-incident review and update security measures

**Template:** ICO breach reporting template, sample breach notification letters

---

## 8. Data Protection Officer (DPO)

### 8.1 DPO Requirement
You must appoint a DPO if:
- [ ] You are a **public authority** (with exceptions for courts)
- [ ] Your **core activities require regular and systematic monitoring** of individuals on a large scale
- [ ] Your **core activities consist of large-scale processing of special categories** or criminal data

**Note:** Even if not required, appointing a DPO is best practice.

### 8.2 DPO Responsibilities
- [ ] **Monitor compliance** with GDPR and internal data protection policies
- [ ] **Advise** on data protection impact assessments
- [ ] **Train staff** on data protection obligations
- [ ] **Cooperate** with supervisory authority
- [ ] **Act as contact point** for supervisory authority and data subjects

### 8.3 DPO Appointment
- [ ] **Designate DPO** (can be internal staff or external service provider)
- [ ] **Ensure independence:** DPO reports to highest management, no conflicts of interest
- [ ] **Provide resources:** Sufficient resources and access to perform duties
- [ ] **Publish contact details** (name and contact info in privacy policy)
- [ ] **Notify supervisory authority** of DPO contact details

---

## 9. International Data Transfers

### 9.1 Transfer Mechanisms
Data transfers outside the EEA require adequate safeguards:

- [ ] **Adequacy Decisions (Article 45):** Transfer to countries recognized by EU as providing adequate protection
  - Approved countries: UK, Switzerland, Canada (commercial), Japan, Israel, New Zealand, etc.
  - Check current list: [EU Commission adequacy decisions](https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)
  
- [ ] **Standard Contractual Clauses (SCCs) (Article 46):** Use EU-approved contract templates
  - New SCCs adopted June 2021 (replace old clauses)
  - Conduct Transfer Impact Assessment (TIA) to ensure destination country provides adequate protection
  
- [ ] **Binding Corporate Rules (BCRs):** For intra-group transfers within multinational companies
  - Requires approval from supervisory authority
  
- [ ] **Certification Mechanisms:** Approved certification with binding commitments
  
- [ ] **Derogations (Article 49):** Limited exceptions (explicit consent, contract necessity, legal claims, vital interests, public interest)
  - Use sparingly and document reasoning

### 9.2 Transfer Documentation
- [ ] **Identify all international transfers** in data flow mapping
- [ ] **Document transfer mechanism** used (adequacy, SCCs, BCRs, etc.)
- [ ] **Conduct Transfer Impact Assessments (TIAs)** when using SCCs
- [ ] **Include transfer details** in privacy policy
- [ ] **Review transfers** when circumstances change (e.g., Schrems II decision)

---

## 10. Accountability and Governance

### 10.1 Documentation
- [ ] **Records of Processing Activities (ROPA) (Article 30):** Maintain comprehensive records
  - Controller information
  - Processing purposes
  - Data subject categories
  - Data categories
  - Recipient categories
  - International transfers
  - Retention periods
  - Security measures
  
  **Note:** Required if 250+ employees, or if processing is high risk, not occasional, or involves special categories.
  
- [ ] **Data protection policies and procedures:**
  - Internal data protection policy
  - Data retention policy
  - Data breach response plan
  - Data subject request procedures
  - Third-party data processing agreements
  
- [ ] **Consent records** (who, when, what, how)
- [ ] **Data Protection Impact Assessments (DPIAs)**
- [ ] **Legitimate Interest Assessments (LIAs)**
- [ ] **Transfer Impact Assessments (TIAs)**

### 10.2 Third-Party Management
- [ ] **Identify all data processors** (cloud providers, SaaS tools, payment processors, etc.)
- [ ] **Execute Data Processing Agreements (DPAs)** with all processors (Article 28)
  - Subject matter and duration
  - Nature and purpose of processing
  - Type of personal data
  - Obligations and rights of controller
  - Processor obligations (security, confidentiality, sub-processing, assistance with data subject rights)
  
- [ ] **Conduct due diligence** on processors (security, compliance, certifications)
- [ ] **Monitor processor compliance** (audits, questionnaires, certifications)
- [ ] **Manage sub-processors:** Ensure processors have your authorization for sub-processors

### 10.3 Training and Awareness
- [ ] **Train all employees** on GDPR basics and their responsibilities
- [ ] **Role-specific training** (e.g., developers on privacy by design, support staff on data subject requests)
- [ ] **Regular refresher training** (annually or when policies change)
- [ ] **Document training** (attendance, topics covered)

### 10.4 Regular Reviews
- [ ] **Annual compliance audit:** Review all processing activities, policies, and documentation
- [ ] **Policy updates:** Update privacy policy and internal policies as needed
- [ ] **Risk assessments:** Reassess risks when introducing new processing activities or technologies
- [ ] **Monitor regulatory developments:** Stay informed about guidance from supervisory authorities and court decisions

---

## 11. Privacy Policy Requirements

Your privacy policy must include (Article 13-14):

- [ ] **Identity and contact details** of controller and DPO
- [ ] **Purposes of processing** and legal basis for each
- [ ] **Legitimate interests** pursued (if applicable)
- [ ] **Recipients or categories of recipients** of personal data
- [ ] **International transfers** and safeguards used
- [ ] **Retention periods** or criteria to determine them
- [ ] **Data subject rights** and how to exercise them
- [ ] **Right to withdraw consent** (if processing based on consent)
- [ ] **Right to lodge a complaint** with supervisory authority
- [ ] **Whether providing data is mandatory** and consequences of not providing
- [ ] **Automated decision-making** (if applicable), including profiling and logic involved
- [ ] **Source of data** (if not collected directly from data subject)

**Language:** Clear, plain language accessible to the average person.

---

## 12. Supervisory Authorities and Enforcement

### 12.1 Identify Your Lead Supervisory Authority
- [ ] **One-Stop-Shop Mechanism:** If you operate in multiple EU countries, identify your lead supervisory authority (usually where main establishment is)
- [ ] **Register with supervisory authority** (if required in your jurisdiction)

### 12.2 Cooperation
- [ ] **Respond to authority requests** promptly and completely
- [ ] **Cooperate with investigations** and audits
- [ ] **Report breaches** as required (within 72 hours)

### 12.3 Penalties
Understand potential penalties for non-compliance:
- **Tier 1 violations:** Up to €10 million or 2% of global annual turnover (whichever is higher)
  - Data processing agreements, DPO requirements, etc.
- **Tier 2 violations:** Up to €20 million or 4% of global annual turnover
  - Core principles (lawfulness, transparency, purpose limitation), data subject rights, international transfers

**Note:** Supervisory authorities also have power to issue warnings, reprimands, and impose processing bans.

---

## 13. Continuous Compliance

GDPR compliance is not a one-time project but an ongoing process.

### 13.1 Establish Regular Cadence
- [ ] **Monthly:** Review new processing activities, vendor assessments
- [ ] **Quarterly:** Data subject request metrics, breach analysis, training refreshers
- [ ] **Semi-Annually:** DPO reports to management, policy reviews
- [ ] **Annually:** Full compliance audit, ROPA updates, DPIA reviews

### 13.2 Stay Informed
- [ ] **Subscribe to updates** from supervisory authorities (ICO, CNIL, EDPB)
- [ ] **Monitor case law** (CJEU decisions like Schrems, Google Spain)
- [ ] **Join industry groups** and attend webinars
- [ ] **Consult legal counsel** for significant changes or complex issues

---

## Quick Start Checklist

If you're just starting with GDPR compliance, prioritize these actions:

1. [ ] **Appoint a DPO** (if required) or designate a data protection lead
2. [ ] **Create a data inventory** (what data you collect, why, where, how long)
3. [ ] **Document legal bases** for all processing activities
4. [ ] **Update your privacy policy** to be GDPR-compliant
5. [ ] **Implement consent mechanisms** (clear, specific, withdrawable)
6. [ ] **Establish data subject request process** (access, deletion, portability, etc.)
7. [ ] **Create breach response plan** and document all breaches
8. [ ] **Review third-party contracts** and execute DPAs with processors
9. [ ] **Assess international transfers** and implement safeguards (SCCs, adequacy)
10. [ ] **Train employees** on GDPR basics and their role

---

## Resources

### Official Sources
- **GDPR Text:** https://gdpr-info.eu/
- **European Data Protection Board (EDPB):** https://edpb.europa.eu/
- **EU Commission:** https://ec.europa.eu/info/law/law-topic/data-protection_en

### Supervisory Authorities (Examples)
- **UK - ICO:** https://ico.org.uk/
- **Ireland - DPC:** https://www.dataprotection.ie/
- **Germany - BfDI:** https://www.bfdi.bund.de/
- **France - CNIL:** https://www.cnil.fr/en
- **Spain - AEPD:** https://www.aepd.es/en

### Tools and Templates
- **ICO:** Accountability framework, DPIA templates, breach reporting
- **CNIL:** GDPR guides, PIA software
- **EDPB:** Guidelines on various GDPR topics

### Compliance Platforms
- OneTrust, TrustArc, BigID, Osano, Cookiebot, Segment (consent management)

---

**Disclaimer:** This checklist is for informational purposes only and does not constitute legal advice. GDPR requirements vary based on your specific circumstances. Consult qualified legal counsel for compliance guidance tailored to your organization.
