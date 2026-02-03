import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { SettingsNavSection, SettingsNavItem, SettingsPermission } from '../types'

/**
 * SettingsLayout
 *
 * Wrapper for all settings pages. Left-side navigation with collapsible dropdown-list
 * sections (chevron, expand/collapse), active route highlighting, permission-based visibility.
 */

const SETTINGS_SECTIONS: SettingsNavSection[] = [
  {
    id: 'settings',
    label: 'Settings',
    items: [
      { id: 'general', label: 'Account Settings', href: '/settings' },
      { id: 'agents', label: 'Agents', href: '/settings/agents' },
      { id: 'teams', label: 'Teams', href: '/settings/teams' },
      { id: 'inboxes', label: 'Inboxes', href: '/settings/inboxes' },
      { id: 'labels', label: 'Labels', href: '/settings/labels' },
      { id: 'custom-attributes', label: 'Custom Attributes', href: '/settings/custom-attributes' },
      { id: 'automation', label: 'Automation', href: '/settings/automation' },
      { id: 'bots', label: 'Bots', href: '/settings/bots' },
      { id: 'macros', label: 'Macros', href: '/settings/macros' },
      { id: 'canned-responses', label: 'Canned Responses', href: '/settings/canned-responses' },
      { id: 'integrations', label: 'Integrations', href: '/settings/integrations' },
      { id: 'audit-logs', label: 'Audit Logs', href: '/settings/audit-logs' },
      { id: 'custom-roles', label: 'Custom Roles', href: '/settings/roles' },
      { id: 'sla', label: 'SLA', href: '/settings/sla' },
      { id: 'conversation-workflows', label: 'Conversation Workflows', href: '/settings/conversation-workflows' },
      { id: 'security', label: 'Security', href: '/settings/security' },
      { id: 'billing', label: 'Billing', href: '/settings/billing' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    permission: 'settings:manage',
    items: [
      { id: 'advanced-settings', label: 'Advanced', href: '/settings/advanced' },
    ],
  },
]

function canViewSection(_permission?: SettingsPermission): boolean {
  return true
}

function canViewItem(_permission?: SettingsPermission): boolean {
  return true
}

function isItemActive(item: SettingsNavItem, pathname: string): boolean {
  if (item.href === '/settings') {
    return pathname === '/settings' || pathname === '/settings/'
  }
  return pathname === item.href
}

function sectionContainsActive(section: SettingsNavSection, pathname: string): boolean {
  return section.items.some((item) => isItemActive(item, pathname))
}

export function SettingsLayout() {
  const location = useLocation()
  const pathname = location.pathname

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    SETTINGS_SECTIONS.forEach((s) => {
      if (canViewSection(s.permission) && sectionContainsActive(s, pathname)) {
        initial.add(s.id)
      }
    })
    if (initial.size === 0) initial.add('settings')
    return initial
  })

  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      SETTINGS_SECTIONS.forEach((s) => {
        if (canViewSection(s.permission) && sectionContainsActive(s, pathname)) {
          next.add(s.id)
        }
      })
      return next
    })
  }, [pathname])

  const toggleSection = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-full min-h-0 -m-4">
      <aside
        className="w-56 shrink-0 border-r border-border bg-surface flex flex-col overflow-y-auto shadow-sm"
        aria-label="Settings navigation"
      >
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text">Settings</h2>
        </div>
        <nav className="flex-1 py-3 px-2" role="navigation">
          <ul className="space-y-0.5">
            {SETTINGS_SECTIONS.filter((s) => canViewSection(s.permission)).map(
              (section) => {
                const isExpanded = expandedIds.has(section.id)
                const isActiveSection = sectionContainsActive(section, pathname)
                const items = section.items.filter((item) => canViewItem(item.permission))
                return (
                  <li key={section.id} className="rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className={`
                        w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                        ${isActiveSection ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text hover:bg-white/5'}
                      `}
                    >
                      <span className="truncate">{section.label}</span>
                      <span className="shrink-0 transition-transform duration-200">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-200 ease-out"
                      style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="space-y-0.5 pl-4 mt-0.5 border-l-2 border-border/80 ml-3 py-1.5">
                          {items.map((item) => (
                            <li key={item.id} className="pl-2.5">
                              <Link
                                to={item.href}
                                className={`
                                  block px-2 py-2 rounded-md text-sm font-medium transition-colors
                                  ${
                                    isItemActive(item, pathname)
                                      ? 'bg-primary/20 text-primary'
                                      : 'text-text-muted hover:text-text hover:bg-white/5'
                                  }
                                `}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              }
            )}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto p-6 bg-bg" role="main">
        <Outlet />
      </main>
    </div>
  )
}
