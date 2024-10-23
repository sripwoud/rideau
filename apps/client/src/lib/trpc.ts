import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import type { inferRouterOutputs } from '@trpc/server'
import { clientConfig } from 'client/l/config'
import type { Router } from 'server/trpc/trpc.router'

export const trpc = createTRPCReact<Router>()

export const TrpcClient = () =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: `${clientConfig.serverUrl}/trpc`,
      }),
    ],
  })

type RouterOutputs = inferRouterOutputs<Router>
export type BandadaGetGroupOutput = RouterOutputs['bandada']['getGroup']
