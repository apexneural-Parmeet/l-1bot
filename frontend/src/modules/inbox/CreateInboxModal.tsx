import { Modal } from '@/components/ui'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { ChannelSelector } from './ChannelSelector'
import { useState } from 'react'

export interface CreateInboxModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateInboxModal({ isOpen, onClose }: CreateInboxModalProps) {
  const [name, setName] = useState('')
  const [channel, setChannel] = useState('website')

  const handleSubmit = () => {
    // Stub: call API to create inbox
    onClose()
    setName('')
    setChannel('website')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create inbox"
      footer={
        <>
          <Modal.CloseButton onClose={onClose} />
          <Button onClick={handleSubmit}>Create</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Website Support"
        />
        <ChannelSelector value={channel} onChange={setChannel} />
      </div>
    </Modal>
  )
}
