import { Injectable } from '@nestjs/common'
import { TRPCError } from '@trpc/server'
import { magic } from 'server/l/magic'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    login: this.trpc.procedure.query(async ({ ctx: { didToken } }) => {
      try {
        if (didToken === null) return { error: 'No did token parsed' }
        magic.token.validate(didToken)
        return { authenticated: true }
      } catch (error) {
        // FIXME: avoid type assertion
        // TODO: construct an TRPCError enum
        return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: (error as Error).message })
      }
    }),
  })
}
