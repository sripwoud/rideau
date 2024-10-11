'use client'
import {
  useAccount,
  useAuthModal,
  useLogout,
  useSignerStatus,
  useSmartAccountClient,
  useUser,
} from '@account-kit/react'

export default function Home() {
  const user = useUser()
  const { account } = useAccount({ type: 'LightAccount' })
  console.log({ account })
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  console.log({ client })
  const { openAuthModal } = useAuthModal()
  const { isInitializing } = useSignerStatus()
  const { logout } = useLogout()

  return isInitializing ? <>Loading...</> : user
    ? (
      <div className='flex flex-col gap-2 p-2'>
        <p className='text-xl font-bold'>Success!</p>
        You're logged in as {user?.email ?? 'anon'}.
        <button className='btn btn-primary mt-6' onClick={() => logout()} type='button'>Log Out</button>
      </div>
    )
    : <button className='btn btn-primary' onClick={openAuthModal} type='button'>Login</button>
}
