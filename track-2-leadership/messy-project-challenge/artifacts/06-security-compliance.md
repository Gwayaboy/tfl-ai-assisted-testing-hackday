# FareRight — Security & compliance checklist

*From: Marcus (Security & Compliance). This feature moves money and touches PII — high stakes.*

> ⚠️ Fictional scenario for training.

## Why this is high-risk

FareRight **issues real money** automatically and processes **personal + payment-related data**
(cards, journeys, locations). Two failure modes keep me up at night:

1. **Refunding money that shouldn't be refunded** (fraud, false positives, double-refunds).
2. **Leaking or mishandling personal/payment data** (journeys reveal where people go).

## Requirements

- **Authorisation:** only the account owner can view their refunds/queries. No IDOR — a user
  must never see another passenger's refunds by changing an id in the URL.
- **Auditability:** every automated refund must be logged immutably — amount, reason, journeys,
  card token, timestamp, and the decision that triggered it. Finance & audit will ask.
- **Reversibility:** we must be able to reverse an erroneous refund.
- **Fraud / abuse:** consider someone gaming detection to farm refunds. Rate limits? Anomaly
  detection? At minimum, **a cap with manual review above a threshold** (Security recommends a
  limit — this conflicts with the PO's "auto-refund everything").
- **Data minimisation & PII:** journey data is sensitive. Mask/tokenise card data. Don't log raw
  PAN. GDPR/UK-GDPR applies (retention, right of access).
- **Idempotency:** late/duplicate outage data must **not** cause double refunds (see Ops email).

## Compliance

- PCI-DSS considerations for anything touching card data.
- Data protection impact assessment (DPIA) likely required.

> My strong recommendation: **do not "auto-refund everything" for a real launch.** A cap +
> manual review above it is the minimum safe control. The demo can fake this; production cannot.
