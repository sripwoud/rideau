import { type INestApplication, Injectable } from '@nestjs/common'
import { TrpcService } from '@server/trpc/trpc.service'
import * as trpcExpress from '@trpc/server/adapters/express'
import { z } from 'zod'

// potentially abstract in several routers
// https://trpc.io/docs/server/merging-routers
@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    // can inject other services in the trpc router!
    // private readonly otherService: OtherService,
  ) {}

  appRouter = this.trpc.router({
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
    scan: this.trpc.procedure.input(z.object({ name: z.string() })).mutation(async ({ input }) => {
      // wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true, message: `Scanned ${input.name}`, redirectUrl: '/success' }
    }),
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    )
  }
}

export type AppRouter = TrpcRouter['appRouter']
