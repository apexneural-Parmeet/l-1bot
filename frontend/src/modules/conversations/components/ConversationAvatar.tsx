import { Avatar } from '@/components/ui'
import type { Conversation } from '@/stores/conversationStore'

export interface ConversationAvatarProps {
  conversation: Pick<Conversation, 'contactName' | 'contactAvatar'>
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * ConversationAvatar: Shows contact avatar or initials for a conversation.
 * Used in ConversationItem. Stateless; receives conversation slice.
 */
export function ConversationAvatar({
  conversation,
  size = 'md',
  className = '',
}: ConversationAvatarProps) {
  return (
    <Avatar
      src={conversation.contactAvatar}
      name={conversation.contactName}
      size={size}
      className={className}
    />
  )
}
