import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { CommitmentsRouter } from 'server/commitments/commitments.router'
import { createContext } from 'server/trpc/trpc.context'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly bandada: BandadaRouter,
    private readonly commitments: CommitmentsRouter,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    bandada: this.bandada.router,
    commitments: this.commitments.router,
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
