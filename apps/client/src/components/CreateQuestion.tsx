'use client'
import config from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { atom, useAtom } from 'jotai'
import type { FormEvent } from 'react'

const nameAtom = atom('')
const descriptionAtom = atom('')

export const CreateQuestionForm = () => {
  const [name, setName] = useAtom(nameAtom)
  const [description, setDescription] = useAtom(descriptionAtom)
  const { mutate: createGroup } = trpc.bandada.createGroup.useMutation()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createGroup({ name: name, description, ...config.semaphore })
  }

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-full max-w-lg p-8 rounded-lg shadow-md'>
        <h2 className='text-4xl font-bold mb-6'>Create Question</h2>
        <div className='mb-6'>
          <label htmlFor='name' className='block text-2xl mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 text-xl'
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='description' className='block text-wenge text-2xl mb-2'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-3 py-2 text-xl h-32 resize-none'
            required
          />
        </div>

        <button type='submit' className='w-full'>
          Submit Question
        </button>
      </form>
    </div>
  )
}
