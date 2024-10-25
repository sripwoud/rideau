'use client'
import { useAuthenticate } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { LoginForm } from 'client/c/LoginForm'
import { useAuth } from 'client/h/useAuth'
import { useAuthState } from 'client/h/useAuthState'

export default function Home() {
  const { state } = useAuthState()
  const { isInitializing, logout, user } = useAuth()
  const { error } = useAuthenticate()

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

  return <LoginForm />
}
