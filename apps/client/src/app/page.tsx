// import { trpc } from '@client/trpc'
'use client'
import { QrCode } from 'client/c/QrCode'
import { useQRCodeScan } from 'client/h/useScanQrCode'

export default function Home() {
  // const { greeting } = await trpc.hello.query({ name: 'sripwoud rendered server side' })
  const { isLoading, handleScan, scanned } = useQRCodeScan()

  return (
    <div>
      {isLoading ? <p>loading...</p> : <QrCode value='https://www.pse.dev' onScan={handleScan} isScanned={scanned} />}
    </div>
  )
}
