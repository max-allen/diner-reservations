import RestaurantsController from '../restaurants/controller'
import { Request, Response, NextFunction } from 'express'
import { head as _head } from 'lodash'

export const validateAndAppendResult = async (
  req: Request<any, { diners: number[]; time: string }, any, any>,
  _: Response,
  next: NextFunction
) => {
  const restaurantsController = new RestaurantsController()
  const { diners, time } = req.body

  const restaurants = await restaurantsController.findAvailableRestaurants(
    {
      diners,
      time
    },
    true
  )

  if (!restaurants.length) throw new Error('No availabilities matching query.')

  const restaurant = _head(restaurants)
  const table = _head(restaurant?.tables)

  if (!(restaurant && table)) throw new Error('Missing Args. Check queries')

  req.body = {
    ...req.body,
    restaurantId: restaurant.id,
    tableId: table.id
  }

  next()
}
