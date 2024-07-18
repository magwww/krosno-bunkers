import { db } from '@/lib/db'

async function main() {
  const bunker1 = await db.bunker.upsert({
    where: { address: 'Wolności 3' },
    update: {
      longitude: 21.754001577384994,
      latitude: 49.69539181051453,
      capacity: 112,
      address: 'Wolności 3',
      price: 200,
    },
    create: {
      longitude: 21.754001577384994,
      latitude: 49.69539181051453,
      capacity: 112,
      address: 'Wolności 3',
      price: 200,
    },
  })
  const bunker2 = await db.bunker.upsert({
    where: { address: 'Kletówki 27a' },
    update: {
      longitude: 21.749413670881363,
      latitude: 49.69035004290909,
      capacity: 50,
      address: 'Kletówki 27a',
      price: 200,
    },
    create: {
      longitude: 21.749413670881363,
      latitude: 49.69035004290909,
      capacity: 50,
      address: 'Kletówki 27a',
      price: 200,
    },
  })
  const bunker3 = await db.bunker.upsert({
    where: { address: 'Naftowa 8' },
    update: {
      longitude: 21.749154864601863,
      latitude: 49.69631378320311,
      capacity: 252,
      address: 'Naftowa 8',
      price: 200,
    },
    create: {
      longitude: 21.749154864601863,
      latitude: 49.69631378320311,
      capacity: 252,
      address: 'Naftowa 8',
      price: 200,
    },
  })
  const bunker4 = await db.bunker.upsert({
    where: { address: 'Staszica 12' },
    update: {
      longitude: 21.7680694093419,
      latitude: 49.690988867662234,
      capacity: 65,
      address: 'Staszica 12',
      price: 200,
    },
    create: {
      longitude: 21.7680694093419,
      latitude: 49.690988867662234,
      capacity: 65,
      address: 'Staszica 12',
      price: 200,
    },
  })
  const bunker5 = await db.bunker.upsert({
    where: { address: 'Kolejowa 8' },
    update: {
      longitude: 21.750984015325024,
      latitude: 49.695596152320256,
      capacity: 74,
      address: 'Kolejowa 8',
      price: 200,
    },
    create: {
      longitude: 21.750984015325024,
      latitude: 49.695596152320256,
      capacity: 74,
      address: 'Kolejowa 8',
      price: 200,
    },
  })
  const bunker6 = await db.bunker.upsert({
    where: { address: 'Kolejowa 10' },
    update: {
      longitude: 21.749792991996955,
      latitude: 49.695231240204976,
      capacity: 78,
      address: 'Kolejowa 10',
      price: 200,
    },
    create: {
      longitude: 21.749792991996955,
      latitude: 49.695231240204976,
      capacity: 78,
      address: 'Kolejowa 10',
      price: 200,
    },
  })
  const bunker7 = await db.bunker.upsert({
    where: { address: 'Kolejowa 14' },
    update: {
      longitude: 21.74871327922249,
      latitude: 49.694980858670064,
      capacity: 89,
      address: 'Kolejowa 14',
      price: 200,
    },
    create: {
      longitude: 21.74871327922249,
      latitude: 49.694980858670064,
      capacity: 89,
      address: 'Kolejowa 14',
      price: 200,
    },
  })
  const bunker8 = await db.bunker.upsert({
    where: { address: 'Naftowa 9' },
    update: {
      longitude: 21.7506565306406,
      latitude: 49.69630090203944,
      capacity: 28,
      address: 'Naftowa 9',
      price: 200,
    },
    create: {
      longitude: 21.7506565306406,
      latitude: 49.69630090203944,
      capacity: 28,
      address: 'Naftowa 9',
      price: 200,
    },
  })
  const bunker9 = await db.bunker.upsert({
    where: { address: 'Naftowa 17/3' },
    update: {
      longitude: 21.748222187518536,
      latitude: 49.69565350142568,
      capacity: 77,
      address: 'Naftowa 17/3',
      price: 200,
    },
    create: {
      longitude: 21.748222187518536,
      latitude: 49.69565350142568,
      capacity: 77,
      address: 'Naftowa 17/3',
      price: 200,
    },
  })
  const bunker10 = await db.bunker.upsert({
    where: { address: 'Naftowa 17/5' },
    update: {
      longitude: 21.748169922906452,
      latitude: 49.695420156499424,
      capacity: 168,
      address: 'Naftowa 17/5',
      price: 200,
    },
    create: {
      longitude: 21.748169922906452,
      latitude: 49.695420156499424,
      capacity: 168,
      address: 'Naftowa 17/5',
      price: 200,
    },
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
