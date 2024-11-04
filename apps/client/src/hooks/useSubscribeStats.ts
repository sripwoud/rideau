import { trpc } from 'client/l/trpc'
import { questionTypeAtom } from 'client/state/questions/atom'
import * as actions from 'client/state/stats/actions'
import { statsAtomFamily } from 'client/state/stats/atom'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const useSubscribeStats = ({ groupId, questionId }: { groupId: string; questionId: number }) => {
  const dispatch = useSetAtom(statsAtomFamily(questionId))
  const questionType = useAtomValue(questionTypeAtom)({ groupId, questionId })
  const { data: stats } = trpc.questions.stats.useQuery({ questionId, type: questionType })

  useEffect(() => {
    if (stats === undefined) return
    dispatch(actions.init(stats))
  }, [stats])

  trpc.feedbacks.onInsert.useSubscription({ questionId }, {
    onData: ({ data: { feedback, question_id } }) => {
      dispatch(actions.update({ feedback, question_id, type: questionType }))
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
