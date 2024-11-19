import { CheckGroup } from "checkly/constructs";
import { pagerDutyChannel } from "../../alert-channels";
import { getLocations } from "../../locations";

export const secretsGroup = new CheckGroup(`secrets-group`, {
  name: `Secrets Group Check [${process.env.INSTANCE_ID?.toUpperCase()}]`,
  activated: true,
  muted: false,
  concurrency: 50,
  runParallel: true,
  alertChannels: [pagerDutyChannel],
  ...getLocations()
});
