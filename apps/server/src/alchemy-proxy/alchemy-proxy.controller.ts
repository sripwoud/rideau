import { All, Controller, Post, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { serverConfig } from 'server/l/config'

const rpcUrl = `${serverConfig.alchemy.urls.rpc}/${serverConfig.alchemy.apiKey}`
const endpointRgx = new RegExp(`^/${serverConfig.alchemy.proxyEndpoint}/`)
const TargetUrl = (url: Request['url']) => `${serverConfig.alchemy.urls.api}/${url.replace(endpointRgx, '')}`

// not using trpc here because we need to proxy requests to Alchemy API which isn't rpc but REST
@Controller(serverConfig.alchemy.proxyEndpoint)
export class AlchemyProxyController {
  constructor(private readonly commitments: CommitmentsService) {}

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

  @Post('signer/v1/whoami')
  async whoami(@Req() req: Request, @Res() res: Response) {
    const { body, method } = req
    const proxyResponse = await fetch(TargetUrl(req.url), {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverConfig.alchemy.apiKey}`,
      },
      body: JSON.stringify(body),
    })

    let data = await proxyResponse.json()
    data = { ...data, ...await this.commitments.find(data.email) }

    return res.status(proxyResponse.status).json(data)
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const { method, body } = req

    // TODO use Option & Result instead of try/catch
    try {
      switch (method) {
        case 'OPTIONS':
          res.setHeader('Access-Control-Allow-Origin', '*') // TODO use clientUrl
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.send(null)
          break
        case 'POST': {
          const proxyResponse = await fetch(
            TargetUrl(req.url),
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
