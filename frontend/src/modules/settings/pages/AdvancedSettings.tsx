import { PageHeader } from '@/components/layout'

/**
 * AdvancedSettings
 *
 * Purpose: System preferences, advanced config. Fits under Settings > Advanced.
 * Permissions: settings:manage (stub).
 */
export function AdvancedSettings() {
  return (
    <div>
      <PageHeader
        title="Advanced"
        description="System and advanced preferences."
      />
      <div className="rounded-lg border border-border bg-surface p-6 max-w-2xl">
        <p className="text-sm text-text-muted">
          Advanced options will be wired here.
        </p>
      </div>
    </div>
  )
}
