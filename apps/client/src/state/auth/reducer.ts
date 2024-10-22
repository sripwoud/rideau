import type { AuthAction, AuthState } from 'client/state/auth/types'

export const initialAuthState: AuthState = {
  email: '',
  emailSent: false,
  authenticated: false,
  signedMessage: undefined,
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'EMAIL_SENT':
      return { ...state, emailSent: true }
    case 'AUTHENTICATED':
      return { ...state, authenticated: true }
    case 'SIGNED_MESSAGE':
      return { ...state, signedMessage: action.payload }
    case 'LOGOUT':
      return initialAuthState
    default:
      return state
  }
}
