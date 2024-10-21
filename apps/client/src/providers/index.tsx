'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { alchemyConfig } from 'client/l/account-kit'
import { type PropsWithChildren, useState } from 'react'

export const Providers = ({ children, initialState }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  // wrapping in useState to ensure each request gets a unique client (in case SSR is used)
  // https://trpc.io/docs/client/react/setup#4-add-trpc-providers
  const [alchemyQueryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={alchemyQueryClient}>
      {/* @ts-ignore FIXME alchemy/tanstack/trpc versions incompatible?*/}
      <AlchemyAccountProvider config={alchemyConfig} initialState={initialState} queryClient={alchemyQueryClient}>
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  )
}
