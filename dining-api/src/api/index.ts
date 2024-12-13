import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import appRouter from '../api/app'

export default (server: express.Application): express.Application => {
  const APP_MIDDLEWARE = {
    logging: morgan('dev'),
    jsonParser: express.json(),
    urlEncodedParser: express.urlencoded({ extended: true }),
    cors: cors()
  }

  server.use(Object.values(APP_MIDDLEWARE))
  server.use('/app', appRouter)

  return server
}
