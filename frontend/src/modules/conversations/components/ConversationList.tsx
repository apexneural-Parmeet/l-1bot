import { useEffect, useMemo, useState } from 'react'
import { useConversationStore } from '@/stores/conversationStore'
import { fetchConversations } from '@/services/conversationService'
import { EmptyState } from '@/components/common'
import { SkeletonAvatar, SkeletonLine } from '@/components/common/LoadingSkeleton'
import { ConversationItem } from './ConversationItem'
import { ConversationSearch } from './ConversationSearch'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui'

export type ConversationListFilter = 'mine' | 'unassigned' | 'all'

export type ConversationListMode = 'all' | 'mentions' | 'unattended'

export interface ConversationListProps {
  /** Filter by assignment: mine = assigned to me, unassigned, all */
  filter?: ConversationListFilter
  /** View mode: all, mentions (where user is @mentioned), unattended (no agent reply yet) */
  mode?: ConversationListMode
  /** When set, only show conversations for this channel (e.g. rajnot_bot) */
  channelId?: string
  /** Override empty state copy (e.g. for Mentions / Unattended / Channel) */
  emptyConfig?: { emptyTitle: string; emptyDescription: string }
}

/**
 * ConversationList: Renders list of conversations with search.
 * Connects: conversationStore (conversations, selectedId, setSelectedConversation).
 * Fetches list via conversationService; filters by search, assignment, and mode (mentions/unattended).
 */
export function ConversationList({
  filter: assignmentFilter = 'all',
  mode = 'all',
  channelId,
  emptyConfig,
}: ConversationListProps = {}) {
  const conversations = useConversationStore((s) => s.conversations)
  const selectedId = useConversationStore((s) => s.selectedConversationId)
  const setSelected = useConversationStore((s) => s.setSelectedConversation)
  const setConversations = useConversationStore((s) => s.setConversations)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchConversations()
      .then((list) => {
        if (!cancelled) setConversations(list)
      })
      .catch(() => {
        if (!cancelled) {
          // Mock data when backend is not ready (ticket-aware)
          setConversations([
            {
              id: '1',
              contactId: 'c1',
              contactName: 'Jane Doe',
              lastMessage: 'Hello, I need help',
              lastMessageAt: new Date().toISOString(),
              status: 'open',
              unreadCount: 1,
              inboxId: '1',
              channelId: 'rajnot_bot',
              ticketStatus: 'AI_HANDLING',
              assignedAgent: 'AI',
              confidence: 0.92,
            },
            {
              id: '2',
              contactId: 'c2',
              contactName: 'John Smith',
              lastMessage: 'Thanks for your support',
              lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
              status: 'resolved',
              unreadCount: 0,
              inboxId: '1',
              channelId: 'rajnot_bot',
              ticketStatus: 'RESOLVED',
              assignedAgent: 'agent-1',
            },
            {
              id: '3',
              contactId: 'c3',
              contactName: 'Alex Customer',
              lastMessage: 'I want to speak to a person',
              lastMessageAt: new Date(Date.now() - 120000).toISOString(),
              status: 'open',
              unreadCount: 2,
              inboxId: '1',
              channelId: 'rajnot_bot',
              ticketStatus: 'ESCALATED',
              assignedAgent: undefined,
              escalationReason: 'Customer requested human',
              escalationAt: new Date().toISOString(),
            },
          ])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [setConversations])

  const filtered = useMemo(() => {
    let list = conversations
    if (channelId) list = list.filter((c) => (c.channelId ?? c.inboxId) === channelId)
    if (mode === 'mentions') list = list.filter((c) => c.hasMention === true)
    if (mode === 'unattended') list = list.filter((c) => c.isUnattended === true)
    if (assignmentFilter === 'mine') list = list.filter((c) => c.assigneeId)
    if (assignmentFilter === 'unassigned') list = list.filter((c) => !c.assigneeId)
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(
      (c) =>
        c.contactName.toLowerCase().includes(q) ||
        c.lastMessage?.toLowerCase().includes(q)
    )
  }, [conversations, search, assignmentFilter, mode, channelId])

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-border shrink-0">
        <ConversationSearch value={search} onChange={setSearch} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonAvatar size="md" />
                <div className="flex-1 space-y-2">
                  <SkeletonLine className="w-3/4" />
                  <SkeletonLine className="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<MessageSquare />}
            title={search ? 'No matches' : emptyConfig?.emptyTitle ?? 'No conversations'}
            description={
              search ? 'Try a different search.' : emptyConfig?.emptyDescription ?? 'Conversations will appear here.'
            }
            action={
              search ? (
                <Button variant="ghost" size="sm" onClick={() => setSearch('')}>
                  Clear search
                </Button>
              ) : undefined
            }
          />
        ) : (
          <ul className="py-2">
            {filtered.map((c) => (
              <li key={c.id}>
                <ConversationItem
                  conversation={c}
                  isSelected={selectedId === c.id}
                  onClick={() => setSelected(c.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/** TicketList: ticket-aware conversation list (alias). */
export const TicketList = ConversationList
