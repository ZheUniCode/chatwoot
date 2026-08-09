
# 🚀 Blueprint: Building a Chatwoot SaaS Business for Kurdistan

Choosing **Chatwoot Community Edition (CE)** is an exceptionally smart play. Because it is under the **MIT License**, you have the legal right to host it, rebrand it (white-label), modify it, and sell it as a service without owing royalties. Furthermore, since Chatwoot natively supports Arabic, the Right-to-Left (RTL) architecture is already built-in, making adding **Sorani (Central Kurdish)** significantly easier.

Here is your exact blueprint to take Chatwoot CE, localize it for Kurdistan, and turn it into a profitable subscription business.

---

## Clarifications

### Session 2026-08-09
- Q: How will SaaS plan limits (e.g., max agents) be enforced in Chatwoot CE? → A: Periodic external audit script (via API) to warn or suspend accounts if limits are exceeded.
- Q: How are payments processed and handled when they fail in a non-banking economy? → A: Cash-based, long-term prepaid model (6-12 month contracts) collected physically. A 7-day grace period is provided for manual cash collection before account suspension.
- Q: Who manages the complex WhatsApp API verification process with Meta? → A: Customers are entirely responsible for their own Meta verification and API configuration (Self-Serve). The SaaS only provides the Chatwoot interface.
- Q: Will you support the Email Inbox channel? → A: Yes, but restricted to self-serve IMAP/SMTP configuration where customers bring their own mail servers, avoiding infrastructure overhead for the SaaS provider.
- Q: How will critical system notifications (password resets, invites) be delivered? → A: Standard email delivery (AWS SES/SendGrid) to avoid rewriting core Rails mailer logic.

### Extended Operational Session (10-Question Deep Dive)
1. **Mobile App Strategy:** Restrict customers to the mobile-responsive web dashboard; no React Native fork required.
2. **Upstream Git Strategy:** Maintain a standard Git fork (merge/rebase upstream releases).
3. **File Storage:** Cloudflare R2 (or DigitalOcean Spaces) to eliminate egress fees.
4. **SMTP Provider:** SendGrid (generous free tier).
5. **Legal URLs (Terms/Privacy):** Left blank to hide them in the UI for the MVP.
6. **Redis Persistence:** Configured with persistent volumes to protect background jobs.
7. **Database Backups:** Scheduled every 6 hours due to real-time chat data sensitivity.
8. **Missing Translation Fallback:** English.
9. **Help Center Custom Domains:** Disabled in the UI to avoid complex SSL proxy routing.
10. **Dialogflow Bots:** Disabled in the UI to reduce Google Cloud configuration overhead.

---

## Phase 1: White-labeling & Branding (Making it Yours)

Your first goal is to remove Chatwoot branding and replace it with your own SaaS brand.

1. **Brand Naming in the UI:**
   Instead of hardcoding your brand name everywhere, use Chatwoot's internal branding composable. For any UI components you modify (tooltips, suggestions), use:
   ```javascript
   import { useBranding } from 'shared/composables/useBranding';
   const { replaceInstallationName } from useBranding();
   // Use replaceInstallationName('Chatwoot') to swap it with your ENV configured brand name.
   ```
2. **Environment Variables:**
   Set `INSTALLATION_NAME="YourKurdishBrand"` in your `.env` file. This updates the name in emails, widget headers, and dashboard titles.
3. **Logos and Assets:**
   - Replace the default logos in `public/` (e.g., `logo.svg`, `logo-thumbnail.svg`, `favicon.ico`) with your own.
   - Replace email header logos in `app/views/mailers/`.
4. **Theme Colors:**
   - Chatwoot uses Tailwind CSS. You can modify the primary brand colors by adjusting the color variables in `tailwind.config.js` to match your brand identity.

---

## Phase 2: Adding Sorani (Central Kurdish) & RTL Support

Since RTL is already supported, you just need to add the language files and trigger the RTL behavior for Sorani. The standard locale code we are using for Central Kurdish is `ku`.

1. **Frontend Translation (Vue.js):**
   - Copy the English translation file: `app/javascript/dashboard/i18n/locale/en/en.json` to a new folder: `app/javascript/dashboard/i18n/locale/ku/ku.json`.
   - Translate the JSON values from English to Sorani.
   - Register the locale in `app/javascript/dashboard/i18n/index.js` so it appears in the UI dropdowns.
