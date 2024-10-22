import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { inferRouterOutputs } from '@trpc/server'
import { clientConfig } from 'client/l/config'
import type { Router } from 'server/trpc/trpc.router'

export const trpc = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      fetch(url, options) {
        return fetch(url, { ...options, credentials: 'include' })
      },
      url: `${clientConfig.serverUrl}/trpc`,
    }),
  ],
})

type RouterOutputs = inferRouterOutputs<Router>
export type BandadaGetGroupOutput = RouterOutputs['bandada']['getGroup']
