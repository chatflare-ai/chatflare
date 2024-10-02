import { DatastoresView } from '@/components/datastores/datastores-view'

export default function DatastoresPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Datastores</h1>
      <DatastoresView />
    </div>
  )
}
