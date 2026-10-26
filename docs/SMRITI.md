# SMRITI: Advisory Institutional Memory Layer

> **Advisory only. Allocation is rule-based.**
> Smriti serves as an institutional memory assistant for university wardens, powered by the Hindsight agent memory platform (Vectorize). Smriti records administrative precedents, surfaces similar historical cases during manual overrides, and synthesizes pre-publication cycle briefings.

---

## 1. Purpose & Core Philosophy

Hostel room allocations in Hostel 360 are **100% deterministic, rule-based, and mathematically audited** across 12 institutional invariants. No artificial intelligence or machine learning model is ever permitted to decide, rank, or block room allotments.

However, university administration frequently encounters subjective edge cases:
- *Why was a specific domicile certificate rejected in a previous cycle?*
- *Has the institution previously granted manual ground-floor reassignment to a student with delayed medical board documentation?*
- *What proportion of reserved quota seats lapsed in specific hostels last year before being released to the general pool?*

**Smriti** bridges this gap by acting as an institutional memory vault. It retains high-level administrative precedents and reflects on them on demand, without ever interfering with the core deterministic allocation engine.

---

## 2. Architecture & Information Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WARDEN INTERACTION LAYER                        │
│                                                                        │
│   [Document Audit]    [Manual Override]    [Waitlist Promotion]        │
│          │                    │                     │                  │
│          ▼                    ▼                     ▼                  │
│   DocumentService.gs  AllocationEngine.gs  AllocationEngine.gs         │
└──────────┬────────────────────┬─────────────────────┬──────────────────┘
           │                    │                     │
           └────────────────────┼─────────────────────┘
                                │ (Asynchronous Retain Hook)
                                ▼
           ┌───────────────────────────────────────────┐
           │             MemoryService.gs              │
           │  • smritiScrub_() [PII Redaction]         │
           │  • smritiRetain() / smritiRetainBatch()   │
           └────────────────────┬──────────────────────┘
                                │ POST /v1/default/banks/{bank_id}/memories
                                ▼
           ┌───────────────────────────────────────────┐
           │        Hindsight Cloud Memory Bank        │
           │         (Vectorize Agent Memory)          │
           │  • Semantic Indexing                      │
           │  • Temporal Context Management            │
           └────────────────────┬──────────────────────┘
                                │
       ┌────────────────────────┴────────────────────────┐
       │ Recall (/memories/recall)                       │ Reflect (/reflect)
       ▼                                                 ▼
