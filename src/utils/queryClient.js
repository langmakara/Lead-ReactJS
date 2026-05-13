import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 1, // Retry only once
    },
  },
})   

export default queryClient;