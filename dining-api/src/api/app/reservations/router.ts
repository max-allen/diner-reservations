import ReservationsController from './controller'
import { Router } from 'express'

const reservationsController = new ReservationsController()
const router = Router()

router
  .route('/')
  .post((...handlerArgs) => reservationsController.post(...handlerArgs))

router.use((req, res, next) => {
  next(res.status(404).send(new Error(`${req.url} not found`)))
})

export default router
