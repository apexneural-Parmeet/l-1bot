import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useConversationStore } from '@/stores/conversationStore'
import { ConversationList } from './components/ConversationList'
import { ConversationPanel } from './components/ConversationPanel'
import { Filter } from 'lucide-react'

export type ConversationFilterTab = 'mine' | 'unassigned' | 'all'

export type ConversationsMode = 'all' | 'mentions' | 'unattended' | 'channel'

const MODE_CONFIG: Record<
  Exclude<ConversationsMode, 'channel'>,
  { title: string; emptyTitle: string; emptyDescription: string }
> = {
  all: {
    title: 'Conversations Open',
    emptyTitle: 'No conversations',
    emptyDescription: 'Conversations will appear here.',
  },
  mentions: {
    title: 'Mentions',
    emptyTitle: 'There are no active conversations in this group.',
    emptyDescription: "Uh oh! Looks like there are no messages from customers in your inbox.",
  },
  unattended: {
    title: 'Unattended',
    emptyTitle: 'There are no active conversations in this group.',
    emptyDescription: "Uh oh! Looks like there are no messages from customers in your inbox.",
  },
}

/** Channel view: title = channel name, empty state = "Please select a conversation from left pane" + shortcuts */
function getChannelConfig(channelId: string) {
  return {
    title: channelId,
    emptyTitle: 'Please select a conversation from left pane',
    emptyDescription: '⌘ K to open command menu · ⌘ / to view keyboard shortcuts',
  }
}

/**
 * Conversations view: All | Mentions | Unattended. Header and empty state vary by mode.
 * Filter tabs (Mine | Unassigned | All), conversation list, then conversation panel on the right.
 */
export function ConversationsView() {
  const location = useLocation()
  const { channelId } = useParams<{ channelId: string }>()
  const mode: ConversationsMode = channelId
    ? 'channel'
    : location.pathname.includes('/mentions')
      ? 'mentions'
      : location.pathname.includes('/unattended')
        ? 'unattended'
        : 'all'
  const config =
    mode === 'channel' && channelId
      ? getChannelConfig(channelId)
      : MODE_CONFIG[mode as Exclude<ConversationsMode, 'channel'>]

  const [filterTab, setFilterTab] = useState<ConversationFilterTab>('all')
  const conversations = useConversationStore((s) => s.conversations)

  const channelFiltered =
    mode === 'channel' && channelId
      ? conversations.filter((c) => (c.channelId ?? c.inboxId) === channelId)
      : conversations

  const mineCount = channelFiltered.filter((c) => c.assigneeId).length
  const unassignedCount = channelFiltered.filter((c) => !c.assigneeId).length
  const allCount = channelFiltered.length

  const tabs: { id: ConversationFilterTab; label: string; count: number }[] = [
    { id: 'mine', label: 'Mine', count: mineCount },
    { id: 'unassigned', label: 'Unassigned', count: unassignedCount },
    { id: 'all', label: 'All', count: allCount },
  ]

  return (
    <div className="flex h-full min-h-0 -m-4 p-0">
      {/* Middle: Title + filter tabs + list */}
      <div className="w-80 sm:w-96 border-r border-border flex flex-col shrink-0 bg-surface">
        <div className="shrink-0 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-text">{config.title}</h2>
              <span className="text-xs text-text-muted bg-bg/50 px-2 py-0.5 rounded">Open</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5"
              aria-label="Filter or sort"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1 p-0.5 rounded-lg bg-bg/50 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id)}
                className={`
                  flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${filterTab === tab.id
                    ? 'bg-surface text-primary border border-border shadow-sm'
                    : 'text-text-muted hover:text-text'}
                `}
              >
                {tab.label} {tab.count}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <ConversationList
            filter={filterTab}
            mode={mode === 'channel' ? 'all' : mode}
            channelId={channelId}
            emptyConfig={{
              emptyTitle: config.emptyTitle ?? config.title,
              emptyDescription: config.emptyDescription ?? '',
            }}
          />
        </div>
        <div className="shrink-0 px-4 py-2 border-t border-border text-center text-xs text-text-muted">
          All conversations loaded
        </div>
      </div>

      {/* Right: Conversation panel */}
      <div className="flex-1 min-w-0 flex flex-col bg-bg">
        <ConversationPanel />
      </div>
    </div>
  )
}
