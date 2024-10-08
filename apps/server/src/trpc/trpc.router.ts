import { type INestApplication, Injectable } from '@nestjs/common'
import { TrpcService } from '@server/trpc/trpc.service'
import { UsersRouter } from '@server/users/users.router'
import * as trpcExpress from '@trpc/server/adapters/express'
import { z } from 'zod'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
  ) {}

  router = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input
        return {
          greeting: `Hello ${name !== undefined ? name : 'Anon'}`,
        }
      }),
    users: this.usersRouter.router,
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.router,
      }),
    )
  }
}

export type AppRouter = TrpcRouter['router']
