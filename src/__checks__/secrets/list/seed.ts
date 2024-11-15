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

export const LIST_SECRETS_RECURSIVE_FOLDER_DATA: Omit<TSetupFolder, "workspaceId" | "accessToken"> =
  {
    environment: ENVIRONMENT,
    path: "/recursive",
    name: "Recursive"
  };

export const LIST_SECRETS_RECURSIVE_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> =
  {
    environment: ENVIRONMENT,
    secretPath: LIST_SECRETS_RECURSIVE_FOLDER_DATA.path,
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

export const LIST_SECRETS_IMPORT_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> = {
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

// reference data

export const LIST_SECRETS_REFERENCED_SECRET = LIST_SECRETS_SEED_DATA.secrets[0];

export const LIST_SECRETS_REFERENCE_SECRET_DATA = {
  type: "shared",
  secretKey: `REFERENCE_SECRET`,
  secretValue: `$\{dev.${LIST_SECRETS_REFERENCED_SECRET.secretKey}}`,
  secretComment: `comment`,
  skipMultilineEncoding: true,
  tagIds: []
};

export const LIST_SECRETS_REFERENCE_SEED_DATA: Omit<TSetupSecrets, "workspaceId" | "accessToken"> =
  {
    environment: ENVIRONMENT,
    secretPath: "/",
    secrets: [LIST_SECRETS_REFERENCE_SECRET_DATA]
  };
