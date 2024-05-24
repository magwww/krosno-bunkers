import { db } from '@/lib/db'

async function main() {
  const rafal = await db.user.upsert({
    where: { email: 'rafal@email.com' },
    update: {},
    create: {
      email: 'rafal@email.com',
      name: 'Rafał',
    },
  })
  const blazej = await db.user.upsert({
    where: { email: 'blazej@email.com' },
    update: {},
    create: {
      email: 'blazej@email.com',
      name: 'Błażej',
    },
  })
  const marta = await db.user.upsert({
    where: { email: 'marta@email.com' },
    update: {},
    create: {
      email: 'marta@email.com',
      name: 'Marta',
    },
  })

  console.log({ rafal, blazej, marta })
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
