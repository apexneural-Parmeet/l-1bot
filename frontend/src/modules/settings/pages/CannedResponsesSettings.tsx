import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { MessageSquare } from 'lucide-react'
import { AddCannedResponseModal } from '../components/canned'
import type { CannedResponse } from '../types'

async function getCannedResponses(): Promise<CannedResponse[]> {
  return []
}

export function CannedResponsesSettings() {
  const [items, setItems] = useState<CannedResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getCannedResponses().then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (payload: { shortCode: string; message: string }) => {
    const created: CannedResponse = {
      id: String(Date.now()),
      shortCode: payload.shortCode,
      message: payload.message,
    }
    setItems((prev) => [...prev, created])
  }

  return (
    <div>
      <PageHeader
        title="Canned Responses"
        description="Canned Responses are pre-written reply templates that help you quickly respond to a conversation. Agents can type the '/' character followed by the shortcode to insert a canned response during a conversation."
        actions={<Button onClick={() => setModalOpen(true)}>+ Add canned response</Button>}
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about canned responses &gt;</a>
      </p>
      {loading ? (
        <div className="rounded-lg border border-border bg-surface py-12 text-center text-text-muted">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<MessageSquare />}
            title="There are no canned responses available in this account."
            action={<Button onClick={() => setModalOpen(true)}>+ Add canned response</Button>}
          />
        </div>
      ) : (
        <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
          {items.map((r) => (
            <li key={r.id} className="px-4 py-4">
              <p className="font-medium text-text">/{r.shortCode}</p>
              <p className="text-sm text-text-muted line-clamp-2">{r.message}</p>
            </li>
          ))}
        </ul>
      )}
      <AddCannedResponseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
