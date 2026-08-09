<!--
Sync Impact Report:
- Version change: N/A -> 1.0.0
- Modified principles: 
  - [PRINCIPLE_1_NAME] -> I. White-Label Architecture
  - [PRINCIPLE_2_NAME] -> II. Comprehensive Localization (Sorani & RTL)
  - [PRINCIPLE_3_NAME] -> III. Proxy Billing & Subscription Layer
  - [PRINCIPLE_4_NAME] -> IV. Standardized Infrastructure
  - [PRINCIPLE_5_NAME] -> V. Omnichannel Focus
- Added sections: Deployment & Security Requirements, Development Workflow
- Removed sections: None
- Templates requiring updates: 
  - ✅ plan-template.md (already generic)
  - ✅ spec-template.md (already generic)
  - ✅ tasks-template.md (already generic)
- Follow-up TODOs: None
-->

# Chatwoot SaaS Kurdistan Constitution

## Core Principles

### I. White-Label Architecture
Never hardcode brand names. Use `useBranding()` composables and environment variables (`INSTALLATION_NAME`). Customize themes via Tailwind variables and replace static assets in `public/` and `app/views/mailers/`.

### II. Comprehensive Localization (Sorani & RTL)
All UI and system messages MUST support Sorani (`ckb`). The application must automatically toggle RTL layout when the `ckb` locale is active. Maintain translations in both frontend (`en.json` -> `ckb.json`) and backend (`en.yml` -> `ckb.yml`).

### III. Proxy Billing & Subscription Layer
Billing must remain decoupled from the core Chatwoot CE engine. Subscriptions and payments are handled via an external portal (Proxy Approach), which interacts with Chatwoot's Super Admin API to provision and suspend accounts.

### IV. Standardized Infrastructure
Deploy using robust standard components: Puma/Rails (Web), Sidekiq (Workers), PostgreSQL (DB), and Redis (Cache/Queue). Use Docker-based deployments (e.g. Coolify) and external object storage (S3/R2) for scalability.

### V. Omnichannel Focus
Prioritize stability and features for the primary regional channels: WhatsApp Cloud API, Instagram DMs, and Facebook Messenger. Simplify onboarding for these channels.

## Deployment & Security Requirements

Must run on scalable infrastructure with minimum 4GB RAM/2 vCPUs. Object storage (S3-compatible) is required for attachments. Email must be routed through a dedicated SMTP provider (AWS SES, Mailgun, etc.). Ensure customer data is isolated at the `Account` level.

## Development Workflow

When modifying the core, ensure changes do not break upstream Chatwoot CE compatibility more than necessary. Translation files must be kept in sync between `en` and `ckb`. All branding and localization changes must be verified in both LTR and RTL layouts. Subscription API interactions must be logged and monitored for billing accuracy.

## Governance

Amendments require documentation and approval. All PRs/reviews must verify compliance with white-label and RTL rules.

**Version**: 1.0.0 | **Ratified**: 2026-08-09 | **Last Amended**: 2026-08-09
