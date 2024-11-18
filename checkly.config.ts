import { defineConfig } from "checkly";
import { AlertEscalationBuilder, RetryStrategyBuilder } from "checkly/constructs";
import { locations } from "./src/locations";
import { infisicalGamma } from "./src/private-locations";

const config = defineConfig({
  projectName: "Infisical Gamma API",
  logicalId: "infisical-gamma-api",
  checks: {
    frequency: 10,
    locations,
    runtimeId: "2024.09",
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 3,
      sameRegion: true
    }),
    privateLocations: [infisicalGamma],
    alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1),
    checkMatch: "**/__checks__/**/*.check.ts"
  },
  // we should probably just use cmd line args for run location as this will verify for each of us
  cli: {
    runLocation: "us-east-1",
    reporters: ["list"],
    retries: 0
  }
});

export default config;
