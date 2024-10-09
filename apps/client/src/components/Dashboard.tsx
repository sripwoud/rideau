'use client'
import { userAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'

export const Dashboard = () => {
  const user = useAtomValue(userAtom)
  const renderUser = () => {
    if (user.isNone())
      return <p>Not logged in</p>
    return Object.values(user.get()).map((value) => <p key={value}>{value}</p>)
  }
  const logout = () => {
    console.log('logout')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {renderUser()}
      <button type='button' onClick={logout}>Logout (unimplemented)</button>
    </div>
  )
}
