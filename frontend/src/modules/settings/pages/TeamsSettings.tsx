import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { Users } from 'lucide-react'
import { TeamList, CreateTeamModal } from '../components/teams'
import { getTeams, createTeam } from '../services/teams.api'
import type { Team } from '../types'

/**
 * TeamsSettings – Teams page: description, Learn more, Create new team, empty state or TeamList.
 */
export function TeamsSettings() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const loadTeams = () => {
    setLoading(true)
    getTeams().then((data) => {
      setTeams(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadTeams()
  }, [])

  const handleCreate = async (payload: {
    name: string
    description: string
    allowAutoAssign: boolean
  }) => {
    const created = await createTeam(payload)
    setTeams((prev) => [...prev, created])
  }

  return (
    <div>
      <PageHeader
        title="Teams"
        description="Teams allow you to organize agents into groups based on their responsibilities. An agent can belong to multiple teams. When working collaboratively, you can assign conversations to specific teams."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            + Create new team
          </Button>
        }
      />
      <p className="mb-4">
        <a href="#" className="text-sm text-primary hover:underline">
          Learn more about teams &gt;
        </a>
      </p>
      {loading ? (
        <TeamList teams={[]} loading />
      ) : teams.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface">
          <EmptyState
            icon={<Users />}
            title="There are no teams created on this account."
            action={
              <Button onClick={() => setModalOpen(true)}>
                + Create new team
              </Button>
            }
          />
        </div>
      ) : (
        <TeamList teams={teams} />
      )}
      <CreateTeamModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
