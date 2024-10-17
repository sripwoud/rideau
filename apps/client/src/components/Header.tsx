'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
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
        {pathname.endsWith('/create') === false && (
          <li>
            <Link href='/create'>Create</Link>
          </li>
        )}
        {pathname.endsWith('/dashboard') === false && (
          <li>
            <Link href='/dashboard'>Dashboard</Link>
          </li>
        )}
      </ul>
    </header>
  )
}
