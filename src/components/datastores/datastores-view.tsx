'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { DatastoresList } from './datastores-list'
import { DatastoresGrid } from './datastores-grid'
import { DatastoresFilter } from './datastores-filter'
import { ViewToggle } from './view-toggle'
import { useDatastores } from '@/hooks/use-datastores'

export function DatastoresView() {
  const [view, setView] = useQueryState('view', { defaultValue: 'list' })
  const [filter, setFilter] = useState('')
  const { datastores, isLoading, error } = useDatastores()

  const filteredDatastores = datastores.filter(datastore =>
    datastore.name.toLowerCase().includes(filter.toLowerCase())
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <DatastoresFilter filter={filter} setFilter={setFilter} />
        <ViewToggle view={view} setView={setView} />
      </div>
      {view === 'list' ? (
        <DatastoresList datastores={filteredDatastores} />
      ) : (
        <DatastoresGrid datastores={filteredDatastores} />
      )}
    </div>
  )
}
