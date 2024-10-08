import { Footer } from '@client/c/Footer'
import { Header } from '@client/c/Header'
import type { ReactNode } from 'react'
import { Provider } from 'jotai'

export const Layout = ({ children }: { children: ReactNode }) => (
  <Provider>
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='flex-grow px-4 flex justify-center items-center'>
      {children}
    </main>
    <Footer />
  </div>
  </Provider>
)
