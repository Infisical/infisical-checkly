import axios from "axios";

export type TSetupSecrets = {
  accessToken: string;
  workspaceId: string;
  environment: string;
  secretPath: string;
  secrets: {
    type: string;
    secretKey: string;
    secretValue: string;
    secretComment: string;
    skipMultilineEncoding: boolean;
    tagIds: string[];
  }[];
};

export const setupSecrets = async ({ accessToken, ...params }: TSetupSecrets) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const { data } = await axios.post(`${process.env.SITE_URL}/api/v3/secrets/batch/raw`, params, {
    headers
  });

  return data.secrets;
};
