'use client'
import { useAuth } from 'client/h/useAuth'
import { clientConfig } from 'client/l/config'
import { MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  const { logout, user } = useAuth()
  return (
    <header className='p-4'>
      <ul className='flex items-center justify-between'>
        <li>
          <Link className='flex flex-row content-center' href='/'>
            <MessageCircleQuestion size={30} />
            <span className='text-4xl'>{clientConfig.appName.toLocaleUpperCase()}</span>
          </Link>
        </li>
        {user !== null
          && (
            <li>
              <button type='button' onClick={logout}>Logout</button>
            </li>
          )}
      </ul>
    </header>
  )
}
