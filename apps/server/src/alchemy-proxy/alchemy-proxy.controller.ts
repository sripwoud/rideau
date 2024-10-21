import { All, Controller, Post, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { serverConfig } from 'server/l/config'

const rpcUrl = `${serverConfig.alchemy.urls.rpc}/${serverConfig.alchemy.apiKey}`
const endpointRgx = new RegExp(`^/${serverConfig.alchemy.proxyEndpoint}/`)

// not using trpc here because we need to proxy requests to Alchemy API which isn't rpc but REST
@Controller(serverConfig.alchemy.proxyEndpoint)
export class AlchemyProxyController {
  @Post()
  async post(@Req() req: Request, @Res() res: Response) {
    const { body } = req
    const proxyResponse = await fetch(
      rpcUrl,
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
    const { method, body } = req

    // TODO use Option & Result instead of try/catch
    try {
      const path = req.url.replace(endpointRgx, '')
      const targetUrl = `${serverConfig.alchemy.urls.api}/${path}`

      switch (method) {
        case 'OPTIONS':
          res.setHeader('Access-Control-Allow-Origin', '*') // TODO use clientUrl
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
                Authorization: `Bearer ${serverConfig.alchemy.apiKey}`,
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
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
