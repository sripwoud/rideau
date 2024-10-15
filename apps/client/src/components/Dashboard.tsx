'use client'
// import { useAccount } from '@account-kit/react'
import { useSemaphoreId } from 'client/h/useSemaphoreId'
// import { semaphoreIdAtom } from 'client/l/store'
// import { useAtomValue } from 'jotai'
import { YesNoFeedback } from 'client/c/YesNoFeedback'
export const Dashboard = () => {
  useSemaphoreId()

  return <YesNoFeedback title='do you like rideau' />
}
