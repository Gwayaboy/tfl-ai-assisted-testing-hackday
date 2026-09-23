# Optional infrastructure (sandbox / MSDN only)

If you want a **real target** to load-test or a richer app for the performance track, use these
notes. **Nothing here is required** — the core day runs 100% locally.

> **Franck's guidance:** avoid TfL cloud. If we deploy, it's to a **Microsoft sandbox / MSDN**
> subscription, via manual-dispatch GitHub Actions, and torn down after. Keep it disposable.

## Two target options

### 1. Movies app (lightweight)
The movies app can be deployed as a container/web app if you want a cloud target for Azure Load
Testing. It's light — fine for learning, not a stress monster.

### 2. Contoso Traders (rich microservices) — the "adventurous" option
[Contoso Traders](https://github.com/Azure-Samples/contoso-traders-cloud-testing) is a realistic
e-commerce app (AKS / Container Apps, Cosmos DB, Key Vault, Storage, Front Door). It already has
functional + performance tests and is a great **performance & resilience** playground.

> ⚠️ It's **complex** and **not free** to run — only stand it up in a sandbox you control, and
> delete it afterwards. This is exactly what we discussed keeping optional on the prep call.

## Deploy path (disposable)

- Use the manual-dispatch workflow [`../../.github/workflows/deploy-target.yml`](../../.github/workflows)
  — it deploys the Bicep in [`main.bicep`](./main.bicep) to a resource group you specify.
- Requires an Azure login (OIDC or a sandbox service principal) configured as repo secrets.
- **Per-team resource group** recommended so teams don't collide (as agreed on the call).

## Clean up (always)

```bash
az group delete --name <your-rg> --yes --no-wait
```

`main.bicep` here is a **minimal starter** (a Log Analytics workspace + an App Service plan +
web app placeholder) so you can extend it with Copilot for whatever target you choose. It is
intentionally small to keep cost near-zero.
