import { PrivateLocation } from "checkly/constructs";

// Currently we only run against gamma as a PR status check

export const privateLocation = new PrivateLocation(`infisical-${process.env.INSTANCE_ID}`, {
  name: `Infisical ${process.env.INSTANCE_ID.toUpperCase()}`,
  icon: "squirrel",
  slugName: `infisical-${process.env.INSTANCE_ID}`
});
