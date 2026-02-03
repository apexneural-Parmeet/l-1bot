import type { Conversation } from '@/stores/conversationStore'
import { formatConversationTime } from '@/utils/formatDate'

export interface ConversationMetaProps {
  conversation: Conversation
  /** Show relative time (e.g. "2d • 20h") when true */
  showTime?: boolean
  className?: string
}

/**
 * ConversationMeta: Secondary info (inbox, assignee, relative time like "2d • 20h").
 * Stateless; receives conversation.
 */
export function ConversationMeta({ conversation, showTime = true, className = '' }: ConversationMetaProps) {
  const time = showTime && conversation.lastMessageAt
    ? formatConversationTime(conversation.lastMessageAt)
    : null
  const parts = [
    time,
    conversation.inboxId ? `Inbox #${conversation.inboxId}` : null,
    conversation.assigneeId ? 'Assigned' : null,
  ].filter(Boolean) as string[]
  return (
    <p className={`text-xs text-text-muted truncate ${className}`}>
      {parts.join(' · ') || '—'}
    </p>
  )
}
