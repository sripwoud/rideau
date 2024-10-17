import { Option } from '@hazae41/option'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createContext = ({ req }: CreateExpressContextOptions) => ({
  token: Option.wrap<string>(req.cookies?.['access-token']),
})

export type Context = typeof createContext
