import { Dashboard } from "checkly/constructs";

new Dashboard(`infisical-${process.env.INSTANCE_ID!}`, {
  header: `Infisical - ${process.env.INSTANCE_ID!.toUpperCase()}`,
  description: `service availability and response times for ${process.env.INSTANCE_ID!.toUpperCase()}`,
  tags: [process.env.INSTANCE_ID!],
  customUrl: `infisical-${process.env.INSTANCE_ID!}`
});
