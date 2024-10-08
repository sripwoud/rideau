'use client'
import { atom, useAtomValue } from 'jotai'

const userAtom = atom('')

export const Dashboard = () => {
  const user = useAtomValue(userAtom)

    const logout = () => {
        console.log('logout')
    }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Email</h2>
      <p>User: {user}</p>
      <button type='button' onClick={logout}>Logout</button>
    </div>
  )
}
