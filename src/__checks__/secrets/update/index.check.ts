import * as path from "path";
import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import { secretsGroup } from "../secrets-group.check";
import { UPDATE_SECRET_NEW_FOLDER, UPDATE_SECRET_SEED } from "./seed";

const UPDATE_SECRET_DATA = {
  workspaceId: "{{PROJECT_ID}}",
  environment: UPDATE_SECRET_SEED.environment, // original environment
  secretPath: UPDATE_SECRET_SEED.secretPath, // original path

  // updated values
  newSecretName: UPDATE_SECRET_SEED.secretName + "_UPDATED",
  secretValue: UPDATE_SECRET_SEED.secretValue + " updated",
  secretComment: UPDATE_SECRET_SEED.secretComment + " updated",
  skipMultilineEncoding: !UPDATE_SECRET_SEED.skipMultilineEncoding,
  // type: 'personal', TODO: can't test with identity
  secretReminderRepeatDays: UPDATE_SECRET_SEED.secretReminderRepeatDays + 1,
  secretReminderNote: UPDATE_SECRET_SEED.secretReminderNote + " updated"
};

new ApiCheck("update-secret-check", {
  name: "Update Secret Check",
  group: secretsGroup,
  setupScript: {
    entrypoint: path.join(__dirname, "./setup.ts")
  },
  tearDownScript: {
    entrypoint: path.join(__dirname, "./teardown.ts")
  },
  request: {
    url: `{{SITE_URL}}/api/v3/secrets/raw/${UPDATE_SECRET_SEED.secretName}`,
    method: "PATCH",
    bodyType: "JSON",
    body: JSON.stringify(UPDATE_SECRET_DATA),
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$.secret.secretKey").equals(UPDATE_SECRET_DATA.newSecretName),
      AssertionBuilder.jsonBody("$.secret.secretValue").equals(UPDATE_SECRET_DATA.secretValue),
      AssertionBuilder.jsonBody("$.secret.secretComment").equals(UPDATE_SECRET_DATA.secretComment),
      AssertionBuilder.jsonBody("$.secret.skipMultilineEncoding").equals(
        UPDATE_SECRET_DATA.skipMultilineEncoding
      ),
      AssertionBuilder.jsonBody("$.secret.secretReminderRepeatDays").equals(
        UPDATE_SECRET_DATA.secretReminderRepeatDays
      ),
      AssertionBuilder.jsonBody("$.secret.secretReminderNote").equals(
        UPDATE_SECRET_DATA.secretReminderNote
      )
    ]
  },
  runParallel: true
});
