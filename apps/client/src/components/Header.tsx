'use client'
import { useLogout, useUser } from '@account-kit/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const user = useUser()
  const { logout } = useLogout()
  const pathname = usePathname()
  return (
    <header className='p-4'>
      <ul className='flex items-center justify-between'>
        <li>
          <Link className='flex items-center' href='/'>
            <Image className='' src='/icon.png' alt='rideau-logo' height={50} width={50} />
            <span className='text-4xl'>RIDEAU</span>
          </Link>
        </li>
        {pathname.endsWith('/create') === false && <Link href='/create'>Create</Link>}
        <div className='flex items-center space-x-4'>
          {user !== null && (
            <li>
              <button
                onClick={() => {
                  logout()
                }}
                type='button'
              >
                Logout
              </button>
            </li>
          )}
        </div>
      </ul>
    </header>
  )
}
