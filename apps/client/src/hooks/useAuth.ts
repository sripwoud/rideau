import { useLogout, useUser } from '@account-kit/react'
import { useAuthState } from 'client/h/useAuthState'
import { useIdentity } from 'client/h/useIdentity'
import { trpc } from 'client/l/trpc'
import { useEffect } from 'react'

export const useAuth = () => {
  const { resetAuth } = useAuthState()
  const user = useUser()
  const { logout: accountKitLogout } = useLogout()
  const { mutate: signup } = trpc.auth.signup.useMutation()
  const { isInitializing, signedMessage } = useIdentity()

  const logout = () => {
    accountKitLogout()
    resetAuth()
  }

  useEffect(() => {
    if (user?.email !== undefined && signedMessage !== undefined)
      signup({ email: user.email, signedMessage })
  }, [signedMessage, user?.email])

  return { isInitializing, logout, user }
}
