import { Injectable } from '@nestjs/common'
import { CreateFeedbackDto } from 'server/feedbacks/dto/create-feedback.dto'
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
    findAll: this.trpc.procedure.query(this.feedbacks.findAll),
  })
}
