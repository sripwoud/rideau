import { useUser } from '@account-kit/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { ComponentType } from 'react'

// TODO use next middleware for route protection for better performance
// check value of `alchemy-account-state` cookie
export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function WithAuth(props: P) {
    const user = useUser()
    const previousUserRef = useRef(user)
    const redirectRef = useRef(false)
    const router = useRouter()

    useEffect(() => {
      const previousUser = previousUserRef.current
      if (user === null && redirectRef.current === false) {
        redirectRef.current = true
        if (previousUser === null) alert('You need to login first')
        router.push('/')
      }
    }, [user])

    return user && <Component {...props} />
  }
}
