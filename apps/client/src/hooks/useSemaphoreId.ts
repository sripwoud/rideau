import { useSignMessage, useSmartAccountClient } from '@account-kit/react'
import { useSignerStatus } from '@account-kit/react'
import { Some } from '@hazae41/option'
import { Identity } from '@semaphore-protocol/core'
import config from 'client/l/config'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const useSemaphoreId = () => {
  const { isConnected } = useSignerStatus()
  const [semaphoreId, setSemaphoreId] = useAtom(semaphoreIdAtom)
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage, signedMessage } = useSignMessage({ client })

  console.debug({ isConnected, signedMessage, commitment: semaphoreId })
  useEffect(() => {
    if (isConnected === true) signMessage({ message: config.appName })
  }, [isConnected])

  useEffect(() => {
    if (signedMessage !== undefined && semaphoreId.isNone()) {
      const semaphoreId = new Identity(signedMessage)
      setSemaphoreId(Some.create(semaphoreId))
    }
  }, [signedMessage])
}
