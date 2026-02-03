import { useState, useEffect } from 'react'

export interface WidgetMessage {
  id: string
  senderType: 'user' | 'agent'
  content: string
  createdAt: string
}

export interface WidgetMessageListProps {
  conversationId: string
  className?: string
}

const MOCK_MESSAGES: WidgetMessage[] = [
  {
    id: '1',
    senderType: 'agent',
    content: 'Hi! How can we help you today?',
    createdAt: new Date().toISOString(),
  },
]

/**
 * WidgetMessageList: Scrollable message list for the widget.
 * Fetches from API or uses local state; stub with mock for now.
 */
export function WidgetMessageList({ conversationId, className = '' }: WidgetMessageListProps) {
  const [messages] = useState<WidgetMessage[]>(MOCK_MESSAGES)

  useEffect(() => {
    // Stub: fetch messages for conversationId
    void conversationId
  }, [conversationId])

  return (
    <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${className}`}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[85%] px-3 py-2 rounded-lg text-sm
              ${msg.senderType === 'user'
                ? 'bg-primary text-white'
                : 'bg-slate-200 text-slate-800'}
            `}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}
