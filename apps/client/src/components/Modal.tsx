'use client'
import { type ForwardedRef, forwardRef, type ReactNode } from 'react'

const Modal = forwardRef(
  (
    { children }: { children: ReactNode },
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <section>
        <dialog ref={ref}>
          {children}
        </dialog>
      </section>
    )
  },
)

Modal.displayName = 'Modal'

export { Modal }
