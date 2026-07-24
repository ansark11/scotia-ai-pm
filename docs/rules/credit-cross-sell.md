# Credit Cross-Sell Rules (SYNTHETIC — demo only, made-up thresholds)

Mirrors `server/rules/creditOffer.js`. This is a gating rule — the Credit card offer screen is only ever shown to qualifying applicants. Non-qualifying applicants go straight from Employment info to Tax questions; the offer screen does not appear at all, not even briefly.

Applicant qualifies only if **all** of the following hold:

- Annual income is at least $24,000.
- Employment status is Employed or Self-employed (Student, Retired, and Unemployed do not qualify for this particular offer in the demo).
- Applicant is at least 21 years old — a higher bar than the 18+ minimum for opening the deposit account itself.

If qualifying, the displayed credit limit is calculated as 20% of annual income, capped at $15,000, rounded to the nearest $100.

If the applicant accepts the offer, a moment-of-delight transition screen ("Your card has been added") plays for about 2 seconds before automatically continuing to Tax questions. If they skip it, or never saw it, the journey continues straight to Tax questions with no transition. Either way, Confirmation notes a physical card is on its way (5-7 business days) only when the offer was accepted; otherwise it makes no mention of a card.
