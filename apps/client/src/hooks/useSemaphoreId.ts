import { useSignMessage, useSmartAccountClient } from '@account-kit/react'
import { useSignerStatus } from '@account-kit/react'
import { Some } from '@hazae41/option'
import { None, Option } from '@hazae41/option'
import { Identity } from '@semaphore-protocol/core'
import config from 'client/l/config'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useSemaphoreId = () => {
  const { isConnected, isInitializing: isSignerInitializing } = useSignerStatus()
  const [semaphoreId, setSemaphoreId] = useAtom(semaphoreIdAtom)
  const [isCreatingSemaphoreId, setIsCreatingSemaphoreId] = useState(false)
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage, signedMessage, isSigningMessage } = useSignMessage({ client })
  const router = useRouter()

  const loadSemaphoreIdFromStorage = useCallback(() => {
    const localSemaphoreId = Option.wrap(localStorage.getItem(config.semaphoreIdLocalStorageKey))
    localSemaphoreId.andThenSync((id) => {
      setSemaphoreId(Some.create(Identity.import(id)))
    })
  }, [setSemaphoreId])

  useEffect(() => {
    if (semaphoreId.isNone())
      loadSemaphoreIdFromStorage()
    else
      router.push('/dashboard')
  }, [semaphoreId])

  useEffect(() => {
    if (isConnected === true && semaphoreId.isNone()) signMessage({ message: config.appName })
    if (isConnected === false && semaphoreId.isSome()) {
      setSemaphoreId(None.create())
      localStorage.removeItem(config.semaphoreIdLocalStorageKey)
    }
  }, [isConnected, semaphoreId])

  useEffect(() => {
    if (signedMessage !== undefined && semaphoreId.isNone()) {
      setIsCreatingSemaphoreId(true)
      const semaphoreId = new Identity(signedMessage)
      setSemaphoreId(Some.create(semaphoreId))
      localStorage.setItem(config.semaphoreIdLocalStorageKey, semaphoreId.export())
      setIsCreatingSemaphoreId(false)
    }
  }, [semaphoreId, signedMessage])

  const initializing = useMemo(() => isSignerInitializing || isCreatingSemaphoreId || isSigningMessage, [
    isSignerInitializing,
    isCreatingSemaphoreId,
    isSigningMessage,
  ])

  return { semaphoreId, initializing }
}
