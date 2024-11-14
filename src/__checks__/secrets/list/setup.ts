import { getAccessToken } from "../../helpers/getAccessToken";
import { setupProject } from "../../helpers/setupProject";
import { setupSecrets } from "../../helpers/setupSecrets";
import {
  IMPORTED_SECRETS_SEED_DATA,
  LIST_SECRETS_SEED_DATA,
  LIST_SECRETS_TAG_DATA,
  RECURSIVE_FOLDER_DATA,
  RECURSIVE_SECRETS_SEED_DATA
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
    ...RECURSIVE_FOLDER_DATA
  });

  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...RECURSIVE_SECRETS_SEED_DATA
  });

  // import data
  await setupImport({
    accessToken,
    workspaceId: project.id,
    environment: LIST_SECRETS_SEED_DATA.environment,
    path: LIST_SECRETS_SEED_DATA.secretPath,
    isReplication: false,
    import: {
      environment: IMPORTED_SECRETS_SEED_DATA.environment,
      path: IMPORTED_SECRETS_SEED_DATA.secretPath
    }
  });

  await setupSecrets({
    accessToken,
    workspaceId: project.id,
    ...IMPORTED_SECRETS_SEED_DATA
  });

  // assign globals required for API check
  process.env.PROJECT_ID = project.id;
  process.env.ACCESS_TOKEN = accessToken;
}

await setup();
