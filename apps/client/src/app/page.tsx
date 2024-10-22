'use client'
import {
  useAuthenticate,
  useLogout,
  useSignerStatus,
  useSignMessage,
  useSmartAccountClient,
  useUser,
} from '@account-kit/react'
import { Loader } from 'client/c/Loader'
import { useAuthState } from 'client/h/useAuthState'
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { useAtom } from 'jotai'
import { type FormEvent, useEffect } from 'react'

const createCommitmentAtom = trpc.commitments.create.atomWithMutation()

export default function Home() {
  const { state, setEmail, setEmailSent, setAuthenticated, setSignedMessage, resetAuth } = useAuthState()

  const user = useUser()
  const { authenticate, error, isPending } = useAuthenticate()
  const { isInitializing, isConnected } = useSignerStatus()
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage, signedMessage, isSigningMessage } = useSignMessage({ client })
  const { logout } = useLogout()
  const [, createCommitment] = useAtom(createCommitmentAtom)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticate({ type: 'email', email: state.email })
    setEmailSent()
  }

  useEffect(() => {
    if (isConnected === true && state.signedMessage === undefined && client !== undefined)
      signMessage({ message: clientConfig.appName })
  }, [isConnected, state.signedMessage, client])

  useEffect(() => {
    if (signedMessage !== undefined) setSignedMessage(signedMessage)
  }, [signedMessage])

  useEffect(() => {
    if (user?.email !== undefined && state.signedMessage !== undefined)
      createCommitment([{ email: user.email, signedMessage: state.signedMessage }])
  }, [state.signedMessage, user?.email])

  useEffect(() => {
    if (user !== null) setAuthenticated()
  }, [user])

  if (error !== null) return <div>{error.message}</div>
  if (state.emailSent === true) return <div>Check your emails</div>
  if (isInitializing || isPending || isSigningMessage) return <Loader />
  if (state.authenticated === true && user !== null) {
    return (
      <div>
        You're logged in as {user.email}
        <button
          onClick={() => {
            logout()
            resetAuth()
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
