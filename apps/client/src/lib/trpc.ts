import { httpBatchLink } from '@trpc/client'
import { clientConfig } from 'client/l/config'
import { createTRPCJotai } from 'jotai-trpc'
import type { Router } from 'server/trpc/trpc.router'

export const trpc = createTRPCJotai<Router>({
  links: [
    httpBatchLink({
      fetch(url, options) {
        return fetch(url, { ...options, credentials: 'include' })
      },
      url: `${clientConfig.serverUrl}/trpc`,
    }),
  ],
})
