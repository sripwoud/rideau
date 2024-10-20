'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClientProvider as TrpcQueryClientProvider } from '@tanstack/react-query-4'
import { QueryClientProvider as AlchemyQueryClientProvider } from '@tanstack/react-query-5'
import { alchemyConfig } from 'client/l/account-kit'
import { AlchemyQueryClient, TrpcQueryClient } from 'client/l/react-query'
import { trpc, TrpcClient } from 'client/l/trpc'
import { type PropsWithChildren, useState } from 'react'

export const Providers = ({ children, initialState }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  // wrapping in useState to ensure each request gets a unique client (in case SSR is used)
  // https://trpc.io/docs/client/react/setup#4-add-trpc-providers
  const [alchemyQueryClient] = useState(AlchemyQueryClient)
  const [trpcQueryClient] = useState(TrpcQueryClient)
  const [trpcClient] = useState(TrpcClient)

  return (
    // @ts-ignore
    <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
      <TrpcQueryClientProvider client={trpcQueryClient}>
        <AlchemyQueryClientProvider client={alchemyQueryClient}>
          {/* @ts-ignore FIXME alchemy/tanstack/trpc versions incompatible?*/}
          <AlchemyAccountProvider config={alchemyConfig} initialState={initialState} queryClient={alchemyQueryClient}>
            {children}
          </AlchemyAccountProvider>
        </AlchemyQueryClientProvider>
      </TrpcQueryClientProvider>
    </trpc.Provider>
  )
}
