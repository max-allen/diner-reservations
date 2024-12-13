import RestaurantsController from './controller'
import { Router } from 'express'

const restaurantsController = new RestaurantsController()
const router = Router()

router
  .route('/')
  .get((...handlerArgs) => restaurantsController.index(...handlerArgs))

router.use((req, res, next) => {
  next(res.status(404).send(new Error(`${req.url} not found`)))
})

export default router
