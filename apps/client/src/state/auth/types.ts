export type AuthState = {
  email: string
  emailSent: boolean
  authenticated: boolean
  signedMessage: string | undefined
}

export enum AuthActionType {
  SET_EMAIL = 'SET_EMAIL',
  EMAIL_SENT = 'EMAIL_SENT',
  AUTHENTICATED = 'AUTHENTICATED',
  SIGNED_MESSAGE = 'SIGNED_MESSAGE',
  LOGOUT = 'LOGOUT',
}

export type AuthAction =
  | { type: AuthActionType.SET_EMAIL; payload: string }
  | { type: AuthActionType.EMAIL_SENT }
  | { type: AuthActionType.AUTHENTICATED }
  | { type: AuthActionType.SIGNED_MESSAGE; payload: string }
  | { type: AuthActionType.LOGOUT }
