# Who's who — the people you need to talk to

Information about FareRight is **siloed**. Each person below holds part of the truth. In the
session, ask your **facilitator to role-play a persona** to unlock what only they know — just
like a real test lead chasing down the picture.

> 💡 Scoring hint: teams that **identify and consult the right people** (especially Ops,
> Security and Accessibility — the ones easy to forget) score higher on collaboration.

| Persona | Role | Holds the key to… | Easy to forget? |
|---------|------|-------------------|-----------------|
| **Priya** | Product Owner | the vision, the demo deadline, scope calls | No — everyone talks to the PO |
| **Tom** | Backend dev | the overnight-batch reality, refund mechanics | Sometimes |
| **Raj** | Backend dev | false positives, flaky outage feed, idempotency | Sometimes |
| **Sara** | Frontend dev | the misleading "instant" copy, the query-flow gap | Sometimes |
| **Dan** | Operations & Reliability | volumes, batch window, peak-day load, reconciliation | **Yes** ⚠️ |
| **Nadia** | Accessibility Lead | legal a11y requirements for public screens | **Yes** ⚠️ |
| **Marcus** | Security & Compliance | fraud, PII, auditability, the cap-vs-auto-refund conflict | **Yes** ⚠️ |
| **Fran** | Finance | reconciliation, refund approval, false-positive cost | **Yes** ⚠️ |

## The tensions you'll need to resolve

These **contradictions** are deliberate. Surfacing and resolving them is the heart of the
challenge:

1. **"Instant refund" (PO) vs "overnight batch, next-day" (Dev/Ops)** — the passenger copy is
   wrong. What's the real promise, and how do you test it?
2. **"Auto-refund everything" (PO) vs "cap + manual review above £25" (Security/Finance)** —
   money + false positives. Where do you land, and what's the risk if you're wrong?
3. **Legacy spec (£10 approval, 5–10 days, manual) vs FareRight (automated, next-day)** — the
   old wiki is out of date. Don't plan from it.
4. **The "raise a query" feature is promised but unowned** — no team to answer queries. Do you
   test a feature that can't be supported?
5. **Accessibility & Security are barely in the tickets** — but they're legally required for a
   public, money-moving service. A leader puts them on the map.
