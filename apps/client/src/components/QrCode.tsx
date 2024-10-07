import { QRCodeSVG } from 'qrcode.react'
import type { FC } from 'react'

interface QrCodeProps {
  isScanned: boolean
  onScan: () => void
  value: string
}

export const QrCode: FC<QrCodeProps> = ({ isScanned, onScan, value }) => (
  <div className='flex flex-col items-center space-y-2'>
    <h1>Scan QR Code</h1>
    <QRCodeSVG value={value} bgColor='#fffae3' fgColor='#f7567c' />
    <button type='button' disabled={isScanned} onClick={onScan}>Simulate Scan</button>
  </div>
)
