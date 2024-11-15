import axios from "axios";

export type TSetupFolder = {
  workspaceId: string;
  environment: string;
  name: string;
  path: string;
  accessToken: string;
};

export const setupFolder = async ({ accessToken, ...params }: TSetupFolder) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const { data } = await axios.post<{ folder: { id: string } }>(
    `${process.env.SITE_URL}/api/v1/folders`,
    params,
    {
      headers
    }
  );

  return data.folder;
};
