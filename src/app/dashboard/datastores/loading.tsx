import { DatastoresViewSkeleton } from '@/components/datastores/datastores-view-skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Datastores</h1>
      <DatastoresViewSkeleton />
    </div>
  )
}
