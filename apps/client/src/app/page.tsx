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
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { atom, useAtom } from 'jotai'
import { type FormEvent, useEffect } from 'react'

const emailAtom = atom('')
const emailSentAtom = atom(false)
const createCommitmentAtom = trpc.commitments.create.atomWithMutation()

export default function Home() {
  const [email, setEmail] = useAtom(emailAtom)
  const [emailSent, setEmailSent] = useAtom(emailSentAtom)
  const user = useUser()
  const { authenticate, error, isPending } = useAuthenticate()
  const { isInitializing, isConnected } = useSignerStatus()
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage, signedMessage, isSigningMessage } = useSignMessage({ client })
  const { logout } = useLogout()
  const [, createCommitment] = useAtom(createCommitmentAtom)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authenticate({ type: 'email', email })
    setEmailSent(true)
  }

  useEffect(() => {
    if (isConnected === true && signedMessage === undefined && client !== undefined)
      signMessage({ message: clientConfig.appName })
  }, [isConnected, signedMessage, client])

  useEffect(() => {
    if (user?.email !== undefined && signedMessage !== undefined)
      createCommitment([{ email: user.email, signedMessage }])
  }, [signedMessage, user?.email])

  if (error !== null) return <div>{error.message}</div>
  if (emailSent === true) return <div>Check your emails</div>
  if (isInitializing || isPending || isSigningMessage) return <Loader />
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
