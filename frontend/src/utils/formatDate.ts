export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString()
}

export function formatRelative(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return formatDate(d)
}

/** Conversation list/header meta: "2d • 20h" or "20h" or "Just now" */
export function formatConversationTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  if (days > 0) return hours > 0 ? `${days}d • ${hours}h` : `${days}d`
  if (hours > 0) return `${hours}h`
  const mins = Math.floor(diff / 60000)
  if (mins > 0) return `${mins}m`
  return 'Just now'
}
