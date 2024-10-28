'use client'
import { useAuth } from 'client/h/useAuth'
import { clientConfig } from 'client/l/config'
import { MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  const { logout, user } = useAuth()
  return (
    <header className='p-4'>
      <ul className='flex justify-between'>
        <li className='self-start'>
          <Link className='flex flex-row content-center' href='/'>
            <MessageCircleQuestion size={30} />
            <span className='text-4xl'>{clientConfig.appName.toLocaleUpperCase()}</span>
          </Link>
        </li>
        {user !== null
          && (
            <div className='flex flex-row self-end items-center space-x-4'>
              <li>
                {user.email}
              </li>
              <li>
                <button type='button' onClick={logout}>Logout</button>
              </li>
            </div>
          )}
      </ul>
    </header>
  )
}
