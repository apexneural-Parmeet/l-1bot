/**
 * PermissionMatrix: Grid of roles × permissions (e.g. conversations:read, settings:write).
 * Stub: table structure only; no state/API.
 */
const ROLES = ['Admin', 'Agent']
const PERMISSIONS = ['conversations:read', 'conversations:write', 'contacts:read', 'settings:read']

export function PermissionMatrix() {
  return (
    <section>
      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-text-muted font-medium">Permission</th>
              {ROLES.map((r) => (
                <th key={r} className="px-4 py-3 text-text-muted font-medium">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((p) => (
              <tr key={p} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text">{p}</td>
                {ROLES.map((r) => (
                  <td key={r} className="px-4 py-3">
                    <input
                      type="checkbox"
                      defaultChecked={r === 'Admin' || (r === 'Agent' && !p.includes('settings'))}
                      className="rounded border-border"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
