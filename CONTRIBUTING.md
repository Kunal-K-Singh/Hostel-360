# Contributing to HOSTEL 360

Thank you for your interest in contributing to **HOSTEL 360**! We welcome contributions to make university hostel allocation more transparent, equitable, and efficient.

---

## Code of Conduct

By participating in this project, you agree to uphold our principles of mutual respect, inclusivity, and technical integrity.

---

## How to Contribute

### 1. Reporting Bugs
- Check the [existing issues](https://github.com/Kunal-K-Singh/Hostel-360/issues) to ensure the bug hasn't already been reported.
- Open a new issue using our **Bug Report Template**.
- Provide clear steps to reproduce, expected vs actual behavior, and Apps Script logs or console errors.

### 2. Suggesting Features
- Open an issue using our **Feature Request Template**.
- Detail the university operational problem your feature addresses and how it maintains zero-cost, deterministic behavior.

### 3. Pull Requests
1. **Fork** the repository and clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Hostel-360.git
   cd Hostel-360
   ```
2. Create a new branch with a descriptive name:
   ```bash
   git checkout -b feature/allocation-edge-case
   # or
   git checkout -b fix/sheet-bulk-update
   ```
3. Follow the **Engineering Standards** below.
4. Run the regression test suite (`runHostel360RegressionTests()` in `TestRunner.gs`) in your Apps Script test project.
5. Commit using **Conventional Commits**:
   - `feat: add demand draft serial validation`
   - `fix: resolve room occupancy lock race condition`
   - `docs: update pitch guide with DPDP compliance notes`
   - `perf: optimize SheetRepository batch writes`
6. Push to your branch and submit a Pull Request targeting `main`.

---

## Engineering Standards & Architecture Rules

1. **Deterministic Logic Only**:
   - The allocation engine (`AllocationEngine.gs`) must remain 100% deterministic.
   - Never introduce randomness or non-reproducible heuristics in seat distribution.

2. **Bulk Array Operations (Crucial Performance Rule)**:
   - Google Apps Script network round-trips to Google Sheets are expensive (~100-200ms per API call).
   - **Never** call `sheet.appendRow()`, `sheet.getRange()`, or `SheetRepository.updateRecordByKey()` inside a loop.
   - Always accumulate modifications in memory and utilize `SheetRepository.bulkUpdateRecords()`, `SheetRepository.batchInsertRecords()`, or `SheetRepository.deleteRecordsWhere()`.

3. **Security Invariants**:
   - Passwords must always be hashed with unique cryptographically generated salts via SHA-256 (`AuthService.gs`).
   - Plaintext passwords or raw hashes must **never** be passed to client-side templates or logs.
   - All server API functions in `Code.gs` must validate session tokens and role authorization server-side.

4. **Zero Recurring Cost**:
   - Keep the system 100% serverless on Google Workspace (Apps Script, Sheets, Drive, MailApp).
   - Do not introduce paid cloud dependencies (e.g., paid AWS/GCP servers, external paid databases).

---

## Development Environment Setup

We recommend using Google's command line tool [`@google/clasp`](https://github.com/google/clasp):

```bash
# Install clasp globally
npm install -g @google/clasp

# Authenticate with your Google account
clasp login

# Copy example config and paste your Apps Script project ID
cp .clasp.json.example .clasp.json

# Push changes to your Apps Script container
clasp push

# Open the Apps Script editor in your browser
clasp open
```

---

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
