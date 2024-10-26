import { YNQuestionStatus } from 'client/c/QuestionCard/YN/YNQuestionStatus'
import { useSendFeedback } from 'client/h/useSendFeedback'
import { Hourglass, ThumbsDown, ThumbsUp } from 'lucide-react'
import type { FC } from 'react'
import type { Question } from 'server/questions/entities'

export const YNQuestionCard: FC<Question> = ({
  id: questionId,
  group_id: groupId,
  title,
  active,
  yes,
  no,
}) => {
  const hourGlassClassName = `${active === true ? '' : 'text-transparent'}`

  // Use the custom hook for sending feedback
  const {
    sendFeedback,
    isSending,
    errors,
  } = useSendFeedback({
    groupId,
    questionId,
  })

  if (errors.length > 0)
    return errors.map(({ message, type }) => <p key={message} className='text-red -text-sm'>{`${type}: ${message}`}</p>)
  return (
    // FIXME: tailwind color classes are not working
    <div
      className='shadow-md rounded-lg p-4'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <div className='flex justify-between items-center mb-2'>
        <Hourglass className={hourGlassClassName} size={20} />
        <YNQuestionStatus yes={yes} no={no} size={20} />
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <div className='flex justify-between items-center text-gray-600'>
        <div>
          <button
            className='mr-2'
            type='button'
            onClick={() => {
              sendFeedback(true)
            }}
            disabled={isSending}
          >
            {yes} <ThumbsUp className='inline-block' size={20} />
          </button>
          <button
            type='button'
            disabled={isSending}
            onClick={() => {
              sendFeedback(false)
            }}
          >
            {no} <ThumbsDown className='inline-block' size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
