/**
 * Chatwoot Plan Enforcer - Cloudflare Worker
 * 
 * This script runs on a CRON schedule to audit the number of agents in each account 
 * via the Chatwoot Super Admin API. If an account exceeds its permitted plan limit, 
 * the script will flag/suspend the account or send a warning.
 * 
 * Environment Variables Required:
 * - CHATWOOT_BASE_URL: e.g. "https://app.yourkurdishbrand.com"
 * - SUPER_ADMIN_TOKEN: The platform access token from Super Admin -> Access Tokens
 */

const MAX_AGENTS_ALLOWED = 5; // Configurable per plan in a real DB, hardcoded for MVP

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(this.auditAccounts(env));
  },

  async auditAccounts(env) {
    const baseUrl = env.CHATWOOT_BASE_URL;
    const token = env.SUPER_ADMIN_TOKEN;

    if (!baseUrl || !token) {
      console.error("Missing configuration: CHATWOOT_BASE_URL or SUPER_ADMIN_TOKEN");
      return;
    }

    try {
      // 1. Fetch all accounts
      const accountsRes = await fetch(`${baseUrl}/api/v1/platform/accounts`, {
        headers: { api_access_token: token }
      });
      const accounts = await accountsRes.json();

      for (const account of accounts) {
        // 2. Fetch users (agents) for each account
        const usersRes = await fetch(`${baseUrl}/api/v1/platform/accounts/${account.id}/users`, {
          headers: { api_access_token: token }
        });
        const users = await usersRes.json();
        
        // Exclude suspended users from the count if necessary
        const activeAgentsCount = users.length;

        console.log(`Account ${account.id} (${account.name}) has ${activeAgentsCount} agents.`);

        if (activeAgentsCount > MAX_AGENTS_ALLOWED) {
          console.warn(`WARNING: Account ${account.id} has exceeded the agent limit (${activeAgentsCount} > ${MAX_AGENTS_ALLOWED}).`);
          
          // 3. Suspend account or send warning (Implementation depends on business logic)
          // Example: Suspend account via API (requires Chatwoot 3.0+ account suspension endpoint)
          // await fetch(`${baseUrl}/api/v1/platform/accounts/${account.id}`, {
          //   method: 'PATCH',
          //   headers: { 
          //     'Content-Type': 'application/json',
          //     api_access_token: token 
          //   },
          //   body: JSON.stringify({ suspended: true })
          // });
        }
      }
    } catch (error) {
      console.error("Failed to audit accounts:", error);
    }
  }
};
