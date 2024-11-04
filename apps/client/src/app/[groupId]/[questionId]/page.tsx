'use client'
import { useUser } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { withAuth } from 'client/components/withAuth'
// import { useQuestionStats } from 'client/h/useQuestionStats'
import { trpc } from 'client/l/trpc'
import { useEffect } from 'react'

const QuestionDetails = ({ params: { questionId: questionIdStr } }: { params: { questionId: string } }) => {
  const questionId = Number.parseInt(questionIdStr)
  const user = useUser()
  const { mutate: toggle, isPending } = trpc.questions.toggle.useMutation()
  const { data: question, isLoading, refetch } = trpc.questions.find.useQuery({ questionId }, {
    select: ({ data }) => data,
  })
  // TODO
  // const { data: { no, yes } } = useQuestionStats({ questionId })

  useEffect(() => {
    refetch()
  }, [isPending])

  if (isLoading || question === undefined || question === null) return <Loader />
  return (
    <div>
      <h1 className='text-2xl'>{question.title}</h1>
      <p>yes: TODO</p>
      <p>no: TODO</p>
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
