# Implementation Plan: Chatwoot SaaS Rebranding & Localization

## Technical Context
- **Target OS:** Windows/Linux (Docker-based deployment via Coolify)
- **Framework:** Ruby on Rails (Backend), Vue.js (Frontend), TailwindCSS
- **Key Constraints:** 
  - Must not break upstream Chatwoot CE compatibility for easy git merges.
  - Must use `ku` locale for Kurdish to inherit existing RTL support in Vue.
  - Billing/plan enforcement must run externally (Cloudflare Workers) to avoid polluting core logic.

## Constitution Check
- **I. White-Label Architecture:** Adhering by using `INSTALLATION_NAME` and updating `theme/colors.js`.
- **II. Comprehensive Localization:** Adhering by cloning `en.yml`/`en.json` to `ku` variants and injecting RTL into `base.liquid` mailers.
- **III. Proxy Billing & Subscription Layer:** Adhering by keeping plan enforcement external (Serverless workers).
- **IV. Standardized Infrastructure:** Adhering by targeting VPS + Coolify with persistent Redis and S3/R2 object storage.
- **V. Omnichannel Focus:** Meta API integration unlocked via foreign LLC strategy (no code changes needed, purely operational).

## Phase 1: White-labeling & Branding
- **Step 1:** Modify `theme/colors.js` to change the `brand` hex code (`#2781F6`) to the new brand color.
- **Step 2:** Update deployment environment variables to inject the brand name via `INSTALLATION_NAME`.

## Phase 2: Adding Kurdish (Sorani) Translations
- **Step 1:** Backend: Copy `config/locales/en.yml` to `ku.yml` and `config/locales/devise.en.yml` to `devise.ku.yml`. Update translation keys for the new language.
- **Step 2:** Backend config: Append `ku` to the `LANGUAGES_CONFIG` in `config/initializers/languages.rb`.
- **Step 3:** Frontend: Copy `app/javascript/dashboard/i18n/locale/en` directory to `ku`.
- **Step 4:** Frontend config: Import and export `ku` in `app/javascript/dashboard/i18n/index.js`.
- **Step 5:** Mailers: Modify `app/views/layouts/mailer/base.liquid` to dynamically inject `dir="rtl"` into the HTML structure when the recipient's locale is `ku` or `ar`.

## Phase 3: SaaS Subscription Layer & Operations
- **Step 1:** Documentation: Document manual account creation process via `/super_admin`.
- **Step 2:** External Worker: Draft the logic for a Cloudflare Worker that pings the Super Admin API (`/api/v1/platform/accounts`) on a cron schedule to audit agent counts and suspend violators.

## Phase 4: Infrastructure & Deployment
- **Step 1:** Documentation: Outline the Coolify deployment process using a custom GitHub fork, persistent Redis volumes, and Cloudflare R2 configurations.

## Gates
- [x] Pre-planning hooks complete
- [x] All unknowns clarified during the 10-question `/grill-me` sessions
- [x] Constitution evaluated
