/**
 * Custom attributes API: list, create, update, delete.
 * Mock responses for now.
 */

import type { CustomAttribute } from '../types'

export async function getCustomAttributes(_appliesTo?: 'conversation' | 'contact'): Promise<CustomAttribute[]> {
  return []
}

export async function createCustomAttribute(payload: {
  appliesTo: 'conversation' | 'contact'
  displayName: string
  key: string
  description: string
  attributeType: string
  regexValidation: boolean
}): Promise<CustomAttribute> {
  return {
    id: String(Date.now()),
    appliesTo: payload.appliesTo,
    displayName: payload.displayName,
    key: payload.key,
    description: payload.description,
    attributeType: payload.attributeType,
    regexValidation: payload.regexValidation ? true : undefined,
  }
}
