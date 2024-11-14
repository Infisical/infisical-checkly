import axios from "axios";

export type TSetupSecret = {
  accessToken: string;
  workspaceId: string;
  environment: string;
  secretPath: string;
  secretValue: string;
  secretName: string;
  secretComment: string;
  tagIds: string[];
  skipMultilineEncoding: boolean;
  type: "shared" | "personal";
  secretReminderRepeatDays: number;
  secretReminderNote: string;
};

export const setupSecret = async ({ accessToken, secretName, ...params }: TSetupSecret) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };

  const { data } = await axios.post<{ secret: { id: string } }>(
    `${process.env.SITE_URL}/api/v3/secrets/raw/${secretName}`,
    params,
    {
      headers
    }
  );

  return data.secret;
};
