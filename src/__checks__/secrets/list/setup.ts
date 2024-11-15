import { getAccessToken } from "../../helpers/getAccessToken";
import { setupProject } from "../../helpers/setupProject";
import { setupSecrets } from "../../helpers/setupSecrets";
import {
  LIST_SECRETS_IMPORT_SEED_DATA,
  LIST_SECRETS_RECURSIVE_FOLDER_DATA,
  LIST_SECRETS_RECURSIVE_SEED_DATA,
  LIST_SECRETS_REFERENCE_SEED_DATA,
  LIST_SECRETS_SEED_DATA,
  LIST_SECRETS_TAG_DATA
} from "./seed";
import { setupTag } from "../../helpers/setupTag";
import { setupFolder } from "../../helpers/setupFolder";
import { setupImport } from "../../helpers/setupImport";

async function setup() {
  // setup functions
  const accessToken = await getAccessToken({ request });
  const project = await setupProject({ accessToken });

  // add tag to secret
  const tag = await setupTag({ accessToken, projectId: project.id, ...LIST_SECRETS_TAG_DATA });
  LIST_SECRETS_SEED_DATA.secrets[0].tagIds = [tag.id];

  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...LIST_SECRETS_SEED_DATA
  });

  // recursive data
  await setupFolder({
    accessToken,
    workspaceId: project.id,
    ...LIST_SECRETS_RECURSIVE_FOLDER_DATA
  });

  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...LIST_SECRETS_RECURSIVE_SEED_DATA
  });

  // import data
  await setupImport({
    accessToken,
    workspaceId: project.id,
    environment: LIST_SECRETS_SEED_DATA.environment,
    path: LIST_SECRETS_SEED_DATA.secretPath,
    isReplication: false,
    import: {
      environment: LIST_SECRETS_IMPORT_SEED_DATA.environment,
      path: LIST_SECRETS_IMPORT_SEED_DATA.secretPath
    }
  });

  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...LIST_SECRETS_IMPORT_SEED_DATA
  });

  // reference data
  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...LIST_SECRETS_REFERENCE_SEED_DATA
  });

  // assign globals required for API check
  process.env.PROJECT_ID = project.id;
  process.env.ACCESS_TOKEN = accessToken;
}

await setup();
