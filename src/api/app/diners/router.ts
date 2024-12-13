import DinersController from './controller'
import { Router } from 'express'

const dinersController = new DinersController()
const router = Router()

router
  .route('/')
  .get((...handlerArgs) => dinersController.index(...handlerArgs))

router.use((req, res, next) => {
  next(res.status(404).send(new Error(`${req.url} not found`)))
})

export default router
