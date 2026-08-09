# Project Context: Kurdistan Chatwoot SaaS

This repository is a customized fork of Chatwoot Community Edition. 
The goal is to build a white-labeled SaaS platform for businesses and influencers in Kurdistan.

## Key Directives for AI Agents:
1. **Target Language:** The primary language for this project is Sorani (Central Kurdish), locale code `ckb`.
2. **Layout & RTL:** Ensure all UI implementations and modifications respect Right-to-Left (RTL) layout when the `ckb` locale is active.
3. **White-labeling:** We are removing "Chatwoot" branding. When modifying UI components that show the brand name, use the `useBranding` composable (`replaceInstallationName`) instead of hardcoding our brand name.
4. **Subscription Focus:** Features built around user onboarding, trial limits, or SaaS billing should be developed with a wrapper approach, given that Chatwoot CE does not include native Stripe billing.
5. **No Upstream Breakage:** Keep customizations modular so that we can easily pull upstream changes from the official Chatwoot repository in the future.
