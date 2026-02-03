/**
 * Roles API: list, create, update, delete.
 * Mock responses for now.
 */

export async function getRoles() {
  return []
}

export async function createRole(_payload: unknown) {
  return { id: '1', name: '', description: '', permissionSet: [] }
}

export async function updateRole(_id: string, _payload: unknown) {
  return { ok: true }
}

export async function deleteRole(_id: string) {
  return { ok: true }
}
