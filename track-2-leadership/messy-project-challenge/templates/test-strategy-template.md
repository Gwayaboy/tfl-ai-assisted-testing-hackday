# Test strategy — FareRight (one-pager)

*Keep it to a page. A focused strategy on the top risks beats a boil-the-ocean plan.*

## 1. Context & goal
*What is FareRight, and what does "safe to ship" mean for the board demo?*

## 2. Scope
**In scope:**
- …

**Out of scope (and why):**
- …

## 3. Key risks (top 3)
*From your risk matrix — the 3 that drive the strategy.*
1. …
2. …
3. …

## 4. Test approach

| Dimension | What we'll do |
|-----------|---------------|
| **Functional** | *detection accuracy, refund correctness, history screen, notifications…* |
| **Performance** | *batch completes in 02:00–04:00 at peak volumes…* |
| **Resilience** | *late/missing/duplicate outage feed → no double refunds (idempotency)…* |
| **Security** | *authorisation/IDOR, audit trail, reversibility, PII/PCI, fraud cap…* |
| **Accessibility** | *screen reader, keyboard, contrast, plain language…* |
| **Data** | *realistic edge cases: incomplete journeys, Travelcard+PAYG overlap…* |

## 5. Environments & data
*Where do we test? What data do we need? How do we avoid using real PII?*

## 6. Entry / exit criteria
**Entry:** *…*
**Exit / "safe to ship":** *…*

## 7. Assurance story for the board
*In two sentences: are we safe to ship, and what's the residual risk?*

---

## 8. Stakeholder one-slide (for the readout)
- **Top 3 risks:** …
- **What we tested & found:** …
- **Curveballs & how we adapted:** …
- **Recommendation:** ship / ship-with-conditions / not yet — because …
