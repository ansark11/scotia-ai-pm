# Employment Info Rules (SYNTHETIC — demo only)

- Employment status branches the fields shown:
  - Employed / Self-employed → employer name, job title, annual income
  - Student → school name, expected graduation date, annual income (if any)
  - Retired → annual income (pension/other), no employer field
  - Unemployed → annual income (other sources, defaults to $0), no employer field
- Annual income is always required, regardless of status — it feeds the credit cross-sell eligibility check in the next step.
- This step always continues to either Credit card offer or Tax questions, depending on that eligibility check. See `credit-cross-sell.md`.
