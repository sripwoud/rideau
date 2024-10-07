import { QRCodeSVG } from 'qrcode.react'
import type { FC } from 'react'

interface QrCodeProps {
  isScanned: boolean
  onScan: () => void
  value: string
}

export const QrCode: FC<QrCodeProps> = ({ isScanned, onScan, value }) => (
  <div>
    <QRCodeSVG value={value} />
    <button type='button' disabled={isScanned} onClick={onScan}>Simulate Scan</button>
  </div>
)
