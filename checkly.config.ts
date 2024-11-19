import { defineConfig } from "checkly";
import { mergeGlobalConfig } from "./src/global-config";

// Only used for development

const config = defineConfig(
  mergeGlobalConfig({
    projectName: "Infisical Dev",
    logicalId: "infisical-dev",
    checks: {
      locations: ["us-west-1"]
    }
  })
);

export default config;
