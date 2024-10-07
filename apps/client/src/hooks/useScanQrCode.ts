import { trpc } from '@client/trpc'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export function useQRCodeScan() {
  const router = useRouter()
  const [scanned, setScanned] = useState(false)

  const { trigger, isMutating } = useSWRMutation('/trpc/scan', async () => trpc.scan.mutate({ name: 'sripwoud' }), {
    onSuccess: ({ success, redirectUrl }) => {
      if (success) router.push(redirectUrl)
    },
    // TODO: onError: () => {}
  })

  const handleScan = () => {
    setScanned(true)
    trigger()
  }

  return { handleScan, isLoading: isMutating, scanned }
}
