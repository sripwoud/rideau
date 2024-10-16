'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { alchemyConfig } from 'client/l/account-kit'
import { QueryClient } from 'client/l/react-query'
import { trpc, TrpcClient } from 'client/l/trpc'
import { type PropsWithChildren, useState } from 'react'

export const Providers = ({ initialState, children }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  // wrapping in useState to ensure each request gets a unique client (in case SSR is used)
  // https://trpc.io/docs/client/react/setup#4-add-trpc-providers
  const [queryClient] = useState(QueryClient)
  const [trpcClient] = useState(TrpcClient)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider
          config={alchemyConfig}
          initialState={initialState}
          // @ts-ignore FIXME tanstack/rpc bug?
          queryClient={queryClient}
        >
          {children}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
