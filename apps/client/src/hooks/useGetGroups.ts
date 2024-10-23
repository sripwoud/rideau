import { skipToken } from '@tanstack/react-query'
import { useUser } from 'client/h/useUser'
import { trpc } from 'client/l/trpc'

export const useGetGroups = () => {
  const user = useUser()
  return trpc.bandada.getGroupsByMemberId.useQuery(user?.commitment === null ? skipToken : { memberId: user.commitment }, {
    enabled: user?.commitment !== null,
    select: (groups) => groups.map(({ id, name, description }) => ({ id, name, description })),
  })
}
