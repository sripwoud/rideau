import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { magic } from 'server/l/magic'
// TODO: null is devil
// import {Option,Some,None} from '@hazae41/option'
// import {Result, Ok} from '@hazae41/result'

export function createContext({ req }: CreateExpressContextOptions) {
  function getDidTokenFromHeader() {
    if (req.headers.authorization)
      return magic.utils.parseAuthorizationHeader(req.headers.authorization)
    return null
  }

  return { didToken: getDidTokenFromHeader() }
}

export type Context = typeof createContext
