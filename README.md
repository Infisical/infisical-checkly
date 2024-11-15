# Infisical Checkly Test Suite

This project includes Infisical's Checkly test suite to verify API responses against gamma.

## Project Structure

Tests are located within the <strong>[\_\_checks__](src/__checks__)</strong> folder, and group with their respective
resource. For example
the [__secrets__](src/__checks__/secrets) folder contains all the checks associated with endpoints pertaining to the
secrets
resource.

Within each resource folder a __group-check__ file is present to associate all checks within this resource into a single
collection within Checkly. In addition, a sub-folder for each endpoint operation is available; co-locating all the
associated files for running this check. Each
operation includes the following files:

- __v[#].check.ts__ - the actual check file to be run against the API endpoint, indicating which endpoint version for
  this operation is being tested
- setup.ts (optional) - an optional script to setup any resources required to test this API endpoint
- teardown.ts (optional) - an optional script to teardown any resources created during this check
- seed.ts (optional) - an optional file containing any seed data that needs to be referenced during the checks execution

```
secrets/
├── create/
├── delete/
├── list/
├── update/
│   ├── seed.ts
│   ├── setup.ts
│   ├── teardown.ts
│   └── v3.check.ts
└── secrets-group.ts
```

In addition, a [__helpers__](src/__checks__/helpers) folder is located within the [__checks__](src/__checks__) folder
that contains commonly used setup and teardown functions used across checks.

## Development Setup

1. Install dependencies using `npm install`.
2. Run a tunnel to your local infisical instance using `ngrok` or tunneler of choice.
2. Create a machine identity in your local infisical instance and generate a client secret.
3. Create a `.env` file at the root of your project and populate it with your tunnel URL and identity credentials.
2. Log in to your Checkly account using `npx checkly login`
3. Verify your setup by running `npx checkly test --env-file="./.env"` and making sure the checks successfully run
4. Add new tests following the project structure.
    1. You can run individual tests by appending the test name to the above command.
    2. You can specify a run location using the `--location` flag.
    3. You can dry run your tests against gamma using the `--private-location` flag by setting up
       a [private location](https://www.checklyhq.com/docs/private-locations/) and running the docker agent on your
       machine provided you're running twingate.
    4. Use the `--verbose` flag for more detailed insights into running checks.

## Deployment

1. Verify new tests are passing locally.
    1. Running new tests against gamma from your machine is encouraged.
3. Create a PR for your changes.
    1. A workflow will be triggered and dry-run all tests against gamma.
5. If the dry-run passes successfully, your PR can be merged into `main`.
    1. Once merged a workflow will trigger to deploy new/updated checks to Checkly.

## CLI Commands

Run the core CLI commands with `npx checkly <command>`

| Command              | Action                                  |
|:---------------------|:----------------------------------------|
| `npx checkly test`   | Dry run all the checks in your project  |
| `npx checkly deploy` | Deploy your checks to the Checkly cloud |
| `npx checkly login`  | Log in to your Checkly account          |
| `npx checkly --help` | Show help for each command.             |

[Check the docs for the full CLI reference](https://www.checklyhq.com/docs/cli/command-line-reference/).
