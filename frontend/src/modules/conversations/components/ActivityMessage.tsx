import type { Message } from '@/stores/conversationStore'

export interface ActivityMessageProps {
  message: Message
  className?: string
}

/**
 * ActivityMessage: Activity feed item (e.g. "Agent X assigned conversation").
 * Stateless.
 */
export function ActivityMessage({ message, className = '' }: ActivityMessageProps) {
  const text = message.content.replace(/^\[activity\]\s*/, '')
  return (
    <div className={`flex justify-center py-1 ${className}`}>
      <span className="text-xs text-text-muted italic">{text}</span>
    </div>
  )
}
