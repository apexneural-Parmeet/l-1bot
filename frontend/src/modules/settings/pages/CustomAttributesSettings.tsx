import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { Tabs } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Code2 } from 'lucide-react'
import { CustomAttributeList, AddCustomAttributeModal } from '../components/custom-attributes'
import { getCustomAttributes, createCustomAttribute } from '../services/custom-attributes.api'
import type { CustomAttribute } from '../types'

type AppliesToTab = 'conversation' | 'contact'

/**
 * CustomAttributesSettings – Custom Attributes page: description, Learn more, Add Custom Attribute, tabs Conversation/Contact, empty state or list.
 */
export function CustomAttributesSettings() {
  const [activeTab, setActiveTab] = useState<AppliesToTab>('conversation')
  const [allAttributes, setAllAttributes] = useState<CustomAttribute[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getCustomAttributes('conversation'),
      getCustomAttributes('contact'),
    ]).then(([conv, contact]) => {
      setAllAttributes([...conv, ...contact])
      setLoading(false)
    })
  }, [])

  const attributesForTab = allAttributes.filter((a) => a.appliesTo === activeTab)

  const handleCreate = async (payload: {
    appliesTo: 'conversation' | 'contact'
    displayName: string
    key: string
    description: string
    attributeType: string
    regexValidation: boolean
  }) => {
    const created = await createCustomAttribute(payload)
    setAllAttributes((prev) => [...prev, created])
  }

  const tabContent =
    loading ? (
      <CustomAttributeList attributes={[]} loading />
    ) : attributesForTab.length === 0 ? (
      <div className="rounded-lg border border-border bg-surface">
        <EmptyState
          icon={<Code2 />}
          title="There are no custom attributes created"
        />
      </div>
    ) : (
      <CustomAttributeList attributes={attributesForTab} />
    )

  const tabs = [
    { id: 'conversation' as const, label: 'Conversation', content: tabContent },
    { id: 'contact' as const, label: 'Contact', content: tabContent },
  ]

  return (
    <div>
      <PageHeader
        title="Custom Attributes"
        description="A custom attribute tracks additional details about your contacts or conversations—such as the subscription plan or the date of their first purchase. You can add different types of custom attributes, such as text, lists, or numbers, to capture the specific information you need."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            + Add Custom Attribute
          </Button>
        }
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">
          Learn more about custom attributes &gt;
        </a>
      </p>
      <Tabs
        tabs={tabs}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as AppliesToTab)}
      />
      <AddCustomAttributeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
