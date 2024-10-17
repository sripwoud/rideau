'use client'
// import { useAuthModal } from '@account-kit/react'
// import { useSemaphoreId } from 'client/h/useSemaphoreId'
// import { PulseLoader } from 'react-spinners'
import { trpc } from 'client/l/trpc'
import { atom, useAtom } from 'jotai'
import type { FormEvent } from 'react'
import { PulseLoader } from 'react-spinners'

const emailAtom = atom('')
export default function Home() {
  const [email, setEmail] = useAtom(emailAtom)
  const { error, data, mutate: signUp, isError, isLoading, isSuccess } = trpc.auth.signup.useMutation()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    signUp({ email })
  }

  if (isLoading) return <PulseLoader color='#5d576b' />
  if (isError) return <div>{error.message}</div>
  if (isSuccess) return <div>{data}</div>

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>
        Email
        <input id='email' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type='submit'>Sign Up</button>
    </form>
  )
}
