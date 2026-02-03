import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'

export interface AddCannedResponseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { shortCode: string; message: string }) => Promise<void>
}

export function AddCannedResponseModal({ isOpen, onClose, onSubmit }: AddCannedResponseModalProps) {
  const [shortCode, setShortCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setShortCode('')
    setMessage('')
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!shortCode.trim() || !message.trim()) {
      setError('Please enter short code and message.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onSubmit({ shortCode: shortCode.trim(), message: message.trim() })
      handleClose()
    } catch (_e) {
      setError('Failed to create canned response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add canned response"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>Submit</Button>
        </>
      }
    >
      <p className="text-sm text-text-muted mb-4">
        Canned Responses are predefined reply templates which can be used to quickly send out replies to conversations.
      </p>
      <div className="space-y-4">
        <Input label="Short code" placeholder="Please enter a short code." value={shortCode} onChange={(e) => setShortCode(e.target.value)} />
        <Textarea label="Message" placeholder="Please write the message you want to save as a template to use later." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
