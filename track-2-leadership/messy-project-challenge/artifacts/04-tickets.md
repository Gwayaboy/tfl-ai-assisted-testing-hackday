# FareRight — backlog tickets (export)

*Partial, inconsistent, and some are stale. Read the statuses and dates carefully.*

> ⚠️ Fictional scenario for training.

---

### FR-101 — Detect incomplete-journey overcharges
**Status:** In Progress
**Acceptance criteria:**
- Given a tap-in with no matching tap-out within the journey window
- When the daily detection job runs
- Then the journey is flagged as a likely overcharge
**Notes:** threshold for "journey window" TBD. Currently hard-coded to 3 hours in dev.

---

### FR-102 — Issue refund to original card
**Status:** In Progress
**Acceptance criteria:**
- Refund the overcharged amount to the card used
- Record a refund reference
**Notes:** payment provider = overnight batch only. Partial refunds supported? *unconfirmed.*

---

### FR-103 — Refund history screen (app + web)
**Status:** In Progress
**Acceptance criteria:**
- Passenger can see a list of refunds with date, amount, reason
- Passenger can open a refund to see the journeys involved

---

### FR-104 — "Raise a query" on a refund
**Status:** ❄️ On hold (see chat — no team to answer queries)
**Acceptance criteria:** *(draft)* passenger can submit a question about a refund

---

### FR-105 — Cap auto-refund at £25, above goes to manual review
**Status:** 🚫 Rejected by PO ("auto-refund everything for the demo")
**Notes:** Security/Finance may disagree. Unresolved.

---

### FR-087 — Refund copy: "You've been refunded"
**Status:** ✅ Done (last updated 4 months ago)
**Notes:** ⚠️ Predates the overnight-batch decision. Copy is now **misleading** (money isn't
instant). Likely needs reopening.

---

### FR-060 — Season ticket / Travelcard refunds
**Status:** Closed — "moved to Fares team"
**Notes:** Out of scope for FareRight… but a passenger with BOTH a Travelcard and PAYG could be
affected. Edge case nobody owns.

---

### FR-110 — Accessibility of refunds screens
**Status:** 🆕 New, unrefined
**Acceptance criteria:** *(none yet)*
