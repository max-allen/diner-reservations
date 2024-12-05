import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

export default class DinersController {
  dbClient: Prisma.DinerDelegate

  constructor(dbClient: Prisma.DinerDelegate) {
    this.dbClient = dbClient
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { body: data } = req

    try {
      const resource = await this.dbClient.create({ data })
      res.json(resource)
    } catch (err) {
      next(err)
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req
    const queryMethod = id
      ? () => this.dbClient.findUnique({ where: { id: parseInt(id) } })
      : this.dbClient.findMany

    try {
      const resource = await queryMethod()
      res.json(resource)
    } catch (err) {
      next(err)
    }
  }
}
