import { Skeleton } from "@/components/ui/skeleton"

export function DatastoresViewSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-[200px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
