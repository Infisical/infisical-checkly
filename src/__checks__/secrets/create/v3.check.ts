import * as path from "path";
import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import { secretsGroup } from "../secrets-group.check";

const SECRET_NAME = "SECRET_KEY";

const SECRET_DATA = {
  workspaceId: "{{PROJECT_ID}}",
  secretPath: "/",
  secretValue: "value",
  secretComment: "comment",
  environment: "dev",
  skipMultilineEncoding: true,
  type: "shared",
  secretReminderRepeatDays: 123,
  secretReminderNote: "reminder"
};

new ApiCheck("create-secret-v3-check", {
  name: "Create Secret v3 Check",
  group: secretsGroup,
  setupScript: {
    entrypoint: path.join(__dirname, "./setup.ts")
  },
  tearDownScript: {
    entrypoint: path.join(__dirname, "./teardown.ts")
  },
  request: {
    url: `{{SITE_URL}}/api/v3/secrets/raw/${SECRET_NAME}`,
    method: "POST",
    bodyType: "JSON",
    body: JSON.stringify(SECRET_DATA),
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$.secret.id").isNotNull(),
      AssertionBuilder.jsonBody("$.secret._id").isNotNull(),
      AssertionBuilder.jsonBody("$.secret.workspace").isNotNull(), // can't assert env var(?)
      AssertionBuilder.jsonBody("$.secret.environment").equals(SECRET_DATA.environment),
      AssertionBuilder.jsonBody("$.secret.version").equals(1),
      AssertionBuilder.jsonBody("$.secret.type").equals(SECRET_DATA.type),
      AssertionBuilder.jsonBody("$.secret.secretKey").equals(SECRET_NAME),
      AssertionBuilder.jsonBody("$.secret.secretValue").equals(SECRET_DATA.secretValue),
      AssertionBuilder.jsonBody("$.secret.secretComment").equals(SECRET_DATA.secretComment),
      AssertionBuilder.jsonBody("$.secret.secretReminderNote").equals(
        SECRET_DATA.secretReminderNote
      ),
      AssertionBuilder.jsonBody("$.secret.secretReminderRepeatDays").equals(
        SECRET_DATA.secretReminderRepeatDays
      ),
      AssertionBuilder.jsonBody("$.secret.skipMultilineEncoding").equals(
        SECRET_DATA.skipMultilineEncoding
      )
      // don't think we need to do the rest?
      // "metadata": "<any>",
      // "createdAt": "2023-11-07T05:31:56Z",
      // "updatedAt": "2023-11-07T05:31:56Z"
    ]
  },
  runParallel: true
});
