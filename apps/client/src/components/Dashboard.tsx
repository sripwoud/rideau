'use client'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
  // @ts-expect-error 4111
  console.log({ foo: process.env.foo, next_public_foo: process.env.NEXT_PUBLIC_foo })
  const semaphoreId = useAtomValue(semaphoreIdAtom)
  useSemaphoreId()

  return (
    <div>
      <h1>Dashboard</h1>
      {semaphoreId.andThenSync(({ commitment }) => <p>Semaphore commitment: {commitment.toString()}</p>)}
    </div>
  )
}
