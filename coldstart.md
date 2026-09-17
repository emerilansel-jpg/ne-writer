# Coldstart: Neil Emmett Content Studio & Humanizer Engine

> Last updated: 2026-09-17
> Status: PRODUCTION LIVE & VERIFIED
> Live Web App: https://jdpwriter.com/neil
> Alternative Route: https://jdpwriter.com/neil-emmett
> Worker Dev URL: https://neil-emmett-writer.emerilansel.workers.dev
> Health Check: https://jdpwriter.com/neil/health
> Guidelines API: https://jdpwriter.com/api/neil/guidelines
> Generate API: https://jdpwriter.com/api/neil/generate
> Humanize API: https://jdpwriter.com/api/neil/humanize
> GitHub Repo: https://github.com/emerilansel-jpg/neil-emmett-writer
> Cloudflare Account: `Emerilansel@gmail.com` (`d5cb3e4213b6aa69dbc2feb1499af77a`)
> Zone: `jdpwriter.com` (`b21475189eb55bb061f1314d711205e6`)
> Model: `pesat-pro` via PesatRouter (`https://api.pesatrouter.com/v1/chat/completions`)

---

## 1. Project Overview & Separation Architecture
The Neil Emmett Content Studio is built to generate high-performing, medically compliant, humanized healthcare copy across several content types (service pages, location pages, military sub-pillars, accreditations, and informational guides).

It operates completely isolated from the standard JDP 23-step article pipeline and the Social Research Tool using **Cloudflare Specific Route Binding** on `jdpwriter.com`:

```
Traffic to https://jdpwriter.com
       │
       ├──► jdpwriter.com/neil* ──────────► Worker: neil-emmett-writer (This App)
       ├──► jdpwriter.com/api/neil* ──────► Worker: neil-emmett-writer (This App)
       ├──► jdpwriter.com/neil-emmett* ──► Worker: neil-emmett-writer (This App)
       │
       ├──► jdpwriter.com/research* ──────► Worker: social-research-tool
       ├──► jdpwriter.com/api/research* ──► Worker: social-research-tool
       │
       └──► jdpwriter.com/* (Default) ────► Worker: jdp-pipeline-admin (JDP Pipeline)
```

**Zero Pipeline Collision**:
- `neil-emmett-writer` has its own isolated Cloudflare Worker code and bundle (`worker.js`).
- It does not modify or share files with `jdp-pipeline-admin`.
- Deploying or updating this tool has zero effect on JDP article generation.

---

## 2. Supported Sites & Knowledge Base Presets

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

## 3. Humanizer Engine Rules (§1 to §25)
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

## 4. How to Use the Web App

### Input Format
Navigate to `https://jdpwriter.com/neil`. You only need to provide:
```text
Site: Onward Psychiatry
Keyword: Genetic Testing
Content type: service page
```
You can use the form dropdowns, or paste the 3-line block into the **Quick Paste** box and click **Parse Quick Input**.

### Pipeline Execution
Click **Generate & Humanize**:
1. **Step 1**: Loads brand metadata, clinical guidelines, and section structure.
2. **Step 2**: Prompts `pesat-pro` to draft the full structured copy.
3. **Step 3**: Passes the draft through the automated Humanizer filter with `pesat-pro`.
4. **Result**: Displays live rendered markdown, word count, character count, estimated reading time, with 1-click Copy and Download buttons.

### Standalone Humanizer
Switch to the **Humanizer Tool** tab to paste any existing draft and strip AI patterns with a single click.

---

## 5. Adding New Guidelines & Content Types in the Future

All guidelines are defined in `worker.js` within the `KNOWLEDGE_BASE` constant.

### Adding a New Site / Clinic:
In `worker.js`, append to `KNOWLEDGE_BASE.sites`:
```javascript
"New Clinic Name": {
  name: "New Clinic Name",
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
  sections: [
    "1. Meta Tag & Description",
    "2. Hero section requirements",
    "3. Clinical breakdown",
    "4. FAQ & CTA"
  ]
}
```

### Redeploying to Cloudflare:
From `F:\Neil Emmet Project`:
```bash
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" npx wrangler deploy
git add . && git commit -m "feat: add new guidelines" && git push
```
