import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * ResetPassword: New password + confirm; token from URL query (stub).
 * Controlled inputs; validation placeholder.
 */
export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      setDone(true)
    } catch {
      setError('Reset failed')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
          <h1 className="text-2xl font-semibold text-text mb-2">Password reset</h1>
          <p className="text-sm text-text-muted mb-6">Your password has been updated.</p>
          <Link to="/login">
            <Button fullWidth>Sign in</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Set new password</h1>
        <p className="text-sm text-text-muted mb-6">Enter your new password below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Input
            type="password"
            label="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error ? <p className="text-sm text-error">{error}</p> : null}
          <Button type="submit" fullWidth loading={loading} disabled={!token}>
            Reset password
          </Button>
        </form>
        <p className="mt-4 text-sm text-text-muted">
          <Link to="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
