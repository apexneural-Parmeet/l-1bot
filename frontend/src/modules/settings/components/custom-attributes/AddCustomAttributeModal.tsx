import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'

const APPLIES_TO_OPTIONS = [
  { value: 'conversation', label: 'Conversation' },
  { value: 'contact', label: 'Contact' },
]

const TYPE_OPTIONS = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'list', label: 'List' },
]

export interface AddCustomAttributeModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: {
    appliesTo: 'conversation' | 'contact'
    displayName: string
    key: string
    description: string
    attributeType: string
    regexValidation: boolean
  }) => Promise<void>
}

/**
 * AddCustomAttributeModal – Applies to, Display Name, Key, Description, Type, Enable regex validation, Cancel / Create.
 */
export function AddCustomAttributeModal({ isOpen, onClose, onCreate }: AddCustomAttributeModalProps) {
  const [appliesTo, setAppliesTo] = useState<'conversation' | 'contact'>('conversation')
  const [displayName, setDisplayName] = useState('')
  const [key, setKey] = useState('')
  const [description, setDescription] = useState('')
  const [attributeType, setAttributeType] = useState('text')
  const [regexValidation, setRegexValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setAppliesTo('conversation')
    setDisplayName('')
    setKey('')
    setDescription('')
    setAttributeType('text')
    setRegexValidation(false)
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!displayName.trim() || !key.trim()) {
      setError('Please enter display name and key.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate({
        appliesTo,
        displayName: displayName.trim(),
        key: key.trim().toLowerCase().replace(/\s+/g, '_'),
        description: description.trim(),
        attributeType,
        regexValidation,
      })
      handleClose()
    } catch (_e) {
      setError('Failed to create custom attribute. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Custom Attribute"
      size="lg"
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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Applies to</label>
          <select
            value={appliesTo}
            onChange={(e) => setAppliesTo(e.target.value as 'conversation' | 'contact')}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {APPLIES_TO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <Input
          label="Display Name"
          placeholder="Enter custom attribute display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Input
          label="Key"
          placeholder="Enter custom attribute key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Enter custom attribute description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Type</label>
          <select
            value={attributeType}
            onChange={(e) => setAttributeType(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={regexValidation}
            onChange={(e) => setRegexValidation(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary/50"
          />
          <span className="text-sm text-text">Enable regex validation</span>
        </label>
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