2. **Backend Translation (Rails / Emails):**
   - Copy `config/locales/en.yml` to `config/locales/ku.yml` and `devise.en.yml` to `devise.ku.yml`.
   - Translate the keys for system messages, email templates, and backend errors.
3. **Enabling RTL for Sorani:**
   - **Frontend:** Chatwoot's frontend array natively supports `ku` in `rtlLanguageIds` (`languages.js`). The UI will automatically flip when `ku` is selected.
   - **Backend Mailers:** Modify `app/views/layouts/mailer/base.liquid` to dynamically set `dir="rtl"` when the recipient's locale is `ku` or `ar`.

---

## Phase 3: SaaS Subscription Layer & Operations

Chatwoot CE does not include automated billing logic. Since payments will be manual and cash-based, we can bypass building a complex proxy portal entirely.

1. **Manual Onboarding (Super Admin):**
   - Because payments are collected in cash physically, account creation is handled manually. The admin simply logs into Chatwoot's built-in `/super_admin` dashboard to create the account and invite the user, saving weeks of custom portal development.
2. **Payment Collection (Cash-Based B2B):**
   - The model will be **cash-based, long-term prepaid contracts** (e.g., 6 or 12 months) collected physically via sales reps or resellers.
3. **Handling Churn & Renewals:**
   - Accounts have a **7-day grace period** for renewals. If cash is not collected after 7 days, a Super Admin manually suspends the account.
4. **Enforcing Plan Limits (Serverless):**
   - A serverless function (e.g., Cloudflare Workers) will run on a cron schedule. It pings the Chatwoot Super Admin API to audit agent counts, and automatically warns or suspends accounts that exceed their plan limits.

---

## Phase 4: Infrastructure & Deployment

For a production SaaS, you need a scalable architecture.

1. **Server Requirements:**
   - A VPS or Cloud Provider (DigitalOcean, AWS, Hetzner).
   - Minimum specs to start: 4GB RAM, 2 vCPUs.
2. **Core Components:**
   - **Web (Puma/Rails):** Handles API and dashboard.
   - **Worker (Sidekiq):** Handles background jobs (sending WhatsApp messages, emails).
   - **Database (PostgreSQL):** Stores all conversations and accounts.
   - **Cache/Queue (Redis):** Powers Real-time WebSockets and Sidekiq.
3. **Easy Deployment (Docker):**
   - Use Chatwoot's official `docker-compose.yaml` or a PaaS manager like **Coolify** or **CapRover** to easily deploy and manage SSL certificates.
4. **Email & Storage:**
   - Hook up AWS SES, SendGrid, or Mailgun for outbound system emails.
   - Hook up AWS S3 (or Cloudflare R2 / DigitalOcean Spaces) for storing conversation attachments and images.

---

## Phase 5: Go-To-Market in Kurdistan

Your target market relies heavily on social media for business.

1. **Focus on the Channels that Matter:**
   - **WhatsApp Cloud API:** This is your biggest selling point. Help businesses get the WhatsApp Green Tick and manage multiple agents on one WhatsApp number.
   - **Instagram DMs & Facebook Messenger:** Influencers and e-commerce stores in Kurdistan get hundreds of DMs. Show them how they can manage all DMs in one unified dashboard with auto-replies.
2. **Pricing Strategy:**
   - **Starter Plan ($29 - $49/mo):** 2-3 Agents, Instagram/FB, Email (self-serve IMAP/SMTP), basic Web Chat.
   - **Pro Plan ($79 - $99/mo):** 5-10 Agents, WhatsApp API integration, automation rules.
   - **Enterprise ($199+/mo):** Custom limits, Priority Support, API access.
3. **Onboarding (Self-Serve Approach):**
   - Provide standard documentation and let customers configure their own WhatsApp Cloud API connections. It is the customer's responsibility to handle their own Meta verification and generate their API tokens to plug into Chatwoot.

---

### Next Steps

If you want to start modifying the codebase immediately, we can begin by:

1. Locating the exact RTL configuration files to add `ku`.
2. Scaffolding the `ku.json` and `ku.yml` files.
3. Setting up the white-label environment variables.

Let me know which part you want to dive into first!
