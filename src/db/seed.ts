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

  const lardo = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Lardo',
      endorsements: [DietaryRestriction.GlutenFree]
    }
  })

  const panaderia = await prisma.restaurant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Panaderia Rosetta',
      endorsements: [
        DietaryRestriction.GlutenFree,
        DietaryRestriction.Vegetarian
      ]
    }
  })

  const tetetlan = await prisma.restaurant.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Tetetlan',
      endorsements: [DietaryRestriction.GlutenFree, DietaryRestriction.Paleo]
    }
  })

  const falling = await prisma.restaurant.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Falling Piano Brewing Co',
      endorsements: []
    }
  })

  const utopia = await prisma.restaurant.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Utopia',
      endorsements: [DietaryRestriction.Vegan, DietaryRestriction.Vegetarian]
    }
  })

  const lardoTableTwoCap = await prisma.table.upsert({
    where: { id: 1 },
    update: {},
    create: {
      capacity: 2,
      restaurantId: 1
    }
  })

  const lardoTableFourCap = await prisma.table.upsert({
    where: { id: 2 },
    update: {},
    create: {
      capacity: 4,
      restaurantId: 1
    }
  })

  const lardoTableSixCap = await prisma.table.upsert({
    where: { id: 3 },
    update: {},
    create: {
      capacity: 6,
      restaurantId: 1
    }
  })

  const panaderiaTableTwoCap = await prisma.table.upsert({
    where: { id: 4 },
    update: {},
    create: {
      capacity: 2,
      restaurantId: 2
    }
  })

  const panaderiaTableFourCap = await prisma.table.upsert({
    where: { id: 5 },
    update: {},
    create: {
      capacity: 4,
      restaurantId: 2
    }
  })

  const panaderiaTableSixCap = await prisma.table.upsert({
    where: { id: 6 },
    update: {},
    create: {
      capacity: 6,
      restaurantId: 2
    }
  })

  const tetetlanTableTwoCap = await prisma.table.upsert({
    where: { id: 7 },
    update: {},
    create: {
      capacity: 2,
      restaurantId: 3
    }
  })

  const tetetlanTableFourCap = await prisma.table.upsert({
    where: { id: 8 },
    update: {},
    create: {
      capacity: 4,
      restaurantId: 3
    }
  })

  const tetetlanTableSixCap = await prisma.table.upsert({
    where: { id: 9 },
    update: {},
    create: {
      capacity: 6,
      restaurantId: 3
    }
  })

  const fallingTableTwoCap = await prisma.table.upsert({
    where: { id: 10 },
    update: {},
    create: {
      capacity: 2,
      restaurantId: 4
    }
  })

  const fallingTableFourCap = await prisma.table.upsert({
    where: { id: 11 },
    update: {},
    create: {
      capacity: 4,
      restaurantId: 4
    }
  })

  const fallingTableSixCap = await prisma.table.upsert({
    where: { id: 12 },
    update: {},
    create: {
      capacity: 6,
      restaurantId: 4
    }
  })

  const utopiaTableTwoCap = await prisma.table.upsert({
    where: { id: 13 },
    update: {},
    create: {
      capacity: 2,
      restaurantId: 5
    }
  })

  const utopiaTableFourCap = await prisma.table.upsert({
    where: { id: 14 },
    update: {},
    create: {
      capacity: 4,
      restaurantId: 5
    }
  })

  const utopiaTableSixCap = await prisma.table.upsert({
    where: { id: 15 },
    update: {},
    create: {
      capacity: 6,
      restaurantId: 5
    }
  })

  console.log({
    diners: {
      michael,
      georgeMichael,
      lucile,
      gob,
      tobias,
      maeby
    },
    restaurants: {
      lardo,
      panaderia,
      tetetlan,
      falling,
      utopia
    },
    tables: {
      lardoTableTwoCap,
      lardoTableFourCap,
      lardoTableSixCap,
      panaderiaTableTwoCap,
      panaderiaTableFourCap,
      panaderiaTableSixCap,
      tetetlanTableTwoCap,
      tetetlanTableFourCap,
      tetetlanTableSixCap,
      fallingTableTwoCap,
      fallingTableFourCap,
      fallingTableSixCap,
      utopiaTableTwoCap,
      utopiaTableFourCap,
      utopiaTableSixCap
    }
  })
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
