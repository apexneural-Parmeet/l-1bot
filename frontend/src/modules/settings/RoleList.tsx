import { Badge } from '@/components/ui'

/**
 * RoleList: Lists roles (admin, agent, etc.). Permissions model: roles have permissions; PermissionMatrix shows role-permission grid.
 */
const MOCK_ROLES = [
  { id: '1', name: 'Administrator', description: 'Full access', userCount: 1 },
  { id: '2', name: 'Agent', description: 'Conversations and contacts', userCount: 5 },
]

export function RoleList() {
  return (
    <section>
      <ul className="space-y-2 rounded-lg border border-border bg-surface divide-y divide-border">
        {MOCK_ROLES.map((r) => (
          <li key={r.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-text">{r.name}</p>
              <p className="text-sm text-text-muted">{r.description}</p>
            </div>
            <Badge variant="default">{r.userCount} users</Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
