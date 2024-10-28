'use client'
import { useAuth } from 'client/h/useAuth'
import { clientConfig } from 'client/l/config'
import { MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  const { logout, user } = useAuth()
  return (
    <header className='p-4'>
      <ul className='flex flex-row justify-between items-center'>
        <li>
          <Link className='flex flex-row align-center' href='/'>
            <MessageCircleQuestion size={25} />
            <span className='text-2xl'>{clientConfig.appName.toLocaleUpperCase()}</span>
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
