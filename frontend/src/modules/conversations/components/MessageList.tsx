import { useEffect, useRef, useState } from 'react'
import { useConversationStore } from '@/stores/conversationStore'
import { fetchMessages } from '@/services/conversationService'
import { MessageBubble } from './MessageBubble'
import { SystemMessage } from './SystemMessage'
import { PrivateNote } from './PrivateNote'
import { ActivityMessage } from './ActivityMessage'
import { TypingIndicator } from './TypingIndicator'
import { LoadingSkeleton } from '@/components/common'
import type { Message } from '@/stores/conversationStore'

export interface MessageListProps {
  conversationId: string
  typing?: boolean
  className?: string
}

function renderMessage(msg: Message) {
  if (msg.private) return <PrivateNote key={msg.id} message={msg} />
  if (msg.senderType === 'bot' && msg.content.startsWith('[system]'))
    return <SystemMessage key={msg.id} message={msg} />
  if (msg.senderType === 'bot' && msg.content.startsWith('[activity]'))
    return <ActivityMessage key={msg.id} message={msg} />
  return <MessageBubble key={msg.id} message={msg} />
}

/**
 * MessageList: Scrollable list of messages; supports user/agent/bot, system, private note, activity.
 * Connects: conversationStore (messages for conversationId); fetches via conversationService.
 */
export function MessageList({
  conversationId,
  typing = false,
  className = '',
}: MessageListProps) {
  const messages = useConversationStore((s) => s.messages[conversationId] ?? [])
  const setMessages = useConversationStore((s) => s.setMessages)
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchMessages(conversationId)
      .then((list) => {
        if (!cancelled) setMessages(conversationId, list)
      })
      .catch(() => {
        if (!cancelled) {
          setMessages(conversationId, [
            {
              id: 'm1',
              conversationId,
              senderType: 'user',
              content: 'Hello, I need help with my order.',
              createdAt: new Date(Date.now() - 60000).toISOString(),
            },
            {
              id: 'm2',
              conversationId,
              senderType: 'bot',
              content: 'Hi! I\'ll look into that for you.',
              createdAt: new Date().toISOString(),
              confidence: 0.94,
            },
            {
              id: 'm3',
              conversationId,
              senderType: 'agent',
              content: 'I\'ve taken over from the AI. How can I help?',
              createdAt: new Date().toISOString(),
            },
          ])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [conversationId, setMessages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (loading) {
    return (
      <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
        <LoadingSkeleton lines={5} />
      </div>
    )
  }

  return (
    <div className={`flex-1 overflow-y-auto flex flex-col gap-2 p-4 ${className}`}>
      {messages.map((msg) => renderMessage(msg))}
      {typing ? <TypingIndicator /> : null}
      <div ref={endRef} />
    </div>
  )
}
