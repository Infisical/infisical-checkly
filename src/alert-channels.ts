import { PagerdutyAlertChannel } from "checkly/constructs";

export const pagerDutyChannel = new PagerdutyAlertChannel("pager-duty", {
  account: process.env.PAGER_DUTY_ACCOUNT!,
  serviceName: process.env.PAGER_DUTY_SERVICE_NAME!,
  serviceKey: process.env.PAGER_DUTY_SERVICE_KEY!,
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
  sslExpiry: true,
  sslExpiryThreshold: 30
});
