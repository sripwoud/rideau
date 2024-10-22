import { CheckCircle, Hourglass, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react'
import type { FC } from 'react'

interface QuestionCardProps {
  title: string
  status: 'open' | 'closed'
  yesVotes: number
  noVotes: number
}

export const YesNoQuestionCard: FC<QuestionCardProps> = ({
  title,
  status,
  yesVotes,
  noVotes,
}) => {
  const isOpen = status === 'open'
  const hasMoreYes = yesVotes > noVotes

  const hourGlassClassName = `${isOpen === true ? '' : 'text-transparent'}`
  return (
    // FIXME: tailwind color classes are not working
    <div
      className='shadow-md rounded-lg p-6'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <div className='flex justify-between items-center mb-4'>
        <Hourglass className={hourGlassClassName} size={20} />
        {hasMoreYes ? <CheckCircle className='text-green-500' size={20} /> : <XCircle className='text-red-500' />}
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <div className='flex justify-between items-center text-gray-600'>
        <div>
          <span className='mr-2'>
            {yesVotes} <ThumbsUp className='inline-block' size={20} />
          </span>
          <span>
            {noVotes} <ThumbsDown className='inline-block' size={20} />
          </span>
        </div>
      </div>
    </div>
  )
}
