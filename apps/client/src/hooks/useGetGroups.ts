import { useQuery } from '@tanstack/react-query'
import { useUser } from 'client/h/useUser'
import { trpc } from 'client/l/trpc'

export const useGetGroups = () => {
  const user = useUser()
  return useQuery({
    enabled: user?.commitment !== undefined,
    queryKey: ['bandada.getGroups'],
    queryFn: async () => {
      const groups = await trpc.bandada.getGroupsByMemberId.query({ memberId: user.commitment })
      return groups.map(({ id, name, description }) => ({ id, name, description }))
    },
  })
}
