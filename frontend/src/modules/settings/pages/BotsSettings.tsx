import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Bot } from 'lucide-react'
import { AddBotModal } from '../components/bots'
import type { Bot as BotItem } from '../types'

async function getBots(): Promise<BotItem[]> {
  return []
}

export function BotsSettings() {
  const [bots, setBots] = useState<BotItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getBots().then((data) => {
      setBots(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async (payload: { name: string; description: string; webhookUrl: string }) => {
    const created: BotItem = {
      id: String(Date.now()),
      name: payload.name,
      description: payload.description,
      webhookUrl: payload.webhookUrl,
    }
    setBots((prev) => [...prev, created])
  }

  return (
    <div>
      <PageHeader
        title="Bots"
        description="Agent Bots are like the most fabulous members of your team. They can handle the small stuff, so you can focus on the stuff that matters. Give them a try. You can manage your bots from this page or create new ones using the 'Add Bot' button."
        actions={<Button onClick={() => setModalOpen(true)}>+ Add Bot</Button>}
      />
      <p className="mb-6">
        <a href="#" className="text-sm text-primary hover:underline">Learn about agent bots &gt;</a>
      </p>

      {/* Bot configuration: System Prompt, Confidence Threshold, Fallback (minimal) */}
      <section className="rounded-lg border border-border bg-surface p-6 mb-8 max-w-2xl">
        <h2 className="text-lg font-semibold text-text mb-4">Bot configuration</h2>
        <div className="space-y-4">
          <Textarea
            label="System Prompt"
            placeholder="Instructions for the AI when handling conversations."
            rows={4}
            className="resize-y"
          />
          <Input
            label="Confidence Threshold"
            type="number"
            min={0}
            max={1}
            step={0.05}
            placeholder="0.8"
          />
          <Input
            label="Fallback Message"
            placeholder="Message shown when AI is unsure or escalates."
          />
        </div>
      </section>

      {loading ? (
        <div className="rounded-lg border border-border bg-surface py-12 text-center text-text-muted">Loading…</div>
      ) : bots.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<Bot />}
            title="No bots found. You can create a bot by clicking the 'Add Bot' button."
            action={<Button onClick={() => setModalOpen(true)}>+ Add Bot</Button>}
          />
        </div>
      ) : (
        <ul className="rounded-lg border border-border bg-surface divide-y divide-border">
          {bots.map((b) => (
            <li key={b.id} className="px-4 py-4">
              <p className="font-medium text-text">{b.name}</p>
              <p className="text-sm text-text-muted">{b.description}</p>
            </li>
          ))}
        </ul>
      )}
      <AddBotModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
