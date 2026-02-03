import { PageHeader } from '@/components/layout'

interface StubSettingsProps {
  title: string
  description?: string
}

/**
 * StubSettings – placeholder for settings pages not yet implemented.
 */
export function StubSettings({ title, description = 'This section is not yet implemented.' }: StubSettingsProps) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="rounded-lg border border-border bg-surface p-6 max-w-2xl">
        <p className="text-sm text-text-muted">Coming soon.</p>
      </div>
    </div>
  )
}
