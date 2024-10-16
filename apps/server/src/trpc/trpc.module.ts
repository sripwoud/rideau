import { Module } from '@nestjs/common'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { BandadaService } from 'server/bandada/bandada.service'
import { SupabaseService } from 'server/supabase/supabase.service'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Module({
  imports: [],
  controllers: [],
  providers: [BandadaService, BandadaRouter, SupabaseService, TrpcService, TrpcRouter],
})
export class TrpcModule {}
