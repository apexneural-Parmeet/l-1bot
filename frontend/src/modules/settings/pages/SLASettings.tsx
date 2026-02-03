import { PageHeader } from '@/components/layout'
import { UpgradeCard } from '../components/UpgradeCard'

export function SLASettings() {
  return (
    <div>
      <PageHeader
        title="Service Level Agreements"
        description="Service Level Agreements (SLAs) are contracts that define clear expectations between your team and customers. They establish standards for response and resolution times, creating a framework for accountability and ensures a consistent, high-quality experience."
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about SLA &gt;</a>
      </p>
      <UpgradeCard
        title="Upgrade to create SLAs"
        description="The SLA feature is only available in the Business and Enterprise plans. Upgrade your plan to get access to advanced features like team management, automations, custom attributes, and more."
        footerText="You can change or cancel your plan anytime"
      />
    </div>
  )
}
