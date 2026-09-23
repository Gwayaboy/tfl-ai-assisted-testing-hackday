# Starter Copilot prompts — Track 3 (Performance / NFR)

The theme: move from **system metrics** ("CPU was 80%") to **business outcomes & NFRs** ("we met
the p95 < 1s target under peak load"). Copilot is great at drafting NFRs, building test plans,
and interpreting results.

---

## Define NFRs first

```
I'm performance-testing a movie search app (and, in Track 2, an automatic-refund batch job).
Help me write clear, measurable non-functional requirements (NFRs) for: search response time,
error rate under peak, throughput, and an overnight batch that must finish inside a 2-hour
window at 10x peak volume. Express each as a testable target.
```

## Build / adapt a load test

```
Here is a JMeter test plan (movies-search-load.jmx). Adapt it to model a realistic peak: 200
concurrent users, 60s ramp, sustained for 5 minutes, mixing landing-page and search requests
80/20. Keep it parameterised so I can change host/users/ramp from the command line.
```

```
Generate an Azure Load Testing config (load-test.yaml) from this JMeter plan with fail criteria
matching these NFRs: p95 < 1000ms, avg < 500ms, error rate < 1%.
```

## Analyse results in business terms

```
Here are my JMeter results (results.jtl / summary). Did we MEET or MISS each NFR? Where did
performance degrade, at what load, and what's the likely bottleneck? Summarise for a
non-technical stakeholder, then give the engineering detail.
```

```
Compare this run against my previous baseline results and tell me if performance regressed,
by how much, and on which endpoints.
```

## Resilience / chaos (advanced)

```
Design a chaos experiment for my top resilience risk (a late/slow data feed on a peak day).
What failure would I inject, what's the expected impact on the user journey, and how would I
verify the system degrades gracefully rather than double-refunding?
```

## 🤖 Bonus — agentic performance loop

```
Act as a performance testing agent: from this NFR, generate a load-test plan, tell me how to run
it, then (given the results I paste back) analyse against the target and produce a short
pass/fail performance report with recommendations.
```
