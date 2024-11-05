'use client'
import { useSubscribeQuestions } from 'client/h/useSubscribeQuestions'
import type { ReactNode } from 'react'

export default function GroupLayout(
  { children, params: { groupId } }: { children: ReactNode; params: { groupId: string } },
) {
  useSubscribeQuestions(groupId)
  return <>{children}</>
}
