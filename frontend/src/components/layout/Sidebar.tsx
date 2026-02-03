import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export interface SidebarNavItem {
  id: string
  label: string
  href?: string
  icon?: ReactNode
  badge?: string | number
  children?: SidebarNavItem[]
}

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  navItems: SidebarNavItem[]
  header?: ReactNode
  footer?: ReactNode
  renderNavItem: (item: SidebarNavItem) => ReactNode
  /** Current pathname for active state and auto-expand group containing active route */
  pathname?: string
  role?: 'agent' | 'admin'
  className?: string
}

function hasActiveChild(children: SidebarNavItem[], pathname: string): boolean {
  return children.some((c) => c.href === pathname || (c.href && pathname.startsWith(c.href + '/')))
}

/**
 * Sidebar: Collapsible nav with dropdown-list feel.
 * Groups with children expand/collapse with chevron; active route auto-expands and highlights.
 */
export function Sidebar({
  collapsed,
  onToggleCollapse,
  navItems,
  header,
  footer,
  renderNavItem,
  pathname = '',
  className = '',
}: SidebarProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!pathname) return
    setExpandedIds((prev) => {
      const next = new Set(prev)
      navItems.forEach((item) => {
        if (item.children?.length && hasActiveChild(item.children, pathname)) {
          next.add(item.id)
        }
      })
      return next
    })
  }, [pathname, navItems])

  const toggleGroup = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside
      className={`
        flex flex-col border-r border-border bg-sidebar text-text
        transition-[width] duration-200 ease-in-out shrink-0
        shadow-sm
        ${collapsed ? 'w-[72px]' : 'w-64'}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      aria-label="Main navigation"
    >
      {header ? (
        <div className="flex items-center justify-between h-14 px-3 border-b border-border shrink-0 min-h-[3.5rem]">
          {!collapsed ? header : null}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="text-lg font-medium">{collapsed ? '→' : '←'}</span>
          </button>
        </div>
      ) : (
        <div className="h-14 flex items-center justify-end px-2 border-b border-border shrink-0">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="text-lg">{collapsed ? '→' : '←'}</span>
          </button>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2" role="navigation">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            if (item.children?.length) {
              const isExpanded = expandedIds.has(item.id) && !collapsed
              const isActiveGroup = hasActiveChild(item.children, pathname)
              return (
                <li key={item.id} className="rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => !collapsed && toggleGroup(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                      ${isActiveGroup ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text hover:bg-white/5'}
                    `}
                  >
                    {item.icon}
                    {!collapsed && (
                      <>
                        <span className="truncate flex-1">{item.label}</span>
                        <span className="shrink-0 transition-transform duration-200">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </span>
                      </>
                    )}
                  </button>
                  {/* Drop list: collapsible child list with indent and left border */}
                  {!collapsed && (
                    <div
                      className="grid transition-[grid-template-rows] duration-200 ease-out"
                      style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="space-y-0.5 pl-4 mt-0.5 border-l-2 border-border/80 ml-3 py-1.5">
                          {item.children.map((child) => (
                            <li key={child.id} className="pl-2.5 [&>a]:py-2 [&>a]:text-sm [&>a]:rounded-md">
                              {renderNavItem(child)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              )
            }
            return (
              <li key={item.id} className="rounded-lg">
                {renderNavItem(item)}
              </li>
            )
          })}
        </ul>
      </nav>
      {footer ? (
        <div className="border-t border-border p-2 shrink-0 bg-sidebar/80">{footer}</div>
      ) : null}
    </aside>
  )
}
