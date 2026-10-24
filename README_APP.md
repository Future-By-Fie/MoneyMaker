# MoneyMaker™ — Core MVP

A mobile-first, front-end prototype for the MoneyMaker concept: a quick daily money outlook, not a complicated budgeting spreadsheet.

## Current prototype features
- Daily spendable estimate based on balance, unpaid bills, safety buffer, goal reservation, and days until payday.
- Editable Money Check values.
- A simple virtual savings goal (no money is transferred).
- Clear demo-only status; no bank connection or backend.
- Responsive dark navy and electric-lime interface.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Important limitations
This is an early front-end prototype. Values are sample/demo data held in React state and are not persisted between reloads. It does not connect to a bank, process payments, authenticate users, or provide financial advice. Currency is currently shown in USD for demo purposes.

## Product principle
“MoneyMaker should feel like checking the weather for your wallet — not doing your taxes.”
