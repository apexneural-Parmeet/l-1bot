import { Lock } from 'lucide-react'
import { Button } from '@/components/ui'

export interface UpgradeCardProps {
  title: string
  description: string
  onUpgrade?: () => void
  footerText?: string
}

/**
 * UpgradeCard – padlock icon, title, description, "Upgrade now" button, optional footer.
 */
export function UpgradeCard({ title, description, onUpgrade, footerText }: UpgradeCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 max-w-xl">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <p className="mt-2 text-sm text-text-muted">{description}</p>
          <Button className="mt-4" onClick={onUpgrade}>
            Upgrade now
          </Button>
          {footerText ? (
            <p className="mt-3 text-xs text-text-muted">{footerText}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
