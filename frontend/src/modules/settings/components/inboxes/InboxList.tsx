import { MessageSquare, Settings, Trash2 } from 'lucide-react'
import type { Inbox } from '../../types'

export interface InboxListProps {
  inboxes: Inbox[]
  loading?: boolean
  onEdit?: (inbox: Inbox) => void
  onDelete?: (inbox: Inbox) => void
}

/**
 * InboxList – list of inboxes with icon, name, channel type, edit/delete icons.
 */
export function InboxList({ inboxes, loading, onEdit, onDelete }: InboxListProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {[1, 2].map((i) => (
          <div key={i} className="px-4 py-4 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-surface" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-surface rounded mb-2" />
              <div className="h-3 w-24 bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (inboxes.length === 0) {
    return null
  }

  return (
    <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
      {inboxes.map((inbox) => (
        <li
          key={inbox.id}
          className="px-4 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-text">{inbox.name}</p>
            <p className="text-sm text-text-muted">{inbox.channelType}</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit ? (
              <button
                type="button"
                onClick={() => onEdit(inbox)}
                className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5"
                aria-label="Edit inbox"
              >
                <Settings className="w-4 h-4" />
              </button>
            ) : null}
            {onDelete ? (
              <button
                type="button"
                onClick={() => onDelete(inbox)}
                className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10"
                aria-label="Delete inbox"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
