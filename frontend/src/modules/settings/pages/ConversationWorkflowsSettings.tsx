import { useState } from 'react'
import { PageHeader } from '@/components/layout'
import { UpgradeCard } from '../components/UpgradeCard'

export function ConversationWorkflowsSettings() {
  const [autoResolve, setAutoResolve] = useState(false)

  return (
    <div>
      <PageHeader
        title="Conversation Workflows"
        description="Configure rules and required fields for conversation resolution."
      />
      <div className="space-y-8 max-w-2xl">
        <section className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-text">Auto-resolve conversations</h2>
              <p className="mt-1 text-sm text-text-muted">
                This configuration would allow you to automatically resolve the conversation after a certain period of inactivity.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoResolve}
              onClick={() => setAutoResolve((v) => !v)}
              className={`
                relative w-11 h-6 rounded-full transition-colors shrink-0
                ${autoResolve ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
              className={`
                absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                ${autoResolve ? 'left-[26px]' : 'left-1'}
              `}
              />
            </button>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text mb-2">Attributes required on resolution</h2>
          <p className="text-sm text-text-muted mb-4">
            When resolving a conversation, agents will be prompted to fill these attributes if they haven&apos;t yet.
          </p>
          <UpgradeCard
            title="Upgrade to use required attributes"
            description="The required conversation attributes feature is available on the Business and Enterprise plans. Upgrade your plan to prompt agents to fill required attributes before conversation resolution."
            footerText="You can change or cancel your plan anytime"
          />
        </section>
      </div>
    </div>
  )
}
