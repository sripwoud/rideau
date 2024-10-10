import { All, Controller, Logger, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

const PATH = 'web3-rpc-proxy'
const pathRegex = new RegExp(`^/${PATH}/`)

@Controller(PATH)
export class Web3RpcProxyController {
  private readonly logger = new Logger(Web3RpcProxyController.name)

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    try {
      this.logger.log({ url: req.url, web3RpcUrl: process.env['WEB3_RPC_URL'] })
      const path = req.url.replace(pathRegex, '')

      console.log({ path, name: Web3RpcProxyController.name })
      const targetUrl = `${process.env['WEB3_RPC_URL']}/${path}`
      this.logger.log(`Proxying request to ${targetUrl.toString()}`)
      const { body, headers, method } = req
      const proxyResponse = await fetch(
        targetUrl,
        {
          method,
          // @ts-ignore FIXME
          headers: headers as any,
          body,
        },
      )
      const data = await proxyResponse.json()

      res.status(proxyResponse.status).json(data)
    } catch (error) {
      this.logger.error((error as Error).message)
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
