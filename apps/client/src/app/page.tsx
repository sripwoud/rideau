'use client'
import { useAuthenticate } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { LoginForm } from 'client/c/LoginForm'
import { useAuth } from 'client/h/useAuth'
import { useAuthState } from 'client/h/useAuthState'
import { clientConfig } from 'client/l/config'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { state } = useAuthState()
  const { isInitializing, user } = useAuth()
  const { error } = useAuthenticate()
  const router = useRouter()

  if (user !== null) router.push(`/${clientConfig.bandada.pseGroupId}`)
  if (error !== null) return <div>{error.message}</div>
  if (state.emailSent === true) return <div>Check your emails</div>
  if (isInitializing) return <Loader />
  return <LoginForm />
}
