import { Module } from '@nestjs/common'
import { AlchemyProxyController } from 'server/alchemy-proxy/alchemy-proxy.controller'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { AuthService } from 'server/auth/auth.service'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { SupabaseService } from 'server/supabase/supabase.service'
import { TrpcModule } from 'server/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AlchemyProxyController, AppController],
  providers: [AppService, AuthService, BandadaService, CommitmentsService, SupabaseService],
})
export class AppModule {}
