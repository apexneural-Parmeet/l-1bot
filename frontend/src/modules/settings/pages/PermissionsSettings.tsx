import { PageHeader } from '@/components/layout'
import { PermissionMatrix } from '../PermissionMatrix'

/**
 * PermissionsSettings
 *
 * Purpose: Permission matrix (rows = features, columns = actions), toggle-based UI, read-only for non-admins.
 * Fits under Settings > Roles & Permissions > Permissions.
 * Permissions: roles:read (stub).
 */
export function PermissionsSettings() {
  return (
    <div>
      <PageHeader
        title="Permissions"
        description="Role-permission matrix."
      />
      <PermissionMatrix />
    </div>
  )
}
