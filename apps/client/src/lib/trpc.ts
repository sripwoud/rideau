import { createTRPCProxyClient, httpBatchLink, type HTTPHeaders } from '@trpc/client'
import config from 'client/l/config'
import type { AppRouter } from 'server/trpc/trpc.router'

let headers: HTTPHeaders

export const setHeaders = (newHeaders: HTTPHeaders) => {
  headers = newHeaders
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      headers: () => headers,
      url: `${config.serverUrl}/trpc`,
    }),
  ],
})
