import { useState } from 'react'
import { WidgetLauncher } from './WidgetLauncher'
import { WidgetChat } from './WidgetChat'

/**
 * WidgetRoot: Entry for embeddable chat widget.
 * Iframe-based: host page loads an iframe pointing to this app with ?widget=1.
 * Widget is mounted independently; styled in isolation (mobile-first).
 */
export interface WidgetRootProps {
  widgetKey?: string
  position?: 'bottom-right' | 'bottom-left'
  title?: string
}

export function WidgetRoot({
  widgetKey = 'default',
  position = 'bottom-right',
  title = 'Chat',
}: WidgetRootProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`
        fixed z-[9999] font-sans text-base
        ${position === 'bottom-right' ? 'right-4 bottom-4' : 'left-4 bottom-4'}
      `}
      data-widget-key={widgetKey}
    >
      {open ? (
        <WidgetChat onClose={() => setOpen(false)} title={title} />
      ) : (
        <WidgetLauncher onClick={() => setOpen(true)} title={title} />
      )}
    </div>
  )
}
