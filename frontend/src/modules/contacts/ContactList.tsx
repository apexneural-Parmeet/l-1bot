import { useState } from 'react'
import { PageHeader } from '@/components/layout'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { User } from 'lucide-react'

/**
 * ContactList: Lists contacts with search; scaffold only.
 * ContactProfile / ContactDetails / EditContactModal / MergeContactsModal are separate components (stubs).
 */
const MOCK_CONTACTS = [
  { id: '1', name: 'Jane Doe', email: 'jane@example.com', avatarUrl: null },
  { id: '2', name: 'John Smith', email: 'john@example.com', avatarUrl: null },
]

export function ContactList() {
  const [contacts] = useState(MOCK_CONTACTS)
  const [search, setSearch] = useState('')

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <PageHeader
        title="Contacts"
        description="Manage customer contacts."
        actions={<Button>Add contact</Button>}
      />
      <div className="mb-4 max-w-md">
        <Input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon={<User />}
          title="No contacts"
          description="Contacts will appear here."
        />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {filtered.map((c) => (
            <li key={c.id} className="px-4 py-3 flex items-center gap-3 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-primary font-medium">
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-text">{c.name}</p>
                <p className="text-sm text-text-muted">{c.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
