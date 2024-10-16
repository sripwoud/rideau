import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bandadaRouter: BandadaRouter,
  ) {}

  router = this.trpc.router({
    debug: this.trpc.procedure.query(() => 'debugging trpc merged router'),
    bandada: this.bandadaRouter.router,
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
