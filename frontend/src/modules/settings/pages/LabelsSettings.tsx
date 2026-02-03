import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Tag } from 'lucide-react'
import { LabelsList, AddLabelModal } from '../components/labels'
import { getLabels, createLabel } from '../services/labels.api'
import type { Label } from '../types'

/**
 * LabelsSettings – Labels page: description, Learn more, Add label, empty state or LabelsList.
 */
export function LabelsSettings() {
  const [labels, setLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getLabels().then((data) => {
      setLabels(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async (payload: {
    name: string
    description: string
    color: string
    showOnSidebar: boolean
  }) => {
    const created = await createLabel(payload)
    setLabels((prev) => [...prev, created])
  }

  return (
    <div>
      <PageHeader
        title="Labels"
        description="Labels help you categorize and prioritize conversations and leads. You can assign a label to a conversation or contact using the side panel."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            + Add label
          </Button>
        }
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">
          Learn more about labels &gt;
        </a>
      </p>
      {loading ? (
        <LabelsList labels={[]} loading />
      ) : labels.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<Tag />}
            title="There are no labels available in this account."
            action={
              <Button onClick={() => setModalOpen(true)}>
                + Add label
              </Button>
            }
          />
        </div>
      ) : (
        <LabelsList labels={labels} />
      )}
      <AddLabelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
