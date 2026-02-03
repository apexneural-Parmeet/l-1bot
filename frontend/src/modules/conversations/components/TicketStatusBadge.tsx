import { Badge } from '@/components/ui'
import type { TicketStatus } from '@/stores/conversationStore'

export interface TicketStatusBadgeProps {
  status: TicketStatus
  className?: string
}

const variantMap: Record<TicketStatus, 'info' | 'warning' | 'success' | 'default' | 'human'> = {
  AI_HANDLING: 'info',
  ESCALATED: 'warning',
  HUMAN_ACTIVE: 'human',
  RESOLVED: 'success',
}

const labelMap: Record<TicketStatus, string> = {
  AI_HANDLING: 'AI',
  ESCALATED: 'Escalated',
  HUMAN_ACTIVE: 'Human',
  RESOLVED: 'Resolved',
}

/** Ticket status badge for list and panel (AI / Escalated / Human / Resolved) */
export function TicketStatusBadge({ status, className = '' }: TicketStatusBadgeProps) {
  return (
    <Badge variant={variantMap[status]} className={className}>
      {labelMap[status]}
    </Badge>
  )
}
