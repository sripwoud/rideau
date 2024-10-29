import { Module } from '@nestjs/common'
import { AuthRouter } from 'server/auth/auth.router'
import { AuthService } from 'server/auth/auth.service'
import { CommitmentsRouter } from 'server/commitments/commitments.router'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { FeedbacksRouter } from 'server/feedbacks/feedbacks.router'
import { FeedbacksService } from 'server/feedbacks/feedbacks.service'
import { GroupsRouter } from 'server/groups/groups.router'
import { GroupsService } from 'server/groups/groups.service'
import { NullifiersService } from 'server/nullifiers/nullifiers.service'
import { QuestionsRouter } from 'server/questions/questions.router'
import { QuestionsService } from 'server/questions/questions.service'
import { RootsService } from 'server/roots/roots.service'
import { SupabaseService } from 'server/supabase/supabase.service'
import { TrpcContext } from 'server/trpc/trpc.context'
import { TrpcRouter } from 'server/trpc/trpc.router'
import { TrpcService } from 'server/trpc/trpc.service'

@Module({
  providers: [
    AuthRouter,
    AuthService,
    CommitmentsRouter,
    CommitmentsService,
    FeedbacksRouter,
    FeedbacksService,
    GroupsRouter,
    GroupsService,
    NullifiersService,
    QuestionsRouter,
    QuestionsService,
    RootsService,
    SupabaseService,
    TrpcContext,
    TrpcRouter,
    TrpcService,
  ],
})
export class TrpcModule {}
