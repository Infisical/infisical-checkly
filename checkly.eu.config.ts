import { defineConfig } from "checkly";
import { mergeGlobalConfig } from "./src/global-config";

const config = defineConfig(
  mergeGlobalConfig({
    projectName: "Infisical EU",
    logicalId: "infisical-eu",
    checks: {
      locations: ["eu-central-1"]
    }
  })
);

export default config;
