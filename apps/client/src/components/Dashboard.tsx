'use client'
import { trpc } from 'client/l/trpc'

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={async () => {
          const res = await trpc.hello.query({ name: 'world' })
          console.log(res)
        }}
      >
        hello
      </button>
    </div>
  )
}
