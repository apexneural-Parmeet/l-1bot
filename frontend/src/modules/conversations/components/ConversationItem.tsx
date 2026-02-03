import type { Conversation } from '@/stores/conversationStore'
import { formatConversationTime } from '@/utils/formatDate'
import { ConversationAvatar } from './ConversationAvatar'
import { ConversationStatusBadge } from './ConversationStatusBadge'
import { TicketStatusBadge } from './TicketStatusBadge'

export interface ConversationItemProps {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
  className?: string
}

/**
 * ConversationItem (ticket-aware): Avatar, name, last message, ticket status, channel, confidence, assigned agent.
 * Keeps existing list UI; extends with ticket metadata.
 */
export function ConversationItem({
  conversation,
  isSelected,
  onClick,
  className = '',
}: ConversationItemProps) {
  const time = conversation.lastMessageAt
    ? formatConversationTime(conversation.lastMessageAt)
    : null
  const ticketStatus = conversation.ticketStatus
  const assignedAgent = conversation.assignedAgent
  const confidence = conversation.confidence
  const channelId = conversation.channelId

  const activeBorderClass = isSelected
    ? ticketStatus === 'AI_HANDLING' || assignedAgent === 'AI'
      ? 'bg-ai-bg/50 border-l-2 border-ai'
      : ticketStatus === 'HUMAN_ACTIVE' || (assignedAgent && assignedAgent !== 'AI')
        ? 'bg-human-bg/50 border-l-2 border-human'
        : 'bg-panel border-l-2 border-primary'
    : ''

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-start gap-3 px-4 py-3 text-left rounded-lg transition-colors
        bg-surface hover:bg-panel border-l-2 border-transparent
        ${activeBorderClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <ConversationAvatar conversation={conversation} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-text truncate">{conversation.contactName}</span>
          {time ? <span className="text-xs text-text-muted shrink-0">{time}</span> : null}
        </div>
        {conversation.lastMessage ? (
          <p className="text-sm text-text-muted truncate mt-0.5">{conversation.lastMessage}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {ticketStatus ? (
            <TicketStatusBadge status={ticketStatus} />
          ) : (
            <ConversationStatusBadge status={conversation.status} />
          )}
          {channelId ? (
            <span className="text-xs text-text-muted bg-surface px-1.5 py-0.5 rounded border border-border">
              {channelId}
            </span>
          ) : null}
          {confidence != null && ticketStatus === 'AI_HANDLING' ? (
            <span className="text-xs text-ai-badge bg-ai-bg px-1.5 py-0.5 rounded border border-ai/20">
              {(confidence * 100).toFixed(0)}%
            </span>
          ) : null}
          {assignedAgent ? (
            <span className="text-xs text-text-muted truncate max-w-[4rem]" title={assignedAgent}>
              {assignedAgent === 'AI' ? 'AI' : 'Human'}
            </span>
          ) : null}
          {conversation.unreadCount > 0 ? (
            <span className="text-xs font-medium text-primary bg-human-bg px-1.5 py-0.5 rounded border border-human/20">
              {conversation.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}
