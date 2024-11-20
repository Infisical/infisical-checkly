import { defineConfig } from "checkly";
import { mergeGlobalConfig } from "./src/global-config";
import { privateLocation } from "./src/private-locations";

const config = defineConfig(
  mergeGlobalConfig({
    projectName: "Infisical Gamma",
    logicalId: "infisical-gamma",
    checks: {
      privateLocations: [privateLocation]
    }
  })
);

export default config;
