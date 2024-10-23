import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AuthRouter } from 'server/auth/auth.router'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { CommitmentsRouter } from 'server/commitments/commitments.router'
import { NullifiersRouter } from 'server/nullifiers/nullifiers.router'
// import { FeedbacksRouter } from 'server/feedbacks/feedbacks.router'
import { RootsRouter } from 'server/roots/roots.router'
import { createContext } from 'server/trpc/trpc.context'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly auth: AuthRouter,
    private readonly bandada: BandadaRouter,
    private readonly commitments: CommitmentsRouter,
    //  private readonly feedbacks: FeedbacksRouter,
    private readonly nullifiers: NullifiersRouter,
    private readonly roots: RootsRouter,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    auth: this.auth.router,
    bandada: this.bandada.router,
    commitments: this.commitments.router,
    // feedbacks: this.feedbacks.router,
    nullifiers: this.nullifiers.router,
    roots: this.roots.router,
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
