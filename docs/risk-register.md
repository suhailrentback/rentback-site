# RentBack – Risk Register

| ID | Risk | Likelihood | Impact | Owner | Mitigation | Status |
|----|------|------------|--------|-------|------------|--------|
| R-01 | Partner API change breaks flows | Medium | High | Eng | Use feature flags; monitor health; fallback to bank transfer instructions | Open |
| R-02 | Data privacy non-compliance | Low | High | Compliance | Minimal data collection; privacy review; delete-on-request | Open |
| R-03 | Fraud/abuse in rewards | Medium | Medium | Product | Rate limits; manual review; points reversals | Open |
| R-04 | i18n/RTL rendering issues | Medium | Low | Eng | Visual QA on EN+UR; RTL snapshots | Open |
| R-05 | Uptime/SEO gaps | Low | Low | Ops | `/api/health`, `robots.txt`, `sitemap.xml` | Open |
