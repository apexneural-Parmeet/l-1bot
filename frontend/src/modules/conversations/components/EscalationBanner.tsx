import { AlertCircle } from 'lucide-react'
import { TakeoverButton } from '@/components/agent'

export interface EscalationBannerProps {
  reason?: string
  escalatedAt?: string
  onTakeOver?: () => void
  className?: string
}

/**
 * EscalationBanner: Shows escalation reason, timestamp, and Take Over CTA inside ticket detail.
 */
export function EscalationBanner({
  reason = 'Escalation requested',
  escalatedAt,
  onTakeOver,
  className = '',
}: EscalationBannerProps) {
  const timeStr = escalatedAt
    ? new Date(escalatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    : null

  return (
    <div
      className={`
        flex items-center justify-between gap-4 p-3 rounded-lg border bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <div className="flex items-start gap-2 min-w-0">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#F59E0B]" />
        <div>
          <p className="text-sm font-medium">{reason}</p>
          {timeStr ? <p className="text-xs opacity-90 mt-0.5">{timeStr}</p> : null}
        </div>
      </div>
      {onTakeOver ? (
        <TakeoverButton onClick={onTakeOver} label="Take Over" className="shrink-0" />
      ) : null}
    </div>
  )
}
