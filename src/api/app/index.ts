import express from 'express'
import { dinerRouter, dinerMiddleware } from './diners'
import restaurantsRouter from './restaurants/router'
import reservationsRouter from './reservations/router'

const appRouter = express.Router()

appRouter.use((req, res, next) => {
  dinerMiddleware.modifyDinerQueryArgs(req, res, next)
})

appRouter.use('/diners', dinerRouter)
appRouter.use('/restaurants', restaurantsRouter)
appRouter.use('/reservations', reservationsRouter)

export default appRouter
