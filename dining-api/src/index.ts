import * as dotenv from 'dotenv'
dotenv.config()

const { SERVER_PORT } = process.env
import express from 'express'
import configureRoutes from './api'
import { PrismaClient } from '@prisma/client'

const initializeServer = () => {
  const dbClient = new PrismaClient()
  const server = express()

  const configuredServer = configureRoutes(server, dbClient)
    configuredServer.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} 🎧`)
  })
}

initializeServer()

