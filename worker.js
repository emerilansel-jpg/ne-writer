/**
 * Neil Emmett Content Generator & Humanizer Worker
 * Production Engine: Pesat-Pro via PesatRouter
 * Route: jdpwriter.com/neil*
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
      sections: [
        "Title & Meta Description (keyword natural, under 60 chars title, under 158 chars meta)",
        "H1 Title",
        "Introduction: Clinical overview, who it helps, what it replaces or augments",
        "How It Works (Biological / neurological mechanism, clear plain-English explanation)",
        "Conditions Treated (bulleted breakdown: MDD, TRD, Anxiety, OCD, etc.)",
        "What [Service] Can and Cannot Do (Clear boundaries to manage patient expectations)",
        "The Clinical Process (Step-by-step: consult, testing/prep, administration, review/plan)",
        "Candidacy & Who Is a Candidate (Clear inclusion/exclusion checklist)",
        "Core Patient Benefits (Tangible quality of life and clinical advantages)",
        "Costs and Insurance Coverage (Commercial, Medicare/Medicaid, prior authorization, self-pay assistance)",
        "Why Choose [Site Name] (Local ties, clinician expertise, collaborative care)",
        "Frequently Asked Questions (6 to 8 patient questions with direct first-sentence answers)",
        "Ready to Get Started? (Actionable CTA, phone, address, and compliant crisis disclaimer)"
      ]
    },
    "location page": {
      description: "Rigid 15-part location skeleton for localized SEO (Norwood MA / Norfolk County format).",
      sections: [
        "1. Meta (Title <60 chars, Meta Desc 150-158 chars with primary keyword)",
        "2. Hero (H1 with exact match keyword, Eyebrow, introductory paragraph naming core cities)",
        "3. Condition Chips (6 conditions: MDD, TRD, OCD, Anxious Depression, Anxiety, Bipolar)",
        "4. Lead Form block (response time within a day, insurance coordination, phone fallback)",
        "5. Stat Bar (83% symptom relief attributed to NeuroStar, 19 min session, 2008 FDA clearance)",
        "6. Trust Badges (5 badges, including 'Serving Norwood, Walpole, Dedham and Canton')",
        "7. Name, Address, Phone and Map Block (NAP, hours, also serving list)",
        "8. Testimonials intro & 3 reviews (initials attribution)",
        "9. Process (H2 with location, 3 steps: Step 1 brain mapping, Step 2 plan, Step 3 daily sessions with drive-home note)",
        "10. Conditions Treated (6 cards in exact order: MDD, TRD, OCD, Anxious Depression, Bipolar, PTSD/Other)",
        "11. Why Us (4 blocks: insurance upfront, FDA-cleared tech, busy life, consistent care)",
        "12. Team (H2 with location, Hannah Lynch featured bio + provider cards)",
        "13. Insurance and Cost (Featured snippet target, direct answer, carrier list, prior authorization)",
        "14. Directions and Parking (near Norwood Hospital, turn-by-turn from Norwood Center, drive times)",
        "15. FAQ (10 questions with direct answers first, at least 3 containing city name)",
        "16. Final CTA (4 bullets, phone, address, crisis notice)"
      ]
    },
    "sub category / who we serve": {
      description: "Targeted sub-pillar page focusing on specific demographic groups (active-duty, veterans, pregnant women).",
      sections: [
        "Title & Meta Description",
        "H1 Title with demographic focus",
        "Operational Strain & Realities (Daily life context, why standard medications fell short)",
        "Technology Overview (FDA-cleared indications vs non-cleared adjunctive benefits)",
        "Comparison Table (TMS vs Oral Medications vs Psychotherapy)",
        "Privacy & Administrative Policies (Civilian records, command notification, security clearance SF-86)",
        "Step-by-Step Evaluation & Benefit Navigation (TRICARE Prime/Select, VA CCN)",
        "Targeted FAQs",
        "CTA with direct contact info"
      ]
    },
    "about / accreditations": {
      description: "E-E-A-T trust page verifying medical licenses, board certifications, and technology clearances.",
      sections: [
        "Title & Meta Description",
        "H1 Accreditations & Certifications",
        "Clinical Oversight & Licensing Standards (State medical board licenses, NPI federal registry, APA guidelines)",
        "FDA Clearances (Clear dates: MDD Oct 2008, OCD May 2022, Anxious Depression July 2022; device vs facility distinction)",
        "Certified Clinical Operators (Manufacturer training benchmarks)",
        "Insurance Credentialing & Military Network Coverage",
        "Verification FAQs (How referring providers and patients can independently check credentials)",
        "CTA with verified contact info"
      ]
    },
    "informational page": {
      description: "Educational guide answering user queries (e.g. treatment costs, procedure guide, preparation).",
      sections: [
        "Title & Meta Description",
        "H1 Guide Title",
        "Direct Answer Box (Featured snippet target)",
        "Detailed Breakdown of Factors and Costs",
        "Insurance Coverage & Out-of-Pocket Estimates",
        "Comparison / Decision Criteria",
        "Step-by-Step Patient Next Steps",
        "Comprehensive FAQs",
        "Clinical Consultation CTA"
      ]
    }
  }
};

// --- SYSTEM PROMPT GENERATORS ---
function buildDraftSystemPrompt(site, keyword, contentType) {
  const siteData = KNOWLEDGE_BASE.sites[site] || {
    name: site,
    location: "United States",
    serviceArea: "Regional and telehealth patients",
    specialties: "Evidence-based mental healthcare",
    disclaimer: "Outpatient psychiatric services. In emergency, call 988 or 911."
  };

  const typeData = KNOWLEDGE_BASE.contentTypes[contentType] || KNOWLEDGE_BASE.contentTypes["service page"];

  return `You are a Senior Healthcare Content Strategist and Medical SEO Writer specializing in mental health clinics.
Your task is to write high-converting, medically compliant, E-E-A-T authoritative content for the following assignment:

TARGET SPECIFICATIONS:
- Site/Brand: ${siteData.name}
- Target Keyword: ${keyword}
- Content Type: ${contentType}
- Target Location / Service Area: ${siteData.serviceArea}
- Contact / Address: ${siteData.location || "On file"} | Phone: ${siteData.phone || "On file"}
- Site Specific Rules: ${siteData.notes || "Maintain high clinical standards."}

CONTENT STRUCTURE TO FOLLOW:
${typeData.sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}

CRITICAL SEO & MEDICAL COMPLIANCE RULES:
1. KEYWORD USAGE:
   - Primary Keyword: "${keyword}".
   - Title tag: Under 60 characters, natural placement.
   - Meta description: 150-158 characters, includes primary keyword and ends with a call to action.
   - If keyword contains "near me" or specific location: Do NOT spam the exact phrase. Use "near me" naturally only ONCE in the entire page. Prioritize the core clinical service.
2. MEDICAL & YMYL ACCURACY:
   - Never promise a cure or 100% success. Use "many patients experience", "clinical studies indicate".
   - Never advise patients to alter or stop medication without doctor supervision.
   - For outcomes: Any percentage (e.g. 83% relief) must be attributed to published clinical data (e.g. "In NeuroStar clinical trials..."), NEVER claimed as practice-level statistics.
   - Distinguish FDA-cleared indications from off-label or adjunctive uses clearly.
3. TONE & STYLE:
   - Grade 8-9 reading level. Plain, warm, direct, second-person ("you", "your").
   - Short sentences. Paragraphs 2 to 4 sentences maximum.
   - No fear-based marketing.
   - Always include the mandatory emergency crisis notice at the end:
     "${siteData.disclaimer}"

Write the full, complete draft in Markdown format. Output ONLY the markdown document.`;
}

function buildHumanizerSystemPrompt() {
  return `You are an expert human editor applying the "Humanizer" skill to eliminate AI writing patterns and chatbot residue.
Your goal is to make the medical text sound like it was written by an authentic, thoughtful human clinician and copywriter.

APPLY THESE RULES STRICTLY:
1. §1 NO "NOT X BUT Y": Eliminate "not just X, it is Y", "it is not X, it's Y", "X rather than Y", and negative preamble clauses before positive facts. State the point directly.
2. §2 NO ONE-LINE DRAMATIC CLOSERS: Cut isolated punchy lines ("That is the real win.", "Let that sink in.", "Read that again."). Merge fragmented lists into complete sentences.
3. §3 NO FAKE DEEP SAYINGS: Delete phrases like "at its core", "in reality", "what really matters", "fundamentally", "the deeper issue", "the heart of the matter", "the architecture of".
4. §4 NO STAGED RUN-UPS: Delete conversational throat-clearing ("Let's dive in", "Here is what you need to know", "Let's break this down", "Honestly,", "Look,").
5. §5 NO ARGUING WITH NO ONE: Cut defensive framing ("This isn't to say", "Don't get me wrong", "You might think... but").
6. §6 NO FORCED TRIADS: Do NOT force rhythmic lists of three words or three parallel phrases unless naturally called for. Vary sentence rhythm.
7. §8 ZERO EM DASHES OR EN DASHES: Absolute ban on em dashes (—), en dashes (–), and double hyphens (--). Replace with a period, comma, colon, parentheses, or rewrite the sentence.
8. §11 ACTIVE VOICE OVER PASSIVE: Prefer active subjects ("We send your sample" instead of "Your sample is sent").
9. §12 BANNED AI WORDS: Remove all occurrences of: delve, delve into, robust, crucial, bolster, navigate the landscape, realm, unlock, foster, elevate, empower, transformative, holistic, tapestry, testament, beacon, cornerstone, pivotal, intricate, meticulous, vibrant, groundbreaking.
10. §15 NO SHALLOW -ING RIDERS: Cut trailing gerunds bolted onto sentences ("..., highlighting the importance of care", "..., ensuring better outcomes"). State the action as an independent fact.
11. §16 NO SALES FLUFF: Cut marketing cliches ("boasts", "nestled in the heart of", "state-of-the-art", "game-changer", "world-class").
12. §18 PREFER IS / ARE / HAS: Use "is", "are", and "has" instead of pretentious verbs like "serves as", "operates as", "stands as", "functions as".
13. §19 NO DECORATIVE BOLDING: Remove bold formatting from every heading or every bullet item label. Turn labeled vertical lists into clean prose where labels add no distinct meaning.
14. KEEP ALL FACTS, CLINICAL DETAILS, AND DISCLAIMERS: Do not delete medical facts, phone numbers, addresses, or crisis helpline notices.

Return ONLY the humanized final markdown text.`;
}

// --- CALL PESATROUTER ---
async function callPesatRouter(env, systemPrompt, userPrompt, temperature = 0.3) {
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
    throw new Error(`PesatRouter API error (${response.status}): ${errorText}`);
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
  <title>Neil Emmett Content Studio | Powered by Pesat-Pro</title>
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
      font-weight: 700;
      color: white;
      font-size: 1.1rem;
    }
    .logo-text h1 {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #fff;
    }
    .logo-text span {
      font-size: 0.75rem;
      color: var(--accent);
      background: var(--accent-muted);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
      margin-left: 6px;
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
      grid-template-columns: 380px 1fr;
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
      padding: 0.8rem 1.2rem;
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
      padding: 0.75rem;
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
    .badge { background: #1f293d; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; color: #60a5fa; }
  </style>
</head>
<body>

  <header class="header">
    <div class="logo-badge">
      <div class="logo-icon">N</div>
      <div class="logo-text">
        <h1>Neil Emmett Content Studio <span>Pesat-Pro Engine</span></h1>
      </div>
    </div>
    <div class="nav-tabs">
      <button class="nav-tab active" onclick="switchTab('generator')">Generator</button>
      <button class="nav-tab" onclick="switchTab('humanizer')">Humanizer Tool</button>
      <button class="nav-tab" onclick="switchTab('guidelines')">Guidelines Library</button>
    </div>
  </header>

  <main class="container">
    
    <!-- LEFT PANEL: INPUT CONTROLS -->
    <div class="panel">
      
      <!-- GENERATOR TAB CONTROLS -->
      <div id="controls-generator" class="tab-content active">
        <div class="panel-title">
          <span>Task Assignment</span>
          <span class="badge">Live Edge Engine</span>
        </div>

        <div class="form-group">
          <label>Quick Paste (Key: Value)</label>
          <textarea id="quickInput" rows="3" placeholder="Site: Onward Psychiatry&#10;Keyword: Genetic Testing&#10;Content type: service page"></textarea>
          <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:4px;" onclick="parseQuickInput()">Parse Quick Input</button>
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
          <span id="btnText">Generate & Humanize</span>
        </button>

        <div class="status-box" id="statusBox">
          <div class="step-item" id="step1"><span>○</span> 1. Loading Guidelines & Presets</div>
          <div class="step-item" id="step2"><span>○</span> 2. Drafting with Pesat-Pro</div>
          <div class="step-item" id="step3"><span>○</span> 3. Applying Humanizer Clean Pass</div>
        </div>
      </div>

      <!-- HUMANIZER STANDALONE TAB CONTROLS -->
      <div id="controls-humanizer" class="tab-content">
        <div class="panel-title">
          <span>Humanizer Polisher</span>
          <span class="badge">§1 - §25 Rules</span>
        </div>
        <p style="font-size:0.825rem; color:var(--text-muted); margin-bottom:1rem;">
          Paste any existing AI-written text below to strip tells, em dashes, filler words, and dramatic closers.
        </p>
        <div class="form-group">
          <label>Text to Humanize</label>
          <textarea id="humanizeInput" rows="12" placeholder="Paste draft here..."></textarea>
        </div>
        <button class="btn" id="humanizeOnlyBtn" onclick="runHumanizerOnly()">
          <span>✨</span> Strip AI Patterns
        </button>
      </div>

      <!-- GUIDELINES TAB CONTROLS -->
      <div id="controls-guidelines" class="tab-content">
        <div class="panel-title">
          <span>Active Guidelines</span>
        </div>
        <p style="font-size:0.825rem; color:var(--text-muted); margin-bottom:1rem;">
          Embedded knowledge base automatically applied during generation.
        </p>
        <div class="card">
          <div style="font-weight:600; color:#60a5fa; font-size:0.85rem;">Medical YMYL Guardrails</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">No promises of cure; attribute outcomes to clinical studies; include 988 crisis line.</p>
        </div>
        <div class="card">
          <div style="font-weight:600; color:#34d399; font-size:0.85rem;">Humanizer (§1-§25)</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">Zero em dashes; no "not X but Y"; no "at its core"; cut filler adverbs.</p>
        </div>
        <div class="card">
          <div style="font-weight:600; color:#f472b6; font-size:0.85rem;">Location Rules</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">15-part rigid skeleton; Norwood, MA; do not invent practice statistics.</p>
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
          <p style="color:var(--text-muted); font-style:italic;">Generated content and humanizer results will appear here...</p>
        </div>
        <pre id="rawView" style="display:none;"></pre>
      </div>
    </div>

  </main>

  <script>
    let currentRawContent = "";
    let activeTab = "generator";

    function switchTab(tab) {
      activeTab = tab;
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      if (tab === 'generator') {
        document.querySelectorAll('.nav-tab')[0].classList.add('active');
        document.getElementById('controls-generator').classList.add('active');
      } else if (tab === 'humanizer') {
        document.querySelectorAll('.nav-tab')[1].classList.add('active');
        document.getElementById('controls-humanizer').classList.add('active');
      } else {
        document.querySelectorAll('.nav-tab')[2].classList.add('active');
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

    function parseQuickInput() {
      const text = document.getElementById('quickInput').value.trim();
      if (!text) return;
      
      const lines = text.split('\\n');
      lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim().toLowerCase();
          const val = parts.slice(1).join(':').trim();
          if (key.includes('site')) {
            const select = document.getElementById('siteSelect');
            let found = false;
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].text.toLowerCase().includes(val.toLowerCase()) || select.options[i].value.toLowerCase().includes(val.toLowerCase())) {
                select.selectedIndex = i;
                found = true;
                break;
              }
            }
            if (!found) {
              select.value = "Custom";
              document.getElementById('customSiteInput').style.display = 'block';
              document.getElementById('customSiteInput').value = val;
            }
          } else if (key.includes('keyword')) {
            document.getElementById('keywordInput').value = val;
          } else if (key.includes('content') || key.includes('type')) {
            const select = document.getElementById('contentTypeSelect');
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].value.toLowerCase().includes(val.toLowerCase()) || val.toLowerCase().includes(select.options[i].value.toLowerCase())) {
                select.selectedIndex = i;
                break;
              }
            }
          }
        }
      });
    }

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
      s1.className = 'step-item done';
      s1.innerHTML = '<span>✓</span> 1. Guidelines & Presets Loaded';
      s2.className = 'step-item active';
      s2.innerHTML = '<div class="spinner"></div> 2. Drafting with Pesat-Pro...';
      s3.className = 'step-item';
      s3.innerHTML = '<span>○</span> 3. Applying Humanizer Clean Pass';

      try {
        const res = await fetch('/api/neil/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ site, keyword, contentType })
        });

        if (!res.ok) {
          throw new Error("HTTP error " + res.status + ": " + await res.text());
        }

        s2.className = 'step-item done';
        s2.innerHTML = '<span>✓</span> 2. Draft Generated';
        s3.className = 'step-item done';
        s3.innerHTML = '<span>✓</span> 3. Humanizer Pass Complete';

        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        alert("Generation error: " + err.message);
        s2.className = 'step-item';
        s2.textContent = 'Failed';
      } finally {
        btn.disabled = false;
        document.getElementById('btnText').textContent = "Generate & Humanize";
      }
    }

    async function runHumanizerOnly() {
      const input = document.getElementById('humanizeInput').value.trim();
      if (!input) {
        alert("Please paste some text to humanize.");
        return;
      }

      const btn = document.getElementById('humanizeOnlyBtn');
      btn.disabled = true;
      btn.textContent = "Polishing text...";

      try {
        const res = await fetch('/api/neil/humanize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input })
        });

        if (!res.ok) throw new Error("HTTP " + res.status + ": " + await res.text());
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        alert("Humanizer error: " + err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = "<span>✨</span> Strip AI Patterns";
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
    if (path === "/neil/health" || path === "/api/neil/health") {
      return new Response(JSON.stringify({
        status: "ok",
        service: "neil-emmett-writer",
        model: env.PESATROUTER_MODEL || DEFAULT_CONFIG.MODEL,
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Guidelines Library API
    if (path === "/neil/api/guidelines" || path === "/api/neil/guidelines") {
      return new Response(JSON.stringify(KNOWLEDGE_BASE), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // POST /api/neil/generate (Two-Stage Pipeline: Draft -> Humanize)
    if ((path === "/neil/api/generate" || path === "/api/neil/generate") && request.method === "POST") {
      try {
        const body = await request.json();
        const { site, keyword, contentType } = body;

        if (!site || !keyword) {
          return new Response(JSON.stringify({ error: "Missing required fields: site, keyword" }), {
            status: 400,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
          });
        }

        // STAGE 1: Generate comprehensive draft
        const draftSystemPrompt = buildDraftSystemPrompt(site, keyword, contentType || "service page");
        const draftUserPrompt = `Generate a full, in-depth, production-ready ${contentType || "service page"} for "${site}" targeting the keyword "${keyword}". Follow all structural sections, medical guidelines, and local area data.`;
        const initialDraft = await callPesatRouter(env, draftSystemPrompt, draftUserPrompt, 0.3);

        // STAGE 2: Automated Humanizer Pass
        const humanizerSystemPrompt = buildHumanizerSystemPrompt();
        const humanizerUserPrompt = `Please review and rewrite this draft to remove all AI writing tells, eliminate em dashes completely, apply active voice, and ensure a warm Grade 8-9 human clinician tone:\n\n${initialDraft}`;
        const finalContent = await callPesatRouter(env, humanizerSystemPrompt, humanizerUserPrompt, 0.2);

        return new Response(JSON.stringify({
          success: true,
          site,
          keyword,
          contentType: contentType || "service page",
          content: finalContent || initialDraft,
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

    // POST /api/neil/humanize (Standalone Humanizer Tool)
    if ((path === "/neil/api/humanize" || path === "/api/neil/humanize") && request.method === "POST") {
      try {
        const body = await request.json();
        const { text } = body;
        if (!text) {
          return new Response(JSON.stringify({ error: "Missing text to humanize" }), {
            status: 400,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
          });
        }

        const humanizerSystemPrompt = buildHumanizerSystemPrompt();
        const humanizedText = await callPesatRouter(env, humanizerSystemPrompt, `Humanize the following text according to all rules:\n\n${text}`, 0.2);

        return new Response(JSON.stringify({
          success: true,
          content: humanizedText
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

    // Default: Serve Web UI on /neil, /neil/*, /neil-emmett*, or root on workers.dev
    return new Response(HTML_UI, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
