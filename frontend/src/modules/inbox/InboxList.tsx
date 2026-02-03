import { useState } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { InboxCard } from './InboxCard'
import { CreateInboxModal } from './CreateInboxModal'
import { Inbox } from 'lucide-react'

/**
 * Inbox vs conversations: Inbox = channel/team container (e.g. Email, Website).
 * Conversations = individual threads inside an inbox. InboxList lists inboxes; selecting one filters conversations.
 */
const MOCK_INBOXES = [
  { id: '1', name: 'Website', channel: 'website', status: 'active', conversationCount: 12 },
  { id: '2', name: 'Email', channel: 'email', status: 'active', conversationCount: 5 },
]

export function InboxList() {
  const [inboxes] = useState(MOCK_INBOXES)
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="p-4">
      <PageHeader
        title="Inboxes"
        description="Manage channels and conversation sources."
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            Create inbox
          </Button>
        }
      />
      {inboxes.length === 0 ? (
        <EmptyState
          icon={<Inbox />}
          title="No inboxes"
          description="Create an inbox to start receiving conversations."
          action={<Button onClick={() => setCreateOpen(true)}>Create inbox</Button>}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inboxes.map((inbox) => (
            <li key={inbox.id}>
              <InboxCard inbox={inbox} />
            </li>
          ))}
        </ul>
      )}
      <CreateInboxModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
