<!--
Sync Impact Report:
- Version change: 1.0.0 -> 2.0.0
- Modified principles: 
  - II. Comprehensive Localization (Sorani & RTL) -> Aligned locale code from `ckb` to `ku`
  - III. Proxy Billing & Subscription Layer -> III. Manual Cash Billing & Subscription Enforcement
- Added sections: None
- Removed sections: None
- Templates requiring updates: None (tasks and plan already reflect this reality)
- Follow-up TODOs: None
-->

# Chatwoot SaaS Kurdistan Constitution

## Core Principles

### I. White-Label Architecture
Never hardcode brand names. Use `useBranding()` composables and environment variables (`INSTALLATION_NAME`). Customize themes via Tailwind variables and replace static assets in `public/` and `app/views/mailers/`.

### II. Comprehensive Localization (Sorani & RTL)
All UI and system messages MUST support Sorani (`ku`). The application must automatically toggle RTL layout when the `ku` locale is active. Maintain translations in both frontend (`en.json` -> `ku.json`) and backend (`en.yml` -> `ku.yml`).

### III. Manual Cash Billing & Subscription Enforcement
Billing must remain decoupled from the core Chatwoot CE engine. Subscriptions and payments are handled manually in cash. Accounts are provisioned via the built-in Super Admin dashboard. Agent limits MUST be enforced via an external Serverless script (Proxy Approach) to avoid polluting core CE logic.

### IV. Standardized Infrastructure
Deploy using robust standard components: Puma/Rails (Web), Sidekiq (Workers), PostgreSQL (DB), and Redis (Cache/Queue). Use Docker-based deployments (e.g. Coolify) and external object storage (S3/R2) for scalability.

### V. Omnichannel Focus
Prioritize stability and features for the primary regional channels: WhatsApp Cloud API, Instagram DMs, and Facebook Messenger. Simplify onboarding for these channels.

## Deployment & Security Requirements

Must run on scalable infrastructure with minimum 4GB RAM/2 vCPUs. Object storage (S3-compatible) is required for attachments. Email must be routed through a dedicated SMTP provider (AWS SES, Mailgun, etc.). Ensure customer data is isolated at the `Account` level.

## Development Workflow

When modifying the core, ensure changes do not break upstream Chatwoot CE compatibility more than necessary. Translation files must be kept in sync between `en` and `ku`. All branding and localization changes must be verified in both LTR and RTL layouts. Subscription API interactions must be logged and monitored for billing accuracy.

## Governance

Amendments require documentation and approval. All PRs/reviews must verify compliance with white-label and RTL rules.

**Version**: 2.0.0 | **Ratified**: 2026-08-09 | **Last Amended**: 2026-08-09
