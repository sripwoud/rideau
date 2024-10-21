'use client'
import type { AlchemyClientState } from '@account-kit/core'
import { AlchemyProvider } from 'client/p/AlchemyProvider'
import type { PropsWithChildren } from 'react'

export const Providers = ({ children, initialState }: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  return (
    // @ts-ignore FIXME
    <AlchemyProvider initialState={initialState}>
      {children}
    </AlchemyProvider>
  )
}
