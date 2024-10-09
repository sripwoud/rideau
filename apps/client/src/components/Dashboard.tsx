'use client'
import { None } from '@hazae41/option'
import { magic } from 'client/l/magic'
import { userAtom } from 'client/l/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

export const Dashboard = () => {
  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)
  const renderUser = () => {
    if (user.isNone())
      return <p>Not logged in</p>
    return Object.entries(user.get()).map(([key, value]) => {
      console.log(key, value)
      return value !== null && value?.length !== 0 && (
        <p className='text-blue' key={key}>
          {key}: <span className='italic'>{value.toString()}</span>
        </p>
      )
    })
  }

  const logout = () => {
    // FIXME: magic has an ugly union type
    if (magic !== false) {
      magic.user.logout().then(() => {
        setUser(None.create())
        router.push('/login')
      })
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {renderUser()}
      <button type='button' onClick={logout}>Logout</button>
    </div>
  )
}
