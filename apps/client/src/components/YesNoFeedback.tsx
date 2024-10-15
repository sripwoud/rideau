'use client'
import { ExternalLink } from 'client/c/ExternalLink'
import config from 'client/l/config'
import { capitalize } from 'client/l/display'
import { type FC, type FormEvent, useState } from 'react'
import { arbitrumSepolia } from 'viem/chains'

interface YesNoFeedbackProps {
  title: string
}
export const YesNoFeedback: FC<YesNoFeedbackProps> = ({ title }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send the vote to your backend
    console.log('Vote submitted:', isChecked)
    alert(`Vote submitted: ${isChecked ? 'Yes' : 'No'}`)
  }

  return (
    <div className='max-w-md mx-auto mt-10 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='p-8'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>{capitalize(title)}?</h2>
        <ExternalLink
          href={`${arbitrumSepolia.blockExplorers.default.url}/address/${
            config.contracts.yesNoFeedback[arbitrumSepolia.id]
          }`}
        >
          Feedback contract: {config.contracts.yesNoFeedback[arbitrumSepolia.id]}
        </ExternalLink>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col items-center'>
            <label className='inline-flex items-center space-x-3 cursor-pointer'>
              <input
                type='checkbox'
                className='form-checkbox h-6 w-6 text-blue-600 rounded'
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className='ml-2 font-medium'>
                {isChecked ? 'Yes' : 'No'}
              </span>
            </label>
          </div>
          <button
            type='submit'
            className='w-full font-bold py-3 px-4 rounded'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
