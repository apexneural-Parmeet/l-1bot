import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'

const PRESET_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#ec4899', '#84cc16', '#6366f1', '#14b8a6',
]

export interface AddLabelModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: {
    name: string
    description: string
    color: string
    showOnSidebar: boolean
  }) => Promise<void>
}

/**
 * AddLabelModal – Label Name, Description, Color picker, Show label on sidebar, Cancel / Create.
 */
export function AddLabelModal({ isOpen, onClose, onCreate }: AddLabelModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(PRESET_COLORS[0])
  const [showOnSidebar, setShowOnSidebar] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setDescription('')
    setColor(PRESET_COLORS[0])
    setShowOnSidebar(true)
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter a label name.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate({ name: name.trim(), description: description.trim(), color, showOnSidebar })
      handleClose()
    } catch (_e) {
      setError('Failed to create label. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add label"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Create
          </Button>
        </>
      }
    >
      <p className="text-sm text-text-muted mb-4">
        Labels let you group the conversations together.
      </p>
      <div className="space-y-4">
        <Input
          label="Label Name"
          placeholder="label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Description"
          placeholder="Label Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-lg border-2 transition-transform ${
                  color === c ? 'border-primary scale-110' : 'border-border hover:border-text-muted'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent"
            />
            <span className="text-sm text-text-muted">{color}</span>
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnSidebar}
            onChange={(e) => setShowOnSidebar(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary/50"
          />
          <span className="text-sm text-text">Show label on sidebar</span>
        </label>
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
