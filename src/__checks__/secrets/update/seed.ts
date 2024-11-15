import { TSetupSecret } from "../../helpers/setupSecret";

export const UPDATE_SECRET_SEED: Omit<TSetupSecret, "accessToken" | "workspaceId"> = {
  environment: "dev",
  secretPath: "/",
  type: "shared",
  secretName: `SECRET`,
  secretValue: `value`,
  secretComment: `comment`,
  tagIds: [],
  skipMultilineEncoding: false,
  secretReminderNote: "note",
  secretReminderRepeatDays: 123
};
