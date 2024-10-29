import { Module } from '@nestjs/common'
import { AlchemyProxyController } from 'server/alchemy-proxy/alchemy-proxy.controller'
import { AuthService } from 'server/auth/auth.service'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { GroupsService } from 'server/groups/groups.service'
import { QuestionsService } from 'server/questions/questions.service'
import { RootsService } from 'server/roots/roots.service'
import { SupabaseService } from 'server/supabase/supabase.service'
import { TrpcModule } from 'server/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AlchemyProxyController],
  providers: [
    AuthService,
    CommitmentsService,
    GroupsService,
    QuestionsService,
    RootsService,
    SupabaseService,
  ],
})
export class AppModule {}
