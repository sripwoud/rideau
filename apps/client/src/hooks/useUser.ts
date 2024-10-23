import { useUser as useUserAk } from '@account-kit/react'
import { skipToken } from '@tanstack/react-query'
import { trpc } from 'client/l/trpc'

export const useUser = () => {
  const user = useUserAk()

  const { data } = trpc.commitments.find.useQuery(user?.email ? { email: user.email } : skipToken, {
    enabled: user?.email !== undefined,
  })

  // TODO avoid null, use Option instead
  return { ...user, commitment: data?.commitment ?? null }
}
