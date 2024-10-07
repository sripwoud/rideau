import type { AppRouter } from '@server/trpc/trpc.router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

// TODO: make this configurable and/or use env vars
const PORT = 3001
const PROD_URL = 'https://rideau.fly.dev'
const url = process.env.NODE_ENV === 'production' ? PROD_URL : `http://localhost:${PORT}`

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${url}/trpc`,
    }),
  ],
})
