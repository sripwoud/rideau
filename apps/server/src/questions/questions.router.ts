import { Injectable } from '@nestjs/common'
import { on } from 'node:events'
import { CreateQuestionDto, FindAllQuestionsDto, FindQuestionDto, ToggleQuestionDto } from 'server/questions/dto'
import { Question } from 'server/questions/entities'
import { QuestionsService } from 'server/questions/questions.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class QuestionsRouter {
  constructor(
    private readonly questions: QuestionsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateQuestionDto).mutation(async ({ input }) => this.questions.create(input)),
    find: this.trpc.procedure.input(FindQuestionDto).query(async ({ input }) => this.questions.find(input)),
    findAll: this.trpc.procedure.input(FindAllQuestionsDto).query(async ({ input }) => this.questions.findAll(input)),
    // TODO: validate output/payload https://trpc.io/docs/server/subscriptions#output-validation
    onChange: this
      .trpc
      .procedure
      .subscription(async function*({ ctx: { events }, signal }) {
        for await (
          // TODO use a var or enum to refer to the event name?
          const [payload] of on(events, 'questions.change', {
            // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
            signal,
          })
        ) {
          // TODO improve typing (probably need a typed EventEmmitter custom class?)
          yield payload as { type: 'INSERT' | 'UPDATE'; data: Question }
        }
      }),
    toggle: this.trpc.procedure.input(ToggleQuestionDto).mutation(async ({ input }) => this.questions.toggle(input)),
  })
}
