'use client'
import { CreateQuestionModal } from 'client/c/CreateQuestionModal'
import { GroupCard } from 'client/c/GroupCard'
import { Loader } from 'client/c/Loader'
import { YNQuestionCard } from 'client/c/QuestionCard/YN'
import { useGetGroups } from 'client/h/useGetGroups'
import { trpc } from 'client/l/trpc'
import { useEffect, useState } from 'react'
import type { Question } from 'server/questions/entities'

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([])
  const { data, isLoading: isLoadingQuestions } = trpc.questions.findAll.useQuery()

  const { data: groups, isLoading: isLoadingGroups } = useGetGroups()
  const isLoading = isLoadingGroups || isLoadingQuestions

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

  if (isLoading || groups === undefined || questions === undefined) return <Loader />

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-auto'>
      <div>
        <div className='flex justify-center items-center justify-center mb-4'>
          <h2 className='text-xl font-semibold'>Joined Groups</h2>
        </div>
        <div className='overflow-y-auto max-h-[calc(100vh-12rem)] space-y-4'>
          {groups.map(({ id: key, ...group }) => <GroupCard key={key} {...group} />)}
        </div>
      </div>

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
    </div>
  )
}
