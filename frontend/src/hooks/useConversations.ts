import { useEffect } from 'react'
import { useConversationStore } from '@/stores/conversationStore'
import { fetchConversations } from '@/services/conversationService'

/**
 * useConversations: Fetches and syncs conversation list with store.
 * Use in ConversationList or any screen that needs the list.
 */
export function useConversations(inboxId?: string) {
  const setConversations = useConversationStore((s) => s.setConversations)
  const conversations = useConversationStore((s) => s.conversations)

  useEffect(() => {
    let cancelled = false
    fetchConversations(inboxId)
      .then((list) => {
        if (!cancelled) setConversations(list)
      })
      .catch(() => {
        if (!cancelled) setConversations([])
      })
    return () => {
      cancelled = true
    }
  }, [inboxId, setConversations])

  return conversations
}
