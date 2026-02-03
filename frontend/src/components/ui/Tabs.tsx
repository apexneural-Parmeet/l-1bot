import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-1 border-b border-border mb-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeId === tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
              ${activeId === tab.id
                ? 'bg-surface text-primary border-b-2 border-primary -mb-px'
                : 'text-text-muted hover:text-text hover:bg-white/5'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {tabs.find((t) => t.id === activeId)?.content}
      </div>
    </div>
  )
}
