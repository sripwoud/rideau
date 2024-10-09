import { createTRPCProxyClient, httpBatchLink, type HTTPHeaders } from '@trpc/client'
import type { AppRouter } from 'server/trpc/trpc.router'

// TODO: make this configurable and/or use env vars
const PORT = 3001
const PROD_URL = 'https://rideau.fly.dev'
const url = process.env.NODE_ENV === 'production' ? PROD_URL : `http://localhost:${PORT}`

let headers: HTTPHeaders

export const setHeaders = (newHeaders: HTTPHeaders) => {
  headers = newHeaders
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      headers: () => headers,
      url: `${url}/trpc`,
    }),
  ],
})
