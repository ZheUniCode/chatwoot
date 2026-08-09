# WhatsApp Cloud API - Self-Serve Verification Guide

Welcome to YourKurdishBrand! To connect your WhatsApp Business number to our dashboard, you must generate your own Meta API credentials. This ensures you maintain full ownership of your WhatsApp number.

## Step 1: Create a Meta Developer Account
1. Go to [developers.facebook.com](https://developers.facebook.com/) and log in with your Facebook account.
2. Click **My Apps** > **Create App**.
3. Select **Other** > **Business** and give your app a name (e.g., "Our WhatsApp Bot").

## Step 2: Add WhatsApp Product
1. Once your app is created, scroll down to **WhatsApp** and click **Set Up**.
2. Select your Meta Business Account (or create a new one). This requires you to complete Business Verification (uploading your local commercial registration documents).

## Step 3: Add Your Phone Number
1. Navigate to **WhatsApp > API Setup** in the left menu.
2. Scroll to **Step 5: Add a phone number**.
3. Follow the OTP verification steps to register your physical or virtual phone number.

## Step 4: Generate Permanent Token
1. Go to **Business Settings** (business.facebook.com).
2. Navigate to **System Users** -> Add a new System User with Admin access.
3. Click **Generate New Token**, select your app, and check the following permissions:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
4. Copy the long token provided. **Save this safely.**

## Step 5: Connect to the Dashboard
1. Log in to your Chatwoot dashboard.
2. Go to **Settings > Inboxes > Add Inbox > WhatsApp**.
3. Select **WhatsApp Cloud**.
4. Enter your Phone Number ID, Business Account ID, and the Permanent Token you just generated.
5. Copy the Webhook URL provided by Chatwoot and paste it back into your Meta App (under WhatsApp > Configuration). Use the Verify Token provided by Chatwoot.

You are now ready to receive and reply to WhatsApp messages directly from the dashboard!
