import { Badge } from '@/components/ui'

export interface Inbox {
  id: string
  name: string
  channel: string
  status: string
  conversationCount: number
}

export interface InboxCardProps {
  inbox: Inbox
  className?: string
}

export function InboxCard({ inbox, className = '' }: InboxCardProps) {
  return (
    <div
      className={`
        rounded-xl border border-border bg-surface p-4 hover:border-primary/50 transition-colors
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-text">{inbox.name}</h3>
        <Badge variant={inbox.status === 'active' ? 'success' : 'default'}>
          {inbox.status}
        </Badge>
      </div>
      <p className="text-sm text-text-muted mt-1 capitalize">{inbox.channel}</p>
      <p className="text-xs text-text-muted mt-2">{inbox.conversationCount} conversations</p>
    </div>
  )
}
