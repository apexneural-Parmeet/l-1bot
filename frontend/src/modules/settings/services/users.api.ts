/**
 * Users API: list, invite, edit, remove.
 * Mock responses for now.
 */

import type { AgentUser } from '../types'

const MOCK_AGENTS: AgentUser[] = [
  {
    id: '1',
    name: 'Hansika Vardani Mula',
    email: 'hansika.vardini@apexneural.com',
    role: 'Administrator',
    status: 'verified',
  },
]

export async function getUsers(): Promise<AgentUser[]> {
  return MOCK_AGENTS
}

export async function inviteUser(payload: { name: string; email: string; role: string }) {
  return { ok: true, ...payload }
}

export async function updateUser(_id: string, _payload: unknown) {
  return { ok: true }
}

export async function removeUser(_id: string) {
  return { ok: true }
}
