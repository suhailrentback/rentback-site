# RentBack — Risk Register

| ID | Risk Category | Description | Likelihood | Impact | Mitigation | Owner |
|----|---------------|-------------|------------|--------|------------|-------|
| R1 | Data Integrity | Payment/ref redemption logs inconsistent | Low | Medium | Immutable refs, client-side validations, weekly audits | Eng Lead |
| R2 | Privacy | PII mishandling through logs/forms | Low | High | Minimal collection, HTTPS only, deletion on request | DPO |
| R3 | Availability | Vercel outage affecting access | Medium | Medium | Status monitoring, static fallbacks, comms plan | Ops |
| R4 | Abuse/Fraud | Automated spam to waitlist/complaints | Medium | Medium | Honeypot, rate limiting, server-side filters | Eng |
| R5 | i18n/RTL | Urdu layout mis-renders | Low | Low | Visual QA matrix on mobile/desktop | Design |
| R6 | Miscommunication | Sandbox users assume live payments | Medium | Medium | Prominent “Demo only” banners, copy review | PM |
| R7 | Security | XSS via inputs | Low | High | Input sanitization, strict content rendering | Eng |
| R8 | Legal | T&Cs/Privacy out of date | Low | Medium | Quarterly review cadence | Legal |
