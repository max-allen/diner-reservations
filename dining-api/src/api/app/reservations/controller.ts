import { DatabaseClient } from '@db/utils'
import { Request } from 'express'
import { fromUnixTime } from 'date-fns'

export default class ReservationsController {
  dbClient = DatabaseClient.getInstance()

  post(
    req: Request<
      any,
      { time: string; tableId: number; restaurantId: number },
      any,
      any
    >
  ) {
    const { time, tableId, restaurantId } = req.body

    this.dbClient.reservation.create({
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
  }
}
