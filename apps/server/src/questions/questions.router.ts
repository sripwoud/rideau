import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter, on } from 'node:events'
import { EE } from 'server/ee/event-emitter.provider'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class QuestionsRouter {
  constructor(
    @Inject(EE) private readonly ee: EventEmitter,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    // TODO: validate output https://trpc.io/docs/server/subscriptions#output-validation
    onQuestionChange: this.trpc.procedure
      .subscription(async () => {
        const ee = this.ee
        return async function*({ signal }: { signal?: AbortSignal }) {
          for await (
            const [payload] of on(ee, 'question.change', {
              // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
              signal,
            })
          ) {
            yield payload
          }
        }
      }),
  })
}
