import { type AuthAction, AuthActionType } from 'client/state/auth/types'

export const setEmail = (email: string): AuthAction => ({
  type: AuthActionType.SET_EMAIL,
  payload: email,
})

export const emailSent = (): AuthAction => ({
  type: AuthActionType.EMAIL_SENT,
})

export const logout = (): AuthAction => ({
  type: AuthActionType.LOGOUT,
})
