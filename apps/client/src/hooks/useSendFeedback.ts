import { generateProof, Group } from '@semaphore-protocol/core'
import { useIdentity } from 'client/h/useIdentity'
import { trpc } from 'client/l/trpc'
import { useCallback, useMemo, useState } from 'react'
import type { SendFeedbackDto } from 'server/feedbacks/dto'
enum ErrorType {
  ExportGroupError = 'ExportGroupError',
  SendError = 'SendError',
  GenerateProofError = 'GenerateProofError',
}

interface CustomError {
  type: ErrorType
  message: string
}

export const useSendFeedback = (
  { groupId, questionId }: Omit<SendFeedbackDto, 'feedback' | 'proof'>,
) => {
  const { identity } = useIdentity()
  const { data: nodes, isLoading: isNodesLoading, error: exportGroupError } = trpc.bandada.exportGroup.useQuery({
    groupId,
  })
  const { mutate: send, error: sendError, isPending: isSendPending } = trpc.feedbacks.send.useMutation()
  const [generateProofError, setGenerateProofError] = useState<Error | null>(null)

  const errors = useMemo(() => {
    const errors: CustomError[] = []
    if (exportGroupError !== null) errors.push({ type: ErrorType.ExportGroupError, message: exportGroupError.message })
    if (generateProofError !== null)
      errors.push({ type: ErrorType.GenerateProofError, message: generateProofError.message })
    if (sendError !== null) errors.push({ type: ErrorType.SendError, message: sendError.message })
    return errors
  }, [exportGroupError, generateProofError, sendError])

  const sendFeedback = useCallback((feedback: boolean) => {
    if (nodes === undefined || isNodesLoading || identity.isNone() || feedback === null) return
    const group = Group.import(nodes)
    // use questionId in scope as they are unique within the app (postgres questions table primary key)
    generateProof(identity.get(), group, BigInt(feedback), `${questionId}`, 16).then((proof) => {
      send({ groupId, feedback, proof, questionId })
    }).catch(error => {
      setGenerateProofError(error)
    })
  }, [isNodesLoading, identity, nodes, groupId, questionId])

  return { errors, sendFeedback, isSending: isNodesLoading || isSendPending }
}
