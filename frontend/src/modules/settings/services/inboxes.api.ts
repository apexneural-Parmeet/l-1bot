/**
 * Inboxes API: list, create, update, delete.
 * Mock responses for now.
 */

import type { Inbox } from '../types'

const MOCK_INBOXES: Inbox[] = [
  { id: '1', name: 'Rajnot_bot', channelType: 'Telegram' },
]

export async function getInboxes(): Promise<Inbox[]> {
  return MOCK_INBOXES
}

export async function createInbox(_payload: { name: string; channelType: string }): Promise<Inbox> {
  return { id: String(Date.now()), name: 'New Inbox', channelType: 'Website' }
}
