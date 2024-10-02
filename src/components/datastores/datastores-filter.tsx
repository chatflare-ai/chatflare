import { Input } from '@/components/ui/input'

interface DatastoresFilterProps {
  filter: string
  setFilter: (filter: string) => void
}

export function DatastoresFilter({ filter, setFilter }: DatastoresFilterProps) {
  return (
    <Input
      type="text"
      placeholder="Filter datastores..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
      className="max-w-sm"
    />
  )
}
