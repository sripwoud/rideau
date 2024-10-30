'use client'
import { useUser } from '@account-kit/react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import type { FC, FormEvent } from 'react'
import { CreateQuestionDto } from 'server/questions/dto/create-question.dto'

interface CreateQuestionFormProps {
  onClose: () => void
}
export const CreateQuestionForm: FC<CreateQuestionFormProps> = ({ onClose }) => {
  const user = useUser()
  const form = useForm({
    defaultValues: { title: '' },
    onSubmit: ({ value: { title } }) => {
      if (user?.email === undefined) throw new Error('User not found')
      createQuestion({ author: user.email, groupId: clientConfig.bandada.pseGroupId, title, type: 'boolean' })
    },
    validatorAdapter: zodValidator(),
    validators: { onChange: CreateQuestionDto.pick({ title: true }) },
  })

  const { mutate: createQuestion, isPending, error } = trpc.questions.create.useMutation({
    onSuccess: () => {
      form.reset()
      onClose()
    },
    onError: e => {
      console.error(e)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 p-8 text-2xl'
      style={{ backgroundColor: '#5d576b' }}
    >
      <div>
        <form.Field name='title'>
          {(field) => (
            <>
              <label htmlFor={field.name} className='text-xl block text-sm font-medium' style={{ color: '#fffae3' }}>
                Question Title
              </label>
              <input
                id={field.name}
                name={field.name}
                type='text'
                // FIXME tailwind classes don't work
                style={{
                  textIndent: '8px',
                  borderWidth: '0px',
                  caretColor: `${
                    field.state.meta.isTouched && field.state.meta.errors.length > 0 ? '#f7567c' : '#99e1d9'
                  }`,
                }}
                placeholder='What is your question?'
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                onBlur={field.handleBlur}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  field.state.meta.isTouched && field.state.meta.errors.length > 0
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className='text-red-500 text-sm mt-1'>
                  {field.state.meta.errors.join(', ')}
                </p>
              )}
            </>
          )}
        </form.Field>
      </div>

      {error && (
        <p className='text-red-500 text-sm'>
          {error.message || 'An error occurred while creating the question.'}
        </p>
      )}

      <div className='flex justify-end space-x-2'>
        <button
          type='button'
          onClick={onClose}
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
        >
          Cancel
        </button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              disabled={!canSubmit || isSubmitting || isPending}
              type='submit'
            >
              {isPending || isSubmitting ? 'Creating...' : 'Create'}
            </button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
