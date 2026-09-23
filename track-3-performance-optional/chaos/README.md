# Chaos & resilience (optional, advanced)

Performance isn't just "how fast" — it's "does it **stay up** when things go wrong". On the prep
call we flagged **[Azure Chaos Studio](https://learn.microsoft.com/azure/chaos-studio/)** as a
stretch for the adventurous.

> Sandbox / MSDN only, and only against a target you deployed (e.g. Contoso Traders). Never run
> chaos experiments against anything you don't own.

## The idea

Deliberately inject failure — kill a service, add network latency, exhaust CPU — and verify the
**system (and the user journey) degrades gracefully** rather than falling over.

Ties directly to the FareRight risks in Track 2: *what happens when the outage feed is late, or
a dependency is slow, on a peak day?*

## Starter experiments

| Experiment | What it proves |
|------------|----------------|
| Kill a pod / container instance | Does the app self-heal / stay available? |
| Add 2s network latency to a dependency | Does the user journey stay usable? Timeouts sane? |
| CPU pressure on a service | Does autoscale kick in? Do SLAs hold? |
| Take a data feed offline | Does detection degrade safely (no double refunds)? |

## How

1. Deploy a target (see [`../infra/`](../infra)).
2. Enable Chaos Studio on the target resources.
3. Create an experiment (start from a Microsoft sample), run it **while** a JMeter / Azure Load
   Test is running, and watch the effect on your NFRs.
4. Report: did we meet our resilience targets under failure?

## 🤖 Bonus

Ask Copilot to **design a chaos experiment for your top resilience risk**, predict the expected
impact, then help you interpret whether the system behaved acceptably.
