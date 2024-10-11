'use client'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
  const semaphoreId = useAtomValue(semaphoreIdAtom)
  useSemaphoreId()
  console.log('semaphoreId', semaphoreId.getOr('undefined'))

  return (
    <div>
      <h1>Dashboard</h1>
      {semaphoreId.isSome() ? <p>Semaphore commitment: {semaphoreId.get().commitment.toString()}</p> : <></>}
    </div>
  )
}
