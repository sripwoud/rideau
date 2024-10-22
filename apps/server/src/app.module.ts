import { Module } from '@nestjs/common'
import { AlchemyProxyController } from 'server/alchemy-proxy/alchemy-proxy.controller'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { SupabaseProvider } from 'server/supabase/supabase.provider'
import { TrpcModule } from 'server/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AlchemyProxyController, AppController],
  providers: [AppService, BandadaService, CommitmentsService, SupabaseProvider],
})
export class AppModule {}
