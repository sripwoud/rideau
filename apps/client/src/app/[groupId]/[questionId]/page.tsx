'use client'
import { useUser } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { withAuth } from 'client/components/withAuth'
import { trpc } from 'client/l/trpc'
import { questionAtom } from 'client/state/questions/atom'
import { statsByQuestionAtom } from 'client/state/stats/atom'
import { useAtomValue } from 'jotai'

const QuestionDetails = (
  { params: { groupId, questionId: questionIdStr } }: { params: { groupId: string; questionId: string } },
) => {
  const questionId = Number.parseInt(questionIdStr)
  const user = useUser()
  const { mutate: toggle, isPending } = trpc.questions.toggle.useMutation()
  const { no, yes } = useAtomValue(statsByQuestionAtom)(questionId)
  const question = useAtomValue(questionAtom)({ groupId, questionId })

  if (isPending) return <Loader />

  return (
    <div>
      <h1 className='text-2xl'>{question.title}</h1>
      <p>yes: {yes}</p>
      <p>no: {no}</p>
      {user?.email === question.author && (
        <button
          type='button'
          onClick={() => {
            toggle({ active: !question.active, questionId })
          }}
        >
          Set {question.active ? 'Ina' : 'A'}ctive
        </button>
      )}
    </div>
  )
}

export default withAuth(QuestionDetails)
