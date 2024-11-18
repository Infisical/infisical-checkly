import { TSetupSecret } from "../../helpers/setupSecret";

export const DELETE_SECRET_SEED: Omit<TSetupSecret, "accessToken" | "workspaceId"> = {
  environment: "dev",
  secretPath: "/",
  type: "shared",
  secretName: `DELETE_SECRET`,
  secretValue: `value`,
  secretComment: `comment`,
  tagIds: [],
  skipMultilineEncoding: false,
  secretReminderNote: "note",
  secretReminderRepeatDays: 123
};
