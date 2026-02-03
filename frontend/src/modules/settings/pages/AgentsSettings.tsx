import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { UserList, InviteUserModal } from '../components/users'
import { getUsers, inviteUser } from '../services/users.api'

/**
 * AgentsSettings – Agents page: list agents, Add Agent modal, Learn about user roles.
 */
export function AgentsSettings() {
  const [users, setUsers] = useState<import('../types').AgentUser[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const loadUsers = () => {
    setLoading(true)
    getUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleInvite = async (payload: { name: string; email: string; role: string }) => {
    await inviteUser(payload)
    loadUsers()
  }

  return (
    <div>
      <PageHeader
        title="Agents"
        description="An agent is a member of your customer support team who can view and respond to user messages. The list below shows all the agents in your account."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            + Add Agent
          </Button>
        }
      />
      <p className="mb-4">
        <Link
          to="/settings/roles"
          className="text-sm text-primary hover:underline"
        >
          Learn about user roles &gt;
        </Link>
      </p>
      <UserList users={users} loading={loading} />
      <InviteUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  )
}
