import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * ForgotPassword: Email input; sends reset link (stub).
 * Controlled input; validation placeholder.
 */
export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
          <h1 className="text-2xl font-semibold text-text mb-2">Check your email</h1>
          <p className="text-sm text-text-muted mb-6">
            If an account exists for {email}, we sent a reset link.
          </p>
          <Link to="/login">
            <Button variant="outline" fullWidth>Back to sign in</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Forgot password</h1>
        <p className="text-sm text-text-muted mb-6">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Button type="submit" fullWidth loading={loading}>
            Send reset link
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
