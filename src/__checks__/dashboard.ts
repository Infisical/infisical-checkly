import { Dashboard } from "checkly/constructs";

new Dashboard("acme-dashboard-1", {
  header: "ACME production",
  description: "service availability and response times",
  tags: [],
  customUrl: `status-test-cli`
  // customCSS: {
  //   entrypoint: path.join(__dirname, "dashboard.css")
  // }
});
