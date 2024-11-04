import { trpc } from 'client/l/trpc'
import { useEffect, useState } from 'react'
import type { QuestionStatsDto } from 'server/questions/dto'

// TODO: handle free text questions
/**
 * Fetches initial question stats and subscribes to new feedbacks creations
 */
export const useQuestionStats = ({ questionId }: QuestionStatsDto) => {
  const [no, setNo] = useState(0)
  const [yes, setYes] = useState(0)
  const { data, isLoading } = trpc.questions.stats.useQuery({ questionId, type: 'boolean' }, {
    initialData: { no: 0, yes: 0 },
  })

  useEffect(() => {
    if (data === undefined) return
    setNo(data.no)
    setYes(data.yes)
  }, [data])

  trpc.feedbacks.onInsert.useSubscription(undefined, {
    onData: ({ data: { feedback, question_id } }) => {
      console.log({ feedback, question_id })
      if (question_id === questionId) {
        if (feedback === 'yes') setYes((prev) => prev + 1)
        else if (feedback === 'no') setNo((prev) => prev + 1)
      }
    },
  })

  return { isLoading, no, yes }
}
