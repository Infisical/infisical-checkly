import { TSetupSecrets } from "../../helpers/setupSecrets";
import { TSetupFolder } from "../../helpers/setupFolder";

const ENVIRONMENT = "dev";
const IMPORT_ENVIRONMENT = "staging";

export const LIST_SECRETS_TAG_DATA = {
  slug: "tag-one"
};

export const LIST_SECRETS_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> = {
  environment: ENVIRONMENT,
  secretPath: "/",
  secrets: Array.apply(null, Array(15)).map((_, index) => {
    const secretNumber: number = index + 1;

    return {
      type: "shared",
      secretKey: `SECRET_${secretNumber.toString().padStart(5, "0")}`,
      secretValue: `value-${secretNumber}`,
      secretComment: `comment-${secretNumber}`,
      skipMultilineEncoding: true,
      tagIds: []
    };
  })
};

// recursive data

export const RECURSIVE_FOLDER_DATA: Omit<TSetupFolder, "workspaceId" | "accessToken"> = {
  environment: ENVIRONMENT,
  path: "/recursive",
  name: "Recursive"
};

export const RECURSIVE_SECRETS_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> = {
  environment: ENVIRONMENT,
  secretPath: RECURSIVE_FOLDER_DATA.path,
  secrets: Array.apply(null, Array(5)).map((_, index) => {
    const secretNumber: number = index + 1;

    return {
      type: "shared",
      secretKey: `RECURSIVE_SECRET_${secretNumber.toString().padStart(5, "0")}`,
      secretValue: `value-${secretNumber}`,
      secretComment: `comment-${secretNumber}`,
      skipMultilineEncoding: true,
      tagIds: []
    };
  })
};

// import data

export const IMPORTED_SECRETS_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> = {
  environment: IMPORT_ENVIRONMENT,
  secretPath: "/",
  secrets: Array.apply(null, Array(3)).map((_, index) => {
    const secretNumber: number = index + 1;

    return {
      type: "shared",
      secretKey: `IMPORT_SECRET_${secretNumber.toString().padStart(5, "0")}`,
      secretValue: `value-${secretNumber}`,
      secretComment: `comment-${secretNumber}`,
      skipMultilineEncoding: true,
      tagIds: []
    };
  })
};
