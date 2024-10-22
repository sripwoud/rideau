import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AuthRouter } from 'server/auth/auth.router'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { createContext } from 'server/trpc/trpc.context'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly auth: AuthRouter,
    private readonly bandada: BandadaRouter,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    auth: this.auth.router,
    bandada: this.bandada.router,
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        createContext,
        router: this.router,
      }),
    )
  }
}

export type Router = TrpcRouter['router']
