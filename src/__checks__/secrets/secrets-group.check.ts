import { CheckGroup } from "checkly/constructs";
import { pagerDutyChannel } from "../../alert-channels";
import { locations } from "../../locations";

export const secretsGroup = new CheckGroup("secrets-check-group", {
  name: "Secrets Check Group",
  activated: true,
  muted: false,
  concurrency: 50,
  runParallel: true,
  alertChannels: [pagerDutyChannel],
  locations
});
