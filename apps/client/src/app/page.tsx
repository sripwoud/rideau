import { trpc } from '@client/trpc'

export default async function Home() {
  const { greeting } = await trpc.hello.query({ name: 'sripwoud rendered server side' })

  return <div>{greeting}</div>
}
