import { Injectable } from '@nestjs/common'
import { on } from 'node:events'
import { CreateFeedbackDto, SendFeedbackDto } from 'server/feedbacks/dto'
import { Feedback } from 'server/feedbacks/entities'
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
    onInsert: this.trpc.procedure.subscription(async function*({ ctx: { events }, signal }) {
      for await (const [payload] of on(events, 'feedbacks.change', { signal }))
        yield payload as { type: 'INSERT'; data: Feedback }
    }),
  })
}
