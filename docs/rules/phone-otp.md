# Phone & OTP Rules (SYNTHETIC — demo only)

Mirrors `server/rules/phone.js`. Previously undocumented — this repo's business-rule extractor demo (see `business-rules/deposit-account-digital.md`) flagged that this logic existed only in code with no plain-language mirror, unlike every other rule area. This file closes that gap.

- Presented as two separate screens: phone number entry (phone-number), then a one-time code entry (otp-verification). The second screen doesn't re-collect the phone number — it references the number captured on the first screen in its copy ("code sent to xxx-xxx-xxxx").
- Phone number must be a 10-digit number — non-digit characters are stripped before counting.
- The one-time code is mocked for this demo: the only code that ever verifies successfully is `123456`. A real implementation would text an actual random, single-use code.
