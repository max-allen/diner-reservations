import DinersController from './controller'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

export default (dbClient: PrismaClient) => {
  const dinersController = new DinersController(dbClient.diner)
  const router = Router()

  router.route('/')
    .get((...handlerArgs) => dinersController.read(...handlerArgs))
    .post((...handlerArgs) => dinersController.create(...handlerArgs))

  return router.use((req, res, next) => {
    next(res.status(404).send(new Error(`${req.url} not found`)))
  })
}