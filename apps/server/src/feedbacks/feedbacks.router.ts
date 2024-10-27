import { Injectable } from '@nestjs/common'
import { CreateFeedbackDto, SendFeedbackDto } from 'server/feedbacks/dto'
import { FeedbacksService } from 'server/feedbacks/feedbacks.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class FeedbacksRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly feedbacks: FeedbacksService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateFeedbackDto).query(async ({ input }) => this.feedbacks.create(input)),
    send: this.trpc.procedure.input(SendFeedbackDto).mutation(async ({ input }) => this.feedbacks.send(input)),
  })
}
