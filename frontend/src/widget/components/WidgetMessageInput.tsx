import { useState } from 'react'
import { Send } from 'lucide-react'

export interface WidgetMessageInputProps {
  conversationId: string
  onSend?: (content: string) => void
  className?: string
}

/**
 * WidgetMessageInput: Simple text input + send for the widget.
 * Mobile-first; no attachments in stub.
 */
export function WidgetMessageInput({
  conversationId: _conversationId,
  onSend,
  className = '',
}: WidgetMessageInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = value.trim()
    if (!text) return
    onSend?.(text)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 p-3 border-t border-slate-200 shrink-0 ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Send"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
