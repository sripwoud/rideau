'use client'
import { useUser } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { withAuth } from 'client/components/withAuth'
import { trpc } from 'client/l/trpc'
import { useEffect } from 'react'

const QuestionDetails = ({ params: { questionId: questionIdStr } }: { params: { questionId: string } }) => {
  const questionId = Number.parseInt(questionIdStr)
  const user = useUser()
  const { mutate: toggle, isPending } = trpc.questions.toggle.useMutation()
  const { data: question, isLoading, refetch } = trpc.questions.find.useQuery({ questionId }, {
    select: ({ data }) => data,
  })

  useEffect(() => {
    refetch()
  }, [isPending])

  if (isLoading || question === undefined || question === null) return <Loader />
  return (
    <div>
      <h1 className='text-2xl'>{question.title}</h1>
      <p>yes: {question.yes}</p>
      <p>no: {question.no}</p>
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
