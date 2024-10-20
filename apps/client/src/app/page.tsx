'use client'
import { useAuthModal, useLogout, useSignerStatus, useUser } from '@account-kit/react'
import { Loader } from 'client/c/Loader'
export default function Home() {
  const user = useUser()
  const { openAuthModal } = useAuthModal()
  const { isInitializing } = useSignerStatus()
  const { logout } = useLogout()

  if (isInitializing) return <Loader />

  return user
    ? (
      <div className='flex flex-col gap-2 p-2'>
        <p className='text-xl font-bold'>Success!</p>
        You're logged in as {user?.email ?? 'anon'}.
        <button className='btn btn-primary mt-6' onClick={() => logout()} type='button'>Log Out</button>
      </div>
    )
    : (
      <button
        onClick={() => {
          console.log('openAuthModal')
          try {
            openAuthModal()
          } catch (e) {
            console.error(e)
          }
        }}
        type='button'
      >
        Login
      </button>
    )
}
