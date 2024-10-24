import type { RefObject } from 'react'

export const modal = (ref: RefObject<HTMLDialogElement>) => {
  const handleOutsideClick = (event: MouseEvent) => {
    // Close the modal if the click is on the dialog element itself
    if (event.target === ref.current) close()
  }

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape')
      close()
  }

  const open = () => {
    if (ref.current?.open === false) {
      ref.current.showModal()
      ref.current.addEventListener('click', handleOutsideClick)
      ref.current.addEventListener('keydown', handleEscapePress)
    }
  }

  const close = () => {
    if (ref.current?.open === true) {
      ref.current?.close()
      ref.current.removeEventListener('click', handleOutsideClick)
      ref.current.removeEventListener('keydown', handleEscapePress)
    }
  }

  return {
    close,
    open,
    ref,
  }
}
