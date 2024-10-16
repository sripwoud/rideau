import type { HTTPHeaders } from '@trpc/client'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import config from 'client/l/config'
import type { Router } from 'server/trpc/trpc.router'

let headers: HTTPHeaders

export const setHeaders = (newHeaders: HTTPHeaders) => {
  headers = newHeaders
}

export const trpc = createTRPCReact<Router>()

export const TrpcClient = () =>
  trpc.createClient({
    links: [
      httpBatchLink({
        headers: () => headers,
        url: `${config.serverUrl}/trpc`,
      }),
    ],
  })
