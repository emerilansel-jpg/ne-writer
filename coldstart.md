# Coldstart: NE Content Studio & Humanizer Engine

> Last updated: 2026-09-17
> Status: PRODUCTION LIVE & VERIFIED
> Live Web App: https://jdpwriter.com/ne
> Alternative Route: https://jdpwriter.com/neil
> Worker Dev URL: https://ne-writer.emerilansel.workers.dev
> Health Check: https://jdpwriter.com/ne/health
> Guidelines API: https://jdpwriter.com/api/ne/guidelines
> Generate API: https://jdpwriter.com/api/ne/generate
> GitHub Repo: https://github.com/emerilansel-jpg/ne-writer
> Cloudflare Account: `Emerilansel@gmail.com` (`d5cb3e4213b6aa69dbc2feb1499af77a`)
> Zone: `jdpwriter.com` (`b21475189eb55bb061f1314d711205e6`)
> Model: `pesat-pro` via PesatRouter (Internal, hidden from client/UI)

---

## 1. Project Overview & Separation Architecture
NE Content Studio is built to generate high-performing, medically compliant, humanized healthcare copy across several content types (service pages, location pages, military sub-pillars, accreditations, and informational guides).

It operates completely isolated from the standard JDP 23-step article pipeline and the Social Research Tool using **Cloudflare Specific Route Binding** on `jdpwriter.com`:

```
Traffic to https://jdpwriter.com
       │
       ├──► jdpwriter.com/ne* ────────────► Worker: ne-writer (Isolasi 100%)
       ├──► jdpwriter.com/api/ne* ────────► Worker: ne-writer (Isolasi 100%)
       ├──► jdpwriter.com/neil* ──────────► Worker: ne-writer (Isolasi 100%)
       ├──► jdpwriter.com/api/neil* ──────► Worker: ne-writer (Isolasi 100%)
       │
       ├──► jdpwriter.com/research* ──────► Worker: social-research-tool
       ├──► jdpwriter.com/api/research* ──► Worker: social-research-tool
       │
       └──► jdpwriter.com/* (Default) ────► Worker: jdp-pipeline-admin (JDP Pipeline)
```

**Zero Pipeline Collision**:
- `ne-writer` has its own isolated Cloudflare Worker code and bundle (`worker.js`).
- It does not modify or share files with `jdp-pipeline-admin`.
- Deploying or updating this tool has zero effect on JDP article generation.

---

## 2. Iteration Highlights & Key Fixes (2026-09-17)

### A. Naming
- Renamed project and worker to **`ne-writer` (NE)**.
- Clean header title: **NE Content Studio**.
- GitHub repo renamed to `https://github.com/emerilansel-jpg/ne-writer`.

### B. Auto Quick Parse
- Real-time auto-parse on typing and pasting into the Quick Input box (`input` and `paste` event listeners).
- Clear visual feedback badge (`✓ Site: ... · Keyword: ... · Type: ...`).
- Fail-safe check in `runGeneration()` automatically parses the textarea content even if the user skips clicking "Parse Quick Input".

### C. Unified 1-Step Execution (Humanizer Baked In)
- Removed standalone humanizer tab.
- Single button execution: drafts and fully humanizes the content in one smooth workflow.
- Output presented in the preview pane is 100% finished, humanized, and ready to use.

### D. AI Engine Completely Hidden
- Removed all UI badges and labels referencing "Pesat-Pro", "Live Edge Engine", or underlying AI model names.
- Clean clinical progress milestones:
  1. *Checking guidelines & site specifications*
  2. *Creating structured clinical content with URL slug*
  3. *Refining tone & human clarity*
- Clean health check response: `{"status":"ok","service":"ne-writer","timestamp":"..."}`.

### E. Top-of-Page Canonical URL & Metadata Spacing
- Every document strictly starts with:
  ```markdown
  URL: https://[domain]/[path]/[keyword-slug]/

  Title: [Meta Title under 60 characters with keyword]

  Meta Description: [150 to 158 characters with keyword and CTA]

  # **[H1 Headline]**
  ```
- Uses double newlines (`\n\n`) so Markdown engines and browser preview never collapse lines together into run-on paragraphs.
- Configured frontend renderer with `marked.use({ breaks: true, gfm: true })`.

### F. Canonical Footer Separator & Italic Disclaimer
- Every document concludes with the standardized footer format:
  ```markdown
  ---

  **[Brand Name]** [Address] Phone: [Phone]

  *Disclaimer: [Service-specific disclaimer text]. Individual treatment outcomes vary. [Site crisis and 988 emergency notice].*
  ```

---

## 3. Supported Sites & Knowledge Base Presets

### A. Onward Psychiatry (Norwood, MA)
- **Address**: 1 Walpole St #6, Norwood, MA 02062
- **Phone**: (617) 958-6036
- **Service Area**: Norwood, Walpole, Dedham, Canton, Westwood, Sharon, Norfolk County, Greater Boston.
- **Core Services**: NeuroStar Advanced TMS Therapy, Pharmacogenomics / Genetic Testing, Medication Management.
- **Strict Brand Rules**:
  - The business name is "Onward Psychiatry". Never write "Onward Psychiatry Solutions" as a proper name.
  - "solutions" may only be used as a regular lowercase descriptive noun.
  - 83% symptom relief figure must be attributed to NeuroStar clinical trial data (never claimed as clinic-level data).
  - TMS session length is approximately 19 minutes (first appointment mapping 60-90 min).

