/**
 * Settings API: account, workspace, preferences.
 * Use mock responses for now; replace with real FastAPI calls later.
 */

export interface AccountSettings {
  accountName: string
  siteLanguage: string
  accountId: string
}

export async function getAccountSettings(): Promise<AccountSettings> {
  return {
    accountName: 'apexneural',
    siteLanguage: 'en',
    accountId: '150441',
  }
}

export async function updateAccountSettings(payload: { accountName?: string; siteLanguage?: string }) {
  return { ok: true, ...payload }
}

export async function getWorkspaceSettings() {
  return { name: 'Workspace', timezone: 'UTC', defaultLanguage: 'en', logoUrl: null }
}

export async function updateWorkspaceSettings(_payload: unknown) {
  return { ok: true }
}
