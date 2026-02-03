import { Button } from '@/components/ui'
import { UserCircle } from 'lucide-react'

export interface TakeoverButtonProps {
  onClick?: () => void
  label?: string
  className?: string
}

/**
 * TakeoverButton: CTA for human to take over. UI only.
 */
export function TakeoverButton({
  onClick,
  label = 'Take Over',
  className = '',
}: TakeoverButtonProps) {
  return (
    <Button onClick={onClick} className={`inline-flex items-center gap-2 ${className}`}>
      <UserCircle className="w-4 h-4" />
      {label}
    </Button>
  )
}
