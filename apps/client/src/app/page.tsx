// import { trpc } from '@client/trpc'
'use client'
// import { QrCode } from 'client/c/QrCode'
// import { useQRCodeScan } from 'client/h/useScanQrCode'
import { useLogin } from 'client/h/useLogin'

export default function Home() {
  // const { greeting } = await trpc.hello.query({ name: 'sripwoud rendered server side' })
  // const { isLoading, handleScan, scanned } = useQRCodeScan()
  useLogin()
  return <p>loading...</p>
}
