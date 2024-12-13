import { DatabaseClient } from '@db/utils'
import { PrismaClient, DietaryRestriction, Diner } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { fromUnixTime, addHours, subHours } from 'date-fns'

export default class ReservationsController {
  dbClient = DatabaseClient.getInstance()

  async post(
    req: Request<
      any,
      any,
      { diners: Diner['id'][]; startTime: number; restaurant: number }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        body: { diners: dinerIds, startTime, restaurant: restaurantId }
      } = req

      const diners = await this.dbClient.diner.findMany({
        where: {
          id: {
            in: dinerIds
          }
        },
        select: {
          restrictions: true
        }
      })

      const restrictions = [
        ...new Set(
          diners
            .map((diner: { restrictions: DietaryRestriction[] }) =>
              Object.values(diner).flat()
            )
            .flat()
        )
      ]

      const restaurant = await this.dbClient.restaurant.findUnique({
        where: {
          id: restaurantId
        }
      })

      // if (!restaurant?.endorsements.)

      // res.json(reservations)
    } catch (err) {
      next(err)
    }
  }
}
