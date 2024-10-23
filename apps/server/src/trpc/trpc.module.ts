import { Module } from '@nestjs/common'
import { AuthRouter } from 'server/auth/auth.router'
import { AuthService } from 'server/auth/auth.service'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsRouter } from 'server/commitments/commitments.router'
import { CommitmentsService } from 'server/commitments/commitments.service'
// import { FeedbacksRouter } from 'server/feedbacks/feedbacks.router'
// import { FeedbacksService } from 'server/feedbacks/feedbacks.service'
import { NullifiersRouter } from 'server/nullifiers/nullifiers.router'
import { NullifiersService } from 'server/nullifiers/nullifiers.service'
import { RootsRouter } from 'server/roots/roots.router'
import { RootsService } from 'server/roots/roots.service'
import { SupabaseProvider } from 'server/supabase/supabase.provider'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Module({
  providers: [
    AuthRouter,
    AuthService,
    BandadaService,
    BandadaRouter,
    CommitmentsRouter,
    CommitmentsService,
    //  FeedbacksRouter,
    //  FeedbacksService,
    NullifiersRouter,
    NullifiersService,
    RootsRouter,
    RootsService,
    SupabaseProvider,
    TrpcService,
    TrpcRouter,
  ],
})
export class TrpcModule {}
