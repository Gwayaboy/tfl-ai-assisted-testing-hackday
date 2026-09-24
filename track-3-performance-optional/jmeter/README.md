# JMeter — local load testing (no cloud)

Run a load test against the **local movies app** — no Azure needed. Great for learning the tool
and defining NFRs.

## Install JMeter

> ✅ **In a Codespace / the devcontainer, JMeter, Java, the Azure CLI (with `az load`) and
> Bicep are already installed** — skip this section (`jmeter --version` to confirm).

Running locally instead:

- Download [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) (needs Java 8+), or
- `brew install jmeter` (macOS) · `choco install jmeter` (Windows) · `sdk install jmeter` (SDKMAN)

## Run the sample plan

The movies app must be running on http://localhost:3000.

**GUI (to explore & edit):**
```bash
jmeter -t movies-search-load.jmx
```

**Headless (to actually load test):**
```bash
jmeter -n -t movies-search-load.jmx -l results.jtl -e -o report/
# then open report/index.html
```

The sample plan (`movies-search-load.jmx`):
- 20 virtual users, ramp-up 10s, 5 loops (tune these!)
- hits the landing page and a search request
- records response times, throughput, error %

> Start small. Ramp up **after** you've defined what "good" looks like (your NFRs).

## Define NFRs first (the point!)

Before you crank the load, write down targets, e.g.:

| Metric | Target (NFR) |
|--------|--------------|
| Landing page p95 response time | < 800 ms |
| Search p95 response time | < 1000 ms |
| Error rate under expected peak | < 0.5% |
| Throughput sustained | ≥ N req/s |

Then test against them and report **pass/fail vs target** — not just raw graphs.

## Analyse with AI

Export `results.jtl` and ask Copilot to interpret it in **business terms** (see
[`../prompts/`](../prompts)) — e.g. "did we meet the p95 < 1s NFR, and where did it degrade?".

## Next (optional)

Take this **same `.jmx`** to real scale with
[Azure Load Testing](../azure-load-testing/README.md) — only if a sandbox subscription is
available.
