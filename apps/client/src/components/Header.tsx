import Image from 'next/image'
import Link from 'next/link'

export const Header = () => (
  <header className='p-4'>
    <ul className='flex items-center justify-between'>
      <li>
        <Link className='flex items-center' href='/'>
          <Image className='' src='/icon.png' alt='rideau-logo' height={50} width={50} />
          <span className='text-4xl'>RIDEAU</span>
        </Link>
      </li>
      <div className='flex space-x-4'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
        <li>
          <Link href='/ipsum'>Ipsum</Link>
        </li>
      </div>
    </ul>
  </header>
)
