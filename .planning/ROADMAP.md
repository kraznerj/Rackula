# Roadmap: Rackula v0.9.0

## Overview

This roadmap delivers authentication, security hardening, and stability improvements for the self-hosted deployment. The journey starts with migrating the session store to support multi-instance deployments, then implements OIDC authentication, hardens API and CI/CD pipelines, stabilises the E2E test suite, fixes critical bugs, and prepares the v0.9.0 release. Each phase delivers a coherent capability that maintains the core value: visual rack design with zero friction.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Session Store Migration** - Replace in-memory session storage with shared TTL-backed store
- [ ] **Phase 2: Authentication** - Implement OIDC authentication and setup documentation
- [ ] **Phase 3: API Hardening** - Establish security baseline and manifest integrity checks
- [ ] **Phase 4: CI/CD Hardening** - Secure PR validation and deployment workflows
- [ ] **Phase 5: E2E Test Stability** - Fix selector rot and eliminate test fragility
- [ ] **Phase 6: Bug Fixes** - Resolve bayed rack sharing, offline persistence, and test issues
- [ ] **Phase 7: Milestone Cleanup** - Complete v0.8.x hygiene and prepare v0.9.0 release

## Phase Details

### Phase 1: Session Store Migration

**Goal**: Session state persists across container restarts and supports multi-instance deployments
**Depends on**: Nothing (first phase)
**Requirements**: SESS-01
**Success Criteria** (what must be TRUE):

1. Sessions survive API container restarts without users losing authentication state
2. Multiple API instances can share session state via Redis or SQLite backend
3. Session TTL automatically expires stale sessions without manual cleanup
   **Plans**: TBD

Plans:

- [ ] 01-01: TBD

### Phase 2: Authentication

**Goal**: Users can authenticate via generic OIDC provider and self-hosters have complete setup documentation
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02
**Success Criteria** (what must be TRUE):

1. User can authenticate using any generic OIDC provider (Authentik, Authelia, Keycloak)
2. Authenticated user can access saved layouts and persist changes
3. Unauthenticated user can still use the app in read-only mode (design freedom preserved)
4. Self-hoster can follow documentation to configure OIDC with their IdP
5. Self-hoster can harden auth settings using documented best practices
   **Plans**: TBD

Plans:

- [ ] 02-01: TBD

### Phase 3: API Hardening

**Goal**: Self-hosted API meets security baseline and brand-pack assets have integrity protection
**Depends on**: Nothing (independent of auth)
**Requirements**: API-01, API-02
**Success Criteria** (what must be TRUE):

1. API endpoints implement OWASP Top 10 protections (input validation, headers, CSRF hardening)
2. Brand-pack image manifests are validated on app startup
3. Tampered or missing brand-pack images trigger visible warnings
4. Security hardening checklist is documented for self-hosters
   **Plans**: TBD

Plans:

- [ ] 03-01: TBD

### Phase 4: CI/CD Hardening

**Goal**: PR and deployment workflows have security gates that prevent untrusted or accidental changes
**Depends on**: Nothing (independent of other phases)
**Requirements**: CI-01, CI-02, CI-03
**Success Criteria** (what must be TRUE):

1. All PRs must pass lint, test, and CodeRabbit approval before merge is allowed
2. Production deployment only triggers on explicit version tags (not branch pushes)
3. Claude automation workflow runs with minimal permissions and clear trust boundaries
4. Failed validation workflows block merge with clear error messages
   **Plans**: TBD

Plans:

- [ ] 04-01: TBD

### Phase 5: E2E Test Stability

**Goal**: E2E test suite reliably passes with no selector rot, false positives, or arbitrary timeouts
**Depends on**: Nothing (independent of other phases)
**Requirements**: E2E-01, E2E-02, E2E-03, E2E-04, E2E-05, E2E-06, E2E-07
**Success Criteria** (what must be TRUE):

1. All workflow/dialog specs use current UI selectors and pass consistently
2. All device interaction specs use current UI selectors and pass consistently
3. responsive.spec.ts tests current toolbar/sidebar UI without false positives
4. Save filename assertions match current format ({name}-{uuid}.zip)
5. All selectors use data-testid or role-based patterns (no CSS class selectors)
6. Zero waitForTimeout calls remain in test suite (all use explicit waits)
7. False-positive tests are identified, fixed, or removed
   **Plans**: TBD

Plans:

- [ ] 05-01: TBD

### Phase 6: Bug Fixes

**Goal**: Critical bugs in sharing, persistence, and tests are resolved
**Depends on**: Nothing (independent of other phases)
**Requirements**: BUG-01, BUG-02, BUG-03
**Success Criteria** (what must be TRUE):

1. Shared bayed rack URL correctly loads all bays (not just first bay as column rack)
2. App degrades gracefully to local-only mode when API fails (offline persistence)
3. setup.test.ts no longer fails with effect_update_depth_exceeded error
   **Plans**: TBD

Plans:

- [ ] 06-01: TBD

### Phase 7: Milestone Cleanup

**Goal**: v0.8.x milestone is hygienically closed and v0.9.0 is ready for release
**Depends on**: Phases 1-6
**Requirements**: HK-01
**Success Criteria** (what must be TRUE):

1. All v0.8.x issues are closed, deferred, or migrated to v0.9.0
2. v0.9.0 milestone has accurate issue tracking and labels
3. CHANGELOG.md has complete v0.9.0 entry with all features, fixes, and breaking changes
4. Release notes are drafted and reviewed
   **Plans**: TBD

Plans:

- [ ] 07-01: TBD

## Progress

**Execution Order:**
Phases 1-2 are sequential. Phases 3-6 can execute in parallel after Phase 1. Phase 7 depends on all previous phases.

| Phase                      | Plans Complete | Status      | Completed |
| -------------------------- | -------------- | ----------- | --------- |
| 1. Session Store Migration | 0/0            | Not started | -         |
| 2. Authentication          | 0/0            | Not started | -         |
| 3. API Hardening           | 0/0            | Not started | -         |
| 4. CI/CD Hardening         | 0/0            | Not started | -         |
| 5. E2E Test Stability      | 0/0            | Not started | -         |
| 6. Bug Fixes               | 0/0            | Not started | -         |
| 7. Milestone Cleanup       | 0/0            | Not started | -         |
