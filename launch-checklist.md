# Chatwoot SaaS Launch Checklist

This document outlines the final operational and deployment steps required to take the newly rebranded, localized Chatwoot SaaS to production.

## 1. Source Control (Push to GitHub)
The local codebase now contains all the necessary branding and RTL modifications.
- [ ] Push the current branch to the remote GitHub repository:
  ```bash
  git push origin develop
  # or merge into main and push
  ```

## 2. Infrastructure Setup (Coolify)
We are using Coolify to bypass the complexity of manual Kubernetes or Docker Swarm setups, while retaining full control of our data.
- [ ] Spin up a VPS (Ubuntu 22.04+) with at least **4GB RAM and 2 vCPUs** (DigitalOcean, Hetzner, AWS EC2).
- [ ] Install [Coolify](https://coolify.io/docs/installation) on the VPS.
- [ ] In the Coolify dashboard, connect your GitHub account/repository.
- [ ] Create the required databases in Coolify:
  - **PostgreSQL**: Set up automated backups to an external S3 bucket (every 6-12 hours).
  - **Redis**: **CRITICAL** - Ensure Redis is configured with a persistent volume. If the container restarts without persistence, all queued background jobs (emails, WhatsApp messages) will be permanently lost.

## 3. Environment Variables
When configuring the Chatwoot application service in Coolify, inject the following environment variables to activate the custom branding and external services:

```env
# Branding
INSTALLATION_NAME="YourKurdishBrand"

# Object Storage (Cloudflare R2 / AWS S3)
ACTIVE_STORAGE_SERVICE=amazon
S3_BUCKET_NAME=<your-r2-bucket>
AWS_ACCESS_KEY_ID=<your-r2-access-key>
AWS_SECRET_ACCESS_KEY=<your-r2-secret-key>
AWS_REGION=auto
AWS_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com

# SMTP (SendGrid)
MAILER_SENDER_EMAIL=Chatwoot <noreply@yourkurdishbrand.com>
SMTP_ADDRESS=smtp.sendgrid.net
SMTP_PORT=587
SMTP_DOMAIN=yourkurdishbrand.com
SMTP_ENABLE_STARTTLS_AUTO=true
SMTP_USER_NAME=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
```

## 4. Deploy the Cloudflare Worker (Plan Enforcer)
Because we decoupled billing from the core codebase to support cash payments, you must deploy the limit-enforcement script externally.
- [ ] Log in to your deployed Chatwoot instance at `https://app.yourkurdishbrand.com/super_admin`.
- [ ] Generate a Super Admin API Token.
- [ ] Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com) -> Workers & Pages -> Create Application.
- [ ] Paste the code from `scripts/cloudflare-worker-plan-enforcer.js` into the Worker editor.
- [ ] Go to the Worker Settings -> Variables & Secrets and add:
  - `CHATWOOT_BASE_URL`: `https://app.yourkurdishbrand.com`
  - `SUPER_ADMIN_TOKEN`: `<your-super-admin-token>`
- [ ] Go to Triggers -> Add a Cron Trigger to run the script every 24 hours.

## 5. Operations & Customer Onboarding
When you close a sale and collect cash from a customer:
- [ ] **Provisioning**: Log into `/super_admin` -> Create an Account -> Invite the customer's email.
- [ ] **Handoff**: Provide the customer with the `whatsapp-setup-guide.md` file. They are responsible for completing Meta Business Verification and pasting their WhatsApp API tokens into the dashboard.
- [ ] **Renewals**: You have a 7-day manual grace period to collect cash for the next cycle. If cash isn't collected, suspend the account via the `/super_admin` dashboard.
