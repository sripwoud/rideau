'use client'
import { useAccount } from '@account-kit/react'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
  const account = useAccount({ type: 'LightAccount' })
  const semaphoreId = useAtomValue(semaphoreIdAtom)
  useSemaphoreId()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Account: <code>{account?.address}</code>
      </p>
      {semaphoreId.andThenSync(({ commitment }) => (
        <p>
          Semaphore commitment: <code>{commitment.toString()}</code>
        </p>
      ))}
    </div>
  )
}
