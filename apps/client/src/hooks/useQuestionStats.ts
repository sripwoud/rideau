import { trpc } from 'client/l/trpc'
import type { QuestionStatsDto } from 'server/questions/dto'

export const useQuestionStats = ({ questionId }: QuestionStatsDto) => {
  // TODO: handle free text questions
  return trpc.questions.stats.useQuery({ questionId, type: 'boolean' }, {
    initialData: { no: 0, yes: 0 },
  })
}
