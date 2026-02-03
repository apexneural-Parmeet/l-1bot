export interface TypingIndicatorProps {
  className?: string
}

/**
 * TypingIndicator: Shows "Agent is typing..." or dots animation.
 * Used in MessageList when typing is true. Stateless.
 */
export function TypingIndicator({ className = '' }: TypingIndicatorProps) {
  return (
    <div className={`flex items-center gap-1 py-2 px-3 ${className}`}>
      <span className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
      </span>
      <span className="text-xs text-text-muted ml-2">Typing...</span>
    </div>
  )
}
