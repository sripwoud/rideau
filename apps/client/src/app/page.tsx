'use client'
import { useAuthenticate, useLogout, useSignerStatus, useUser } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { atom, useAtom } from 'jotai'
import type { FormEvent } from 'react'

const emailAtom = atom('')
const emailSentAtom = atom(false)

export default function Home() {
  const [email, setEmail] = useAtom(emailAtom)
  const [emailSent, setEmailSent] = useAtom(emailSentAtom)
  const user = useUser()
  const { authenticate, error, isPending } = useAuthenticate()
  const { isInitializing } = useSignerStatus()
  const { logout } = useLogout()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticate({ type: 'email', email })
    setEmailSent(true)
  }

  if (error !== null) return <div>{error.message}</div>
  if (emailSent === true) return <div>Check your emails</div>
  if (isInitializing || isPending) return <Loader />
  if (user !== null) {
    return (
      <div>
        You're logged in as {user.email}
        <button
          onClick={() => {
            logout()
          }}
          type='button'
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        name='email'
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <button type='submit'>
        Login
      </button>
    </form>
  )
}
