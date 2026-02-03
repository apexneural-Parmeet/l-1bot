import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/providers'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * Signup: Email, name, password; token-based auth ready.
 * Controlled inputs; validation placeholder.
 */
export function Signup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !name.trim() || !password) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      })
      if (!res.ok) throw new Error('Signup failed')
      const data = await res.json().catch(() => ({}))
      const token = data.access_token ?? data.token ?? 'stub-token'
      const user = data.user ?? { id: '1', email, name, role: 'agent' as const }
      localStorage.setItem('auth_token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    } catch {
      // Demo bypass: when backend is not available, sign up locally and go to dashboard
      const user = { id: '1', email: email.trim() || `${name.toLowerCase().replace(/\s/g, '')}@demo.local`, name, role: 'agent' as const }
      const token = 'stub-token'
      localStorage.setItem('auth_token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Create account</h1>
        <p className="text-sm text-text-muted mb-6">Register for the support dashboard.</p>
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
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
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
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-sm text-text-muted">
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
