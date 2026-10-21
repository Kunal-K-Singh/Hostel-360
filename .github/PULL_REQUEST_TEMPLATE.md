## Description

Provide a summary of the change, problem addressed, and institutional impact.

Fixes #(issue)

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an allocation or UI issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Performance improvement (optimization of sheet reads/writes)
- [ ] Documentation update (guides, README, pitch handbook)
- [ ] Architectural refactoring (code structure, typing, tests)

## Verification & Testing

Please describe the tests executed to verify your changes:
- [ ] Ran `runHostel360RegressionTests()` in `TestRunner.gs` (All 20 tests pass)
- [ ] Verified deterministic allocation behavior with synthetic cohort
- [ ] Verified sub-1.5s execution time for bulk operations
- [ ] Verified single-occupancy & gender isolation constraints hold

## Checklist

- [ ] My code adheres to the project's style guidelines (`.editorconfig`)
- [ ] I have avoided calling `appendRow` or `updateRecordByKey` inside loops (using bulk array operations)
- [ ] I have not committed any `.clasp.json`, `.clasprc.json`, or private API keys
- [ ] I have updated relevant documentation in `docs/` or `README.md`
- [ ] All sensitive credentials (passwords, salts) remain protected server-side
