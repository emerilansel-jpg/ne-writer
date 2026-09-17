/**
 * NE Content Studio
 * Production Engine via PesatRouter
 * Routes: jdpwriter.com/ne*, jdpwriter.com/neil*
 */

const DEFAULT_CONFIG = {
  PESATROUTER_URL: "https://api.pesatrouter.com/v1/chat/completions",
  PESATROUTER_API_KEY: "sk-pesat-3c2f89bd9a72302375f8e10ef9eba726891a81513f907dfb",
  MODEL: "pesat-pro"
};

// --- GUIDELINES & BRAND KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = {
  sites: {
    "Onward Psychiatry": {
      name: "Onward Psychiatry",
      domain: "https://onwardpsychiatry.com",
      location: "1 Walpole St #6, Norwood, MA 02062",
      phone: "(617) 958-6036",
      serviceArea: "Norwood, Walpole, Dedham, Canton, Westwood, Sharon, Norfolk County, Greater Boston",
      specialties: "NeuroStar Advanced TMS Therapy, Pharmacogenomic / Genetic Testing, Psychiatric Medication Management",
      conditions: "Major Depressive Disorder (MDD), Treatment-Resistant Depression, OCD, Anxious Depression, Bipolar Disorder, ADHD",
      disclaimer: "Onward Psychiatry provides outpatient psychiatric care and does not provide emergency crisis services. If you or a loved one is experiencing immediate distress or thoughts of self-harm, please call or text 988 to reach the Suicide & Crisis Lifeline, call 911, or contact the Massachusetts Behavioral Health Help Line at (833) 773-2445.",
      notes: "Never use 'Onward Psychiatry Solutions' as a capitalized business name. Use 'solutions' only in lower case descriptive text. NeuroStar data: 83% symptom relief figure must be attributed to NeuroStar clinical data, never practice-level claims. Standard TMS session 19 minutes, initial mapping 60-90 min."
    },
    "Liberty TMS": {
      name: "Liberty TMS",
      domain: "https://libertytms.com",
      location: "North Carolina and Colorado",
      phone: "(910) 838-9811",
      serviceArea: "Serving military and civilian communities near Fort Liberty (NC), Fort Carson, Peterson SFB, Schriever SFB, US Air Force Academy (CO)",
      specialties: "NeuroStar Advanced Therapy, Outpatient Neuromodulation, Psychiatrist-Directed Care",
      conditions: "Treatment-Resistant Depression, Obsessive-Compulsive Disorder, Anxious Depression",
      disclaimer: "Liberty TMS provides scheduled outpatient neuromodulation and does not provide emergency crisis care. If in crisis, call or text 988.",
      notes: "Clear FDA clearances: MDD (Oct 2008), OCD (May 2022), Anxious Depression (July 2022). Emphasize physician oversight, state medical boards (NC & CO), NPI registration, manufacturer-certified operators (Neuronetics), TRICARE East/West, VA CCN."
    },
    "Fayetteville TMS": {
      name: "Fayetteville TMS",
      domain: "https://fayettevilletms.com",
      location: "Fayetteville, NC (off-post)",
      phone: "(910) 838-9811",
      serviceArea: "Fort Liberty, Pope Field, Cumberland County military and civilian families",
      specialties: "NeuroStar TMS for Active-Duty, Veterans, and Military Families",
      conditions: "Major Depressive Disorder, Post-Deployment Depression, Anxious Depression, OCD",
      disclaimer: "Outpatient psychiatric service. For emergencies or crisis support, call 988 or 911 immediately.",
      notes: "Key military angles: Off-post privacy, civilian EHR separate from MHS Genesis, DoDI 6490.08 command notification limits, SF-86 Question 21 guidance (seeking routine care does not revoke security clearances), non-sedating (no duty limitation profile needed), TRICARE Prime/Select and VA CCN navigation."
    }
  },
  contentTypes: {
    "service page": {
      description: "Comprehensive medical service page with deep clinical mechanism, patient journey, eligibility, insurance, and FAQ.",
      pathPrefix: "services",
      sections: [
        "1. URL slug, Title, and Meta Description",
        "2. # **H1 Title**",
        "3. Introduction (Clinical overview, who it helps, what it replaces or augments)",
        "4. ## **How It Works** (Biological / neurological mechanism, clear plain-English explanation)",
        "5. ## **Conditions Treated** (bulleted breakdown: MDD, TRD, Anxiety, OCD, etc.)",
        "6. ## **What [Service] Can and Cannot Do** (Clear clinical boundaries to manage patient expectations)",
        "7. ## **The Clinical Process** (Step-by-step with H3: Consultation, Administration/Testing, Treatment Plan, Monitoring)",
        "8. ## **Who Is a Candidate** (Clear inclusion/exclusion checklist)",
        "9. ## **Core Patient Benefits** (Tangible quality of life and clinical advantages)",
        "10. ## **Costs and Insurance Coverage** (Commercial, Medicare/Medicaid, prior authorization, self-pay assistance)",
        "11. ## **Why Choose [Site Name]** (Local ties, clinician expertise, collaborative care)",
        "12. ## **Frequently Asked Questions** (6 to 8 patient questions with H3 and direct first-sentence answers)",
        "13. ## **Ready to Get Started?** (Actionable CTA, phone, address, and compliant crisis disclaimer)"
      ]
    },
    "location page": {
      description: "Rigid 15-part location skeleton for localized SEO (Norwood MA / Norfolk County format).",
      pathPrefix: "locations",
      sections: [
        "1. URL slug, Title (<60 chars), Meta Description (150-158 chars with primary keyword)",
        "2. # **H1 Title** (contains exact match primary keyword)",
        "3. Eyebrow & Hero paragraph (naming core cities Norwood, Walpole, Dedham, Canton)",
        "4. Condition Chips (6 conditions: MDD, TRD, OCD, Anxious Depression, Anxiety, Bipolar)",
        "5. Lead Form block (response time within a day, insurance coordination, phone fallback)",
        "6. Stat Bar (83% symptom relief attributed to NeuroStar, 19 min session, 2008 FDA clearance)",
        "7. Trust Badges (5 badges, including 'Serving Norwood, Walpole, Dedham and Canton')",
        "8. Name, Address, Phone and Map Block (NAP, hours, also serving list)",
        "9. Testimonials intro & 3 reviews (initials attribution)",
        "10. ## **Process** (H2 with location, 3 steps: Step 1 brain mapping, Step 2 plan, Step 3 daily sessions with drive-home note)",
        "11. ## **Conditions Treated** (6 cards in exact order: MDD, TRD, OCD, Anxious Depression, Bipolar, PTSD/Other)",
        "12. ## **Why Us** (4 blocks: insurance upfront, FDA-cleared tech, busy life, consistent care)",
        "13. ## **Team** (H2 with location, Hannah Lynch featured bio + provider cards)",
        "14. ## **Insurance and Cost** (Featured snippet target, direct answer, carrier list, prior authorization)",
        "15. ## **Directions and Parking** (near Norwood Hospital, turn-by-turn from Norwood Center, drive times)",
        "16. ## **Frequently Asked Questions** (10 questions with direct answers first, at least 3 containing city name)",
        "17. ## **Final CTA** (4 bullets, phone, address, crisis notice)"
      ]
    },
    "sub category / who we serve": {
      description: "Targeted sub-pillar page focusing on specific demographic groups (active-duty, veterans, pregnant women).",
      pathPrefix: "who-we-serve",
      sections: [
        "1. URL slug, Title, and Meta Description",
        "2. # **H1 Title with demographic focus**",
        "3. Operational Strain & Realities (Daily life context, why standard medications fell short)",
        "4. ## **Technology Overview** (FDA-cleared indications vs non-cleared adjunctive benefits)",
        "5. ## **Comparison Table** (TMS vs Oral Medications vs Psychotherapy)",
        "6. ## **Privacy & Administrative Policies** (Civilian records, command notification, security clearance SF-86)",
        "7. ## **Step-by-Step Evaluation & Benefit Navigation** (TRICARE Prime/Select, VA CCN)",
        "8. ## **Frequently Asked Questions**",
        "9. ## **Ready to Get Started?** (CTA with direct contact info and crisis notice)"
      ]
    },
    "about / accreditations": {
      description: "E-E-A-T trust page verifying medical licenses, board certifications, and technology clearances.",
      pathPrefix: "about",
      sections: [
        "1. URL slug, Title, and Meta Description",
        "2. # **Accreditations & Certifications**",
        "3. ## **Clinical Oversight & Licensing Standards** (State medical board licenses, NPI federal registry, APA guidelines)",
        "4. ## **FDA Clearances** (Clear dates: MDD Oct 2008, OCD May 2022, Anxious Depression July 2022; device vs facility distinction)",
        "5. ## **Certified Clinical Operators** (Manufacturer training benchmarks)",
        "6. ## **Insurance Credentialing & Military Network Coverage**",
        "7. ## **Frequently Asked Questions** (How referring providers and patients can independently check credentials)",
        "8. ## **Ready to Connect?** (CTA with verified contact info and crisis notice)"
      ]
    },
    "informational page": {
      description: "Educational guide answering user queries (e.g. treatment costs, procedure guide, preparation).",
      pathPrefix: "resources",
      sections: [
        "1. URL slug, Title, and Meta Description",
        "2. # **H1 Guide Title**",
        "3. Direct Answer Box (Featured snippet target)",
        "4. ## **Detailed Breakdown of Factors and Costs**",
        "5. ## **Insurance Coverage & Out-of-Pocket Estimates**",
        "6. ## **Comparison / Decision Criteria**",
        "7. ## **Step-by-Step Patient Next Steps**",
        "8. ## **Frequently Asked Questions**",
        "9. ## **Clinical Consultation CTA** (CTA and crisis notice)"
      ]
    }
  }
};

