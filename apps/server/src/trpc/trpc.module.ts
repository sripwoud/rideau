import { Module } from '@nestjs/common'
import { AuthRouter } from 'server/auth/auth.router'
import { AuthService } from 'server/auth/auth.service'
import { BandadaRouter } from 'server/bandada/bandada.router'
import { BandadaService } from 'server/bandada/bandada.service'
import { SemaphoresService } from 'server/semaphores/semaphores.service'
import { SupabaseProvider } from 'server/supabase/supabase.provider'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Module({
  providers: [
    AuthRouter,
    AuthService,
    BandadaService,
    BandadaRouter,
    SemaphoresService,
    SupabaseProvider,
    TrpcService,
    TrpcRouter,
  ],
})
export class TrpcModule {}
