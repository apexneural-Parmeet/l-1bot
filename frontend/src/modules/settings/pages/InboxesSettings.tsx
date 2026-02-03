import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { InboxList, ChannelGrid } from '../components/inboxes'
import { getInboxes } from '../services/inboxes.api'
import type { Inbox } from '../types'

/**
 * InboxesSettings – Inboxes page: description, Learn more, Add Inbox, InboxList or new inbox channel grid.
 */
export function InboxesSettings() {
  const [inboxes, setInboxes] = useState<Inbox[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewInbox, setShowNewInbox] = useState(false)

  useEffect(() => {
    getInboxes().then((data) => {
      setInboxes(data)
      setLoading(false)
    })
  }, [])

  if (showNewInbox) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowNewInbox(false)}
            className="text-sm text-primary hover:underline"
          >
            &lt; Back
          </button>
          <h1 className="text-2xl font-semibold text-text">Inboxes</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">1</span>
              <span className="font-medium text-primary">Choose Channel</span>
            </div>
            <p className="text-sm text-text-muted pl-10">
              Choose the provider you want to integrate with Chatwoot.
            </p>
            <div className="flex items-center gap-2 mt-4 text-text-muted">
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm">2</span>
              <span className="text-sm">Create Inbox</span>
            </div>
            <p className="text-sm text-text-muted pl-10">Authenticate your account and create an inbox.</p>
            <div className="flex items-center gap-2 mt-2 text-text-muted">
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm">3</span>
              <span className="text-sm">Add Agents</span>
            </div>
            <p className="text-sm text-text-muted pl-10">Add agents to the created inbox.</p>
            <div className="flex items-center gap-2 mt-2 text-text-muted">
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm">4</span>
              <span className="text-sm">Voilà!</span>
            </div>
            <p className="text-sm text-text-muted pl-10">You are all set to go!</p>
          </div>
          <div className="lg:col-span-3">
            <ChannelGrid onSelect={() => {}} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Inboxes"
        description="A channel is the mode of communication your customer chooses to interact with you. An inbox is where you manage interactions for a specific channel. It can include communications from various sources such as email, live chat, and social media."
        actions={
          <Button onClick={() => setShowNewInbox(true)}>
            + Add Inbox
          </Button>
        }
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">
          Learn more about inboxes &gt;
        </a>
      </p>
      <InboxList inboxes={inboxes} loading={loading} />
    </div>
  )
}
