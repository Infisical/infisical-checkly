import { CheckGroup } from "checkly/constructs";
import { pagerDutyChannel } from "../../alert-channels";
import { getLocations } from "../../locations";
import { v4 as uuidv4 } from "uuid";
import { Dashboard } from "checkly/constructs";

export const secretsGroup = new CheckGroup(`secrets-group`, {
  name: `Secrets Group Check [${process.env.INSTANCE_ID?.toUpperCase()}]`,
  activated: true,
  muted: false,
  concurrency: 50,
  runParallel: true,
  alertChannels: [pagerDutyChannel],
  ...getLocations()
});

new Dashboard("acme-dashboard-1", {
  header: "ACME production",
  description: "service availability and response times",
  tags: ["prod", "api"],
  logo: "https://assets.acme.com/images/acme-logo.png",
  customUrl: `status-test-cli-${uuidv4()}`
  // customCSS: {
  //   entrypoint: path.join(__dirname, "dashboard.css")
  // }
});
