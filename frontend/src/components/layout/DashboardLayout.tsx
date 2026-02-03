import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import type { SidebarNavItem } from './Sidebar'

export interface DashboardLayoutProps {
  sidebarCollapsed: boolean
  onSidebarToggle: () => void
  sidebarNavItems: SidebarNavItem[]
  sidebarHeader?: ReactNode
  sidebarFooter?: ReactNode
  renderSidebarItem: (item: SidebarNavItem) => ReactNode
  /** Current pathname for sidebar active state and auto-expand */
  pathname?: string
  topBarLeft?: ReactNode
  topBarRight?: ReactNode
  topBarSearch?: ReactNode
  topBarTitle?: string
  children: ReactNode
  role?: 'agent' | 'admin'
  className?: string
}

/**
 * DashboardLayout: Wraps agent/admin dashboard with Sidebar + TopBar + main content.
 * Supports role-based rendering: pass different nav items / topBar right for agent vs admin.
 * State: sidebar collapsed typically from layout store (Zustand).
 */
export function DashboardLayout({
  sidebarCollapsed,
  onSidebarToggle,
  sidebarNavItems,
  sidebarHeader,
  sidebarFooter,
  renderSidebarItem,
  pathname,
  topBarLeft,
  topBarRight,
  topBarSearch,
  topBarTitle,
  children,
  className = '',
}: DashboardLayoutProps) {
  return (
    <div className={`flex h-full bg-bg text-text ${className}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={onSidebarToggle}
        navItems={sidebarNavItems}
        header={sidebarHeader}
        footer={sidebarFooter}
        renderNavItem={renderSidebarItem}
        pathname={pathname}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopBar
          title={topBarTitle}
          left={topBarLeft}
          right={topBarRight}
          search={topBarSearch}
        />
        <main className="flex-1 overflow-auto p-5 bg-bg/50" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}
