# Dev team chat — #farebright-build (excerpt)

*Informal thread. Not a spec. But there's real information (and disagreement) buried here.*

> ⚠️ Fictional scenario for training.

---

**Leo Durrant (Engineering)** — 09:14
morning all. heads up: the payment provider only lets us issue refunds in **overnight batches**.
so "instant refund within 24h" from Milo's brief isn't really instant — realistically it's
**next-day**, sometimes 48h over a weekend.

**Leo** — 09:16
😬 the designs say "refunded instantly" though. we'll get complaints if the money isn't there.

**Leo** — 09:17
yeah we need to change the copy. "refund on its way" not "refunded".

**Franck Theolade (Ops)** — 09:20
also the overcharge detection is heuristic. we WILL get false positives. what happens if we
refund someone who wasn't actually overcharged? finance will not be happy.

**Leo** — 09:22
is there a cap? like max auto-refund without a human checking?

**Leo** — 09:23
good q. nothing agreed. I'd say anything over **£25** should go to manual review. but that's my
opinion, not signed off.

**Milo Farrell (PO)** — 09:40
Let's keep it simple for the demo — auto-refund everything, we'll add review later.

**Franck** — 09:41
that's risky for real money. demo != prod. can we at least log everything and make it reversible?

**Leo** — 10:05
the "raise a query" button — where do those queries go? is there a team to answer them? if not
we're promising support we can't deliver.

**Leo** — 10:06
🤷 nobody's owned that. ops? customer service?

**Milo** — 10:30
Parking the query flow for now. Focus on detection + refund + showing history.

**Franck** — 11:15
reminder the reader-outage data feed is **flaky** — sometimes hours late. our detection depends
on it. if it's late, we might refund the wrong journeys or miss real overcharges.

**Leo** — 11:20
and accessibility — has anyone looked at the refunds screen with a screen reader? legal will ask.

**Leo** — 11:21
not yet. add it to the pile 🙃
