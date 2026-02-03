import type { Label } from '../../types'

export interface LabelsListProps {
  labels: Label[]
  loading?: boolean
}

/**
 * LabelsList – list of labels with color swatch, name, description.
 */
export function LabelsList({ labels, loading }: LabelsListProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-4 py-4 flex items-center gap-4 animate-pulse">
            <div className="w-4 h-4 rounded bg-surface" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-surface rounded mb-2" />
              <div className="h-3 w-48 bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (labels.length === 0) {
    return null
  }

  return (
    <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
      {labels.map((label) => (
        <li key={label.id} className="px-4 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
          <div
            className="w-4 h-4 rounded shrink-0"
            style={{ backgroundColor: label.color || '#94a3b8' }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-text">{label.name}</p>
            {label.description ? (
              <p className="text-sm text-text-muted mt-0.5">{label.description}</p>
            ) : null}
          </div>
          {label.showOnSidebar ? (
            <span className="text-xs text-text-muted">Sidebar</span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
