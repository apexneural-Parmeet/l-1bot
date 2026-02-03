import { PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/common'
import { ClipboardList } from 'lucide-react'

export function AuditLogsSettings() {
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Audit Logs maintain a record of activities in your account, allowing you to track and audit your account, team, or services."
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about audit logs &gt;</a>
      </p>
      <div className="rounded-lg border border-border bg-surface">
        <EmptyState
          icon={<ClipboardList />}
          title="There are no Audit Logs available in this account."
        />
      </div>
    </div>
  )
}
