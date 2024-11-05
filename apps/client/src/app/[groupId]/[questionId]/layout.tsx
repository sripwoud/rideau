'use client'
import { useSubscribeStats } from 'client/h/useSubscribeStats'
import type { ReactNode } from 'react'

export default function QuestionLayout(
  { children, params: { groupId, questionId } }: {
    children: ReactNode
    params: { groupId: string; questionId: string }
  },
) {
  useSubscribeStats({ groupId, questionId: Number.parseInt(questionId) })
  return (
    <>
      {children}
    </>
  )
}
