Subject: RE: FareRight — Operations constraints (PLEASE READ before you plan testing)
From: Dan (Operations & Reliability)
To: FareRight team

> ⚠️ Fictional scenario for training.

Team,

Flagging the operational realities before you all promise the board something we can't run.

**1. Volumes.** On a normal weekday we process ~**millions** of contactless taps. Even if only
a small % are overcharges, that's potentially **tens of thousands of refunds a day**. Any
testing needs to consider **load** — the refund job cannot fall over at month-end or after a
major outage (when overcharges spike).

**2. The overnight batch window is tight.** The refund batch runs 02:00–04:00. If detection +
refund generation doesn't finish in that window, refunds slip a day. **Performance is a
first-class requirement**, not a nice-to-have.

**3. Reader-outage feed reliability.** As the devs know, the outage feed can be **delayed or
incomplete**. Our SLA with the supplier is "within 6 hours" but in practice we've seen 12h+.
Your detection logic must be **resilient** to late/missing data — and must not double-refund
when late data arrives.

**4. Reconciliation.** Finance reconciles refunds daily. Every auto-refund must be **traceable**
(who, why, which journeys, which card) and **reversible**. If we can't explain a refund, we
can't ship it.

**5. Peak events.** Think strike days, big events, weather disruption — overcharges spike
exactly when the system is under most stress. Test for the bad day, not the average day.

Happy to walk anyone through the batch architecture — grab me.

Dan
