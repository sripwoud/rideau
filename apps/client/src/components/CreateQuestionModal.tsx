import { CreateQuestionForm } from 'client/c/CreateQuestionForm'
import { Modal } from 'client/c/Modal'
import { modal } from 'client/l/modal'
import { PlusCircle } from 'lucide-react'
import { useRef } from 'react'

export const CreateQuestionModal = () => {
  const ref = useRef<HTMLDialogElement>(null)
  const { close, open } = modal(ref)

  return (
    <>
      <button type='button' className='flex items-center justify-center' onClick={open}>
        <PlusCircle className='h-4 w-4' />
      </button>
      <Modal ref={ref}>
        <CreateQuestionForm onClose={close} />
      </Modal>
    </>
  )
}
