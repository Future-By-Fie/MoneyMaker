# MoneyMaker™ — MVP Build Specification

**Purpose:** Lovable-ready product specification. Build the financial core before Flex integrations.

## Screens

### 1. Today
- Dominant number: **"You can spend approximately X kr today"**
- Small next-payday countdown
- One goal progress indicator
- Clear freshness status: confirmed recently / aging / update needed
- Primary action: **Money Check**
- Secondary action: **Set a goal**

### 2. My Goal
- Select a date or short period
- Set a target amount using a slider plus accessible numeric input
- Recalculate remaining daily allowance immediately
- Explain infeasible goals clearly; never display a negative allowance as spendable money
- Goal is a **virtual reservation**, not a bank transfer

### 3. Money Check
- Show **"Estimated balance: X kr — please check against your bank"**
- Prepopulate from the last confirmed balance or a clearly labeled model estimate
- Allow one-tap confirmation or editing
- Never present the estimate as bank-sourced
- Reconcile the new confirmed balance and recalculate the budget
- Preserve reserved goals and avoid double-counting known bills

### 4. Minimal settings
- Payday date and cadence
- Upcoming bills, obligations and safety buffer
- Notification opt-in
- Currency and locale
- Privacy controls

## Calculation principles

Let:
- B = most recently **user-confirmed** available balance
- O = outstanding obligations expected before payday, excluding anything already paid
- S = safety buffer
- G = future goal reservations
- D = number of applicable remaining ordinary spending days

For a simple equal daily allowance:

`allowance = max(0, (B - O - S - G) / D)`

Do not silently assume all bills are unpaid after a balance refresh. Track payment status or ask for clarification. Reconciliation should use the newly confirmed balance as the source of truth for cash availability.

If goals and obligations exceed available funds, show a shortfall and suggest adjusting goals. Never label the result safe or guaranteed.

**Example:** 12,000 kr available after obligations; 30 days left: 400 kr/day. Three no-spend days later, 27 days left: approximately 444 kr/day, assuming the balance is verified and unchanged.

## Balance freshness — proposed UX rules for testing

- **0–1 days:** Show estimate and timestamp.
- **2–3 days:** Show caution and prompt for a Money Check.
- **4+ days:** Stronger warning; suppress numeric allowance in push notifications.
- Always show the last confirmation date.
- These thresholds are product hypotheses, not quantified confidence intervals.

## Morning Money — one retention mechanism

- Opt-in only, default off.
- Recent confirmed balance: show approximate allowance in a daily notification.
- Aging balance: invite user to perform a Money Check, without implying the number is current.
- Stale balance: no confident numeric push notification; cap reminders to avoid spam.
- No streak pressure, guilt, or spending encouragement.

## Prototype requirements

- Mobile-first responsive UI
- Swedish and English copy structure; SEK as first example currency
- Accessible contrast and controls
- Local demo data; no real bank credentials
- Deterministic financial calculations with unit tests
- Explicit prototype disclaimers
- Do not claim live bank connection, real ringtone integration or licensed music
- Keep architecture modular for later authorized Open Banking integration

## Acceptance tests

1. 12,000 / 30 days => 400 per day.
2. 12,000 / 27 days => about 444 per day.
3. Reserve 4,900 kr for 7 final days; distribute remaining 7,100 kr across 23 days => about 309 kr/day.
4. New confirmed balance updates forecast without double-subtracting a paid bill.
5. Stale data is visibly labeled and does not produce a confident push amount.
6. Goal beyond available funds produces an explicit shortfall, not misleading allowance.
7. No external bank or music API is required to demonstrate the MVP.
