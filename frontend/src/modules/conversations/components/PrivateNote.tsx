import type { Message } from '@/stores/conversationStore'
import { Lock } from 'lucide-react'

export interface PrivateNoteProps {
  message: Message
  className?: string
}

/**
 * PrivateNote: Internal note (visible to agents only). Styled distinctly.
 * Stateless.
 */
export function PrivateNote({ message, className = '' }: PrivateNoteProps) {
  return (
    <div
      className={`
        flex items-start gap-2 p-3 rounded-lg border border-warning/30 bg-warning/10 text-text
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <Lock className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-warning mb-0.5">Private note</p>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs text-text-muted mt-1">
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
