import express from 'express'
import { PrismaClient } from '@prisma/client'
import dinersRouter from './diners/router'

const APP_ROUTES = {
  diners: dinersRouter
}

export default (dbClient: PrismaClient) => {
  const appRouter = express.Router()
  Object.entries(APP_ROUTES).forEach(([routeName, router]) => {
    appRouter.use(`/${routeName}`, router(dbClient))
  })

  return appRouter
}