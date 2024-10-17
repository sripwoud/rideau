import { Module } from '@nestjs/common'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { AuthController } from 'server/auth/auth.controller'
import { AuthService } from 'server/auth/auth.service'
import { SupabaseProvider } from 'server/supabase/supabase.provider'
import { TrpcModule } from 'server/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, SupabaseProvider],
})
export class AppModule {}
