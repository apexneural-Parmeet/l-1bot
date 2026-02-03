import { useState } from 'react'
import { WidgetContainer } from './components/WidgetContainer'
import { WidgetHeader } from './components/WidgetHeader'
import { WidgetMessageList } from './components/WidgetMessageList'
import { WidgetMessageInput } from './components/WidgetMessageInput'
import { PreChatForm } from './components/PreChatForm'

export interface WidgetChatProps {
  onClose: () => void
  title?: string
  requirePreChat?: boolean
}

/**
 * WidgetChat: Full chat view (header, message list, input).
 * Can show PreChatForm first if requirePreChat; otherwise goes to message list.
 * Mountable independently; styled in isolation.
 */
export function WidgetChat({
  onClose,
  title = 'Chat',
  requirePreChat = false,
}: WidgetChatProps) {
  const [preChatDone, setPreChatDone] = useState(!requirePreChat)

  if (!preChatDone) {
    return (
      <WidgetContainer>
        <WidgetHeader title={title} onClose={onClose} />
        <PreChatForm onSubmit={() => setPreChatDone(true)} />
      </WidgetContainer>
    )
  }

  return (
    <WidgetContainer>
      <WidgetHeader title={title} onClose={onClose} />
      <WidgetMessageList conversationId="widget-1" />
      <WidgetMessageInput conversationId="widget-1" />
    </WidgetContainer>
  )
}
