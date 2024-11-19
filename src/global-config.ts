import { ChecklyConfig } from "checkly";
import { AlertEscalationBuilder, RetryStrategyBuilder } from "checkly/constructs";

export enum Instance {
  GAMMA = "gamma",
  EU = "eu",
  US = "us",
  DEV = "dev"
}

export const mergeGlobalConfig = ({
  checks,
  cli,
  ...config
}: Partial<Omit<ChecklyConfig, "logicalId" | "projectName">> &
  Pick<ChecklyConfig, "logicalId" | "projectName">) => ({
  ...config,
  checks: {
    frequency: 10,
    runtimeId: "2024.09",
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 3,
      sameRegion: true
    }),
    alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1),
    checkMatch: "**/__checks__/**/*.check.ts",
    tags: [process.env.INSTANCE_ID!, ...(checks?.tags ?? [])],
    ...checks,
    environmentVariables: [
      { key: "SITE_URL", value: process.env.SITE_URL! },
      { key: "CLIENT_ID", value: process.env.CLIENT_ID! },
      { key: "CLIENT_SECRET", value: process.env.CLIENT_SECRET! }
    ]
  },
  cli: {
    // reporters: ["list"], use cmd line args for run location as this will verify for each of us
    retries: 0,
    ...cli
  }
});
