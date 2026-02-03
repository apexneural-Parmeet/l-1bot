import { useState } from 'react'
import { Modal, Button, Input } from '@/components/ui'
import type { AgentUser } from '../../types'

const ROLES = ['Administrator', 'Agent']

export interface InviteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onInvite: (payload: { name: string; email: string; role: string }) => Promise<void>
}

/**
 * InviteUserModal – "Add agent to your team"
 * Agent Name, Role dropdown, Email Address; Cancel / Add Agent.
 */
export function InviteUserModal({ isOpen, onClose, onInvite }: InviteUserModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Agent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setEmail('')
    setRole('Agent')
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please enter agent name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onInvite({ name: name.trim(), email: email.trim(), role })
      handleClose()
    } catch (_e) {
      setError('Failed to add agent. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add agent to your team"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Add Agent
          </Button>
        </>
      }
    >
      <p className="text-sm text-text-muted mb-4">
        You can add people who will be able to handle support for your inboxes.
      </p>
      <div className="space-y-4">
        <Input
          label="Agent Name"
          placeholder="Please enter a name of the agent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <Input
          label="Email Address"
          type="email"
          placeholder="Please enter an email address of the agent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
