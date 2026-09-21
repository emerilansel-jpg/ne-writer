import assert from "node:assert/strict";
import worker, {
  generateSlug,
  getExpectedUrl,
  formatContentOutput,
  KNOWLEDGE_BASE
} from "./worker.js";

// Test 1: Slug Generation
{
  assert.equal(generateSlug("Genetic Testing"), "genetic-testing");
  assert.equal(generateSlug("TMS Therapy & Care!"), "tms-therapy-care");
  assert.equal(generateSlug("  Deployment Mental Health  "), "deployment-mental-health");
  console.log("✓ Test 1: Slug generation passed");
}

// Test 2: Canonical URL Construction
{
  const onwardService = getExpectedUrl("Onward Psychiatry", "Genetic Testing", "service page");
  assert.equal(onwardService, "https://onwardpsychiatry.com/services/genetic-testing/");

  const libertyLocation = getExpectedUrl("Liberty TMS", "Norwood MA", "location page");
  assert.equal(libertyLocation, "https://libertytms.com/locations/norwood-ma/");

  const whoWeServe = getExpectedUrl("Fayetteville TMS", "Active Duty", "who we serve");
  assert.equal(whoWeServe, "https://fayettevilletms.com/who-we-serve/active-duty/");

  const customSite = getExpectedUrl("Apex Clinic", "TMS Therapy", "service page");
  assert.equal(customSite, "https://apex-clinic.com/services/tms-therapy/");
  console.log("✓ Test 2: URL generation passed");
}

// Test 3: formatContentOutput Sanity & Humanizer Rules
{
  const rawWithCodeFencesAndEmDash = `\`\`\`markdown
URL: https://onwardpsychiatry.com/services/genetic-testing/
Title: Genetic Testing | Onward Psychiatry
Meta Description: Comprehensive genetic testing for psychiatric medications. Call us today.

# **Genetic Testing in Norwood, MA**
Pharmacogenomic testing—a proven clinical tool—helps guide medication choices.
\`\`\``;

  const formatted = formatContentOutput(
    rawWithCodeFencesAndEmDash,
    "https://onwardpsychiatry.com/services/genetic-testing/",
    "Onward Psychiatry",
    "Genetic Testing"
  );

  assert.ok(!formatted.startsWith("```"), "Must strip leading code fences");
  assert.ok(!formatted.endsWith("```"), "Must strip trailing code fences");
  assert.ok(!formatted.includes("—"), "Must eliminate em dashes per Humanizer Rule §8");
  assert.ok(formatted.includes("URL: https://onwardpsychiatry.com/services/genetic-testing/"));
  assert.ok(formatted.includes("Title: Genetic Testing | Onward Psychiatry"));
  assert.ok(formatted.includes("Meta Description: Comprehensive genetic testing"));
  assert.ok(formatted.includes("*Disclaimer:"));
  assert.ok(formatted.includes("1 Walpole St #6, Norwood, MA 02062"));
  console.log("✓ Test 3: formatContentOutput humanizer rules passed");
}

// Test 4: Custom Site Footer Handling
{
  const rawCustom = `URL: https://custom-clinic.com/services/tms/

# **TMS Therapy**
Safe and effective treatment for depression.`;

  const formattedCustom = formatContentOutput(
    rawCustom,
    "https://custom-clinic.com/services/tms/",
    "Custom Clinic",
    "TMS Therapy"
  );

  assert.ok(formattedCustom.includes("**Custom Clinic**"));
  assert.ok(formattedCustom.includes("*Disclaimer:"));
  console.log("✓ Test 4: Custom site footer passed");
}

// Test 5: Worker Routing & Health Check
{
  // Test root /health
  const reqHealth = new Request("https://ne-writer.emerilansel.workers.dev/health");
  const resHealth = await worker.fetch(reqHealth, {}, {});
  assert.equal(resHealth.status, 200);
  const jsonHealth = await resHealth.json();
  assert.equal(jsonHealth.status, "ok");
  assert.equal(jsonHealth.service, "ne-writer");

  // Test /api/ne/health
  const reqNeHealth = new Request("https://jdpwriter.com/api/ne/health");
  const resNeHealth = await worker.fetch(reqNeHealth, {}, {});
  assert.equal(resNeHealth.status, 200);

  // Test guidelines endpoint
  const reqGuides = new Request("https://ne-writer.emerilansel.workers.dev/guidelines");
  const resGuides = await worker.fetch(reqGuides, {}, {});
  assert.equal(resGuides.status, 200);
  const jsonGuides = await resGuides.json();
  assert.ok(jsonGuides.sites["Onward Psychiatry"]);
  console.log("✓ Test 5: Worker fetch routing passed");
}

// Test 6: Knowledge Base Privacy (no "Neil Emmett")
{
  const kbString = JSON.stringify(KNOWLEDGE_BASE);
  assert.ok(!kbString.toLowerCase().includes("neil emmett"), "No Neil Emmett in Knowledge Base");
  console.log("✓ Test 6: KB privacy check passed");
}

console.log("\nAll 6 tests passed successfully!");
