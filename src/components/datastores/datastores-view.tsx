'use client'

import { useQueryState } from 'nuqs'
import { DatastoresList } from './datastores-list'
import { DatastoresGrid } from './datastores-grid'
import { DatastoresFilter } from './datastores-filter'
import { ViewToggle } from './view-toggle'
import type { Datastore } from '@/types/datastore'

export function DatastoresView({ datastores }: { datastores: Datastore[] }) {
  const [view, setView] = useQueryState('view', { defaultValue: 'grid' })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <DatastoresFilter />
        <ViewToggle view={view} setView={setView} />
      </div>
      {view === "list" ? (
        <DatastoresList datastores={datastores} />
      ) : (
        <DatastoresGrid datastores={datastores} />
      )}
    </div>
  )
}
