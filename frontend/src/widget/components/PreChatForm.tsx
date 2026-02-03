import { useState } from 'react'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'

export interface PreChatFormProps {
  onSubmit: () => void
  fields?: { name: string; email: string; message?: string }
  className?: string
}

/**
 * PreChatForm: Optional form before starting chat (name, email, message).
 * Submit callback marks pre-chat done so widget shows the chat view.
 */
export function PreChatForm({
  onSubmit,
  className = '',
}: PreChatFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 space-y-4 ${className}`}
    >
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Input
        label="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can we help?"
      />
      <Button type="submit" fullWidth>
        Start chat
      </Button>
    </form>
  )
}
