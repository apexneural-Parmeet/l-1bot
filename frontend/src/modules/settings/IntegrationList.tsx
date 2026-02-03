import { PageHeader } from '@/components/layout'
import { Badge } from '@/components/ui'

/**
 * IntegrationList: Lists integrations (Slack, WhatsApp, etc.). Stub.
 */
const MOCK_INTEGRATIONS = [
  { id: '1', name: 'Slack', status: 'connected' },
  { id: '2', name: 'WhatsApp', status: 'disconnected' },
]

export function IntegrationList() {
  return (
    <section>
      <PageHeader title="Integrations" description="Connected apps and channels." />
      <ul className="space-y-2 rounded-lg border border-border bg-surface divide-y divide-border">
        {MOCK_INTEGRATIONS.map((i) => (
          <li key={i.id} className="px-4 py-3 flex items-center justify-between">
            <p className="font-medium text-text">{i.name}</p>
            <Badge variant={i.status === 'connected' ? 'success' : 'default'}>
              {i.status}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
