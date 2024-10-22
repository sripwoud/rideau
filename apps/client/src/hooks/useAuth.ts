import { useLogout, useSignerStatus, useSignMessage, useSmartAccountClient, useUser } from '@account-kit/react'
import { useAuthState } from 'client/h/useAuthState'
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
const createCommitmentAtom = trpc.commitments.create.atomWithMutation()

export const useAuth = () => {
  const { resetAuth } = useAuthState()
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { isInitializing, isConnected } = useSignerStatus()
  const { signMessage, signedMessage } = useSignMessage({ client })
  const user = useUser()
  const { logout: accountKitLogout } = useLogout()
  const [, createCommitment] = useAtom(createCommitmentAtom)

  const logout = () => {
    accountKitLogout()
    resetAuth
  }

  useEffect(() => {
    if (isConnected === true && signedMessage === undefined && client !== undefined)
      signMessage({ message: clientConfig.appName })
  }, [isConnected, signedMessage, client])

  useEffect(() => {
    if (user?.email !== undefined && signedMessage !== undefined)
      createCommitment([{ email: user.email, signedMessage }])
  }, [signedMessage, user?.email])

  return { isInitializing, logout, user }
}
