import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AuthRouter } from 'server/auth/auth.router'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bandadaRouter: BandadaRouter,
    private readonly authRouter: AuthRouter,
  ) {}

  router = this.trpc.router({
    auth: this.authRouter.router,
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

export type Router = TrpcRouter['router']
