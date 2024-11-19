import { defineConfig } from "checkly";
import { AlertEscalationBuilder, RetryStrategyBuilder } from "checkly/constructs";

// Only used for development

const config = defineConfig({
  projectName: "Infisical Dev",
  logicalId: "infisical-dev",
  checks: {
    frequency: 10,
    // locations,
    runtimeId: "2024.09",
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 3,
      sameRegion: true
    }),
    // privateLocations: [infisicalGamma],
    alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1),
    checkMatch: "**/__checks__/**/*.check.ts",
    environmentVariables: [{ key: "INSTANCE_ID", value: "Dev" }]
  },
  // we should probably just use cmd line args for run location as this will verify for each of us
  cli: {
    runLocation: "us-east-1",
    reporters: ["list"],
    retries: 0
  }
});

export default config;
