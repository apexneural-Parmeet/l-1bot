/**
 * Teams API: list, create, update, delete.
 * Mock responses for now.
 */

import type { Team } from '../types'

export async function getTeams(): Promise<Team[]> {
  return []
}

export async function createTeam(payload: {
  name: string
  description: string
  allowAutoAssign: boolean
}): Promise<Team> {
  return {
    id: String(Date.now()),
    name: payload.name,
    description: payload.description,
    allowAutoAssign: payload.allowAutoAssign,
    memberCount: 0,
  }
}
