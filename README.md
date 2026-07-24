# Deposit Account Onboarding Demo (Synthetic)

A real, running fake-bank onboarding web app — frontend, backend, dark-mode red-accent design system, and business rules — built to demonstrate what workspace-aware AI can do that Copilot Web cannot. Everything here (the bank, the journey, the rules, the data) is invented for this demo. No real code, data, or business rules are included. The credit card red is an approximation of a brand color, not a verified hex.

Every screen is pre-filled with mock data so you can click through the entire 14-step journey quickly. All fields remain editable.

## The journey (14 steps)

1. Overview
2. Phone number
3. Verify code (OTP)
4. Profile setup
5. Verify identity (intro)
6. Identity verification
7. Address info
8. Employment info (branches by employment status)
9. Credit card offer — **conditional**: only shown if the applicant qualifies (see `docs/rules/credit-cross-sell.md`). The pre-filled default data qualifies, so you'll see it by default. Lower "Annual income" below $24,000 in Employment info, or change employment status to Student/Retired/Unemployed, to see the skip path instead.
10. Card added — **conditional**: only shown if the credit card offer was accepted; auto-advances after ~2 seconds.
11. Tax questions
12. Account agreements (Terms & conditions)
13. Fund account
14. Confirmation

## The branch-assisted journey (17 steps)

Start at `/fa-login` instead of `/overview`. Adds an FA login step, replaces identity verification with a remote hand-off (the customer completes ID-V on their own device — see `docs/rules/remote-identity-verification.md`), adds dual e-signature (client + FA) before funding, and shows a QR code on Confirmation for the customer to set up online banking access. Everything else is reused as-is from the digital journey.

To see the remote ID-V hand-off for real: on the "Verify identity" step, click Send via SMS/Email, then open the displayed link (in a new tab, or on another device on the same network) to complete ID-V as the customer — the FA's screen will detect completion and continue automatically.

## What's in here

```
deposit-account-onboarding/
├── client/                  React + Vite frontend (npm run dev)
│   └── src/
│       ├── components/      TopBar, BottomNav, FormField, CTAButton, CreditCardVisual, AccountCardVisual
│       ├── pages/           journey screens (digital + branch-only), one page each
│       └── context/         JourneyContext — digital + branch step lists, pre-filled mock data
├── server/                  Express mock backend (npm start)
│   ├── rules/               real business-rule validation logic, one file per rule area
│   └── data/                in-memory mock "database" + remote ID-V session store
├── docs/rules/              plain-language versions of the same rules, plus channel rules
│   └── channels/            digital.md and branch.md — both implemented
├── schema/                  journey-schema.json — the future JSON-driven journey format
├── modules/                 one JSON descriptor per step, matching the schema
└── existing-journeys/       deposit-digital.json and deposit-branch.json — both journeys expressed in that schema
```

## How to run it

Two terminals:

```
# Terminal 1 — backend
cd server
npm install
npm start          # http://localhost:4000

# Terminal 2 — frontend
cd client
npm install
npm run dev         # http://localhost:5173
```

Open `http://localhost:5173`. Click through — everything is pre-filled, so each screen just needs a click on "Continue."

## Design

Dark mode, red accent, card-style inputs, pill CTA buttons — the "bold dark" direction reviewed and approved earlier, with the accent swapped from violet to a Scotiabank-red approximation (`--accent: #e4002b` in `client/src/styles/theme.css`). Swap that one variable if you have the exact brand hex.
