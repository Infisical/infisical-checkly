import axios from "axios";

export type TSetupTag = {
  slug: string;
  color?: string;
  projectId: string;
  accessToken: string;
};

export const setupTag = async ({
  accessToken,
  projectId,
  color = "#ffffff",
  ...params
}: TSetupTag) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const { data } = await axios.post<{ workspaceTag: { id: string } }>(
    `${process.env.SITE_URL}/api/v1/workspace/${projectId}/tags`,
    {
      color,
      ...params
    },
    {
      headers
    }
  );

  return data.workspaceTag;
};
