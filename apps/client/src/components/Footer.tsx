const year = new Date().getFullYear()

export const Footer = () => (
  <footer className='p-4'>
    <div className='mx-auto text-center'>
      <p>PSE © {year}, All rights reserved</p>
    </div>
  </footer>
)
