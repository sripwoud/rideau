import { Module } from '@nestjs/common'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { TrpcModule } from 'server/trpc/trpc.module'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { SupabaseProvider } from './supabase/supabase.provider'

@Module({
  imports: [TrpcModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, SupabaseProvider],
})
export class AppModule {}
