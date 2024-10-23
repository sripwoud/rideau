import { useUser as useUserAk } from '@account-kit/react'
import { useQuery } from '@tanstack/react-query'
import { trpc } from 'client/l/trpc'

export const useUser = () => {
  const user = useUserAk()

  const { data } = useQuery({
    enabled: user !== null,
    queryKey: ['commitments.find'],
    queryFn: async () => {
      if (user?.email === undefined) return
      return trpc.commitments.find.query({ email: user.email })
    },
  })

  // TODO avoid null, use Option instead
  return { ...user, commitment: data?.commitment ?? null }
}
