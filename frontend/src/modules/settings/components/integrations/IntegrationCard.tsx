import { Check, Zap, LayoutDashboard, MessageSquare, Cloud, Languages, Video, Circle, Activity } from 'lucide-react'
import type { IntegrationItem } from '../../types'
import type { ReactNode } from 'react'

const ICON_MAP: Record<string, ReactNode> = {
  webhooks: <Zap className="w-6 h-6" />,
  'dashboard-apps': <LayoutDashboard className="w-6 h-6" />,
  openai: <MessageSquare className="w-6 h-6" />,
  slack: <MessageSquare className="w-6 h-6" />,
  dialogflow: <Cloud className="w-6 h-6" />,
  'google-translate': <Languages className="w-6 h-6" />,
  dyte: <Video className="w-6 h-6" />,
}

export interface IntegrationCardProps {
  integration: IntegrationItem
  onConfigure?: (id: string) => void
}

export function IntegrationCard({ integration, onConfigure }: IntegrationCardProps) {
  const icon = ICON_MAP[integration.id] ?? <Zap className="w-6 h-6" />
  return (
    <div className="rounded-lg border border-border bg-surface p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-text-muted shrink-0">
          {icon}
        </div>
        {integration.enabled !== false ? (
          <span className="text-text-muted shrink-0" aria-label="Enabled">
            <Check className="w-5 h-5" />
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-semibold text-text">{integration.name}</h3>
      <p className="mt-1 text-sm text-text-muted line-clamp-3">{integration.description}</p>
      <div className="mt-2 flex items-center gap-3 text-xs">
        {integration.connectionHealth != null && (
          <span
            className={`flex items-center gap-1 ${
              integration.connectionHealth === 'ok'
                ? 'text-success'
                : integration.connectionHealth === 'error'
                  ? 'text-error'
                  : 'text-text-muted'
            }`}
          >
            <Circle className="w-2 h-2 fill-current" />
            {integration.connectionHealth === 'ok'
              ? 'Connected'
              : integration.connectionHealth === 'error'
                ? 'Error'
                : 'Unknown'}
          </span>
        )}
        {integration.messagesFlowing && (
          <span className="flex items-center gap-1 text-primary">
            <Activity className="w-3 h-3" />
            Messages flowing
          </span>
        )}
      </div>
      {onConfigure ? (
        <button
          type="button"
          onClick={() => onConfigure(integration.id)}
          className="mt-3 text-sm text-primary hover:underline font-medium"
        >
          Configure
        </button>
      ) : null}
    </div>
  )
}
