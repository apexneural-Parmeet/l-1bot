import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { getAccountSettings, updateAccountSettings } from '../services/settings.api'

const LANGUAGES = [
  { value: 'en', label: 'English (en)' },
  { value: 'es', label: 'Spanish (es)' },
  { value: 'fr', label: 'French (fr)' },
  { value: 'de', label: 'German (de)' },
]

/**
 * GeneralSettings (Account settings)
 * Account name, site language, Update settings, Account ID with Copy, Delete your Account.
 */
export function GeneralSettings() {
  const [accountName, setAccountName] = useState('')
  const [siteLanguage, setSiteLanguage] = useState('en')
  const [accountId, setAccountId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    getAccountSettings().then((data) => {
      setAccountName(data.accountName)
      setSiteLanguage(data.siteLanguage)
      setAccountId(data.accountId)
      setLoading(false)
    })
  }, [])

  const handleUpdate = async () => {
    setSaving(true)
    await updateAccountSettings({ accountName, siteLanguage })
    setSaving(false)
  }

  const handleCopyId = () => {
    if (accountId) {
      navigator.clipboard.writeText(accountId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-surface rounded" />
        <div className="h-10 w-full max-w-md bg-surface rounded" />
        <div className="h-10 w-full max-w-md bg-surface rounded" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Account settings"
        description="Manage your account and preferences."
      />
      <div className="space-y-8 max-w-2xl">
        {/* General settings */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text mb-4">General settings</h2>
          <div className="space-y-4">
            <Input
              label="Account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account name"
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">
                Site language
              </label>
              <select
                value={siteLanguage}
                onChange={(e) => setSiteLanguage(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {LANGUAGES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleUpdate} loading={saving}>
              Update settings
            </Button>
          </div>
        </section>

        {/* Account ID */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text mb-2">Account ID</h2>
          <p className="text-sm text-text-muted mb-3">
            This ID is required if you are building an API based integration.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={accountId}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2 text-text read-only:opacity-90"
            />
            <Button variant="outline" size="sm" onClick={handleCopyId}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </section>

        {/* Delete account */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text mb-2">Delete your Account</h2>
          <p className="text-sm text-text-muted mb-4">
            Once you delete your account, all your data will be deleted.
          </p>
          <Button variant="danger">Delete Your Account</Button>
        </section>
      </div>
    </div>
  )
}
