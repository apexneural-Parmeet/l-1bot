import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/ui'
import { Plus, X } from 'lucide-react'

const EVENTS = ['Conversation Created', 'Conversation Updated', 'Message Created', 'Conversation Resolved']
const CONDITION_ATTRS = ['Status', 'Assignee', 'Label', 'Priority']
const CONDITION_OPS = ['Equal to', 'Not equal to', 'Contains', 'Is empty']
const ACTION_TYPES = ['Assign to Agent', 'Add Label', 'Send Email', 'Set Priority']

export interface AddAutomationRuleModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: {
    name: string
    description: string
    event: string
    conditions: { attribute: string; operator: string; value: string }[]
    actions: { type: string; value: string }[]
  }) => Promise<void>
}

export function AddAutomationRuleModal({ isOpen, onClose, onCreate }: AddAutomationRuleModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [event, setEvent] = useState('Conversation Created')
  const [conditions, setConditions] = useState([{ attribute: 'Status', operator: 'Equal to', value: '' }])
  const [actions, setActions] = useState([{ type: 'Assign to Agent', value: '' }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setDescription('')
    setEvent('Conversation Created')
    setConditions([{ attribute: 'Status', operator: 'Equal to', value: '' }])
    setActions([{ type: 'Assign to Agent', value: '' }])
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const addCondition = () => {
    setConditions((c) => [...c, { attribute: 'Status', operator: 'Equal to', value: '' }])
  }
  const removeCondition = (i: number) => {
    setConditions((c) => c.filter((_, idx) => idx !== i))
  }
  const updateCondition = (i: number, field: 'attribute' | 'operator' | 'value', val: string) => {
    setConditions((c) => c.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)))
  }

  const addAction = () => {
    setActions((a) => [...a, { type: 'Assign to Agent', value: '' }])
  }
  const removeAction = (i: number) => {
    setActions((a) => a.filter((_, idx) => idx !== i))
  }
  const updateAction = (i: number, field: 'type' | 'value', val: string) => {
    setActions((a) => a.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)))
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter a rule name.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onCreate({ name: name.trim(), description: description.trim(), event, conditions, actions })
      handleClose()
    } catch (_e) {
      setError('Failed to create rule. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Automation Rule"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>Create</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label="Rule Name" placeholder="Enter rule name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Description" placeholder="Enter rule description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Event</label>
          <select value={event} onChange={(e) => setEvent(e.target.value)} className="w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/50">
            {EVENTS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Conditions</label>
          <div className="space-y-2">
            {conditions.map((c, i) => (
              <div key={i} className="flex items-center gap-2 flex-wrap">
                <select value={c.attribute} onChange={(e) => updateCondition(i, 'attribute', e.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
                  {CONDITION_ATTRS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={c.operator} onChange={(e) => updateCondition(i, 'operator', e.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
                  {CONDITION_OPS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={c.value} onChange={(e) => updateCondition(i, 'value', e.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text min-w-[100px]">
                  <option value="">Select</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button type="button" onClick={() => removeCondition(i)} className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10" aria-label="Remove condition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addCondition} className="flex items-center gap-1 text-sm text-primary hover:underline">
              <Plus className="w-4 h-4" /> Add Condition
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Actions</label>
          <div className="space-y-2">
            {actions.map((a, i) => (
              <div key={i} className="flex items-center gap-2 flex-wrap">
                <select value={a.type} onChange={(e) => updateAction(i, 'type', e.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text">
                  {ACTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={a.value} onChange={(e) => updateAction(i, 'value', e.target.value)} className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text min-w-[120px]">
                  <option value="">Select</option>
                  <option value="agent1">Agent 1</option>
                  <option value="agent2">Agent 2</option>
                </select>
                <button type="button" onClick={() => removeAction(i)} className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10" aria-label="Remove action">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addAction} className="flex items-center gap-1 text-sm text-primary hover:underline">
              <Plus className="w-4 h-4" /> Add Action
            </button>
          </div>
        </div>
        {error ? <p className="text-sm text-error">{error}</p> : null}
      </div>
    </Modal>
  )
}
