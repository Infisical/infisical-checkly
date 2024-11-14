import { TSetupSecret } from "../../helpers/setupSecret";
import { TSetupFolder } from "../../helpers/setupFolder";

// move to new folder/env to verify those values changes
export const UPDATE_SECRET_NEW_FOLDER: Omit<TSetupFolder, "accessToken" | "workspaceId"> = {
  path: "/nested",
  name: "Nested",
  environment: "staging"
};

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
