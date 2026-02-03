import type { Conversation } from '@/stores/conversationStore'
import { ConversationAvatar } from './ConversationAvatar'
import { ConversationStatusBadge } from './ConversationStatusBadge'
import { ConversationActions } from './ConversationActions'
import { ConversationMeta } from './ConversationMeta'

export interface ConversationHeaderProps {
  conversation: Conversation
  className?: string
}

/**
 * ConversationHeader: Contact name, avatar, status, meta, actions.
 * Used at top of ConversationPanel. Stateless; receives conversation.
 */
export function ConversationHeader({ conversation, className = '' }: ConversationHeaderProps) {
  return (
    <header
      className={`
        flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-surface shrink-0
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <div className="flex items-center gap-3 min-w-0">
        <ConversationAvatar conversation={conversation} size="lg" />
        <div className="min-w-0">
          <h2 className="font-semibold text-text truncate">{conversation.contactName}</h2>
          <ConversationMeta conversation={conversation} showTime />
          <div className="flex items-center gap-2 mt-1">
            <ConversationStatusBadge status={conversation.status} />
          </div>
        </div>
      </div>
      <ConversationActions conversationId={conversation.id} />
    </header>
  )
}
