import * as path from "path";
import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import { secretsGroup } from "../secrets-group.check";
import { DELETE_SECRET_SEED } from "./seed";

new ApiCheck("delete-secret-check", {
  name: "Delete Secret Check",
  group: secretsGroup,
  setupScript: {
    entrypoint: path.join(__dirname, "./setup.ts")
  },
  tearDownScript: {
    entrypoint: path.join(__dirname, "./teardown.ts")
  },
  request: {
    url: `{{SITE_URL}}/api/v3/secrets/raw/${DELETE_SECRET_SEED.secretName}`,
    method: "DELETE",
    bodyType: "JSON",
    body: JSON.stringify({
      workspaceId: "{{PROJECT_ID}}",
      environment: DELETE_SECRET_SEED.environment,
      secretPath: DELETE_SECRET_SEED.secretPath
    }),
    assertions: [AssertionBuilder.statusCode().equals(200)]
  },
  runParallel: true
});
