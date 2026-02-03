import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { FileText } from 'lucide-react'
import type { Macro } from '../types'

async function getMacros(): Promise<Macro[]> {
  return []
}

export function MacrosSettings() {
  const [macros, setMacros] = useState<Macro[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMacros().then((data) => {
      setMacros(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <PageHeader
        title="Macros"
        description="A macro is a set of saved actions that help customer service agents easily complete tasks. The agents can define a set of actions like tagging a conversation with a label, sending an email transcript, updating a custom attribute, etc., and they can run these actions in a single click."
        actions={<Button>+ Add a new macro</Button>}
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about macros &gt;</a>
      </p>
      {loading ? (
        <div className="rounded-lg border border-border bg-surface py-12 text-center text-text-muted">Loading…</div>
      ) : macros.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<FileText />}
            title="No macros found"
            action={<Button>+ Add a new macro</Button>}
          />
        </div>
      ) : (
        <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
          {macros.map((m) => (
            <li key={m.id} className="px-4 py-4">
              <p className="font-medium text-text">{m.name}</p>
              <p className="text-sm text-text-muted">{m.visibility}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
