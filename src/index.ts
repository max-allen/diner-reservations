import * as dotenv from 'dotenv'
dotenv.config()

const { SERVER_PORT } = process.env
import express from 'express'
import configureRoutes from './api'
import { DatabaseClient } from './db/utils'

const initializeServer = () => {
  DatabaseClient.getInstance()
  const server = express()

  const configuredServer = configureRoutes(server)
  configuredServer.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} 🎧`)
  })
}

initializeServer()
