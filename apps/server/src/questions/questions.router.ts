import { Injectable } from '@nestjs/common'
import { on } from 'node:events'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class QuestionsRouter {
  constructor(
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    // TODO: validate output/payload https://trpc.io/docs/server/subscriptions#output-validation
    onQuestionChange: this.trpc.procedure
      .subscription(async function*({ ctx: { events }, signal }) {
        for await (
          // TODO use a var to refer to the event name
          const [payload] of on(events, 'questions.change', {
            // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
            signal,
          })
        ) {
          yield payload
        }
      }),
  })
}
