'use client'
import { useSignMessage, useSmartAccountClient } from '@account-kit/react'
import config from 'client/l/config'

export const Dashboard = () => {
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { signMessage } = useSignMessage({
    client,
    onSuccess: (signature) => {
      console.log(signature)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div>
      <h1>Dashboard</h1>
      <button type='button' onClick={() => signMessage({ message: config.appName })}>sign</button>
    </div>
  )
}
