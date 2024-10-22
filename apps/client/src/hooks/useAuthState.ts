import * as authActions from 'client/state/auth/actions'
import { authReducer, initialAuthState } from 'client/state/auth/reducer'
import { useAtom } from 'jotai'
import { atomWithReducer } from 'jotai/utils'

const authAtom = atomWithReducer(initialAuthState, authReducer)

export function useAuthState() {
  const [state, dispatch] = useAtom(authAtom)

  const setEmail = (email: string) => dispatch(authActions.setEmail(email))
  const setEmailSent = () => dispatch(authActions.emailSent())
  const resetAuth = () => dispatch(authActions.logout())

  return {
    state,
    setEmail,
    setEmailSent,
    resetAuth,
  }
}
