import { privateLocation } from "./private-locations";
import { Instance } from "./global-config";
import { CheckConfigDefaults } from "checkly/dist/services/checkly-config-loader";

export const getLocations = (): Pick<CheckConfigDefaults, "locations" | "privateLocations"> => {
  switch (process.env.INSTANCE_ID) {
    case Instance.GAMMA:
      return {
        privateLocations: [privateLocation]
      };
    case Instance.EU:
      return {
        locations: ["eu-central-1"]
      };
    case Instance.US:
      return {
        locations: ["us-east-1"]
      };
    case Instance.DEV:
      return {}; // use location flag in CLI
    default:
      throw new Error(`Unhandled Instance ID: ${process.env.INSTANCE_ID}`);
  }
};
