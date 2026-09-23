// Minimal, low-cost starter infra for the OPTIONAL performance track.
// A Log Analytics workspace + a Linux App Service plan + web app placeholder.
// Extend with Copilot for whatever target you actually want to load-test.
//
// Deploy to a SANDBOX / MSDN resource group only. Delete when done.
//   az group create -n <rg> -l uksouth
//   az deployment group create -g <rg> -f main.bicep -p appName=hackdayperf

@description('Base name for resources (must be globally unique-ish for the web app).')
param appName string = 'hackdayperf${uniqueString(resourceGroup().id)}'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('App Service plan SKU. B1 is cheap; use P1v3 only if you need real capacity.')
@allowed([ 'B1', 'S1', 'P1v3' ])
param planSku string = 'B1'

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${appName}-logs'
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource plan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    name: planSku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource web 'Microsoft.Web/sites@2023-12-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: plan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      alwaysOn: planSku != 'B1' // AlwaysOn not supported on B1
      appSettings: [
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
      ]
    }
  }
}

@description('The default host to point Azure Load Testing at (set as target host).')
output targetHost string = web.properties.defaultHostName
output webAppName string = web.name
output logAnalyticsId string = logAnalytics.id
