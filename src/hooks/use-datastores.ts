import { useState, useEffect } from 'react'
import type { Datastore } from '@/types/datastore'

const mockDatastores: Datastore[] = [
  { id: '1', name: 'User Data', description: 'Contains user information' },
  { id: '2', name: 'Product Catalog', description: 'List of all products' },
  { id: '3', name: 'Order History', description: 'Customer order records' },
  { id: '4', name: 'Analytics', description: 'Website usage statistics' },
  { id: '5', name: 'Inventory', description: 'Current stock levels' },
]

export function useDatastores() {
  const [datastores, setDatastores] = useState<Datastore[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDatastores = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setDatastores(mockDatastores)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setIsLoading(false)
      }
    }

    fetchDatastores()
  }, [])

  return { datastores, isLoading, error }
}
