import { Bot, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import type { TicketStatus } from '@/stores/conversationStore'

export interface AgentAssignmentCardProps {
  ticketStatus?: TicketStatus
  assignedAgent?: 'AI' | string
  onTakeOver?: () => void
  onPauseAI?: () => void
  onEscalate?: () => void
  className?: string
}

/**
 * AgentAssignmentCard: Shows who is handling (AI / Human). UI only; no backend.
 */
export function AgentAssignmentCard({
  ticketStatus,
  assignedAgent,
  onTakeOver,
  onPauseAI,
  onEscalate,
  className = '',
}: AgentAssignmentCardProps) {
  const isAi = assignedAgent === 'AI' || ticketStatus === 'AI_HANDLING'
  const isHuman = ticketStatus === 'HUMAN_ACTIVE'
  const isEscalated = ticketStatus === 'ESCALATED'

  return (
    <div className={`rounded-lg border border-border bg-surface p-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm">
        {isAi ? (
          <Bot className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <UserCircle className="w-4 h-4 text-success shrink-0" />
        )}
        <span className="font-medium text-text">
          {isAi ? 'AI is handling' : isHuman ? 'Human agent active' : isEscalated ? 'Escalated' : '—'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {isAi && onPauseAI ? (
          <Button variant="outline" size="sm" onClick={onPauseAI}>
            Pause AI
          </Button>
        ) : null}
        {isAi && onEscalate ? (
          <Button variant="outline" size="sm" onClick={onEscalate}>
            Escalate to Human
          </Button>
        ) : null}
        {(isEscalated || isAi) && onTakeOver ? (
          <Button size="sm" onClick={onTakeOver}>
            Take Over
          </Button>
        ) : null}
      </div>
    </div>
  )
}
