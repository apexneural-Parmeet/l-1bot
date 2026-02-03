import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/providers'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * TwoFactorAuth: OTP/code input; token-based auth ready.
 * Controlled input; validation placeholder.
 */
export function TwoFactorAuth() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!code.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (!res.ok) throw new Error('Invalid code')
      const data = await res.json().catch(() => ({}))
      const token = data.access_token ?? data.token ?? 'stub-token'
      const user = data.user ?? { id: '1', email: '', name: 'Agent', role: 'agent' as const }
      localStorage.setItem('auth_token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    } catch {
      setError('Invalid code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Two-factor authentication</h1>
        <p className="text-sm text-text-muted mb-6">Enter the code from your authenticator app.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            required
          />
          {error ? <p className="text-sm text-error">{error}</p> : null}
          <Button type="submit" fullWidth loading={loading}>
            Verify
          </Button>
        </form>
      </div>
    </div>
  )
}
