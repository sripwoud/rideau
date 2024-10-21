'use client'
import { useAuthModal, useSignerStatus, } from '@account-kit/react'
import { Loader } from 'client/c/Loader'

export default function Home() {
//  const user = useUser()
  const { openAuthModal } = useAuthModal()
  const { isInitializing } = useSignerStatus()
 // const { logout } = useLogout()

  if (isInitializing) return <Loader />

  return  (
      <button
        onClick={openAuthModal}
        type='button'
      >
        Login
      </button>
    )
}
