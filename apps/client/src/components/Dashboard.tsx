'use client'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
  const semaphoreId = useAtomValue(semaphoreIdAtom)
  useSemaphoreId()

  return (
    <div>
      <h1>Dashboard</h1>
      {semaphoreId.andThenSync(({ commitment }) => <p>Semaphore commitment: {commitment.toString()}</p>)}
    </div>
  )
}
