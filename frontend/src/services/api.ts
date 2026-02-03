/**
 * API client: base URL and auth header.
 * All API calls go through /services; UI components stay stateless.
 * Token-based auth: attach Bearer token from auth store.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'

export function getApiBase(): string {
  return API_BASE
}

export function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  return headers
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const res = await fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(), ...(options.headers as Record<string, string>) },
  })
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
  const contentType = res.headers.get('content-type')
  if (contentType?.includes('application/json')) return res.json() as Promise<T>
  return res.text() as Promise<T>
}
