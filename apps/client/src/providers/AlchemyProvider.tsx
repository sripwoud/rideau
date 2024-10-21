import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { alchemyConfig } from 'client/l/account-kit'
import { type PropsWithChildren, useState } from 'react'

export const AlchemyProvider = (
  { children, initialState }: PropsWithChildren<{ initialState?: AlchemyClientState }>,
) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore FIXME */}
      <AlchemyAccountProvider config={alchemyConfig} initialState={initialState} queryClient={queryClient}>
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  )
}
