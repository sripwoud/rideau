'use client'
import { ExternalLink } from 'client/c/ExternalLink'
import config from 'client/l/config'
import { capitalize } from 'client/l/display'
import { type FC, type FormEvent, useState } from 'react'
// TODO: use dynamic chain
import { useSendUserOperation, useSmartAccountClient } from '@account-kit/react'
import ABI from 'client/abis/YesNoFeedback.json'
import { semaphoreIdAtom } from 'client/l/store'
import { useAtomValue } from 'jotai'
import { encodeFunctionData } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
// import {LEAF_ALREADY_EXISTS_SELECTOR} from 'client/l/constants'
import { useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
// import{ generateProof,Group } from '@semaphore-protocol/core'

const { abi } = ABI
interface YesNoFeedbackProps {
  title: string
}

export const YesNoFeedback: FC<YesNoFeedbackProps> = ({ title }) => {
  const [joined, setJoined] = useState(false)
  const { client } = useSmartAccountClient({ type: 'LightAccount' })
  const { sendUserOperation, isSendingUserOperation, error } = useSendUserOperation({
    client,
    onSuccess: (res) => {
      console.log(res)
    },
    waitForTxn: true,
  })
  const semaphoreId = useAtomValue(semaphoreIdAtom)
  const [isChecked, setIsChecked] = useState(false)
  const joinData = encodeFunctionData({
    abi,
    functionName: 'joinGroup',
    args: [semaphoreId.getOrThrow()['_commitment']],
  })

  const handleJoin = () => {
    sendUserOperation({
      // FIXME avoid type assertion
      uo: { target: config.contracts.yesNoFeedback[arbitrumSepolia.id] as `0x{string}`, data: joinData },
    })
  }

  const handleVote = () => {
    // TODO
    // get Users
    // create Group
    // encode message
    // generateProof
    // sendUserOperation
    alert(`Voted ${isChecked ? 'YES' : 'NO'}`)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    joined ? handleVote() : handleJoin()
  }

  useEffect(() => {
    // FIXME this is ugly! check (may be necessary to make a manual eth_call?)
    // correctly handle case (prevent it to happen by simulating tx?) where user is already in group, check for revert with a LeafAlreadyExists error
    // https://github.com/privacy-scaling-explorations/zk-kit.solidity/blob/b6cdd4f94e0f26c0d71752e17d114af78133912c/packages/lean-imt/contracts/InternalLeanIMT.sol#L23
    if (error !== null) setJoined(true)
  }, [error])

  return (
    <div className='max-w-md mx-auto mt-10 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='p-8'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>{capitalize(title)}?</h2>
        <ExternalLink
          href={`${arbitrumSepolia.blockExplorers.default.url}/address/${
            config.contracts.yesNoFeedback[arbitrumSepolia.id]
          }`}
        >
          Feedback contract: {config.contracts.yesNoFeedback[arbitrumSepolia.id]}
        </ExternalLink>
        <form onSubmit={handleSubmit} className='space-y-6 flex flex-col items-center'>
          <label className='inline-flex items-center space-x-3 cursor-pointer'>
            <input
              type='checkbox'
              className='form-checkbox h-6 w-6 text-blue-600 rounded'
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className='ml-2 font-medium'>
              {isChecked ? 'Yes' : 'No'}
            </span>
          </label>
          {isSendingUserOperation === false
            ? (
              <button
                type='submit'
                className='w-full font-bold py-3 px-4 rounded'
              >
                {joined ? 'Vote' : 'Join'}
              </button>
            )
            : <PulseLoader color='#5d576b' />}
        </form>
      </div>
    </div>
  )
}
