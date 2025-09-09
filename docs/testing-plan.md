# RentBack – Testing Plan (Regulatory Sandbox)

**Objective:** Validate core flows (onboarding, payment initiation, rewards accrual/redemption) with clear entry/exit criteria, logs, and issue tracking.

## Scope
- Demo app UI (tenant & landlord roles)
- Payment creation + status transitions (initiated → sent → succeeded/refunded)
- Rewards catalog → redemption flow
- Data logging to sheets (Apps Script endpoint)
- Multilingual UI (EN/UR) and RTL layout

## Environments
- **Prod:** `app.rentback.app` (UI), `rentback.app` (landing)
- **Ops:** `/api/health` returns `{ ok: true }`

## Test Cases (sample)
1. **Create Bank Transfer Payment**
   - Input valid amount & landlord → Instructions shown with ref (IBAN + memo)
   - Mark as sent → Status updates to “sent”
2. **Card/Wallet Payment (Demo)**
   - Create → Status “succeeded” and receipt available
3. **Refund Demo Payment**
   - Allowed when not “initiated” → Status “refunded”
4. **Rewards Redeem**
   - Pick item + denom → Receipt shows points and status “requested”
   - Mark fulfilled/cancelled updates log
5. **i18n and RTL**
   - Toggle EN/UR → text changes and layout direction updates
6. **Legal Pages**
   - `/legal/privacy|terms|rewards|complaints|sandbox?lang=en|ur` render correctly

## Evidence & Logging
- Screenshots of each test
- CSV exports (demo payments)
- Apps Script sheet entries (payments, redemptions, waitlist)

## Risks & Mitigations
- See **Risk Register**.

## Exit Criteria
- All critical paths pass
- No P0/P1 defects outstanding
- Logs captured and archived
