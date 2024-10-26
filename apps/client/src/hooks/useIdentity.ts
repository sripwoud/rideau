import { useSmartAccountClient } from '@account-kit/react'
import { useSignerStatus, useSignMessage } from '@account-kit/react'
import { Some } from '@hazae41/option'
import { Identity } from '@semaphore-protocol/core'
import { clientConfig } from 'client/l/config'
import { identityAtom } from 'client/state/identity.atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const useIdentity = () => {
  const [identity, setIdentity] = useAtom(identityAtom)
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { isConnected, isInitializing } = useSignerStatus()
  const { signMessage, signedMessage } = useSignMessage({ client })

  useEffect(() => {
    if (isConnected === true && signedMessage === undefined && client !== undefined)
      signMessage({ message: clientConfig.appName })
  }, [isConnected, signedMessage, client])

  useEffect(() => {
    if (signedMessage !== undefined) setIdentity(Some.create(new Identity(signedMessage)))
  }, [signedMessage])

  return { identity, isInitializing, signedMessage }
}
