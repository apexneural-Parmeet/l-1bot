import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { RoleList } from '../RoleList'

/**
 * RolesSettings (Custom Roles)
 * Custom roles list, Add custom role, optional upgrade modal for Business/Enterprise.
 */
export function RolesSettings() {
  return (
    <div>
      <PageHeader
        title="Custom Roles"
        description="Custom roles are roles that are created by the account owner or admin. These roles can be assigned to agents to define their access and permissions within the account. Custom roles can be created with specific permissions and access levels to suit the requirements of the organization."
        actions={<Button>+ Add custom role</Button>}
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about custom roles &gt;</a>
      </p>
      <RoleList />
    </div>
  )
}