┌───────────────────────────────┐     ┌──────────────────────────────────┐
│ Manual Override Modal         │     │ Smriti Chat Tab &                │
│ "Similar Past Cases (Smriti)" │     │ Pre-Publish Advisory Briefing    │
│ Displays historical precedents│     │ Synthesizes cycle trends and     │
│ to guide warden reasoning     │     │ highlights potential pitfalls    │
└───────────────────────────────┘     └──────────────────────────────────┘
```

---

## 3. How Retain, Recall, and Reflect are Used

| Operation | Hindsight Endpoint | Location in Codebase | Purpose & Context |
| :--- | :--- | :--- | :--- |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `AllocationEngine.overrideAllocation` | Records manual override precedent (category, priority tier, source/target hostel, justification reason). |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `DocumentService.verifyDocument` | Records document rejections (document type, rejection reason, academic year). |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `AllocationEngine.promoteWaitlistCandidates` | Records waitlist candidate promotions into vacant rooms following reporting deadlines. |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `AllocationEngine.lapseUnreportedAllocations` | Records seat forfeitures when candidates fail to pay fees or report within the deadline. |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `AllocationEngine.runAllocation` | Records cycle draft statistics (category allotment distribution and remaining vacant rooms). |
| **Retain** | `POST /v1/default/banks/{bank_id}/memories` | `AllocationEngine.publishAllocations` | Records official cycle publication with 12-point validator pass/warning states. |
| **Recall** | `POST /v1/default/banks/{bank_id}/memories/recall` | `Code.gs -> apiSmritiSuggestForOverride` | Recalls up to 3 similar historical manual override precedents when the warden opens the override form. |
| **Reflect** | `POST /v1/default/banks/{bank_id}/reflect` | `Code.gs -> apiSmritiAsk` | Synthesizes answers to open-ended warden questions in the Smriti Chat Tab. |
| **Reflect** | `POST /v1/default/banks/{bank_id}/reflect` | `Code.gs -> apiSmritiPrePublishBriefing` | Analyzes historical patterns to surface pre-publication cautionary briefings. |

---

## 4. Privacy & Data Protection Rules

Smriti enforces strict privacy protection before any memory payload leaves the Google Apps Script runtime:

1. **Automatic PII Scrubbing (`smritiScrub_`)**:
   - All email addresses (`/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g`) are scrubbed to `[EMAIL_REDACTED]`.
   - All phone numbers (10-digit, `+91`, and hyphens) are scrubbed to `[PHONE_REDACTED]`.
   - All long digit sequences ($\ge 6$ consecutive digits, e.g. enrollment numbers, student IDs, Aadhaar numbers) are scrubbed to `[ID_REDACTED]`.
   - Academic years (e.g. `2024-25`, `2026-27`) and ISO dates (e.g. `2024-08-15`) are safely preserved.
2. **No Document Files or Raw Attachments**:
   - Uploaded PDF, PNG, or JPG files are **never** transmitted to Hindsight. Only high-level rejection categories and reasons are recorded.
3. **No Student Names**:
   - Events describe candidates solely by **Reservation Category** (e.g., General, OBC-NCL, SC, ST, EWS, PwD) and **Priority Group** (e.g., Priority 1 - Divyangjan, Priority 4 - Distance-based).

---

## 5. Non-Blocking & Resilience Guarantee

Every call to Smriti is non-blocking:
- All outbound requests use `UrlFetchApp.fetch(..., { muteHttpExceptions: true })`.
- Includes 1 automated retry for 5xx server responses with a 500ms backoff.
- Memory operations are wrapped in `try / catch` blocks.
- If Hindsight is unconfigured, unreachable, or times out, the application functions **identically as before**. Core operations (allocations, publishing, approvals, reports) are never interrupted or blocked.

---

## 6. Setup & Configuration

### Step 1: Create a Hindsight Bank
1. Log in to the [Hindsight Console](https://hindsight.vectorize.io).
2. Create a new Memory Bank (e.g. `hostel360-institutional-memory`).
3. Note your **API Key** and **Bank ID**.

### Step 2: Configure Script Properties
In the Google Apps Script Editor (`script.google.com`):
1. Open the file `MemoryService.gs`.
2. Run the `smritiSetConfig` function from the editor toolbar, or execute in the Apps Script console:
   ```javascript
   smritiSetConfig("YOUR_HINDSIGHT_API_KEY", "YOUR_HINDSIGHT_BANK_ID");
   ```
   *(Optional third argument `baseUrl` defaults to `https://api.hindsight.vectorize.io`)*.

### Step 3: Run the Health Check
In the Apps Script Editor, select and run `smritiHealthCheck()`:
- It tests a sample `smritiRetain()` and `smritiRecall()`.
- Check **Execution log** to confirm both operations return `ok: true`.

### Step 4: Seed Historical Precedent Memory
In the Apps Script Editor, select and run `seedSmritiHistory()`:
- Seeds ~45 realistic synthetic memory events across academic years `2024-25` and `2025-26`.
- Establishes historical patterns (domicile rejection address mismatches, PwD late medical certificate overrides, lapsed seats in BH2 released to General, waitlist promotion timeframes).
- Function is idempotent; it tracks completion via the `SMRITI_HISTORY_SEEDED` script property. Pass `seedSmritiHistory(true)` if you wish to re-seed.

### Step 5: Authorize External Request Scope & Redeploy
Because Smriti communicates with the Hindsight REST API, Google Apps Script requires the external HTTP request scope:
1. `appsscript.json` includes `"https://www.googleapis.com/auth/script.external_request"`.
2. When deploying: Click **Deploy** > **Manage deployments** > ✏️ **Edit** > select **Version: New version** > click **Deploy**.
3. Accept the authorization prompt if prompted.
