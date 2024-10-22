'use client'
import { useAuthenticate } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { useAuth } from 'client/h/useAuth'
import { useAuthState } from 'client/h/useAuthState'
import type { FormEvent } from 'react'

export default function Home() {
  const { state, setEmail, setEmailSent } = useAuthState()
  const { isInitializing, logout, user } = useAuth()
  const { authenticate, error } = useAuthenticate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticate({ type: 'email', email: state.email })
    setEmailSent()
  }

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
  if (error !== null) return <div>{error.message}</div>
  if (state.emailSent === true) return <div>Check your emails</div>
  if (isInitializing) return <Loader />

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
