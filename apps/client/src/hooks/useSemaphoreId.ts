import { useSignMessage, useSmartAccountClient } from '@account-kit/react'
import { Some } from '@hazae41/option'
import { Identity } from '@semaphore-protocol/core'
import config from 'client/l/config'
import { semaphoreIdAtom } from 'client/l/store'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const useSemaphoreId = () => {
  const setSemaphoreId = useSetAtom(semaphoreIdAtom)
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage, signedMessage } = useSignMessage({ client })

  useEffect(() => {
    if (signedMessage === undefined) {
      signMessage({ message: config.appName })
      const semaphoreId = new Identity(signedMessage)
      setSemaphoreId(Some.create(semaphoreId))
    }
  }, [])
}
