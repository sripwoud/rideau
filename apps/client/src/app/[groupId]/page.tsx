'use client'
import { CreateQuestionModal } from 'client/c/CreateQuestionModal'
import { ExternalLink } from 'client/c/ExternalLink'
import { Loader } from 'client/c/Loader'
import { YNQuestionCard } from 'client/c/QuestionCard/YN'
import { withAuth } from 'client/c/withAuth'
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { ExternalLinkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Question } from 'server/questions/entities'

const Dashboard = ({ params: { groupId } }: { params: { groupId: string } }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const { data, isLoading } = trpc.questions.findAll.useQuery({ groupId })

  useEffect(() => {
    if (data !== undefined) setQuestions(data)
  }, [data])

  trpc.questions.onChange.useSubscription(undefined, {
    onData: ({ type, data: newQuestion }) => {
      if (type === 'INSERT') setQuestions((prev) => [...prev, newQuestion])
      if (type === 'UPDATE')
        setQuestions((prev) => prev.map((oldQuestion) => oldQuestion.id === newQuestion.id ? newQuestion : oldQuestion))
    },
    onError: (error) => {
      console.error(error)
    },
  })

  if (isLoading || questions === undefined) return <Loader />

  return (
    <div className='flex flex-col justify-center items-center space-y-4 h-full'>
      <ExternalLink href={`${clientConfig.bandada.appUrl}/groups/off-chain/${groupId}`}>
        <div className='flex flex-row items-center space-x-2'>
          <ExternalLinkIcon size={20} />
          <div>Bandada Group</div>
        </div>
      </ExternalLink>
      <CreateQuestionModal />
      <div className='overflow-y-auto space-y-4'>
        {questions.map((question) => (
          <YNQuestionCard
            key={question.id}
            {...question}
          />
        ))}
      </div>
    </div>
  )
}

export default withAuth(Dashboard)
