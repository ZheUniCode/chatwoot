# Chatwoot SaaS Deployment Guide (Kurdistan Edition)

This guide outlines the production deployment steps for the white-labeled Chatwoot SaaS tailored for the Kurdistan region.

## 1. Custom Docker Image Build (Coolify)
Because we have modified the source code (Kurdish translations, RTL mailer injection, and custom CSS colors), you cannot use the official Chatwoot Docker image. 
Deploy via **Coolify**:
1. Connect your GitHub repository to Coolify.
2. Select **Nixpacks** or **Dockerfile** builder. Coolify will automatically detect Chatwoot's `docker/Dockerfile` and build the image from source on your VPS.

## 2. Infrastructure Configuration
You must configure the following dependencies in your Coolify setup (via docker-compose services):

### PostgreSQL
- Schedule automated database backups every 6 hours to Cloudflare R2 or DO Spaces to prevent loss of critical B2B chat data.

### Redis
- **CRITICAL**: Configure your Redis container with a **Persistent Volume**. Chatwoot uses Redis for Sidekiq background jobs. If the server restarts and Redis is running in-memory only, you will lose pending outgoing emails and queued WhatsApp messages.

### Cloudflare R2 (Object Storage)
Chatwoot handles heavy media (images, voice notes from WhatsApp). Local disk storage is dangerous and expensive. Use Cloudflare R2 for zero egress fees.
Set the following environment variables:
```env
ACTIVE_STORAGE_SERVICE=amazon
S3_BUCKET_NAME=<your-r2-bucket>
AWS_ACCESS_KEY_ID=<your-r2-access-key>
AWS_SECRET_ACCESS_KEY=<your-r2-secret-key>
AWS_REGION=auto
AWS_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
```

### SMTP (SendGrid)
Configure SendGrid for system emails (password resets).
```env
MAILER_SENDER_EMAIL=Chatwoot <noreply@yourkurdishbrand.com>
SMTP_ADDRESS=smtp.sendgrid.net
SMTP_PORT=587
SMTP_DOMAIN=yourkurdishbrand.com
SMTP_ENABLE_STARTTLS_AUTO=true
SMTP_USER_NAME=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
```

## 3. White-Label Branding (`INSTALLATION_NAME`)
To ensure the default "Chatwoot" branding is removed from tooltips, emails, and system messages, you MUST set the installation name variable.
```env
INSTALLATION_NAME="YourKurdishBrand"
```

## 4. Manual SaaS Onboarding (Super Admin)
Because your business model is based on long-term cash contracts collected physically, there is no automated Stripe checkout portal. 
**To onboard a new customer:**
1. Collect cash from the customer.
2. Log in to your Chatwoot instance at `https://app.yourkurdishbrand.com/super_admin`.
3. Navigate to **Accounts** -> Click **New Account**.
4. Enter the customer's business name and click Create.
5. Navigate to **Users** -> Invite the customer's email address and assign them to the Account.
6. (Optional) Run the Cloudflare Worker script `scripts/cloudflare-worker-plan-enforcer.js` on a schedule to monitor if the customer exceeds their purchased agent limits.
