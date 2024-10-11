import { All, Controller, Logger, Post, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import config from 'server/l/config'

const API_URL = 'https://api.g.alchemy.com'
const RPC_URL = `https://arb-sepolia.g.alchemy.com/v2/${config.alchemyApiKey}`
const endpointRgx = new RegExp(`^/${config.alchemyProxyEndpoint}/`)

@Controller(config.alchemyProxyEndpoint)
export class AlchemyProxyController {
  private readonly logger = new Logger(AlchemyProxyController.name)
  @Post()
  async post(@Req() req: Request, @Res() res: Response) {
    const { body } = req
    const proxyResponse = await fetch(
      RPC_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
    const data = await proxyResponse.json()
    res.status(proxyResponse.status).json(data)
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    this.logger.log('proxying request to Alchemy API')
    const { method, body } = req

    try {
      const path = req.url.replace(endpointRgx, '')
      const targetUrl = `${API_URL}/${path}`

      switch (method) {
        case 'OPTIONS':
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.send(null)
          break
        case 'POST': {
          const proxyResponse = await fetch(
            targetUrl,
            {
              method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.alchemyApiKey}`,
              },
              body: JSON.stringify(body),
            },
          )
          const data = await proxyResponse.json()
          res.status(proxyResponse.status).json(data)
          break
        }
        default:
          res.status(405).json({ error: 'Method not allowed' })
      }
    } catch (error) {
      this.logger.error((error as Error).message)
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
