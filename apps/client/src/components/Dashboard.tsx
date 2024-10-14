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
      <p>Account: {account?.address}</p>
      {semaphoreId.andThenSync(({ commitment }) => <p>Semaphore commitment: {commitment.toString()}</p>)}
    </div>
  )
}
