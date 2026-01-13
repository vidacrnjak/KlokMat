const { PrismaClient } = require("../src/generated/prisma")
const prisma = new PrismaClient()

async function main() {
  const IMAGES_PER_SET = 32

  const sets = [
    { startId: 97,  folder: "zadatci_3b_rj", prefix: "B3b" },
    { startId: 129, folder: "zadatci_4b_rj", prefix: "B4b" },
    { startId: 161, folder: "zadatci_5b_rj", prefix: "B5b" },
  ]

  const data = []

  for (const set of sets) {
    for (let i = 0; i < IMAGES_PER_SET; i++) {
      const idPitanje = set.startId + i
      const index = i + 1

      data.push({
        idPitanje,
        photoURL: `tasks/benjamin/${set.folder}/${set.prefix}${String(index).padStart(2, "0")}rj.png`,
      })
    }
  }

  await prisma.objasnjenje.createMany({
    data,
  })

  console.log("✅ Benjamin objašnjenja dodana (ID 97-192)")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })