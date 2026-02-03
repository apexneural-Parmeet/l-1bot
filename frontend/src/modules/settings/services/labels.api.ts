/**
 * Labels API: list, create, update, delete.
 * Mock responses for now.
 */

import type { Label } from '../types'

export async function getLabels(): Promise<Label[]> {
  return []
}

export async function createLabel(payload: {
  name: string
  description: string
  color: string
  showOnSidebar: boolean
}): Promise<Label> {
  return {
    id: String(Date.now()),
    name: payload.name,
    description: payload.description,
    color: payload.color,
    showOnSidebar: payload.showOnSidebar,
  }
}
