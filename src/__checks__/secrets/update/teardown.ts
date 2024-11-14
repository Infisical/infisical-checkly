import { teardownProject } from "../../helpers/teardownProject";

async function teardown() {
  // teardown functions
  const { PROJECT_ID, ACCESS_TOKEN } = process.env;

  if (PROJECT_ID && ACCESS_TOKEN) {
    await teardownProject({
      projectId: PROJECT_ID,
      accessToken: ACCESS_TOKEN
    });
  }
}

await teardown();
