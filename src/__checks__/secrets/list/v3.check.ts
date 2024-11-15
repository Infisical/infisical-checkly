import * as path from "path";
import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import { secretsGroup } from "../secrets-group.check";
import {
  LIST_SECRETS_IMPORT_SEED_DATA,
  LIST_SECRETS_RECURSIVE_SEED_DATA,
  LIST_SECRETS_REFERENCE_SECRET_DATA,
  LIST_SECRETS_REFERENCE_SEED_DATA,
  LIST_SECRETS_REFERENCED_SECRET,
  LIST_SECRETS_SEED_DATA,
  LIST_SECRETS_TAG_DATA
} from "./seed";

const COMPARE_SECRET = LIST_SECRETS_SEED_DATA.secrets[0];

new ApiCheck("list-secrets-v3-check", {
  name: "List Secrets v3 Check",
  group: secretsGroup,
  setupScript: {
    entrypoint: path.join(__dirname, "./setup.ts")
  },
  tearDownScript: {
    entrypoint: path.join(__dirname, "./teardown.ts")
  },
  request: {
    url: "{{SITE_URL}}/api/v3/secrets/raw",
    method: "GET",
    queryParameters: [
      { key: "workspaceId", value: "{{PROJECT_ID}}" },
      { key: "environment", value: "dev" },
      { key: "recursive", value: "true" },
      { key: "include_imports", value: "true" },
      { key: "expandSecretReferences", value: "true" }
    ],
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$.secrets.length").equals(
        LIST_SECRETS_SEED_DATA.secrets.length +
          LIST_SECRETS_RECURSIVE_SEED_DATA.secrets.length +
          LIST_SECRETS_REFERENCE_SEED_DATA.secrets.length
      ),
      AssertionBuilder.jsonBody("$.secrets[0].id").isNotNull(),
      AssertionBuilder.jsonBody("$.secrets[0].workspace").isNotNull(),
      AssertionBuilder.jsonBody("$.secrets[0].environment").equals(
        LIST_SECRETS_SEED_DATA.environment
      ),
      AssertionBuilder.jsonBody("$.secrets[0].version").equals(1),
      AssertionBuilder.jsonBody("$.secrets[0].type").equals("shared"), // assuming bulk are always shared as not passed

      AssertionBuilder.jsonBody("$.secrets[*].secretValue").contains(COMPARE_SECRET.secretValue),
      AssertionBuilder.jsonBody("$.secrets[*].secretKey").contains(COMPARE_SECRET.secretKey),
      AssertionBuilder.jsonBody("$.secrets[*].secretComment").contains(
        COMPARE_SECRET.secretComment
      ),
      AssertionBuilder.jsonBody("$.secrets[0].secretReminderNote").isNull(), // not able to  set in bulk
      AssertionBuilder.jsonBody("$.secrets[0].secretReminderRepeatDays").isNull(), // not able to set in bulk
      AssertionBuilder.jsonBody("$.secrets[0].skipMultilineEncoding").equals(
        COMPARE_SECRET.skipMultilineEncoding
      ),
      AssertionBuilder.jsonBody("$.secrets[*].tags[*].slug").contains(LIST_SECRETS_TAG_DATA.slug),
      // verify recursion
      AssertionBuilder.jsonBody("$.secrets[*].secretPath").contains(
        LIST_SECRETS_RECURSIVE_SEED_DATA.secretPath
      ),
      // verify imports
      AssertionBuilder.jsonBody("$.imports[0].secretPath").contains(
        LIST_SECRETS_IMPORT_SEED_DATA.secretPath
      ),
      AssertionBuilder.jsonBody("$.imports[0].secrets.length").equals(
        LIST_SECRETS_IMPORT_SEED_DATA.secrets.length
      ),
      // verify reference secret value expands
      AssertionBuilder.jsonBody(
        `$.secrets[?(@.secretKey=="${LIST_SECRETS_REFERENCE_SECRET_DATA.secretKey}")].secretValue`
      ).contains(LIST_SECRETS_REFERENCED_SECRET.secretValue)
      // don't think we need to do the rest?
      // "metadata": "<any>",
      // "createdAt": "2023-11-07T05:31:56Z",
      // "updatedAt": "2023-11-07T05:31:56Z"
    ]
  },
  runParallel: true
});
