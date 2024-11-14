import axios from "axios";

type GetAccessTokenParams = {
  clientId?: string;
  clientSecret?: string;
  request?: typeof request;
};

export const getAccessToken = async ({
  clientId,
  clientSecret,
  request: req
}: GetAccessTokenParams = {}) => {
  const { SITE_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

  const { data, status, statusText } = await axios.post<{
    accessToken: string;
  }>(`${SITE_URL}/api/v1/auth/universal-auth/login`, {
    clientSecret: clientSecret ?? CLIENT_SECRET,
    clientId: clientId ?? CLIENT_ID
  });

  if (status !== 200) throw new Error(`Unable to get access token: ${statusText}`);

  const { accessToken } = data;

  if (req) req.headers["Authorization"] = `Bearer ${accessToken}`;

  return accessToken;
};
