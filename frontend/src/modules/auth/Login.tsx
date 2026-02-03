import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/providers'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * Login: Email/password form; token-based auth ready.
 * Controlled inputs; validation placeholder (e.g. required).
 * On success: setToken + setUser, redirect to dashboard.
 */
export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Email and password are required')
      return
    }
    setLoading(true)
    try {
      // Demo bypass when backend is not available
      if (email === 'demo@example.com' && password === 'demo') {
        const user = { id: '1', email, name: 'Demo Agent', role: 'agent' as const }
        const token = 'stub-token'
        localStorage.setItem('auth_token', token)
        setToken(token)
        setUser(user)
        navigate('/')
        return
      }
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json().catch(() => ({}))
      const token = data.access_token ?? data.token ?? 'stub-token'
      const user = data.user ?? { id: '1', email, name: email.split('@')[0], role: 'agent' as const }
      localStorage.setItem('auth_token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Sign in</h1>
        <p className="text-sm text-text-muted mb-6">Enter your credentials to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error ? <p className="text-sm text-error">{error}</p> : null}
          <Button type="submit" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-sm text-text-muted">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
          {' · '}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
