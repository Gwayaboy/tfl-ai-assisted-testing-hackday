# Azure Load Testing (optional — sandbox / MSDN only)

Take the **same JMeter plan** from [`../jmeter/`](../jmeter) to real, distributed scale using
[Azure Load Testing](https://learn.microsoft.com/azure/load-testing/). Only do this if a
**sandbox or MSDN subscription** is available — we're avoiding TfL cloud deploys.

> You still need a **target URL** to hit. Options: a deployed movies app, or the Contoso Traders
> app (see [`../infra/`](../infra)). Don't point high load at shared/demo sites you don't own.

## Option A — CI-driven (recommended, disposable)

Use the provided GitHub Actions workflow so the whole thing is push-button and repeatable. It
uses [`load-test.yaml`](./load-test.yaml) as the test config.

See [`../../.github/workflows/`](../../.github/workflows) for `perf-load-test.yml` (manual
dispatch — nothing runs automatically).

## Option B — Azure CLI

```bash
# one-time: create the resource
az load create --name hackday-loadtest --resource-group <rg> --location uksouth

# run the test from the JMeter plan + config
az load test create \
  --load-test-resource hackday-loadtest \
  --resource-group <rg> \
  --test-id movies-search \
  --load-test-config-file load-test.yaml

az load test-run create \
  --load-test-resource hackday-loadtest \
  --resource-group <rg> \
  --test-id movies-search \
  --test-run-id run-$(date +%s)
```

## Define pass/fail criteria (NFRs as gates)

`load-test.yaml` includes **fail criteria** so the run is judged against your NFRs (e.g. p95 <
1s, error rate < 1%) — not just pretty charts. Tune them to your targets.

## Clean up

```bash
az load delete --name hackday-loadtest --resource-group <rg> --yes
# or just delete the whole sandbox resource group
```

> 💡 Cost & courtesy: tear it down when you're done. Keep load modest and only against targets
> you own.
