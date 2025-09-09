# RentBack — Regulatory Sandbox Testing Plan

## 1. Objectives & Hypotheses
- **Objective:** Validate safe, reliable rent-payment recording and rewards accrual for tenants and clear visibility for landlords.
- **Hypothesis H1:** ≥ 95% of demo transactions are logged correctly with consistent references.
- **Hypothesis H2:** Rewards redemption flow records status transitions without orphan states (requested → fulfilled/cancelled).

## 2. Scope
- In-scope: Payment demo flows (create/mark sent/refund), rewards redemption, i18n/RTL, waitlist intake, complaints intake.
- Out of scope: Live funds movement, real KYC, production card processing.

## 3. Participants & Cohorts
- **Cohort T (Tenants):** 30–50 early users via waitlist.
- **Cohort L (Landlords):** 5–10 small landlords.

## 4. Test Scenarios
1. **Create demo payment (Bank Transfer)**
   - Expected: status `initiated` → “Mark as sent” → `sent`. Receipt renders.
2. **Create demo payment (Card/Wallet)**
   - Expected: status `succeeded`. Refund moves to `refunded`.
3. **Rewards redemption**
   - Expected: `requested` → `fulfilled`/`cancelled`; receipt renders.
4. **Language & RTL**
   - Toggle EN/UR; UR uses RTL; labels translate in modals and receipts.
5. **Waitlist submission**
   - Valid email + PK phone normalized to +92…; row appears in Sheet with UTM.
6. **Complaints intake**
   - User submits; ticket ID issued; response SLA met (see Complaints SOP).

## 5. Test Data & Logging
- **Data points:** `ref`, `amount`, `method`, `status`, `ts`, `utm*`, `ua`, `lang`.
- **Stores:** Google Sheet via Apps Script (no-cors POST).
- **Retention:** Test data retained 90 days for analysis then purged.

## 6. Success Metrics / KPIs
- Logging accuracy ≥ 99% (manual sample of 100 entries).
- Receipt render success ≥ 99%.
- PK phone normalization pass rate ≥ 98%.
- Complaint first-response within SLA ≥ 95%.

## 7. Risks & Mitigations
- See `05-risk-register.md`.

## 8. Timeline
- **T0:** Approval.
- **T0–T0+6 weeks:** Pilot run & weekly reports.
- **T0+7 days post-pilot:** Debrief & final report.

## 9. Reporting
- Weekly email to SBP contact with metrics & incidents (if any).
