import { PrivateLocation } from "checkly/constructs";

// Currently we only run against gamma as a PR status check

export const infisicalGamma = new PrivateLocation("infisical-gamma", {
  name: "Infisical Gamma",
  icon: "squirrel",
  slugName: `infisical-gamma`
});
