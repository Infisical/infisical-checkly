import { defineConfig } from "checkly";
import { mergeGlobalConfig } from "./src/global-config";
import { infisicalGamma } from "./src/private-locations";

const config = defineConfig(
  mergeGlobalConfig({
    projectName: "Infisical Gamma",
    logicalId: "infisical-gamma",
    checks: {
      privateLocations: [infisicalGamma]
    }
  })
);

export default config;
