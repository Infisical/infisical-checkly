import { infisicalGamma } from "./private-locations";
import { Instances } from "./global-config";
import { CheckConfigDefaults } from "checkly/dist/services/checkly-config-loader";

export const getLocations = (): Pick<CheckConfigDefaults, "locations" | "privateLocations"> => {
  switch (process.env.INSTANCE_ID) {
    case Instances.Gamma:
      return {
        privateLocations: [infisicalGamma]
      };
    case Instances.EU:
      return {
        locations: ["eu-central-1"]
      };
    case Instances.US:
      return {
        locations: ["us-east-1"]
      };
    default:
      throw new Error(`Unhandled Instance ID: ${process.env.INSTANCE_ID}`);
  }
};
