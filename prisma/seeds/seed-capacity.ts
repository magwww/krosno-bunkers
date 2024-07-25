import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const bunker1 = await db.bunker.update({
    where: { address: 'Wolności 3' },
    data: { capacity: 112 },
  })
  const bunker2 = await db.bunker.update({
    where: { address: 'Kletówki 27a' },
    data: { capacity: 50 },
  })
  const bunker3 = await db.bunker.update({
    where: { address: 'Naftowa 8' },
    data: { capacity: 252 },
  })
  const bunker4 = await db.bunker.update({
    where: { address: 'Staszica 12' },
    data: { capacity: 65 },
  })
  const bunker5 = await db.bunker.update({
    where: { address: 'Kolejowa 8' },
    data: { capacity: 74 },
  })
  const bunker6 = await db.bunker.update({
    where: { address: 'Kolejowa 10' },
    data: { capacity: 78 },
  })
  const bunker7 = await db.bunker.update({
    where: { address: 'Kolejowa 14' },
    data: { capacity: 89 },
  })
  const bunker8 = await db.bunker.update({
    where: { address: 'Naftowa 9' },
    data: { capacity: 28 },
  })
  const bunker9 = await db.bunker.update({
    where: { address: 'Naftowa 17/3' },
    data: { capacity: 77 },
  })
  const bunker10 = await db.bunker.update({
    where: { address: 'Naftowa 17/5' },
    data: { capacity: 168 },
  })
  console.log({ bunker1, bunker2, bunker3, bunker4, bunker5, bunker6, bunker7, bunker8, bunker9, bunker10 })
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
