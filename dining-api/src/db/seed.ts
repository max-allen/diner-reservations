import { PrismaClient, DietaryRestriction } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const michael = await prisma.diner.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Michael',
      restrictions: [DietaryRestriction.Vegetarian]
    }
  })

  const georgeMichael = await prisma.diner.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'George Michael',
      restrictions: [
        DietaryRestriction.Vegetarian,
        DietaryRestriction.GlutenFree
      ]
    }
  })

  const lucile = await prisma.diner.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Lucile',
      restrictions: [DietaryRestriction.GlutenFree]
    }
  })

  const gob = await prisma.diner.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Gob',
      restrictions: [DietaryRestriction.Paleo]
    }
  })

  const tobias = await prisma.diner.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Tobias',
      restrictions: []
    }
  })

  const maeby = await prisma.diner.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'Maeby',
      restrictions: [DietaryRestriction.Vegan]
    }
  })

  console.log({ Users: { michael, georgeMichael, lucile, gob, tobias, maeby } })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
