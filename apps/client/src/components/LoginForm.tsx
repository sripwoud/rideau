import { useAuthenticate } from '@account-kit/react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useAuthState } from 'client/h/useAuthState'
import type { FormEvent } from 'react'
import { z } from 'zod'

export const LoginForm = () => {
  const { setEmailSent } = useAuthState()
  const { authenticate } = useAuthenticate()

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value: { email } }) => {
      authenticate({ email, type: 'email' })
      setEmailSent()
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        email: z.string().email('Not a valid mail address').endsWith(
          '@pse.dev',
          'Only @pse.dev addresses can signup for the moment',
        ),
      }),
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <form.Field name='email'>
        {({ setValue, state, name }) => (
          <>
            <div className='flex flex-items-center space-x-2'>
              <input
                id={name}
                name={name}
                type='email'
                placeholder='member@pse.dev'
                value={state.value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                  textIndent: '8px',
                  caretColor: `${state.meta.isTouched && state.meta.errors.length > 0 ? '#f7567c' : '#99e1d9'}`,
                }}
                className='block w-full'
              />
              <form.Subscribe
                selector={({ canSubmit }) => [canSubmit]}
              >
                {([canSubmit]) => <button disabled={!canSubmit} type='submit'>Login</button>}
              </form.Subscribe>
            </div>

            {state.meta.isTouched && typeof state.meta.errors[0] === 'string'
              && (
                <div className='flex flex-col'>
                  {state.meta.errors[0].split(',').map((error) => (
                    <p key={error as string} className='text-red-500 text-sm mt-1'>{error}</p>
                  ))}
                </div>
              )}
          </>
        )}
      </form.Field>
    </form>
  )
}
