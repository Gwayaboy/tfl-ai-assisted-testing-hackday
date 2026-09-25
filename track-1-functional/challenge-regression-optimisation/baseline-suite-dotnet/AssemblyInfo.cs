using NUnit.Framework;

// ============================================================================
//  ANTI-PATTERN: serial execution on a single worker.
//  We deliberately DON'T opt into parallelism (no [assembly: Parallelizable]),
//  and we pin the level of parallelism to 1. Combined with NumberOfTestWorkers=1
//  in .runsettings, the whole ~300-test suite runs one test at a time.
//  The single biggest win when you optimise: turn this on.
// ============================================================================
[assembly: LevelOfParallelism(1)]
