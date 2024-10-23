'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { alchemyConfig } from 'client/l/account-kit'
import { trpc, TrpcClient } from 'client/l/trpc'
import { type PropsWithChildren, useState } from 'react'

export const Providers = ({ children, initialState }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(TrpcClient)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore FIXME */}
        <AlchemyAccountProvider config={alchemyConfig} initialState={initialState} queryClient={queryClient}>
          {children}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
