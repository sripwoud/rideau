'use client'
import { CreateQuestionModal } from 'client/c/CreateQuestionModal'
import { ExternalLink } from 'client/c/ExternalLink'
import { YNQuestionCard } from 'client/c/QuestionCard/YN'
import { withAuth } from 'client/c/withAuth'
import { clientConfig } from 'client/l/config'
import { questionsByGroupAtom } from 'client/state/questions/atom'
import { useAtomValue } from 'jotai'
import { ExternalLinkIcon } from 'lucide-react'

const Dashboard = ({ params: { groupId } }: { params: { groupId: string } }) => {
  const questions = useAtomValue(questionsByGroupAtom)(groupId)

  return (
    <div className='flex flex-col justify-center items-center space-y-4 h-full'>
      <ExternalLink href={`${clientConfig.bandada.appUrl}/groups/off-chain/${groupId}`}>
        <div className='flex flex-row align-center space-x-2'>
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
