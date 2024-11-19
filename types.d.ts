// checkly global
declare const request: {
  headers: Record<string, string>;
};

declare const process: {
  env: {
    SITE_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    INSTANCE_ID: string;

    // create integration first in UI as per docs (https://www.checklyhq.com/docs/cli/constructs-reference/#pagerdutyalertchannel)
    // alternatively could do checkly alert ID, either way need to create first
    PAGER_DUTY_ACCOUNT: string;
    PAGER_DUTY_SERVICE_KEY: string;
    PAGER_DUTY_SERVICE_NAME: string;

    // set during setup
    PROJECT_ID?: string;
    ACCESS_TOKEN?: string;
    SECRET_ID?: string;
  };
};
