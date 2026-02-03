import type { Message } from '@/stores/conversationStore'
import { User, Bot, UserCircle, Check } from 'lucide-react'

export interface MessageBubbleProps {
  message: Message
  /** Show delivery checkmark for outgoing messages */
  showCheck?: boolean
  className?: string
}

const isOutgoing = (msg: Message) => msg.senderType === 'agent' || msg.senderType === 'bot'

/** Sender label: Customer | AI Agent | Human Agent */
function getSenderLabel(msg: Message): string {
  if (msg.senderType === 'user') return 'Customer'
  if (msg.senderType === 'bot') return 'AI Agent'
  return 'Human Agent'
}

/**
 * MessageBubble: Ticket-aware. Sender labels (Customer / AI Agent / Human Agent),
 * color-coded by sender; confidence badge only for AI messages.
 */
export function MessageBubble({ message, showCheck = true, className = '' }: MessageBubbleProps) {
  const outgoing = isOutgoing(message)
  const isAi = message.senderType === 'bot'
  const showConfidence = isAi && message.confidence != null

  return (
    <div
      className={`
        flex gap-2 ${outgoing ? 'flex-row-reverse' : ''} ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <div className="shrink-0 mt-1">
        {message.senderType === 'user' ? (
          <User className="w-4 h-4 text-text-muted" />
        ) : isAi ? (
          <Bot className="w-4 h-4 text-ai" />
        ) : (
          <UserCircle className="w-4 h-4 text-human" />
        )}
      </div>
      <div
        className={`
          max-w-[75%] px-4 py-2 rounded-lg border
          ${outgoing ? (isAi ? 'bg-ai-bg border-ai/40 text-text' : 'bg-human-bg border-human/40 text-text') : 'bg-customer-bg border-customer-border text-text'}
        `}
      >
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <p className="text-sm font-medium text-text">{getSenderLabel(message)}</p>
          {showConfidence ? (
            <span className="text-xs bg-ai/20 text-ai px-1.5 py-0.5 rounded">
              {(message.confidence! * 100).toFixed(0)}%
            </span>
          ) : null}
        </div>
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <div className="flex items-center gap-1 mt-1 justify-end">
          <p className="text-xs text-text-muted">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {outgoing && showCheck ? (
            <span className="text-xs text-text-muted" aria-label="Delivered">
              <Check className="w-3.5 h-3.5 inline" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
