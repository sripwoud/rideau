import type { Group } from '@bandada/api-sdk'
import type { FC } from 'react'

type GroupCardProps = Pick<Group, 'description' | 'name'>

export const GroupCard: FC<GroupCardProps> = ({ description, name }) => {
  return (
    <div
      className='shadow-md rounded-lg p-8'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <h3 className='text-xl font-bold mb-2'>{name}</h3>
      {/* FIXME tailwind config */}
      <p style={{ fontSize: '20px' }}>{description}</p>
    </div>
  )
}
