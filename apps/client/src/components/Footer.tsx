import { ExternalLink } from 'client/c/ExternalLink'
import { clientConfig } from 'client/l/config'
import { Github } from 'lucide-react'

export const Footer = () => (
  <footer className='p-4'>
    <div className='flex flex-row justify-center'>
      <ExternalLink href={`https://github.com/sripwoud/${clientConfig.appName}`}>
        <Github size={20} />
      </ExternalLink>
    </div>
  </footer>
)
