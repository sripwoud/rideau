'use client'
import { GroupCard } from 'client/c/GroupCard'
import { Loader } from 'client/c/Loader'
import { YesNoQuestionCard } from 'client/c/YesNoQuestionCard'
import { useGetGroups } from 'client/h/useGetGroups'
import { PlusCircle } from 'lucide-react'

const questions = [
  { id: 1, title: 'Should we launch the new product?', status: 'open', yesVotes: 15, noVotes: 5 },
  { id: 2, title: 'Is the current pricing strategy effective?', status: 'closed', yesVotes: 20, noVotes: 3 },
  { id: 3, title: 'Do we need to hire more developers?', status: 'open', yesVotes: 8, noVotes: 12 },
]

export default function Dashboard() {
  const { data: groups, isLoading } = useGetGroups()

  if (isLoading || groups === undefined) return <Loader />

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
          <h2 className='text-xl font-semibold flex-grow text-center'>Questions (mock)</h2>
          <button type='button' className='flex items-center justify-center'>
            <PlusCircle className='h-4 w-4' />
          </button>
        </div>
        <div className='overflow-y-auto max-h-[calc(100vh-12rem)] space-y-4'>
          {questions.map((question) => (
            <YesNoQuestionCard
              key={question.id}
              title={question.title}
              status={question.status as 'open' | 'closed'}
              yesVotes={question.yesVotes}
              noVotes={question.noVotes}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
