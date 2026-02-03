import type { Message } from '@/stores/conversationStore'

export interface SystemMessageProps {
  message: Message
  className?: string
}

/**
 * SystemMessage: Centered system notice (e.g. conversation resolved).
 * Stateless.
 */
export function SystemMessage({ message, className = '' }: SystemMessageProps) {
  const text = message.content.replace(/^\[system\]\s*/, '')
  return (
    <div className={`flex justify-center py-2 ${className}`}>
      <span className="text-xs text-text-muted bg-surface border border-border rounded-full px-3 py-1">
        {text}
      </span>
    </div>
  )
}
