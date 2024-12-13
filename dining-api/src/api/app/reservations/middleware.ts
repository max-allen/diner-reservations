import RestaurantsController from '../restaurants/controller'
import { Request, NextFunction } from 'express'

export const validateAndAppendResult = async (
  req: Request<any, { diners: number[]; time: string }, any, any>,
  next: NextFunction
) => {
  const restaurantsController = new RestaurantsController()
  const { diners, time } = req.body

  const restaurants = await restaurantsController.findAvailableRestaurants({
    diners,
    time
  })

  if (!restaurants.length) throw new Error('No availabilities matching query.')
  const [restaurant] = restaurants

  req.body.restaurantId = restaurant.id
}
