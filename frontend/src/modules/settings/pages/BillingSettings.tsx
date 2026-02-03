import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { MessageCircle } from 'lucide-react'

export function BillingSettings() {
  return (
    <div>
      <PageHeader
        title="Billing"
        description="Manage your subscription here, upgrade your plan and get more for your team."
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">View Pricing &gt;</a>
      </p>
      <div className="space-y-6 max-w-2xl">
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Manage your subscription</h2>
          <p className="mt-1 text-sm text-text-muted">
            View your previous invoices, edit your billing details, or cancel your subscription.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 text-sm">
              <p className="text-text"><span className="font-medium">Current Plan:</span> Hacker</p>
              <p className="text-text-muted"><span className="font-medium">Number of seats:</span> 2</p>
            </div>
            <Button>Go to the billing portal</Button>
          </div>
        </section>
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Captain</h2>
          <p className="mt-1 text-sm text-text-muted">
            Captain is not available on the free plan, upgrade now to get access to assistants, copilot and more.
          </p>
          <div className="mt-4">
            <Button variant="secondary">Upgrade now</Button>
          </div>
        </section>
        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text">Need help?</h2>
          <p className="mt-1 text-sm text-text-muted">
            Do you face any issues in billing? We are here to help.
          </p>
          <div className="mt-4">
            <Button variant="secondary" className="inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat with us
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
