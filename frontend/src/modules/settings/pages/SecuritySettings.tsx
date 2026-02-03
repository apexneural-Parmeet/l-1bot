import { PageHeader } from '@/components/layout'
import { UpgradeCard } from '../components/UpgradeCard'

export function SecuritySettings() {
  return (
    <div>
      <PageHeader
        title="Security"
        description="Manage your account security settings."
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">Learn more about SAML SSO &gt;</a>
      </p>
      <UpgradeCard
        title="Upgrade to enable SAML SSO"
        description="The SAML SSO feature is only available in the Enterprise plans. Upgrade your plan to get access to SAML single sign-on and other advanced features."
        footerText="You can change or cancel your plan anytime"
      />
    </div>
  )
}
