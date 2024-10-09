import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AuthRouter } from 'server/auth/auth.router'
import { createContext } from 'server/trpc/context'
import { TrpcService } from 'server/trpc/trpc.service'
import { UsersRouter } from 'server/users/users.router'
import { z } from 'zod'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly authRouter: AuthRouter,
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
  ) {}

  router = this.trpc.router({
    auth: this.authRouter.router,
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
        createContext,
      }),
    )
  }
}

export type AppRouter = TrpcRouter['router']
