import { PageHeader } from '@/components/layout'
import { IntegrationCard } from '../components/integrations'
import type { IntegrationItem } from '../types'

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: 'webhooks',
    name: 'Webhooks',
    description: 'Webhook events provide real-time updates about activities in your Chatwoot account. You can subscribe to your preferred events, and Chatwoot will send you HTTP callbacks with the updates.',
    enabled: true,
    connectionHealth: 'ok',
    messagesFlowing: true,
  },
  {
    id: 'dashboard-apps',
    name: 'Dashboard Apps',
    description: 'Dashboard Apps allow you to create and embed applications that display user information, orders, or payment history, providing more context to your customer support agents.',
    enabled: true,
    connectionHealth: 'ok',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Leverage the power of large language models from OpenAI with the features such as reply suggestions, summarization, message rephrasing, spell-checking, and label classification.',
    enabled: true,
    connectionHealth: 'ok',
    messagesFlowing: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Integrate Chatwoot with Slack to keep your team in sync. This integration allows you to receive notifications for new conversations and respond to them directly within Slack\'s interface.',
    enabled: true,
    connectionHealth: 'ok',
    messagesFlowing: true,
  },
  {
    id: 'dialogflow',
    name: 'Dialogflow',
    description: 'Build chatbots with Dialogflow and easily integrate them into your inbox. These bots can handle initial queries before transferring them to a customer service agent.',
    enabled: true,
    connectionHealth: 'ok',
    messagesFlowing: true,
  },
  {
    id: 'google-translate',
    name: 'Google Translate',
    description: 'Integrate Google Translate to help agents easily translate customer messages. This integration automatically detects the language and converts it to the agent\'s or admin\'s preferred language.',
    enabled: true,
    connectionHealth: 'ok',
  },
  {
    id: 'dyte',
    name: 'Dyte',
    description: 'Dyte is a product that integrates audio and video functionalities into your application. With this integration, your agents can start video/voice calls with customers.',
    enabled: true,
    connectionHealth: 'unknown',
  },
]

export function IntegrationsSettings() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Chatwoot integrates with multiple tools and services to improve your team's efficiency. Explore the list below to configure your favorite apps."
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about integrations &gt;</a>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((item) => (
          <IntegrationCard key={item.id} integration={item} onConfigure={() => {}} />
        ))}
      </div>
    </div>
  )
}
