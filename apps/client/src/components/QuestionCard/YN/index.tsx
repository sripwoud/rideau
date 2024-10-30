import { YNQuestionStatus } from 'client/c/QuestionCard/YN/YNQuestionStatus'
import { useSendFeedback } from 'client/h/useSendFeedback'
import { useQuestionStats } from 'client/hooks/useQuestionStats'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import type { Question } from 'server/questions/entities'

export const YNQuestionCard: FC<Question> = ({
  id: questionId,
  group_id: groupId,
  title,
  active,
}) => {
  const { data: { no, yes } } = useQuestionStats({ questionId })
  const { sendFeedback, isSending, errors } = useSendFeedback({ groupId, questionId })

  if (errors.length > 0)
    return errors.map(({ message, type }) => <p key={message} className='text-red -text-sm'>{`${type}: ${message}`}</p>)
  return (
    // FIXME: tailwind color classes are not working
    <div
      className='shadow-md rounded-lg p-4'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <div className='flex flex-row justify-between space-x-4 mb-2'>
        <Link href={`${groupId}/${questionId.toString()}`}>
          <h3 className='text-xl font-bold mb-2'>{title}</h3>
        </Link>
        <YNQuestionStatus yes={yes} no={no} size={20} />
      </div>
      <div className='flex justify-center items-center text-gray-600'>
        {active
          ? (
            <>
              <button
                className='mr-2'
                type='button'
                onClick={() => {
                  sendFeedback('true')
                }}
                disabled={isSending}
              >
                {yes} <ThumbsUp className='inline-block' size={20} />
              </button>
              <button
                type='button'
                disabled={isSending}
                onClick={() => {
                  sendFeedback('false')
                }}
              >
                {no} <ThumbsDown className='inline-block' size={20} />
              </button>
            </>
          )
          : (
            <div className='flex space-x-4'>
              <div>
                {yes} <ThumbsUp className='inline-block' size={20} />
              </div>
              <div>
                {no} <ThumbsDown className='inline-block' size={20} />
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
