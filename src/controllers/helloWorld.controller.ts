import { Request, Response } from 'express'

export class HelloWorldController {
  public getHelloWorld (req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      message: 'Hello World!',
      timestamp: new Date().toISOString()
    })
  }

  public postHelloWorld (req: Request, res: Response): void {
    const { name } = req.body

    res.status(200).json({
      success: true,
      message: `Hello ${name || 'World'}!`,
      timestamp: new Date().toISOString()
    })
  }
}
