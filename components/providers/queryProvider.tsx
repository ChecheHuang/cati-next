'use client'

import trpcClient from '@/lib/trpc/trpcClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import superjson from 'superjson'

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})
const createClient = trpcClient.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
})

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(defaultQueryClient)
  const [client] = useState(createClient)
  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </trpcClient.Provider>
  )
}
function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
