import { Avatar, Badge } from '@/components/ui'
import type { AgentUser } from '../../types'

export interface UserListProps {
  users: AgentUser[]
  loading?: boolean
}

/**
 * UserList – list of agents with avatar, name, email, role, status (Verified).
 */
export function UserList({ users, loading }: UserListProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {[1, 2].map((i) => (
          <div key={i} className="px-4 py-4 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-surface" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-surface rounded" />
              <div className="h-3 w-48 bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface py-12 text-center text-text-muted">
        <p className="text-sm">No agents in your account yet. Add an agent to get started.</p>
      </div>
    )
  }

  return (
    <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
      {users.map((user) => (
        <li
          key={user.id}
          className="px-4 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
        >
          <Avatar name={user.name} size="md" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-text">{user.name}</span>
              <span className="text-sm text-text-muted">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-text-muted">{user.role}</span>
              <Badge variant={user.status === 'verified' ? 'success' : 'default'}>
                {user.status === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
