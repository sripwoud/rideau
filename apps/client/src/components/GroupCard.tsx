import type { FC } from 'react'

interface GroupCardProps {
  title: string
  description: string
}

export const GroupCard: FC<GroupCardProps> = ({ title, description }) => {
  return (
    <div
      className='shadow-md rounded-lg p-6'
      style={{ backgroundColor: '#fffae3', borderColor: '#5d576b', borderStyle: 'solid', borderWidth: '2px' }}
    >
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      {/* FIXME tailwind config */}
      <p style={{ fontSize: '20px' }}>{description}</p>
    </div>
  )
}
