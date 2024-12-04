import { DatabaseClient } from '../../../db/utils'
import { Request, Response, NextFunction } from 'express'
import { fromUnixTime } from 'date-fns'

export default class ReservationsController {
  dbClient = DatabaseClient.getInstance()

  async index(_: Request, res: Response, next: NextFunction) {
    try {
      const reservations = await this.dbClient.reservation.findMany()
      res.json({ reservations })
    } catch (e) {
      next(e)
    }
  }

  async create(
    req: Request<
      any,
      { time: string; tableId: number; restaurantId: number },
      any,
      any
    >,
    res: Response,
    next: NextFunction
  ) {
    const { time, tableId, restaurantId } = req.body

    try {
      const reservation = await this.dbClient.reservation.create({
        data: {
          startTime: fromUnixTime(parseInt(time)),
          restaurant: {
            connect: {
              id: restaurantId
            }
          },
          table: {
            connect: {
              id: tableId
            }
          }
        }
      })

      res.json({ reservation })
    } catch (e) {
      next(e)
    }
  }
}
