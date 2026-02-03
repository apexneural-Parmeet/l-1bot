import { Input } from '@/components/ui'
import { Search } from 'lucide-react'

export interface ConversationSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

/**
 * ConversationSearch: Filters conversation list by query.
 * Parent (ConversationList) holds search state and filters list.
 */
export function ConversationSearch({
  value,
  onChange,
  placeholder = 'Search conversations...',
  className = '',
}: ConversationSearchProps) {
  return (
    <div className={className}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftAddon={<Search className="w-4 h-4" />}
        className="border-0 bg-surface rounded-lg"
      />
    </div>
  )
}
