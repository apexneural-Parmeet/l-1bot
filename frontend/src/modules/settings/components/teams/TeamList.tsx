import type { Team } from '../../types'

export interface TeamListProps {
  teams: Team[]
  loading?: boolean
}

/**
 * TeamList – list of teams or empty state.
 */
export function TeamList({ teams, loading }: TeamListProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {[1, 2].map((i) => (
          <div key={i} className="px-4 py-4 animate-pulse">
            <div className="h-5 w-32 bg-surface rounded mb-2" />
            <div className="h-4 w-64 bg-surface rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (teams.length === 0) {
    return null
  }

  return (
    <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
      {teams.map((team) => (
        <li key={team.id} className="px-4 py-4 hover:bg-white/5 transition-colors">
          <p className="font-medium text-text">{team.name}</p>
          {team.description ? (
            <p className="text-sm text-text-muted mt-0.5">{team.description}</p>
          ) : null}
          {team.memberCount != null ? (
            <p className="text-xs text-text-muted mt-1">{team.memberCount} members</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
