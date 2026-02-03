import { MessageCircle } from 'lucide-react'

export interface WidgetLauncherProps {
  onClick: () => void
  title?: string
  className?: string
}

/**
 * WidgetLauncher: Floating button to open the chat widget.
 * Styled in isolation; mobile-first.
 */
export function WidgetLauncher({ onClick, title = 'Chat', className = '' }: WidgetLauncherProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className={`
        w-14 h-14 rounded-full bg-primary text-white shadow-lg
        flex items-center justify-center hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  )
}
