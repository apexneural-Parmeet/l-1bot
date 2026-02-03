import { useState } from 'react'
import { useConversationStore } from '@/stores/conversationStore'
import { sendMessage } from '@/services/conversationService'
import { Textarea } from '@/components/ui'
import { Button } from '@/components/ui'
import { Paperclip, Smile, Mic, FileText, Sparkles } from 'lucide-react'

import type { TicketStatus } from '@/stores/conversationStore'

export interface MessageInputProps {
  conversationId: string
  /** When AI_HANDLING or ESCALATED, input is hidden. Only HUMAN_ACTIVE allows reply. */
  ticketStatus?: TicketStatus
  onSend?: () => void
  className?: string
}

type ComposerTab = 'reply' | 'private'

/**
 * MessageInput: Composer with Reply | Private Note tabs, placeholder, action icons, Send (CTRL+Enter).
 * Extensible for bots (sparkler icon). Connects: conversationStore (addMessage), conversationService (sendMessage).
 */
const INPUT_HIDDEN_STATUSES: TicketStatus[] = ['AI_HANDLING', 'ESCALATED']

export function MessageInput({
  conversationId,
  ticketStatus,
  onSend,
  className = '',
}: MessageInputProps) {
  const [content, setContent] = useState('')
  const [tab, setTab] = useState<ComposerTab>('reply')
  const privateNote = tab === 'private'
  const addMessage = useConversationStore((s) => s.addMessage)
  const hidden = ticketStatus && INPUT_HIDDEN_STATUSES.includes(ticketStatus)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = content.trim()
    if (!text) return
    setContent('')
    try {
      const msg = await sendMessage(conversationId, text, { private: privateNote })
      addMessage(conversationId, msg)
      onSend?.()
    } catch {
      addMessage(conversationId, {
        id: `msg-${Date.now()}`,
        conversationId,
        senderType: 'agent',
        content: text,
        createdAt: new Date().toISOString(),
        private: privateNote,
      })
      onSend?.()
    }
  }

  if (hidden) {
    return (
      <div className="p-4 border-t border-border bg-surface/50 shrink-0">
        <p className="text-sm text-text-muted text-center">
          Reply when a human agent has taken over this ticket.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col gap-2 p-4 border-t border-border bg-surface shrink-0
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Reply | Private Note tabs */}
      <div className="flex gap-1 border-b border-border -mb-1">
        <button
          type="button"
          onClick={() => setTab('reply')}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === 'reply' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text'}`}
        >
          Reply
        </button>
        <button
          type="button"
          onClick={() => setTab('private')}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === 'private' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text'}`}
        >
          Private Note
        </button>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1 flex flex-col rounded-lg border border-border bg-bg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Shift + enter for new line. Start with '/' to select a Canned Response."
            rows={3}
            className="min-h-0 border-0 resize-none focus:ring-0 bg-transparent rounded-t-lg"
          />
          <div className="flex items-center gap-1 px-2 py-1.5 border-t border-border rounded-b-lg">
            <button type="button" className="p-1.5 rounded text-text-muted hover:text-text" aria-label="Emoji">
              <Smile className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 rounded text-text-muted hover:text-text" aria-label="Attach">
              <Paperclip className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 rounded text-text-muted hover:text-text" aria-label="Voice">
              <Mic className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 rounded text-text-muted hover:text-text" aria-label="Canned response">
              <FileText className="w-4 h-4" />
            </button>
            <div className="flex-1" />
            <button type="button" className="p-1.5 rounded text-text-muted hover:text-text" aria-label="Bot / AI">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Button type="submit" disabled={!content.trim()} size="lg">
          Send (CTRL + ←)
        </Button>
      </div>
    </form>
  )
}
