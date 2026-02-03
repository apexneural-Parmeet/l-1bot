import { Badge } from '@/components/ui'
import type { ConversationStatus } from '@/stores/conversationStore'

export interface ConversationStatusBadgeProps {
  status: ConversationStatus
  className?: string
}

const statusVariant: Record<ConversationStatus, 'success' | 'warning' | 'default'> = {
  open: 'success',
  pending: 'warning',
  resolved: 'default',
}

const statusLabel: Record<ConversationStatus, string> = {
  open: 'Open',
  pending: 'Pending',
  resolved: 'Resolved',
}

/**
 * ConversationStatusBadge: Displays conversation status (open/pending/resolved).
 * Used in ConversationItem and ConversationHeader. Stateless.
 */
export function ConversationStatusBadge({ status, className = '' }: ConversationStatusBadgeProps) {
  return (
    <Badge variant={statusVariant[status]} className={className}>
      {statusLabel[status]}
    </Badge>
  )
}
