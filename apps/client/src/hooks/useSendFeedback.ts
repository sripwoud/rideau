import { generateProof, Group } from '@semaphore-protocol/core'
import { useIdentity } from 'client/h/useIdentity'
import { trpc } from 'client/l/trpc'
import { useCallback, useMemo, useState } from 'react'

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
  { feedback, groupId, questionId }: { groupId: string; questionId: number; feedback: boolean | null },
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

  const sendFeedback = useCallback(() => {
    if (nodes === undefined || isNodesLoading || identity.isNone() || feedback === null) return
    const group = Group.import(nodes)
    generateProof(identity.get(), group, BigInt(feedback), groupId, 16).then((proof) => {
      send({ groupId, feedback, proof, questionId })
    }).catch(error => {
      setGenerateProofError(error)
    })
  }, [isNodesLoading, identity, nodes, groupId, questionId, feedback])

  return { errors, sendFeedback, isSending: isNodesLoading || isSendPending }
}
