// import { trpc } from '@client/trpc'
'use client'
import { QrCode } from '@client/components/QrCode'
import { useQRCodeScan } from '@client/hooks/useScanQrCode'

export default function Home() {
  // const { greeting } = await trpc.hello.query({ name: 'sripwoud rendered server side' })
  const { isLoading, handleScan, scanned } = useQRCodeScan()

  return (
    <div>
      <h1>Scan QR Code</h1>
      {isLoading ? <p>loading...</p> : <QrCode value='https://www.pse.dev' onScan={handleScan} isScanned={scanned} />}
    </div>
  )
}
