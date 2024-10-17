import { Injectable } from '@nestjs/common'
import { initTRPC } from '@trpc/server'
import type { Context } from 'server/trpc/trpc.context'

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<Context>().create()
  procedure = this.trpc.procedure
  router = this.trpc.router
  mergeRouters = this.trpc.mergeRouters
}
