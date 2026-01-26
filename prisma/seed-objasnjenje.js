const { PrismaClient } = require("../src/generated/prisma")
const prisma = new PrismaClient()

async function main() {

  await prisma.$executeRawUnsafe(`
    SELECT setval(
      pg_get_serial_sequence('"Objasnjenje"', 'idObjasnjenje'),
      1,
      false
    );
  `)

  const IMAGES_PER_SET = 32

  const sets = [
    { startId: 1,  folder: "zadatci_3b_rj", prefix: "P3b" },
    { startId: 33, folder: "zadatci_4b_rj", prefix: "P4b" },
    { startId: 65, folder: "zadatci_5b_rj", prefix: "P5b" },
  ]

  const data = []

  for (const set of sets) {
    for (let i = 0; i < IMAGES_PER_SET; i++) {
      const idPitanje = set.startId + i
      const index = i + 1

      data.push({
        idPitanje,
        photoURL: `tasks/pcelice/${set.folder}/${set.prefix}${String(index).padStart(2, "0")}rj.png`,
      })
    }
  }

  await prisma.objasnjenje.createMany({
    data,
  })

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
