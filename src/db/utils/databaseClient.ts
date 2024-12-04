import { PrismaClient } from '@prisma/client'

/**
 * Singleton class that limits db clients to a single instance.
 */
class DatabaseClient {
  private static instance: PrismaClient
  private constructor() {}

  static getInstance() {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient()
    }
    return DatabaseClient.instance
  }
}

export default DatabaseClient
