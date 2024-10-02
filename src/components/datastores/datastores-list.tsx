import type { Datastore } from '@/types/datastore'

interface DatastoresListProps {
  datastores: Datastore[]
}

export function DatastoresList({ datastores }: DatastoresListProps) {
  return (
    <div className="space-y-4">
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
