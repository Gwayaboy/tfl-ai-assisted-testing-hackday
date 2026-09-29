using System;
using System.IO;
using System.Runtime.CompilerServices;

namespace RegressionOptimisation.Baseline;

// Minimal, dependency-free .env loader — the C# equivalent of the JS suite's
// `import "dotenv/config"`. Runs once at module load (before NUnit discovers or
// runs any test), so PLAYWRIGHT_SERVICE_URL / PLAYWRIGHT_SERVICE_ACCESS_TOKEN
// set in a local `.env` are picked up by BaselineTest.ConnectOptionsAsync().
//
// Copy `.env.example` -> `.env` (git-ignored) and put the organiser's endpoint +
// access token there. Real environment variables set in your shell always win,
// so `$env:PLAYWRIGHT_SERVICE_URL = ...; dotnet test` keeps working too.
internal static class DotEnv
{
    [ModuleInitializer]
    internal static void Load()
    {
        try
        {
            // `dotnet test` runs from bin/Debug/net8.0, so walk up to find the
            // project's `.env` next to the .csproj.
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            while (dir is not null)
            {
                var candidate = Path.Combine(dir.FullName, ".env");
                if (File.Exists(candidate))
                {
                    Apply(candidate);
                    return;
                }

                dir = dir.Parent;
            }
        }
        catch
        {
            // Best-effort only — a missing/malformed .env must never break `dotnet test`.
        }
    }

    private static void Apply(string path)
    {
        foreach (var raw in File.ReadAllLines(path))
        {
            var line = raw.Trim();
            if (line.Length == 0 || line.StartsWith('#'))
            {
                continue;
            }

            var eq = line.IndexOf('=');
            if (eq <= 0)
            {
                continue;
            }

            var key = line[..eq].Trim();
            var value = line[(eq + 1)..].Trim();

            if (value.Length >= 2 &&
                ((value[0] == '"' && value[^1] == '"') || (value[0] == '\'' && value[^1] == '\'')))
            {
                value = value[1..^1];
            }

            // Don't clobber a value already set in the real environment (shell wins).
            if (Environment.GetEnvironmentVariable(key) is null)
            {
                Environment.SetEnvironmentVariable(key, value);
            }
        }
    }
}
