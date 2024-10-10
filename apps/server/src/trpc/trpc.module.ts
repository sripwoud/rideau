import { Module } from '@nestjs/common'
import { SupabaseService } from 'server/supabase/supabase.service'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'
import { UsersRouter } from 'server/users/users.router'
import { UsersService } from 'server/users/users.service'

@Module({
  imports: [],
  controllers: [],
  providers: [SupabaseService, TrpcService, TrpcRouter, UsersRouter, UsersService],
})
export class TrpcModule {}
