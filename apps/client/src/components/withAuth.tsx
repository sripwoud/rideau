import { useUser } from '@account-kit/react'
import { Option } from '@hazae41/option'
import { useRouter } from 'next/navigation'
import { type ComponentType, useEffect, useRef } from 'react'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function WithAuth(props: P) {
    const redirected = useRef(false)
    const user = Option.wrap(useUser())
    const router = useRouter()

    useEffect(() => {
      user.orElseSync(() => {
        if (redirected.current === false) {
          redirected.current = true
          alert('Nice try! But you need to login first.')
          router.push('/')
        }
      })
    }, [])

    return user.andThenSync(() => <Component {...props} />)
  }
}
