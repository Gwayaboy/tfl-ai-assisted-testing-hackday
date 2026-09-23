# Refund Processing — System Specification (v1.2)

*Wiki page. Looks authoritative. Check the last-modified date before you trust it…*

> ⚠️ Fictional scenario for training.
>
> 🕰️ **Last modified: 2 years ago.** This is the **legacy manual refund** spec, written before
> FareRight existed. It is a **trap**: parts of it are obsolete. A good test lead notices the
> date and cross-checks against current sources rather than taking it as gospel.

## Overview

Refunds are processed **manually** by the Customer Service team. A passenger contacts us, an
agent investigates, and a refund is issued via the finance portal within **5–10 working days**.

## Process

1. Passenger emails or calls to report an overcharge.
2. Agent looks up the journey history.
3. Agent verifies the overcharge manually.
4. Agent raises a refund in the finance portal.
5. Finance approves refunds over **£10**.
6. Refund issued to the card in 5–10 working days.

## Rules (per this legacy doc)

- All refunds require **human approval**. *(Contradicts FareRight's automation goal.)*
- Approval threshold is **£10**. *(The current discussion is £25 — this doc is out of date.)*
- Refund window: **5–10 working days**. *(FareRight targets next-day-ish.)*
- Queries handled by Customer Service via the ticketing system. *(FareRight's query flow is on
  hold / unowned.)*

## SLA

- 95% of manual refunds completed within 10 working days.

---

*If you're planning FareRight testing from this document, stop — it describes the old world.
Use it only to understand what's changing, and to spot where legacy assumptions might leak into
the new system.*
