import { create } from 'zustand'

export type ConversationStatus = 'open' | 'resolved' | 'pending'

/** Ticket-first: who is handling and escalation state */
export type TicketStatus = 'AI_HANDLING' | 'ESCALATED' | 'HUMAN_ACTIVE' | 'RESOLVED'

export interface Conversation {
  id: string
  contactId: string
  contactName: string
  contactAvatar?: string
  lastMessage?: string
  lastMessageAt?: string
  status: ConversationStatus
  unreadCount: number
  inboxId?: string
  assigneeId?: string
  /** Current user was @mentioned (for Mentions view) */
  hasMention?: boolean
  /** No agent reply yet (for Unattended view) */
  isUnattended?: boolean
  /** Channel id (e.g. rajnot_bot) for Channels view */
  channelId?: string
  /** Ticket status: AI handling, escalated, human active, resolved */
  ticketStatus?: TicketStatus
  /** Who is assigned: 'AI' or human agent id */
  assignedAgent?: 'AI' | string
  /** AI confidence 0–1 when ticket is AI-handled */
  confidence?: number
  /** Set when status is ESCALATED */
  escalationReason?: string
  escalationAt?: string
}

/** sender_type: customer | ai | human (frontend uses user | bot | agent and maps for display) */
export interface Message {
  id: string
  conversationId: string
  senderType: 'user' | 'agent' | 'bot'
  content: string
  createdAt: string
  private?: boolean
  attachments?: { url: string; type: string }[]
  /** AI confidence 0–1 for AI messages */
  confidence?: number
}

interface ConversationState {
  conversations: Conversation[]
  selectedConversationId: string | null
  messages: Record<string, Message[]>
  setConversations: (list: Conversation[]) => void
  setSelectedConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  addMessage: (conversationId: string, message: Message) => void
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations: [],
  selectedConversationId: null,
  messages: {},
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (selectedConversationId) => set({ selectedConversationId }),
  setMessages: (conversationId, messages) =>
    set((s) => ({ messages: { ...s.messages, [conversationId]: messages } })),
  addMessage: (conversationId, message) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [conversationId]: [...(s.messages[conversationId] ?? []), message],
      },
    })),
}))
