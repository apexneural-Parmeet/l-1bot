import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui'
import { Dropdown } from '@/components/ui'

export interface ConversationActionsProps {
  conversationId: string
  className?: string
}

const moreItems = [
  { id: 'assign', label: 'Assign', onClick: () => {} },
  { id: 'resolve', label: 'Resolve', onClick: () => {} },
  { id: 'merge', label: 'Merge', onClick: () => {} },
]

/**
 * ConversationActions: Resolve dropdown (primary) + "..." menu (Assign, Resolve, Merge).
 */
export function ConversationActions({ conversationId: _conversationId, className = '' }: ConversationActionsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Dropdown
        trigger={
          <Button variant="secondary" size="sm">
            Resolve
          </Button>
        }
        items={[{ id: 'resolve', label: 'Resolve conversation', onClick: () => {} }]}
        align="right"
      />
      <Dropdown
        trigger={
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5" />
          </Button>
        }
        items={moreItems}
        align="right"
      />
    </div>
  )
}
