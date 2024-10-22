import { Footer } from 'client/c/Footer'
import { Header } from 'client/c/Header'
import { Provider } from 'jotai'
import type { ReactNode } from 'react'

// TODO: render info about user, handle case where it is None
export const Layout = ({ children }: { children: ReactNode }) => (
  <Provider>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='container mx-auto flex-grow px-4 flex justify-center items-center'>
        {children}
      </main>
      <Footer />
    </div>
  </Provider>
)
