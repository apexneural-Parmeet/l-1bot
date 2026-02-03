import { useConversationStore } from '@/stores/conversationStore'
import { ConversationList } from '@/modules/conversations/components/ConversationList'
import { ConversationPanel } from '@/modules/conversations/components/ConversationPanel'
import { EmptyState } from '@/components/common'
import { Button } from '@/components/ui'
import { Dropdown } from '@/components/ui'
import { Inbox, Filter, PenSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Inbox view: "My Inbox" – conversation list (middle) + empty state or conversation panel (right).
 * Matches Chatwoot-style inbox: Display dropdown, "+ New message", empty state copy.
 */
export function InboxView() {
  const selectedId = useConversationStore((s) => s.selectedConversationId)

  const displayItems = [
    { id: 'all', label: 'All conversations', onClick: () => {} },
    { id: 'open', label: 'Open', onClick: () => {} },
    { id: 'resolved', label: 'Resolved', onClick: () => {} },
  ]

  return (
    <div className="flex h-full min-h-0 -m-4 p-0">
      {/* Middle: My Inbox conversation list */}
      <div className="w-80 sm:w-96 border-r border-border flex flex-col shrink-0 bg-surface">
        <div className="shrink-0 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="font-semibold text-text">My Inbox</h2>
            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-text-muted hover:text-text hover:bg-white/5 border border-border"
                >
                  <span>Display</span>
                  <Filter className="w-4 h-4" />
                </button>
              }
              items={displayItems}
              align="right"
            />
          </div>
          <Link
            to="/conversations"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <PenSquare className="w-4 h-4" />
            New message
          </Link>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <ConversationList />
        </div>
      </div>

      {/* Right: Empty state or conversation panel */}
      <div className="flex-1 min-w-0 flex flex-col bg-bg">
        {selectedId ? (
          <ConversationPanel />
        ) : (
          <div className="h-full flex items-center justify-center">
            <EmptyState
              icon={<Inbox className="w-12 h-12" />}
              title="Notifications from all subscribed inboxes"
              description="Select a conversation from the list or start a new message."
              action={
                <Link to="/conversations">
                  <Button variant="outline" size="sm">
                    New message
                  </Button>
                </Link>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
