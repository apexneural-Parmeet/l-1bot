import type { ReactNode } from 'react'
import { MessageSquare, Mail, Send, Globe } from 'lucide-react'

export interface ChannelOption {
  id: string
  name: string
  description: string
  icon: ReactNode
  available: boolean
}

const CHANNELS: ChannelOption[] = [
  { id: 'website', name: 'Website', description: 'Create a live-chat widget', icon: <Globe className="w-6 h-6" />, available: true },
  { id: 'facebook', name: 'Facebook', description: 'Connect your Facebook page', icon: <MessageSquare className="w-6 h-6" />, available: true },
  { id: 'whatsapp', name: 'WhatsApp', description: 'Connect WhatsApp Business', icon: <MessageSquare className="w-6 h-6" />, available: true },
  { id: 'sms', name: 'SMS', description: 'Integrate with Twilio SMS', icon: <MessageSquare className="w-6 h-6" />, available: true },
  { id: 'email', name: 'Email', description: 'Connect your support email', icon: <Mail className="w-6 h-6" />, available: true },
  { id: 'api', name: 'API', description: 'Custom channels via API', icon: <Send className="w-6 h-6" />, available: true },
  { id: 'telegram', name: 'Telegram', description: 'Connect Telegram bot', icon: <MessageSquare className="w-6 h-6" />, available: true },
  { id: 'voice', name: 'Voice', description: 'Integrate with Twilio Voice', icon: <MessageSquare className="w-6 h-6" />, available: false },
]

export interface ChannelGridProps {
  onSelect?: (channelId: string) => void
}

/**
 * ChannelGrid – grid of channel options for new inbox (Website, Facebook, WhatsApp, etc.), with "Coming Soon" for unavailable.
 */
export function ChannelGrid({ onSelect }: ChannelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CHANNELS.map((ch) => (
        <button
          key={ch.id}
          type="button"
          disabled={!ch.available}
          onClick={() => ch.available && onSelect?.(ch.id)}
          className={`
            flex flex-col items-start gap-2 p-4 rounded-xl border text-left
            transition-colors
            ${ch.available
              ? 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
              : 'border-border bg-surface/50 opacity-60 cursor-not-allowed'}
          `}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-text-muted">
            {ch.icon}
          </div>
          <div>
            <p className="font-medium text-text">{ch.name}</p>
            <p className="text-sm text-text-muted">{ch.description}</p>
          </div>
          {!ch.available ? (
            <span className="text-xs font-medium text-text-muted">Coming Soon!</span>
          ) : null}
        </button>
      ))}
    </div>
  )
}
