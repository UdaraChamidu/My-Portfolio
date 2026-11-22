import test from "node:test";
import assert from "node:assert/strict";
import { buildContactMessage, sendContactEnquiry } from "../src/lib/contactDelivery.js";

const enquiry = { user_name: "Test Visitor", user_email: "visitor@example.test", message: "Test enquiry" };

test("optional fields are included in the existing email message without template changes", () => {
  assert.equal(buildContactMessage("  Build a workflow  ", "ai-automation", "Within a month"), "Service: AI Workflow Automation\n\nTimeline: Within a month\n\nBuild a workflow");
  assert.equal(buildContactMessage("Project details", "", ""), "Project details");
  assert.equal(buildContactMessage("Project details", "spoofed service", "spoofed timeline"), "Project details");
});

test("sends the enquiry before its acknowledgement", async () => {
  const calls = [];
  const result = await sendContactEnquiry(async (...args) => calls.push(args), enquiry);
  assert.equal(result.acknowledgementSent, true);
  assert.deepEqual(calls.map((call) => call[1]), ["template_agqr49w", "template_zja5mq3"]);
  assert.equal(calls[0][2], enquiry);
});

test("acknowledgement failure still reports successful enquiry delivery", async () => {
  let attempts = 0;
  const result = await sendContactEnquiry(async () => { if (++attempts === 2) throw new Error("Acknowledgement failed"); }, enquiry);
  assert.equal(result.acknowledgementSent, false);
  assert.equal(attempts, 2);
});

test("primary delivery failure does not send acknowledgement or claim success", async () => {
  let attempts = 0;
  await assert.rejects(sendContactEnquiry(async () => { attempts++; throw new Error("Delivery failed"); }, enquiry));
  assert.equal(attempts, 1);
});
