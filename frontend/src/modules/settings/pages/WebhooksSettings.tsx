import { PageHeader } from '@/components/layout'
import { WebhookSettings } from '../WebhookSettings'

/**
 * WebhooksSettings
 *
 * Purpose: Webhook list, URL input, event multi-select, secret generation (mock), test webhook (stub).
 * Fits under Settings > Integrations > Webhooks.
 * Permissions: settings:read / settings:manage (stub).
 */
export function WebhooksSettings() {
  return (
    <div>
      <PageHeader
        title="Webhooks"
        description="Outbound webhook URL and signing secret."
      />
      <WebhookSettings />
    </div>
  )
}