// --- URL SLUG HELPER ---
function generateSlug(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getSiteDomain(site) {
  const s = site.toLowerCase();
  if (s.includes('onward')) return 'https://onwardpsychiatry.com';
  if (s.includes('liberty')) return 'https://libertytms.com';
  if (s.includes('fayetteville')) return 'https://fayettevilletms.com';
  return 'https://' + generateSlug(site) + '.com';
}

function getExpectedUrl(site, keyword, contentType) {
  const domain = getSiteDomain(site);
  const slug = generateSlug(keyword);
  const ct = contentType.toLowerCase();
  if (ct.includes('service')) return `${domain}/services/${slug}/`;
  if (ct.includes('location')) return `${domain}/locations/${slug}/`;
  if (ct.includes('who we serve') || ct.includes('sub category')) return `${domain}/who-we-serve/${slug}/`;
  if (ct.includes('about')) return `${domain}/about/${slug}/`;
  return `${domain}/${slug}/`;
}

// --- SYSTEM PROMPT (COMBINED GENERATION & HUMANIZER) ---
function buildUnifiedPrompt(site, keyword, contentType) {
  const siteData = KNOWLEDGE_BASE.sites[site] || {
    name: site,
    location: "United States",
    serviceArea: "Regional and telehealth patients",
    specialties: "Evidence-based mental healthcare",
    disclaimer: "Outpatient psychiatric services. In emergency, call 988 or 911."
  };

  const typeData = KNOWLEDGE_BASE.contentTypes[contentType] || KNOWLEDGE_BASE.contentTypes["service page"];
  const expectedUrl = getExpectedUrl(siteData.name, keyword, contentType);

  return `You are a Senior Healthcare Content Strategist and Copywriter creating publication-ready medical content.
Target Brand: ${siteData.name}
Target Location: ${siteData.location || "On file"} (${siteData.serviceArea})
Phone: ${siteData.phone || "On file"}
Target Keyword: ${keyword}
Content Type: ${contentType}
Brand Clinical Notes: ${siteData.notes || "Maintain high clinical standards."}

MANDATORY DOCUMENT HEADER (Must be the EXACT first 4 lines of your response, no markdown preambles or greetings):
URL: ${expectedUrl}
Title: [Meta Title under 60 characters with primary keyword and brand name]
Meta Description: [150 to 158 characters with primary keyword, ending with an active call to action]

# **[H1 Headline]**

REQUIRED SECTIONS TO INCLUDE IN BODY:
${typeData.sections.slice(2).join("\n")}

STRICT CLINICAL & SEO GUIDELINES:
1. Primary keyword: "${keyword}". Use naturally in title tag (<60 chars), meta description (150-158 chars with CTA), H1, and body copy.
2. If keyword contains "near me" or specific location: Do NOT spam the exact phrase. Use "near me" naturally only ONCE in the entire text. Prioritize the core clinical service.
3. Never promise cures or 100% success. Use "many patients experience", "clinical trials show".
4. Attribute outcomes (such as 83% relief) strictly to clinical trial data (e.g. "In NeuroStar clinical trials..."). Never claim practice-level statistics.
5. Distinguish FDA-cleared indications from off-label or adjunctive uses clearly.
6. Mandatory crisis disclaimer at end: "${siteData.disclaimer}"

STRICT EDITORIAL HUMANIZER RULES (MANDATORY):
1. §1 NO "NOT X BUT Y": Eliminate "not just X, it is Y", "it is not X, it's Y", "X rather than Y", and negative strawman preambles before positive statements. State positive claims directly.
2. §2 NO ONE-LINE DRAMATIC CLOSERS: No isolated punchy lines ("That is the real win.", "Let that sink in."). Merge fragments into full sentences.
3. §3 NO HOLLOW SAYINGS: Banned phrases: "at its core", "in reality", "what really matters", "fundamentally", "the deeper issue", "the heart of the matter", "the architecture of".
4. §4 NO STAGED RUN-UPS: Delete conversational throat-clearing ("Let's dive in", "Here is what you need to know", "Honestly,", "Look,").
5. §5 NO ARGUING WITH NO ONE: Cut defensive framing ("This isn't to say", "Don't get me wrong").
6. §6 NO FORCED TRIADS: Vary list lengths and sentence rhythms; do not group adjectives or examples in artificial groups of three.
7. §8 ZERO EM DASHES OR EN DASHES: Absolute ban on em dashes (—), en dashes (–), and double hyphens (--). Use commas, periods, or colons.
8. §11 ACTIVE VOICE: Use active clinical subjects ("We send your sample to a certified lab" instead of "Your sample is sent").
9. §12 BANNED WORDS: Remove all occurrences of: delve, delve into, robust, crucial, bolster, navigate, realm, unlock, foster, elevate, empower, transformative, holistic, tapestry, testament, beacon, cornerstone, pivotal, intricate, meticulous, vibrant, groundbreaking.
10. §15 NO SHALLOW -ING RIDERS: No trailing gerunds ("..., highlighting its value", "..., ensuring success"). State actions as independent facts.
11. §16 NO SALES FLUFF: No "boasts", "nestled in", "state-of-the-art", "game-changer".
12. §18 DIRECT VERBS: Use "is", "are", "has" instead of "serves as", "operates as", "stands as".
13. §19 NO DECORATIVE BOLDING: Do not bold every sentence or bullet label.
14. Heading format: Use Markdown bold inside headings matching the examples (# **Title**, ## **Section**, ### **Subheading**).
15. Tone: Grade 8-9 reading level. Warm, clear, direct US English.

Deliver the complete, polished, 100% humanized final content in Markdown. Line 1 MUST begin with "URL: ${expectedUrl}".`;
}

// --- POST PROCESSOR TO GUARANTEE URL HEADER ---
function formatContentOutput(rawContent, expectedUrl, site, keyword) {
  let text = (rawContent || "").trim();

  // If output does not start with URL:, ensure URL header is injected at line 1
  if (!text.toLowerCase().startsWith("url:")) {
    // Check if it starts with Title: or **Title
    if (text.toLowerCase().startsWith("title:") || text.toLowerCase().startsWith("**title")) {
      text = `URL: ${expectedUrl}\n\n` + text;
    } else {
      // Find where H1 starts
      const h1Match = text.match(/#\s+/);
      if (h1Match && h1Match.index > 0) {
        const preH1 = text.substring(0, h1Match.index).trim();
        const postH1 = text.substring(h1Match.index);
        if (!preH1.toLowerCase().includes("url:")) {
          text = `URL: ${expectedUrl}\n` + preH1 + "\n\n" + postH1;
        }
      } else {
        text = `URL: ${expectedUrl}\n\n` + text;
      }
    }
  }

  return text;
}

// --- CALL PESATROUTER ---
async function callPesatRouter(env, systemPrompt, userPrompt, temperature = 0.25) {
  const apiKey = env.PESATROUTER_API_KEY || DEFAULT_CONFIG.PESATROUTER_API_KEY;
  const apiUrl = env.PESATROUTER_URL || DEFAULT_CONFIG.PESATROUTER_URL;
  const model = env.PESATROUTER_MODEL || DEFAULT_CONFIG.MODEL;

  const payload = {
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: temperature,
    max_tokens: 4000
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upstream API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

// --- HTML USER INTERFACE ---
const HTML_UI = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NE Content Studio</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --card-border: #1f293d;
      --card-hover: #182235;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #10b981;
      --accent-muted: rgba(16, 185, 129, 0.15);
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --border: #374151;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      min-height: 100vh;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(180deg, #111827 0%, #0d1320 100%);
      border-bottom: 1px solid var(--card-border);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .logo-badge {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: white;
      font-size: 1.1rem;
      letter-spacing: -0.05em;
    }
    .logo-text h1 {
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #fff;
    }
    .nav-tabs {
      display: flex;
      gap: 0.5rem;
      background: #090d16;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
    }
    .nav-tab {
      padding: 0.45rem 0.9rem;
      font-size: 0.825rem;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-tab.active {
      background: #1f293d;
      color: white;
    }
    .container {
      max-width: 1300px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 2rem;
    }
    @media (max-width: 960px) {
      .container { grid-template-columns: 1fr; }
    }
    .panel {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .panel-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
    }
    input, select, textarea {
      width: 100%;
      background: #090d16;
      border: 1px solid var(--border);
      color: white;
      padding: 0.65rem 0.85rem;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.9rem;
      transition: border 0.2s;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }
    textarea {
      resize: vertical;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }
    .btn {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.85rem 1.2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.2s, transform 0.1s;
    }
    .btn:hover { background: var(--primary-hover); }
    .btn:active { transform: scale(0.99); }
    .btn-secondary {
      background: #1f293d;
      color: #e2e8f0;
      margin-top: 0.5rem;
    }
    .btn-secondary:hover { background: #2d3b55; }
    .parse-badge {
      display: none;
      margin-top: 0.5rem;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-size: 0.775rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
    }
    .quick-preset {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.4rem;
    }
    .chip {
      background: #182235;
      border: 1px solid var(--card-border);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #93c5fd;
      cursor: pointer;
    }
    .chip:hover { background: #2563eb; color: white; }
    .status-box {
      margin-top: 1rem;
      padding: 0.85rem;
      background: #090d16;
      border-radius: 8px;
      border-left: 3px solid var(--primary);
      font-size: 0.825rem;
      display: none;
    }
    .status-steps {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.4rem;
    }
    .step-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
    }
    .step-item.active { color: #60a5fa; font-weight: 600; }
    .step-item.done { color: var(--accent); }
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.2);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .output-panel {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 120px);
    }
    .output-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.75rem;
    }
    .output-stats {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .output-actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.775rem;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: #182235;
      color: white;
      cursor: pointer;
    }
    .btn-sm:hover { background: #2563eb; }
    .view-toggle {
      display: flex;
      background: #090d16;
      border-radius: 6px;
      padding: 2px;
      border: 1px solid var(--card-border);
    }
    .toggle-btn {
      padding: 2px 8px;
      font-size: 0.75rem;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: 4px;
    }
    .toggle-btn.active { background: #1f293d; color: white; }
    .output-content {
      flex: 1;
      overflow-y: auto;
      background: #090d16;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.5rem;
      font-size: 0.925rem;
    }
    .output-content pre {
      white-space: pre-wrap;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #cbd5e1;
    }
    /* Rendered Markdown Styling */
    .markdown-body h1 { font-size: 1.8rem; margin: 1.5rem 0 1rem; color: #fff; border-bottom: 1px solid #1f293d; padding-bottom: 0.5rem; }
    .markdown-body h2 { font-size: 1.35rem; margin: 1.3rem 0 0.75rem; color: #93c5fd; }
    .markdown-body h3 { font-size: 1.1rem; margin: 1rem 0 0.5rem; color: #e2e8f0; }
    .markdown-body p { margin-bottom: 0.85rem; }
    .markdown-body ul, .markdown-body ol { margin: 0 0 1rem 1.5rem; }
    .markdown-body li { margin-bottom: 0.35rem; }
    .markdown-body table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.85rem; }
    .markdown-body th, .markdown-body td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; }
    .markdown-body th { background: #111827; }
    .markdown-body blockquote { border-left: 4px solid var(--primary); padding-left: 1rem; color: #94a3b8; margin: 1rem 0; }
    .markdown-body hr { border: none; border-top: 1px solid #1f293d; margin: 1.5rem 0; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .card { background: #090d16; border: 1px solid var(--card-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
  </style>
</head>
<body>

  <header class="header">
    <div class="logo-badge">
      <div class="logo-icon">NE</div>
      <div class="logo-text">
        <h1>NE Content Studio</h1>
      </div>
    </div>
    <div class="nav-tabs">
      <button class="nav-tab active" onclick="switchTab('studio')">Studio</button>
      <button class="nav-tab" onclick="switchTab('guidelines')">Guidelines & Standards</button>
    </div>
  </header>

  <main class="container">
    
    <!-- LEFT PANEL: INPUT CONTROLS -->
    <div class="panel">
      
      <!-- STUDIO TAB -->
      <div id="controls-studio" class="tab-content active">
        <div class="panel-title">
          <span>Task Assignment</span>
        </div>

        <div class="form-group">
          <label>Quick Input</label>
          <textarea id="quickInput" rows="4" placeholder="Site: Onward Psychiatry&#10;Keyword: Genetic Testing&#10;Content type: service page"></textarea>
          <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:4px;" onclick="handleQuickParseClick()">Parse Quick Input</button>
          <div id="parseBadge" class="parse-badge"></div>
        </div>

        <hr style="border:none; border-top:1px solid var(--card-border); margin:1rem 0;">

        <div class="form-group">
          <label>Target Site</label>
          <select id="siteSelect" onchange="onSiteChange()">
            <option value="Onward Psychiatry">Onward Psychiatry (Norwood, MA)</option>
            <option value="Liberty TMS">Liberty TMS (NC & CO)</option>
            <option value="Fayetteville TMS">Fayetteville TMS (Fort Liberty, NC)</option>
            <option value="Custom">Custom Site...</option>
          </select>
          <input type="text" id="customSiteInput" placeholder="Enter custom site name..." style="display:none; margin-top:0.4rem;">
        </div>

        <div class="form-group">
          <label>Target Keyword</label>
          <input type="text" id="keywordInput" value="Genetic Testing" placeholder="e.g. Genetic Testing, TMS Therapy...">
          <div class="quick-preset">
            <span class="chip" onclick="setKeyword('Genetic Testing')">Genetic Testing</span>
            <span class="chip" onclick="setKeyword('TMS Therapy')">TMS Therapy</span>
            <span class="chip" onclick="setKeyword('tms therapy Norwood ma')">TMS Norwood MA</span>
            <span class="chip" onclick="setKeyword('Deployment mental health')">Deployment Mental Health</span>
          </div>
        </div>

        <div class="form-group">
          <label>Content Type</label>
          <select id="contentTypeSelect">
            <option value="service page">Service Page</option>
            <option value="location page">Location Page (Norwood Skeleton)</option>
            <option value="sub category / who we serve">Sub Category / Who We Serve</option>
            <option value="about / accreditations">Under About / Accreditations</option>
            <option value="informational page">Informational Page / Guide</option>
          </select>
        </div>

        <button class="btn" id="generateBtn" onclick="runGeneration()">
          <span id="btnIcon">⚡</span>
          <span id="btnText">Generate Content</span>
        </button>

        <div class="status-box" id="statusBox">
          <div class="step-item" id="step1"><span>○</span> 1. Checking guidelines & site specifications</div>
          <div class="step-item" id="step2"><span>○</span> 2. Creating structured clinical content with URL slug</div>
          <div class="step-item" id="step3"><span>○</span> 3. Refining tone & human clarity</div>
        </div>
      </div>

      <!-- GUIDELINES TAB -->
      <div id="controls-guidelines" class="tab-content">
        <div class="panel-title">
          <span>Editorial Standards</span>
        </div>
        <p style="font-size:0.825rem; color:var(--text-muted); margin-bottom:1rem;">
          Embedded rules applied automatically during generation.
        </p>
        <div class="card">
          <div style="font-weight:600; color:#38bdf8; font-size:0.85rem;">Mandatory URL & Meta Structure</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
            Line 1 is always the canonical URL slug (e.g. URL: https://site.com/services/slug/), followed by Title and Meta Description before the H1 heading.
          </p>
        </div>
        <div class="card">
          <div style="font-weight:600; color:#34d399; font-size:0.85rem;">Human Clarity & Style</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
            Zero em dashes (—). No "not X but Y" constructions. No hollow phrases ("at its core", "the heart of the matter"). Strict grade 8-9 direct clinical voice.
          </p>
        </div>
        <div class="card">
          <div style="font-weight:600; color:#60a5fa; font-size:0.85rem;">Medical YMYL Compliance</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
            No promises of full recovery; all statistics cited from published clinical trials; non-sedating notes; emergency crisis notice (988) included.
          </p>
        </div>
        <div class="card">
          <div style="font-weight:600; color:#f472b6; font-size:0.85rem;">Location & Keyword Targeting</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
            "Near me" incorporated naturally max once; localized anchor text; strict 15-part location skeleton for Norwood, MA.
          </p>
        </div>
      </div>

    </div>

    <!-- RIGHT PANEL: CONTENT OUTPUT -->
    <div class="panel output-panel">
      <div class="output-toolbar">
        <div class="output-stats" id="outputStats">Ready for task input</div>
        <div class="output-actions">
          <div class="view-toggle">
            <button class="toggle-btn active" id="viewRenderedBtn" onclick="toggleView('rendered')">Preview</button>
            <button class="toggle-btn" id="viewRawBtn" onclick="toggleView('raw')">Markdown</button>
          </div>
          <button class="btn-sm" onclick="copyOutput()">📋 Copy</button>
          <button class="btn-sm" onclick="downloadOutput()">💾 Download</button>
        </div>
      </div>

      <div class="output-content">
        <div id="renderedView" class="markdown-body">
          <p style="color:var(--text-muted); font-style:italic;">Humanized, production-ready content with URL slug will appear here...</p>
        </div>
        <pre id="rawView" style="display:none;"></pre>
      </div>
    </div>

  </main>

  <script>
    let currentRawContent = "";
    let activeTab = "studio";

    function switchTab(tab) {
      activeTab = tab;
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      if (tab === 'studio') {
        document.querySelectorAll('.nav-tab')[0].classList.add('active');
        document.getElementById('controls-studio').classList.add('active');
      } else {
        document.querySelectorAll('.nav-tab')[1].classList.add('active');
        document.getElementById('controls-guidelines').classList.add('active');
      }
    }

    function toggleView(type) {
      const rendered = document.getElementById('renderedView');
      const raw = document.getElementById('rawView');
      const btnR = document.getElementById('viewRenderedBtn');
      const btnRaw = document.getElementById('viewRawBtn');
      if (type === 'rendered') {
        rendered.style.display = 'block';
        raw.style.display = 'none';
        btnR.classList.add('active');
        btnRaw.classList.remove('active');
      } else {
        rendered.style.display = 'none';
        raw.style.display = 'block';
        btnR.classList.remove('active');
        btnRaw.classList.add('active');
      }
    }

    function setKeyword(kw) {
      document.getElementById('keywordInput').value = kw;
    }

    function onSiteChange() {
      const siteVal = document.getElementById('siteSelect').value;
      const customInput = document.getElementById('customSiteInput');
      if (siteVal === 'Custom') {
        customInput.style.display = 'block';
      } else {
        customInput.style.display = 'none';
      }
    }

    function parseQuickInput(showFeedback = false) {
      const text = document.getElementById('quickInput').value.trim();
      const badge = document.getElementById('parseBadge');
      if (!text) {
        if (badge) badge.style.display = 'none';
        return false;
      }

      const lines = text.split(/\\r?\\n/);
      let matchedFields = [];

      lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const key = line.substring(0, colonIdx).trim().toLowerCase();
        const val = line.substring(colonIdx + 1).trim();
        if (!val) return;

        if (key.includes('site') || key.includes('brand')) {
          const select = document.getElementById('siteSelect');
          let found = false;
          for (let i = 0; i < select.options.length; i++) {
            const optText = select.options[i].text.toLowerCase();
            const optVal = select.options[i].value.toLowerCase();
            const valLower = val.toLowerCase();
            if (optText.includes(valLower) || valLower.includes(optVal)) {
              select.selectedIndex = i;
              found = true;
              document.getElementById('customSiteInput').style.display = 'none';
              matchedFields.push('Site: ' + select.options[i].value);
              break;
            }
          }
          if (!found) {
            select.value = "Custom";
            const customInput = document.getElementById('customSiteInput');
            customInput.style.display = 'block';
            customInput.value = val;
            matchedFields.push('Site: ' + val);
          }
        } else if (key.includes('keyword') || key.includes('kw')) {
          document.getElementById('keywordInput').value = val;
          matchedFields.push('Keyword: ' + val);
        } else if (key.includes('content') || key.includes('type')) {
          const select = document.getElementById('contentTypeSelect');
          const valLower = val.toLowerCase();
          for (let i = 0; i < select.options.length; i++) {
            const optVal = select.options[i].value.toLowerCase();
            const optText = select.options[i].text.toLowerCase();
            if (optVal.includes(valLower) || valLower.includes(optVal) || optText.includes(valLower)) {
              select.selectedIndex = i;
              matchedFields.push('Type: ' + select.options[i].text);
              break;
            }
          }
        }
      });

      if (badge && (showFeedback || matchedFields.length > 0)) {
        if (matchedFields.length > 0) {
          badge.style.display = 'block';
          badge.innerHTML = '✓ ' + matchedFields.join(' · ');
        } else if (showFeedback) {
          badge.style.display = 'block';
          badge.style.color = '#f87171';
          badge.style.background = 'rgba(239, 68, 68, 0.1)';
          badge.innerHTML = 'No "Key: Value" lines detected (e.g. Site: ..., Keyword: ...)';
        }
      }
      return matchedFields.length > 0;
    }

    function handleQuickParseClick() {
      parseQuickInput(true);
    }

    // Auto-parse on user paste or typing in textarea
    const quickInputElem = document.getElementById('quickInput');
    quickInputElem.addEventListener('input', () => parseQuickInput(false));
    quickInputElem.addEventListener('paste', () => setTimeout(() => parseQuickInput(true), 50));

    function updateStats(text) {
      const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
      const chars = text.length;
      document.getElementById('outputStats').textContent = \`\${words} words | \${chars} characters | Reading time: ~\${Math.ceil(words/200)} min\`;
    }

    function setContent(text) {
      currentRawContent = text;
      document.getElementById('rawView').textContent = text;
      document.getElementById('renderedView').innerHTML = marked.parse(text);
      updateStats(text);
    }

    async function runGeneration() {
      // Auto-parse if quick paste has input
      parseQuickInput(false);

      const siteSelect = document.getElementById('siteSelect').value;
      const site = siteSelect === 'Custom' ? document.getElementById('customSiteInput').value : siteSelect;
      const keyword = document.getElementById('keywordInput').value.trim();
      const contentType = document.getElementById('contentTypeSelect').value;

      if (!site || !keyword) {
        alert("Please enter both Site and Target Keyword.");
        return;
      }

      const btn = document.getElementById('generateBtn');
      const statusBox = document.getElementById('statusBox');
      const s1 = document.getElementById('step1');
      const s2 = document.getElementById('step2');
      const s3 = document.getElementById('step3');

      btn.disabled = true;
      document.getElementById('btnText').textContent = "Processing...";
      statusBox.style.display = 'block';
      
      s1.className = 'step-item active';
      s1.innerHTML = '<div class="spinner"></div> 1. Checking guidelines & site specifications';
      s2.className = 'step-item';
      s2.innerHTML = '<span>○</span> 2. Creating structured clinical content with URL slug';
      s3.className = 'step-item';
      s3.innerHTML = '<span>○</span> 3. Refining tone & human clarity';

      setTimeout(() => {
        s1.className = 'step-item done';
        s1.innerHTML = '<span>✓</span> 1. Guidelines & standards verified';
        s2.className = 'step-item active';
        s2.innerHTML = '<div class="spinner"></div> 2. Generating humanized clinical content with URL slug...';
      }, 700);

      try {
        const endpoint = window.location.pathname.startsWith('/neil') ? '/api/neil/generate' : '/api/ne/generate';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ site, keyword, contentType })
        });

        if (!res.ok) {
          throw new Error("HTTP error " + res.status + ": " + await res.text());
        }

        s2.className = 'step-item done';
        s2.innerHTML = '<span>✓</span> 2. Content generation complete';
        s3.className = 'step-item done';
        s3.innerHTML = '<span>✓</span> 3. Humanized & polished';

        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        alert("Generation error: " + err.message);
        s2.className = 'step-item';
        s2.textContent = 'Failed';
      } finally {
        btn.disabled = false;
        document.getElementById('btnText').textContent = "Generate Content";
      }
    }

    function copyOutput() {
      if (!currentRawContent) return;
      navigator.clipboard.writeText(currentRawContent).then(() => {
        alert("Copied Markdown content to clipboard!");
      });
    }

    function downloadOutput() {
      if (!currentRawContent) return;
      const blob = new Blob([currentRawContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content-output.md';
      a.click();
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>`;

// --- WORKER ROUTING & FETCH HANDLER ---
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    // Health check
    if (path === "/ne/health" || path === "/api/ne/health" || path === "/neil/health" || path === "/api/neil/health") {
      return new Response(JSON.stringify({
        status: "ok",
        service: "ne-writer",
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Guidelines Library API
    if (path === "/ne/api/guidelines" || path === "/api/ne/guidelines" || path === "/neil/api/guidelines" || path === "/api/neil/guidelines") {
      return new Response(JSON.stringify(KNOWLEDGE_BASE), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // POST Generate Endpoint (Unified 1-Step Execution, Guaranteed URL Slug & Humanized)
    if ((path === "/ne/api/generate" || path === "/api/ne/generate" || path === "/neil/api/generate" || path === "/api/neil/generate") && request.method === "POST") {
      try {
        const body = await request.json();
        const { site, keyword, contentType } = body;

        if (!site || !keyword) {
          return new Response(JSON.stringify({ error: "Missing required fields: site, keyword" }), {
            status: 400,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
          });
        }

        const expectedUrl = getExpectedUrl(site, keyword, contentType || "service page");

        // Unified Execution with full guidelines and humanizer constraints
        const prompt = buildUnifiedPrompt(site, keyword, contentType || "service page");
        const userPrompt = `Generate the complete, publication-ready ${contentType || "service page"} for "${site}" targeting keyword "${keyword}". Line 1 must begin with "URL: ${expectedUrl}". Follow all required sections, heading bold styles, clinical guidelines, and humanizer editorial rules.`;
        
        const rawContent = await callPesatRouter(env, prompt, userPrompt, 0.25);
        const finalContent = formatContentOutput(rawContent, expectedUrl, site, keyword);

        return new Response(JSON.stringify({
          success: true,
          site,
          keyword,
          contentType: contentType || "service page",
          url: expectedUrl,
          content: finalContent,
          generatedAt: new Date().toISOString()
        }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    // Default: Serve Web UI
    return new Response(HTML_UI, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
