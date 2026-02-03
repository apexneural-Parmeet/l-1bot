import { apiFetch } from './api'
import type { Conversation, Message } from '@/stores/conversationStore'

/**
 * Conversation API: list conversations, get messages, send message.
 * Backend may expose /conversations or /chats; frontend uses /conversations.
 */

export async function fetchConversations(inboxId?: string): Promise<Conversation[]> {
  const q = inboxId ? `?inbox_id=${inboxId}` : ''
  try {
    const data = await apiFetch<{ data?: Conversation[] } | Conversation[]>(`/conversations${q}`)
    const list = Array.isArray(data) ? data : (data as { data?: Conversation[] }).data ?? []
    return list
  } catch {
    throw new Error('Failed to fetch conversations')
  }
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  const data = await apiFetch<{ data?: Message[] } | Message[]>(
    `/conversations/${conversationId}/messages`
  )
  const list = Array.isArray(data) ? data : (data as { data?: Message[] }).data ?? []
  return list
}

export async function sendMessage(
  conversationId: string,
  content: string,
  options?: { private: boolean }
): Promise<Message> {
  const body = { content, ...options }
  const data = await apiFetch<Message | { data: Message }>(
    `/conversations/${conversationId}/messages`,
    { method: 'POST', body: JSON.stringify(body) }
  )
  return 'data' in data ? data.data : data
}
