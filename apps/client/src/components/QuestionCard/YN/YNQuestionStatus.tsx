import { CheckCircle, Equal, XCircle } from 'lucide-react'
import type { FC } from 'react'

interface YNQuestionStatusProps {
  yes: number
  no: number
  size: number
}

export const YNQuestionStatus: FC<YNQuestionStatusProps> = ({ no, size, yes }) => {
  const hasVotes = (yes + no) > 0
  const hasMoreYes = yes > no && hasVotes
  const hasMoreNo = no > yes && hasVotes
  const draw = yes === no && hasVotes

  if (hasMoreYes) return <CheckCircle className='text-green-500' size={size} />
  if (hasMoreNo) return <XCircle className='text-red-500' size={size} />
  if (draw) return <Equal className='text-gray-500' size={size} />
  return
}
