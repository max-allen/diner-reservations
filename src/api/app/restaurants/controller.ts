import { DatabaseClient } from '../../../db/utils'
import { Request, Response, NextFunction } from 'express'
import { fromUnixTime, addHours, subHours } from 'date-fns'
import DinersController from '../diners/controller'
import { uniq as _uniq } from 'lodash'

export default class RestaurantsController {
  dbClient = DatabaseClient.getInstance()
  dinersController = new DinersController()

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        query: { diners: diners, time: time }
      } = req

      const restaurants = await this.findAvailableRestaurants({
        diners: diners as unknown as number[],
        time: time as string
      })

      res.json({ restaurants })
    } catch (err) {
      next(err)
    }
  }

  async findAvailableRestaurants(
    queryArgs: {
      diners: number[]
      time: string
    },
    includeTables = false
  ) {
    const diners = await this.dinersController.getDinersById(queryArgs.diners, {
      restrictions: true
    })

    const restrictions = _uniq(diners.flatMap((diner) => diner.restrictions))
    const timeAsDate = fromUnixTime(parseInt(queryArgs.time))

    return this.dbClient.restaurant.findMany({
      include: {
        tables: includeTables
      },
      where: {
        endorsements: {
          hasEvery: restrictions
        },
        tables: {
          some: {
            capacity: { gte: diners.length }
          }
        },
        reservations: {
          none: {
            AND: [
              {
                startTime: { gte: subHours(timeAsDate, 2) }
              },
              {
                startTime: { lte: addHours(timeAsDate, 2) }
              }
            ]
          }
        }
      }
    })
  }
}
