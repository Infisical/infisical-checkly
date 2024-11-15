import { getAccessToken } from "../../helpers/getAccessToken";
import { setupProject } from "../../helpers/setupProject";
import { setupSecret } from "../../helpers/setupSecret";
import { DELETE_SECRET_SEED } from "./seed";

async function setup() {
  // setup functions
  const accessToken = await getAccessToken({ request });
  const project = await setupProject({ accessToken });
  const secret = await setupSecret({ accessToken, workspaceId: project.id, ...DELETE_SECRET_SEED });

  // assign globals required for API check
  process.env.PROJECT_ID = project.id;
  process.env.SECRET_ID = secret.id;
  process.env.ACCESS_TOKEN = accessToken;
}

await setup();
