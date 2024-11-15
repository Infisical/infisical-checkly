import { getAccessToken } from "../../helpers/getAccessToken";
import { setupProject } from "../../helpers/setupProject";

async function setup() {
  // setup functions
  const accessToken = await getAccessToken({ request });
  const project = await setupProject({ accessToken });

  // assign globals required for API check
  process.env.PROJECT_ID = project.id;
  process.env.ACCESS_TOKEN = accessToken;
}

await setup();
