import { Dashboard } from "checkly/constructs";

new Dashboard(`test`, {
  header: `Test`,
  description: `service availability and response times for`,
  tags: ["gamma"],
  customUrl: `test`
});
