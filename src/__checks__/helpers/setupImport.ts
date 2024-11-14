import axios from "axios";

export type TSetupImport = {
  accessToken: string;
  workspaceId: string;
  environment: string;
  path: string;
  import: {
    environment: string;
    path: string;
  };
  isReplication: boolean;
};

export const setupImport = async ({ accessToken, ...params }: TSetupImport) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const { data } = await axios.post<{ secretImport: { id: string } }>(
    `${process.env.SITE_URL}/api/v1/secret-imports`,
    params,
    {
      headers
    }
  );

  return data.secretImport;
};
