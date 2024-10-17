'use client'
// import { YesNoFeedback } from 'client/c/YesNoFeedback'
// import { useSemaphoreId } from 'client/h/useSemaphoreId'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'
import { PulseLoader } from 'react-spinners'

export const Dashboard = () => {
  //  useSemaphoreId()
  const semaphoreId = useAtomValue(semaphoreIdAtom)

  return semaphoreId.mapOrElseSync(
    () => <PulseLoader color='#5d576b' />,
    () => <div>"TODO"</div>, // <YesNoFeedback title='do you like rideau' />,
  )
}
