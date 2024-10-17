'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from 'client/l/react-query'
import { trpc, TrpcClient } from 'client/l/trpc'
import { type ReactNode, useState } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  // wrapping in useState to ensure each request gets a unique client (in case SSR is used)
  // https://trpc.io/docs/client/react/setup#4-add-trpc-providers
  const [queryClient] = useState(QueryClient)
  const [trpcClient] = useState(TrpcClient)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
