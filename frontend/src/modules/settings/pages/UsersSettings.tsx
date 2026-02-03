import { PageHeader } from '@/components/layout'

/**
 * UsersSettings
 *
 * Purpose: List all users, show role & status, invite via email, activate/deactivate, remove (confirmation).
 * Fits under Settings > User Management > Users.
 * Permissions: users:read / users:manage (stub).
 */
export function UsersSettings() {
  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage team members and invitations."
      />
      <div className="rounded-lg border border-border bg-surface p-6 max-w-2xl">
        <p className="text-sm text-text-muted">
          UserList, UserRow, InviteUserModal, EditUserModal, RemoveUserDialog will be wired here.
        </p>
      </div>
    </div>
  )
}
