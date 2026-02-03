import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/app/providers'
import { DashboardLayout } from '@/components/layout'
import { useLayoutStore } from '@/stores/layoutStore'
import { InboxView } from '@/modules/inbox/InboxView'
import { ConversationsView } from '@/modules/conversations/ConversationsView'
import { ContactList } from '@/modules/contacts/ContactList'
import { Login } from '@/modules/auth/Login'
import { Signup } from '@/modules/auth/Signup'
import { ForgotPassword } from '@/modules/auth/ForgotPassword'
import { ResetPassword } from '@/modules/auth/ResetPassword'
import { TwoFactorAuth } from '@/modules/auth/TwoFactorAuth'
import {
  SettingsLayout,
  GeneralSettings,
  WorkspaceSettings,
  UsersSettings,
  AgentsSettings,
  TeamsSettings,
  InboxesSettings,
  LabelsSettings,
  CustomAttributesSettings,
  AutomationSettings,
  BotsSettings,
  MacrosSettings,
  CannedResponsesSettings,
  IntegrationsSettings,
  AuditLogsSettings,
  RolesSettings,
  SLASettings,
  ConversationWorkflowsSettings,
  PermissionsSettings,
  WebhooksSettings,
  SecuritySettings,
  BillingSettings,
  AdvancedSettings,
  StubSettings,
} from '@/modules/settings/pages'
import { MessageSquare, Inbox, Users, Zap, BarChart3, Settings, Send } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Avatar } from '@/components/ui'
import type { SidebarNavItem } from '@/components/layout'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

function DashboardWithNav({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar)
  const { user } = useAuth()
  const location = useLocation()
  const navItems: SidebarNavItem[] = [
    { id: 'inbox', label: 'My Inbox', href: '/', icon: <Inbox className="w-5 h-5 shrink-0" />, badge: 1 },
    {
      id: 'conversations',
      label: 'Conversations',
      icon: <MessageSquare className="w-5 h-5 shrink-0" />,
      children: [
        { id: 'conversations-all', label: 'All Conversations', href: '/conversations' },
        { id: 'conversations-mentions', label: 'Mentions', href: '/conversations/mentions' },
        { id: 'conversations-unattended', label: 'Unattended', href: '/conversations/unattended' },
      ],
    },
    {
      id: 'channels',
      label: 'Channels',
      icon: <Send className="w-5 h-5 shrink-0" />,
      children: [
        { id: 'channel-rajnot_bot', label: 'rajnot_bot', href: '/conversations/channels/rajnot_bot', icon: <Send className="w-4 h-4 shrink-0" /> },
      ],
    },
    { id: 'contacts', label: 'Contacts', href: '/contacts', icon: <Users className="w-5 h-5 shrink-0" /> },
    { id: 'automations', label: 'Automations', href: '/automations', icon: <Zap className="w-5 h-5 shrink-0" /> },
    { id: 'reports', label: 'Reports', href: '/reports', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
    { id: 'settings', label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5 shrink-0" /> },
  ]
  const renderItem = (item: SidebarNavItem) => (
    <Link
      key={item.id}
      to={item.href ?? '#'}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${location.pathname === item.href ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-text hover:bg-white/5'}
      `}
    >
      {item.icon}
      <span className="truncate">{item.label}</span>
      {item.badge != null ? (
        <span className="ml-auto bg-primary/30 text-primary text-xs font-medium px-1.5 py-0.5 rounded">
          {item.badge}
        </span>
      ) : null}
    </Link>
  )
  const sidebarFooter = user ? (
    <div className="flex items-center gap-3 px-2 py-3 min-w-0">
      <Avatar name={user.name} size="sm" className="shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text truncate">{user.name}</p>
        <p className="text-xs text-text-muted truncate">{user.email}</p>
      </div>
    </div>
  ) : null
  return (
    <DashboardLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={toggleSidebar}
      sidebarNavItems={navItems}
      renderSidebarItem={renderItem}
      pathname={location.pathname}
      sidebarHeader={<span className="font-semibold text-text truncate">Support</span>}
      sidebarFooter={sidebarFooter}
      topBarRight={
        user ? (
          <span className="text-sm text-text-muted truncate max-w-[120px]">{user.name}</span>
        ) : null
      }
    >
      {children}
    </DashboardLayout>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/two-factor',
    element: <TwoFactorAuth />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: (
          <DashboardWithNav>
            <InboxView />
          </DashboardWithNav>
        ),
      },
      {
        path: '/conversations',
        element: (
          <DashboardWithNav>
            <ConversationsView />
          </DashboardWithNav>
        ),
      },
      {
        path: '/conversations/mentions',
        element: (
          <DashboardWithNav>
            <ConversationsView />
          </DashboardWithNav>
        ),
      },
      {
        path: '/conversations/unattended',
        element: (
          <DashboardWithNav>
            <ConversationsView />
          </DashboardWithNav>
        ),
      },
      {
        path: '/conversations/channels/:channelId',
        element: (
          <DashboardWithNav>
            <ConversationsView />
          </DashboardWithNav>
        ),
      },
      {
        path: '/contacts',
        element: (
          <DashboardWithNav>
            <ContactList />
          </DashboardWithNav>
        ),
      },
      {
        path: '/automations',
        element: (
          <DashboardWithNav>
            <div className="p-4">
              <p className="text-text-muted">Automations (structure only)</p>
            </div>
          </DashboardWithNav>
        ),
      },
      {
        path: '/reports',
        element: (
          <DashboardWithNav>
            <div className="p-4">
              <p className="text-text-muted">Reports & Analytics (stub)</p>
            </div>
          </DashboardWithNav>
        ),
      },
      {
        path: '/settings',
        element: (
          <DashboardWithNav>
            <SettingsLayout />
          </DashboardWithNav>
        ),
        children: [
          { index: true, element: <GeneralSettings /> },
          { path: 'workspace', element: <WorkspaceSettings /> },
          { path: 'users', element: <UsersSettings /> },
          { path: 'agents', element: <AgentsSettings /> },
          { path: 'teams', element: <TeamsSettings /> },
          { path: 'inboxes', element: <InboxesSettings /> },
          { path: 'labels', element: <LabelsSettings /> },
          { path: 'custom-attributes', element: <CustomAttributesSettings /> },
          { path: 'automation', element: <AutomationSettings /> },
          { path: 'bots', element: <BotsSettings /> },
          { path: 'macros', element: <MacrosSettings /> },
          { path: 'canned-responses', element: <CannedResponsesSettings /> },
          { path: 'integrations', element: <IntegrationsSettings /> },
          { path: 'audit-logs', element: <AuditLogsSettings /> },
          { path: 'roles', element: <RolesSettings /> },
          { path: 'sla', element: <SLASettings /> },
          { path: 'conversation-workflows', element: <ConversationWorkflowsSettings /> },
          { path: 'permissions', element: <PermissionsSettings /> },
          { path: 'webhooks', element: <WebhooksSettings /> },
          { path: 'security', element: <SecuritySettings /> },
          { path: 'billing', element: <BillingSettings /> },
          { path: 'advanced', element: <AdvancedSettings /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
