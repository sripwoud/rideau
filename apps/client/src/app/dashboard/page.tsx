'use client'
// import { Dashboard as DashboardComponent } from 'client/c/Dashboard'
// import { withAuth } from 'client/c/withAuth'

// const Dashboard = () => <DashboardComponent />

// export default withAuth(Dashboard)
import { trpc } from 'client/l/trpc'
import { PulseLoader } from 'react-spinners'

export default function Dashboard() {
  const { data, error, isLoading, isSuccess } = trpc.auth.getUser.useQuery()

  if (isLoading) return <PulseLoader />
  if (error) return <div>{error.message}</div>
  // @ts-ignore
  if (isSuccess) return <div>{data?.data.user.email as string}</div>
  return <div>Dashboard</div>
}
