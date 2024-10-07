import Link from 'next/link'

export const Header = () => (
  <header className='p-4'>
    <ul className='flex items-center justify-between'>
      <li className='text-4xl'>
        <Link href='/'>RIDEAU</Link>
      </li>
      <div className='flex space-x-4'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/lorem'>Lorem</Link>
        </li>
        <li>
          <Link href='/ipsum'>Ipsum</Link>
        </li>
      </div>
    </ul>
  </header>
)
