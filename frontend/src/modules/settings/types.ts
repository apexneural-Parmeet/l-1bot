/**
 * Settings module types.
 * Used across settings pages, components, forms, and services.
 */

export type SettingsPermission =
  | 'settings:read'
  | 'settings:manage'
  | 'users:read'
  | 'users:manage'
  | 'roles:read'
  | 'roles:manage'
  | 'billing:read'
  | 'billing:manage'

export interface SettingsNavSection {
  id: string
  label: string
  items: SettingsNavItem[]
  /** Permission required to see this section (optional; no value = visible to all) */
  permission?: SettingsPermission
}

export interface SettingsNavItem {
  id: string
  label: string
  href: string
  /** Permission required to see this item */
  permission?: SettingsPermission
}

export interface WorkspaceSettingsForm {
  name: string
  timezone: string
  defaultLanguage: string
  logoUrl?: string
}

export interface RoleForm {
  name: string
  description: string
  permissionSet: string[]
}

export interface WebhookForm {
  url: string
  events: string[]
  secret?: string
}

export interface AccountSettingsForm {
  accountName: string
  siteLanguage: string
}

export interface AgentUser {
  id: string
  name: string
  email: string
  role: string
  status: 'verified' | 'pending'
}

export interface Team {
  id: string
  name: string
  description: string
  allowAutoAssign: boolean
  memberCount?: number
}

export interface Inbox {
  id: string
  name: string
  channelType: string
}

export interface Label {
  id: string
  name: string
  description: string
  color: string
  showOnSidebar: boolean
}

export interface CustomAttribute {
  id: string
  appliesTo: 'conversation' | 'contact'
  displayName: string
  key: string
  description: string
  attributeType: string
  regexValidation?: boolean
}

export interface AutomationRule {
  id: string
  name: string
  description: string
  event: string
  conditions: { attribute: string; operator: string; value: string }[]
  actions: { type: string; value: string }[]
}

export interface Bot {
  id: string
  name: string
  description: string
  webhookUrl: string
  avatarUrl?: string
}

export interface Macro {
  id: string
  name: string
  visibility: 'public' | 'private'
  actions: { type: string; value?: string }[]
}

export interface CannedResponse {
  id: string
  shortCode: string
  message: string
}

export interface IntegrationItem {
  id: string
  name: string
  description: string
  icon?: string
  enabled?: boolean
  connectionHealth?: 'ok' | 'error' | 'unknown'
  messagesFlowing?: boolean
}
