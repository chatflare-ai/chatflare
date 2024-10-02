import type { Datastore } from '@/types/datastore'

interface DatastoresGridProps {
  datastores: Datastore[]
}

export function DatastoresGrid({ datastores }: DatastoresGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {datastores.map(datastore => (
        <div
          key={datastore.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold">{datastore.name}</h3>
          <p className="text-sm text-gray-500">{datastore.description}</p>
        </div>
      ))}
    </div>
  )
}
