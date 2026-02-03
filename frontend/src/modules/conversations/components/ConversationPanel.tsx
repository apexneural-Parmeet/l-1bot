import { useConversationStore } from '@/stores/conversationStore'
import { EmptyState } from '@/components/common'
import { MessageSquare } from 'lucide-react'
import { AgentAssignmentCard } from '@/components/agent'
import { ConversationHeader } from './ConversationHeader'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { TicketStatusBanner } from './TicketStatusBanner'
import { EscalationBanner } from './EscalationBanner'

/**
 * ConversationPanel: Ticket-aware. Status banner, escalation banner, agent card, message list, input (when human active).
 */
export function ConversationPanel() {
  const selectedId = useConversationStore((s) => s.selectedConversationId)
  const conversations = useConversationStore((s) => s.conversations)
  const selected = selectedId ? conversations.find((c) => c.id === selectedId) : null

  if (!selected) {
    return (
      <div className="h-full flex items-center justify-center bg-bg">
        <EmptyState
          icon={<MessageSquare />}
          title="Select a conversation"
          description="Choose a conversation from the list to view messages."
        />
      </div>
    )
  }

  const ticketStatus = selected.ticketStatus
  const isEscalated = ticketStatus === 'ESCALATED'

  return (
    <div className="flex flex-col h-full bg-bg">
      <ConversationHeader conversation={selected} />
      <TicketStatusBanner ticketStatus={ticketStatus} />
      {isEscalated ? (
        <div className="px-4 py-2 shrink-0">
          <EscalationBanner
            reason={selected.escalationReason}
            escalatedAt={selected.escalationAt}
            onTakeOver={() => {}}
          />
        </div>
      ) : null}
      <div className="px-4 py-2 shrink-0">
        <AgentAssignmentCard
          ticketStatus={ticketStatus}
          assignedAgent={selected.assignedAgent}
          onTakeOver={() => {}}
          onPauseAI={() => {}}
          onEscalate={() => {}}
        />
      </div>
      <MessageList conversationId={selected.id} />
      <MessageInput conversationId={selected.id} ticketStatus={ticketStatus} />
    </div>
  )
}
