'use client'
import { CreateQuestionModal } from 'client/c/CreateQuestionModal'
import { Loader } from 'client/c/Loader'
import { YNQuestionCard } from 'client/c/QuestionCard/YN'
import { trpc } from 'client/l/trpc'
import { useEffect, useState } from 'react'
import type { Question } from 'server/questions/entities'

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([])
  const { data, isLoading } = trpc.questions.findAll.useQuery()

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
    <div>
      <div className='flex items-center mb-4'>
        <h2 className='text-xl font-semibold flex-grow text-center'>Questions</h2>
        <CreateQuestionModal />
      </div>
      <div className='overflow-y-auto max-h-[calc(100vh-12rem)] space-y-4'>
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
