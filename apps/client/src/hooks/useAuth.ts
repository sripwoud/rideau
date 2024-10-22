import { useLogout, useSignerStatus, useSignMessage, useSmartAccountClient, useUser } from '@account-kit/react'
import { useMutation } from '@tanstack/react-query'
import { useAuthState } from 'client/h/useAuthState'
import { clientConfig } from 'client/l/config'
import { trpc } from 'client/l/trpc'
import { useEffect } from 'react'

import type { SignupDto } from 'server/auth/dto/signup.dto'
export const useAuth = () => {
  const { resetAuth } = useAuthState()
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { isInitializing, isConnected } = useSignerStatus()
  const { signMessage, signedMessage } = useSignMessage({ client })
  const user = useUser()
  const { logout: accountKitLogout } = useLogout()

  const { mutate: signup } = useMutation({
    mutationFn: async (signupDto: SignupDto) => trpc.auth.signup.mutate(signupDto),
  })

  const logout = () => {
    accountKitLogout()
    resetAuth()
  }

  useEffect(() => {
    if (isConnected === true && signedMessage === undefined && client !== undefined)
      signMessage({ message: clientConfig.appName })
  }, [isConnected, signedMessage, client])

  useEffect(() => {
    if (user?.email !== undefined && signedMessage !== undefined)
      signup({ email: user.email, signedMessage })
  }, [signedMessage, user?.email])

  return { isInitializing, logout, user }
}
