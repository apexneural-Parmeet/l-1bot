export interface ChannelSelectorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const CHANNELS = [
  { id: 'website', label: 'Website' },
  { id: 'email', label: 'Email' },
  { id: 'api', label: 'API' },
]

export function ChannelSelector({ value, onChange, className = '' }: ChannelSelectorProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-text-muted mb-2">Channel</label>
      <div className="flex flex-wrap gap-2">
        {CHANNELS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onChange(ch.id)}
            className={`
              px-3 py-2 rounded-lg border text-sm font-medium transition-colors
              ${value === ch.id
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-border text-text-muted hover:bg-white/5'}
            `}
          >
            {ch.label}
          </button>
        ))}
      </div>
    </div>
  )
}
