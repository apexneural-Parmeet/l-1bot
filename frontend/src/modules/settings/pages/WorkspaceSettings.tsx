import { PageHeader } from '@/components/layout'

/**
 * WorkspaceSettings
 *
 * Purpose: Workspace name, timezone, default language, logo upload (UI only).
 * Fits under Settings > Account & Workspace > Workspace.
 * Permissions: settings:read / settings:manage (stub).
 */
export function WorkspaceSettings() {
  return (
    <div>
      <PageHeader
        title="Workspace"
        description="Workspace name, timezone, and preferences."
      />
      <div className="rounded-lg border border-border bg-surface p-6 max-w-2xl">
        <p className="text-sm text-text-muted">
          Workspace settings form will be wired here (WorkspaceProfileForm, WorkspaceLogoUploader).
        </p>
      </div>
    </div>
  )
}
