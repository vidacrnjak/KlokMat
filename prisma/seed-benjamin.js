const { PrismaClient, razinaEnum } = require("../src/generated/prisma")
const prisma = new PrismaClient()

async function main() {
  const START_YEAR = 2024
  const IMAGES_PER_SET = 32

  const sets = [
    {
      tezina: 3,
      folder: "zadaci_3b",
      prefix: "B3b",
    },
    {
      tezina: 4,
      folder: "zadaci_4b",
      prefix: "B4b",
    },
    {
      tezina: 5,
      folder: "zadaci_5b",
      prefix: "B5b",
    },
  ]

  for (const set of sets) {
    const pitanja = Array.from({ length: IMAGES_PER_SET }, (_, i) => {
      const index = i + 1
      const godina = START_YEAR - Math.floor(i / 8)

      return {
        tezina: set.tezina,
        godina,
        razina: razinaEnum.Benjamin,
        photoURL: `tasks/benjamin/${set.folder}/${set.prefix}${String(index).padStart(2, "0")}.png`,
      }
    })

    await prisma.pitanje.createMany({
      data: pitanja,
    })
  }

  console.log("✅ Seed gotov – 96 Benjamin pitanja dodano (ID 97-192)")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })