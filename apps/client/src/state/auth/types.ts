export type AuthState = {
  email: string
  emailSent: boolean
}

export enum AuthActionType {
  SET_EMAIL = 'SET_EMAIL',
  EMAIL_SENT = 'EMAIL_SENT',
  LOGOUT = 'LOGOUT',
}

export type AuthAction =
  | { type: AuthActionType.SET_EMAIL; payload: string }
  | { type: AuthActionType.EMAIL_SENT }
  | { type: AuthActionType.LOGOUT }
