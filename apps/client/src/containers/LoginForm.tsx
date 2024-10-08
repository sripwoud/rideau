'use client'
import { atom, useAtom } from 'jotai'

const emailAtom = atom('')

export const LoginForm = () => {
    const [email, setEmail] = useAtom(emailAtom)

    return (
        <form>
            <label htmlFor="email">Email</label>
            <input
                name='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' >Send Magic Link</button>
        </form>
    )

}
