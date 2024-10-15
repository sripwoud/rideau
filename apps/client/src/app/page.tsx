'use client'
import { useAuthModal } from '@account-kit/react'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { PulseLoader } from 'react-spinners'

export default function Home() {
  const { openAuthModal } = useAuthModal()
  const { initializing } = useSemaphoreId()

  return initializing
    ? <PulseLoader color='#5d576b' />
    : <button onClick={openAuthModal} type='button'>Login</button>
}