### B. Liberty TMS (North Carolina & Colorado)
- **Focus**: Outpatient TMS near military installations (Fort Liberty NC, Fort Carson CO, Peterson SFB, Schriever SFB, USAFA).
- **Insurance**: TRICARE East (Humana Military), TRICARE West, VA Community Care Network (CCN), Medicare, major commercial plans.
- **FDA Clearances**: MDD (Oct 2008), OCD (May 2022), Anxious Depression (July 2022).
- **Credentials**: Psychiatrist-directed care, active state medical boards (NC & CO), NPI registration, Neuronetics manufacturer-certified operators.

### C. Fayetteville TMS (Fort Liberty Military Community)
- **Focus**: Active-duty service members, military spouses, veterans.
- **Military Considerations**:
  - Civilian EHR independent from MHS Genesis.
  - DoDI 6490.08 command notification guidelines (routine outpatient care protects privacy).
  - SF-86 Question 21: Voluntarily seeking outpatient depression care does not compromise security clearance.
  - Non-sedating: No duty limitation profile or MEB trigger.

---

## 4. Humanizer Engine Rules (§1 to §25)
The built-in humanizer automatically filters and rewrites drafts to remove machine generation patterns:
- **§1 No "Not X but Y"**: Direct statement of positive facts without negative strawman preambles.
- **§2 No One-Line Dramatic Closers**: Removed punchy sentence fragments designed for false weight.
- **§3 No Hollow Sayings**: Banned "at its core", "the heart of the matter", "fundamentally".
- **§4 No Staged Run-Ups**: Removed "let's dive in", "here's what you need to know".
- **§6 No Forced Triads**: Balanced sentence rhythm; lists are not arbitrarily grouped into threes.
- **§8 Zero Em/En Dashes**: Complete ban on `—` and `–`. Sentences use periods, commas, or colons.
- **§11 Active Voice**: Direct active subjects over passive sentences.
- **§12 Banned Words**: `delve`, `robust`, `crucial`, `bolster`, `navigate the landscape`, `foster`, `empower`, `holistic`, `tapestry`, `testament`, `pivotal`.
- **§15 No Trailing -ing Riders**: Removed participles like "highlighting the importance of...".
- **§16 No Sales Fluff**: Banned "boasts", "nestled in", "state-of-the-art".
- **§18 Direct Verbs**: Use "is", "are", and "has" instead of "serves as", "operates as".
- **Medical YMYL**: All claims must be non-promissory ("many patients experience"), with 988 crisis line notices included.

---

## 5. How to Use the Web App

### Input Format
Navigate to `https://jdpwriter.com/ne`. You only need to provide:
```text
Site: Onward Psychiatry
Keyword: Genetic Testing
Content type: service page
```
You can use the form dropdowns, or paste the 3-line block into the **Quick Input** box and click **Parse Quick Input** (or click **Generate Content** directly).

### Output Features
- Real-time Markdown rendering with HTML preview toggle.
- Raw Markdown view.
- Word count, character count, estimated reading time.
- 1-click Copy button.
- 1-click Download `.md` file button.

---

## 6. Adding New Guidelines & Content Types in the Future

All guidelines are defined in `worker.js` within the `KNOWLEDGE_BASE` constant.

### Adding a New Site / Clinic:
In `worker.js`, append to `KNOWLEDGE_BASE.sites`:
```javascript
"New Clinic Name": {
  name: "New Clinic Name",
  domain: "https://newclinic.com",
  location: "123 Main St, City, State ZIP",
  phone: "(555) 000-0000",
  serviceArea: "City, Surrounding Counties",
  specialties: "Services offered",
  conditions: "Conditions treated",
  disclaimer: "Emergency crisis disclaimer string",
  notes: "Specific brand, E-E-A-T, and clinical rules"
}
```

### Adding a New Content Type:
In `worker.js`, append to `KNOWLEDGE_BASE.contentTypes`:
```javascript
"new content type": {
  description: "Short description of the content format",
  pathPrefix: "folder-name",
  sections: [
    "1. URL slug, Title, and Meta Description",
    "2. # **H1 Title**",
    "3. Clinical breakdown",
    "4. ## **Frequently Asked Questions**",
    "5. ## **Ready to Connect?**"
  ]
}
```

### Redeploying to Cloudflare:
From `F:\NE Project`:
```bash
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" npx wrangler deploy
git add . && git commit -m "feat: add new guidelines" && git push
```

---

## 2026-09-21 — Privacy Sanitization & GSD Audit-Fix (PM Mode)
- **Status:** COMPLETED
- **Files touched:**
  - `worker.js`: Added DOMPurify for XSS-safe Markdown rendering, extended routing to catch `/health` and `/guidelines` on `workers.dev`, enforced Humanizer Rule §8 em dash stripping, added code fence stripper, improved dynamic footer regex for custom sites, added 90s fetch timeout.
  - `package.json`: Added `"type": "module"`, added test script, verified description uses "NE".
  - `test.js`: Added 6 unit tests (slug, URL structure, humanizer cleanup, custom footers, routing, and privacy check).
  - `Neil Emmet.zip` -> `NE.zip`: Renamed tracked file to eliminate full name exposure.
  - GitHub repo metadata: Updated description via GitHub API to remove "Neil Emmett" and use initial "NE".
- **Verification:** `npm test` passing (6/6 tests ok). Worker syntax verified via `node --check`.
- **Deploy/Next:** Atomic commit and git push.
