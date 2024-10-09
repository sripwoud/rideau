'use client'
import { Some } from '@hazae41/option'
import { magic } from 'client/l/magic'
import { emailAtom, userAtom } from 'client/l/store'
import { setHeaders, trpc } from 'client/l/trpc'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { type FormEvent, useEffect } from 'react'

export const LoginForm = () => {
  const [email, setEmail] = useAtom(emailAtom)
  const [user, setUser] = useAtom(userAtom)
  const router = useRouter()

  useEffect(() => {
    user.isSome() && router.push('/dashboard')
  }, [user])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.isNone()) return
    // TODO: use Result instead of try/catch
    try {
      // @ts-expect-error magic has an ugly union type FIXME
      const didToken = await magic.auth.loginWithMagicLink({ email: email.get() })
      setHeaders({ Authorization: `Bearer ${didToken}` })
      const res = await trpc.auth.login.query()

      if ('authenticated' in res && res.authenticated === true) {
        // @ts-expect-error magic has an ugly union type FIXME
        const userMetadata = await magic.user.getMetadata()
        setUser(Some.create(userMetadata))
        router.push('/dashboard')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        name='email'
        type='email'
        value={email.getOr('')}
        onChange={(e) => setEmail(new Some(e.target.value))}
      />
      <button type='submit'>Send Magic Link</button>
    </form>
  )
}
