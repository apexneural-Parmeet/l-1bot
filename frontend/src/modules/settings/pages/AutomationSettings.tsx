import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { RefreshCw } from 'lucide-react'
import { AddAutomationRuleModal } from '../components/automation'
import type { AutomationRule } from '../types'

async function getAutomationRules(): Promise<AutomationRule[]> {
  return []
}

export function AutomationSettings() {
  const [rules, setRules] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getAutomationRules().then((data) => {
      setRules(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async (payload: {
    name: string
    description: string
    event: string
    conditions: { attribute: string; operator: string; value: string }[]
    actions: { type: string; value: string }[]
  }) => {
    const created: AutomationRule = {
      id: String(Date.now()),
      name: payload.name,
      description: payload.description,
      event: payload.event,
      conditions: payload.conditions,
      actions: payload.actions,
    }
    setRules((prev) => [...prev, created])
  }

  return (
    <div>
      <PageHeader
        title="Automation"
        description="Automation can replace and streamline existing processes that require manual effort, such as adding labels and assigning conversations to the most suitable agent. This allows the team to focus on their strengths while reducing time spent on routine tasks."
        actions={<Button onClick={() => setModalOpen(true)}>+ Add Automation Rule</Button>}
      />
      {loading ? (
        <div className="rounded-lg border border-border bg-surface py-12 text-center text-text-muted">Loading…</div>
      ) : rules.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<RefreshCw />}
            title="No automation rules found"
            action={<Button onClick={() => setModalOpen(true)}>+ Add Automation Rule</Button>}
          />
        </div>
      ) : (
        <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
          {rules.map((r) => (
            <li key={r.id} className="px-4 py-4">
              <p className="font-medium text-text">{r.name}</p>
              <p className="text-sm text-text-muted">{r.event}</p>
            </li>
          ))}
        </ul>
      )}
      <AddAutomationRuleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
