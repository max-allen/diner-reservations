import ReservationsController from './controller'
import { validateAndAppendResult } from './middleware'
import { Router } from 'express'

const reservationsController = new ReservationsController()
const router = Router()

router
  .route('/')
  .get((...handlerArgs) => reservationsController.index(...handlerArgs))
  .post(validateAndAppendResult, (...handlerArgs) =>
    reservationsController.create(...handlerArgs)
  )

router.use((req, res, next) => {
  next(res.status(404).send(new Error(`${req.url} not found`)))
})

export default router
