import { Bot, Clock, UserCircle } from 'lucide-react'
import type { TicketStatus } from '@/stores/conversationStore'

export interface TicketStatusBannerProps {
  ticketStatus?: TicketStatus
  className?: string
}

const config: Record<
  Exclude<TicketStatus, 'RESOLVED'>,
  { label: string; icon: React.ReactNode; bg: string }
> = {
  AI_HANDLING: {
    label: 'AI is handling this ticket',
    icon: <Bot className="w-4 h-4" />,
    bg: 'bg-ai-bg border-ai/30 text-ai-badge',
  },
  ESCALATED: {
    label: 'Waiting for human takeover',
    icon: <Clock className="w-4 h-4" />,
    bg: 'bg-warning/15 border-warning/30 text-warning',
  },
  HUMAN_ACTIVE: {
    label: 'Human agent has taken over',
    icon: <UserCircle className="w-4 h-4" />,
    bg: 'bg-human-bg border-human/30 text-human-badge',
  },
}

/**
 * TicketStatusBanner: Top-of-panel banner for who is handling. RESOLVED not shown.
 */
export function TicketStatusBanner({ ticketStatus, className = '' }: TicketStatusBannerProps) {
  if (!ticketStatus || ticketStatus === 'RESOLVED') return null
  const c = config[ticketStatus]
  if (!c) return null

  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2 border-b border-border
        ${c.bg}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {c.icon}
      <span className="text-sm font-medium">{c.label}</span>
    </div>
  )
}
