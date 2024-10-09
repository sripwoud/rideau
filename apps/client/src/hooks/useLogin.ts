import { None, Some } from '@hazae41/option'
import { magic } from 'client/l/magic'
import { userAtom } from 'client/l/store'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useLogin = () => {
  const setUser = useSetAtom(userAtom)
  const router = useRouter()

  useEffect(() => {
    // FIXME: magic as an ugly union type
    // TODO: handle loading state (change type of userAtom)
    if (magic !== false) {
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          if (magic !== false) {
            magic.user.getMetadata().then((user) => {
              setUser(Some.create(user))
              router.push('/dashboard')
            })
          }
        } else {
          router.push('/login')
          setUser(None.create())
        }
      })
    }
  }, [])
}
