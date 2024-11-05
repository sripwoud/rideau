import { trpc } from 'client/l/trpc'
import * as actions from 'client/state/questions/actions'
import { questionsAtomFamily } from 'client/state/questions/atom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const useSubscribeQuestions = (groupId: string) => {
  const dispatch = useSetAtom(questionsAtomFamily(groupId))
  const { data: questions } = trpc.questions.findAll.useQuery({ groupId })

  useEffect(() => {
    if (questions === undefined) return
    dispatch(actions.init(questions))
  }, [questions])

  trpc.questions.onChange.useSubscription({ groupId }, {
    onData: ({ data }) => {
      dispatch(actions.update(data))
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
