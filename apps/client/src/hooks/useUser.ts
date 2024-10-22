import { useUser as useUserAccountKit, type UseUserResult } from '@account-kit/react'

export const useUser = () => {
  return useUserAccountKit() as UseUserResult & { commitment: string }
}
