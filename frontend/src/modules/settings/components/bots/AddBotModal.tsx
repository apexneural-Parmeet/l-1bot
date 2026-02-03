import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'
import { Bot } from 'lucide-react'

export interface AddBotModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: { name: string; description: string; webhookUrl: string }) => Promise<void>
}

export function AddBotModal({ isOpen, onClose, onCreate }: AddBotModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setDescription('')
    setWebhookUrl('')
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter a bot name.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate({ name: name.trim(), description: description.trim(), webhookUrl: webhookUrl.trim() })
      handleClose()
    } catch (_e) {
      setError('Failed to create bot. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Bot"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>Create Bot</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Bot avatar</label>
          <div className="w-16 h-16 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted">
            <Bot className="w-8 h-8" />
          </div>
        </div>
        <Input label="Bot name" placeholder="Enter bot name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea label="Description" placeholder="What does this bot do?" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        <Input label="Webhook URL" placeholder="https://example.com/webhook" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
