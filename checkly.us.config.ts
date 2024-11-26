import { defineConfig } from "checkly";
import { mergeGlobalConfig } from "./src/global-config";

const config = defineConfig(
  mergeGlobalConfig({
    projectName: "Infisical US",
    logicalId: "infisical-us",
    checks: {
      activated: false,
      locations: ["us-east-1"]
    }
  })
);

export default config;
