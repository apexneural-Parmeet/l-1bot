import type { CustomAttribute } from '../../types'

export interface CustomAttributeListProps {
  attributes: CustomAttribute[]
  loading?: boolean
}

/**
 * CustomAttributeList – list of custom attributes (display name, key, type, applies to).
 */
export function CustomAttributeList({ attributes, loading }: CustomAttributeListProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {[1, 2].map((i) => (
          <div key={i} className="px-4 py-4 animate-pulse">
            <div className="h-4 w-32 bg-surface rounded mb-2" />
            <div className="h-3 w-48 bg-surface rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (attributes.length === 0) {
    return null
  }

  return (
    <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
      {attributes.map((attr) => (
        <li key={attr.id} className="px-4 py-4 hover:bg-white/5 transition-colors">
          <p className="font-medium text-text">{attr.displayName}</p>
          <p className="text-sm text-text-muted mt-0.5">
            Key: {attr.key} · Type: {attr.attributeType} · Applies to: {attr.appliesTo}
          </p>
          {attr.description ? (
            <p className="text-sm text-text-muted mt-1">{attr.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
