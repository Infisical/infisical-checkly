import axios from "axios";

export const setupProject = async ({
  accessToken,
  projectName,
  projectSlug
}: {
  accessToken: string;
  projectName?: string;
  projectSlug?: string;
}) => {
  const { SITE_URL } = process.env;
  const timestamp = Date.now();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const id = Date.now() + "-" + Math.random().toString().replace(".", "");
  const { data } = await axios.post<{
    project: { orgId: string; id: string; slug: string };
  }>(
    `${SITE_URL}/api/v2/workspace`,
    {
      projectName: projectName ?? `Checkly Project ${id}`,
      slug: projectSlug ?? `${id}`
    },
    {
      headers
    }
  );

  return data.project;
};
