import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'
import type { Team } from '../../types'

export interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: { name: string; description: string; allowAutoAssign: boolean }) => Promise<void>
}

/**
 * CreateTeamModal – Create a new team: Team name, Team Description, Allow auto assign checkbox, Create team.
 */
export function CreateTeamModal({ isOpen, onClose, onCreate }: CreateTeamModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [allowAutoAssign, setAllowAutoAssign] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setDescription('')
    setAllowAutoAssign(true)
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter a team name.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate({ name: name.trim(), description: description.trim(), allowAutoAssign })
      handleClose()
    } catch (_e) {
      setError('Failed to create team. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create a new team"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Create team
          </Button>
        </>
      }
    >
      <p className="text-sm text-text-muted mb-4">
        Add a title and description to your new team.
      </p>
      <div className="space-y-4">
        <Input
          label="Team name"
          placeholder="Example: Sales, Customer Support"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          label="Team Description"
          placeholder="Short description about this team."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowAutoAssign}
            onChange={(e) => setAllowAutoAssign(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary/50"
          />
          <span className="text-sm text-text">Allow auto assign for this team.</span>
        </label>
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
