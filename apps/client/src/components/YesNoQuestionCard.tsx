import { CheckCircle, Equal, Hourglass, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react'
import type { FC } from 'react'
import type { Question } from 'server/questions/entities'

export const YesNoQuestionCard: FC<Question> = ({
  title,
  active,
  yes,
  no,
}) => {
  const hasMoreYes = yes > no
  const hasMoreNo = no > yes
  const draw = yes === no
  const hourGlassClassName = `${active === true ? '' : 'text-transparent'}`

  return (
    // FIXME: tailwind color classes are not working
    <div
      className='shadow-md rounded-lg p-4'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <div className='flex justify-between items-center mb-2'>
        <Hourglass className={hourGlassClassName} size={20} />
        {hasMoreYes && <CheckCircle className='text-green-500' size={20} />}
        {hasMoreNo && <XCircle className='text-red-500' />}
        {draw && <Equal className='text-gray-500' size={20} />}
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <div className='flex justify-between items-center text-gray-600'>
        <div>
          <span className='mr-2'>
            {yes} <ThumbsUp className='inline-block' size={20} />
          </span>
          <span>
            {no} <ThumbsDown className='inline-block' size={20} />
          </span>
        </div>
      </div>
    </div>
  )
}
