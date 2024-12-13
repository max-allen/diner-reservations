import { DatabaseClient } from '../../../db/utils'
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'

export default class DinersController {
  dbClient = DatabaseClient.getInstance()

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const diners = await this.dbClient.diner.findMany()
      res.json(diners)
    } catch (err) {
      next(err)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const {
      query: { diners: dinerQuery }
    } = req

    try {
      const diners = await this.getDinersById(dinerQuery as unknown as number[])
      res.json({ diners })
    } catch (e) {
      next(e)
    }
  }

  async getDinersById(
    dinerIds: number[],
    selectFields: Prisma.DinerSelect = {}
  ) {
    return this.dbClient.diner.findMany({
      where: {
        id: {
          in: dinerIds
        }
      },
      select: {
        ...selectFields
      }
    })
  }
}
