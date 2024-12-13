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
        query: { diners: dinerQuery, time: timeQuery }
      } = req

      const diners = await this.dinersController.getDinersById(
        dinerQuery as unknown as number[],
        {
          restrictions: true
        }
      )

      const restrictions = _uniq(diners.flatMap((diner) => diner.restrictions))

      const stringifiedTimeQuery = timeQuery as unknown as string
      const timeQueryAsDate = fromUnixTime(parseInt(stringifiedTimeQuery))

      const restaurants = await this.dbClient.restaurant.findMany({
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
                  startTime: { gte: subHours(timeQueryAsDate, 2) }
                },
                {
                  startTime: { lte: addHours(timeQueryAsDate, 2) }
                }
              ]
            }
          }
        }
      })
      res.json(restaurants)
    } catch (err) {
      next(err)
    }
  }
}
