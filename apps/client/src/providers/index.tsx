'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyAccountProvider } from '@account-kit/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { alchemyConfig } from 'client/l/account-kit'
import { queryClient } from 'client/l/react-query'
import type { PropsWithChildren } from 'react'

export const Providers = ({ initialState, children }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => (
  <QueryClientProvider client={queryClient}>
    {/* @ts-ignore FIXME */}
    <AlchemyAccountProvider
      config={alchemyConfig}
      initialState={initialState}
      queryClient={queryClient}
    >
      {children}
    </AlchemyAccountProvider>
  </QueryClientProvider>
)
