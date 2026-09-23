# Facilitator script — Messy Project curveballs

**For facilitators only.** Release these **on a timer** to keep energy up and test how teams
**adapt**. Don't hand them out in advance. Announce to the whole room (or drop into the group
chat) as "📣 Curveball!".

Suggested cadence for a ~75–90 min challenge. Adjust to the room.

---

## T+15 min — 📣 Curveball 1: "The demo just moved up"

> "Good news and bad news. The board demo got moved **forward to next week**. You now have
> **half the time**. What's your **minimum viable test scope** to give the board confidence —
> and what are you explicitly *not* covering, and why?"

**Tests:** ruthless prioritisation; ability to state residual risk.

---

## T+30 min — 📣 Curveball 2: "Legal has entered the chat"

> "Legal saw the mock-ups. The screens say **'You've been refunded'** but the money arrives
> next day. They're calling it **misleading to consumers**. This is now a **release blocker**.
> How does it change your risk matrix and what do you test?"

**Tests:** do they connect a copy/comms issue to real risk; do they re-prioritise; did they
already spot the "instant" contradiction from the artifacts?

---

## T+45 min — 📣 Curveball 3: "The false-positive bomb"

> "Overnight, the detection logic refunded **8,000 passengers who were NOT overcharged** —
> because the reader-outage feed arrived late and it double-counted. Finance is furious.
> What's your **assurance story** so this can't happen in production? What would have caught
> it *before* go-live?"

**Tests:** idempotency/resilience thinking; data-quality testing; whether they consulted Ops &
Security personas; reversibility.

---

## T+55 min — 📣 Curveball 4: "Who answers the queries?" *(optional)*

> "Marketing already tweeted about the shiny **'raise a query'** button. But there's **still no
> team** to answer those queries. Do you test and ship a feature you can't support? Make the
> call and justify it."

**Tests:** leadership judgement beyond pure testing; scope discipline; stakeholder awareness.

---

## T+65 min — 📣 Curveball 5: "Peak day" *(optional, for strong teams)*

> "There's a **strike day** next week — overcharges will **spike 10×** exactly when the batch
> window is tightest. Is your strategy still safe? What performance/resilience testing do you
> add?"

**Tests:** non-functional leadership (the exact gap TfL wants to close); testing for the bad
day, not the average.

---

## Running notes

- **Reward adaptation, not perfection.** A team that calmly re-prioritises beats one with a
  beautiful plan they never change.
- **Nudge quiet teams** toward the forgotten personas (Ops, Security, Accessibility, Finance).
- **Watch for the traps:** planning from the legacy spec (07); believing "instant"; ignoring
  the £25 cap conflict; forgetting accessibility.
- Keep a light scoreboard using the [scoring sheet](../../../docs/facilitator-guide.md#printable-scoring-sheet-per-team).
- Have fun with the personas — ham it up. The role-play is half the fun. 🎭
