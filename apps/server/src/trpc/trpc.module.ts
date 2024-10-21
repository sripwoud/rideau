import { Module } from '@nestjs/common'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsRouter } from 'server/commitments/commitments.router'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { SupabaseProvider } from 'server/supabase/supabase.provider'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Module({
  providers: [
    BandadaService,
    BandadaRouter,
    CommitmentsRouter,
    CommitmentsService,
    SupabaseProvider,
    TrpcService,
    TrpcRouter,
  ],
})
export class TrpcModule {}
