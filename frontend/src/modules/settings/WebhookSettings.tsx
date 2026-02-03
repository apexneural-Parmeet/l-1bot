import { useState } from 'react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

/**
 * WebhookSettings: URL + secret for outbound webhooks. Stub.
 */
export function WebhookSettings() {
  const [url, setUrl] = useState('')
  const [secret, setSecret] = useState('')

  return (
    <section>
      <div className="space-y-4 max-w-md rounded-lg border border-border bg-surface p-4">
        <Input
          label="Webhook URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-server.com/webhooks"
        />
        <Input
          label="Signing secret"
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Optional"
        />
        <Button>Save</Button>
      </div>
    </section>
  )
}
