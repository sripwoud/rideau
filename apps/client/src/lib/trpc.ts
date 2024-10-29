import { httpBatchLink, splitLink, unstable_httpSubscriptionLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { clientConfig } from 'client/l/config'
import type { Router } from 'server/trpc/trpc.router'

const url = `${clientConfig.serverUrl}/trpc`
export const trpc = createTRPCReact<Router>()

export const TrpcClient = () =>
  trpc.createClient({
    links: [
      splitLink({
        condition: ({ type }) => type === 'subscription',
        true: unstable_httpSubscriptionLink({ url }),
        false: httpBatchLink({
          url,
        }),
      }),
    ],
  })
