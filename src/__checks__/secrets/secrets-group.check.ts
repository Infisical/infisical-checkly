import { CheckGroup } from "checkly/constructs";
import { pagerDutyChannel } from "../../alert-channels";
import { infisicalGamma } from "../../private-locations";

export const secretsGroup = new CheckGroup("secrets-check-group", {
  name: "Secrets Check Group",
  activated: true,
  muted: false,
  concurrency: 100,
  runParallel: true,
  alertChannels: [pagerDutyChannel],
  privateLocations: [infisicalGamma]
});
