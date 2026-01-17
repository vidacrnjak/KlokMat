const { PrismaClient, razinaEnum } = require("../src/generated/prisma")
const prisma = new PrismaClient()

async function main() {
  const START_YEAR = 2018
  const IMAGES_PER_SET = 32

  const sets = [
    {
      tezina: 3,
      folder: "zadataci_3b",
      prefix: "P3b",
    },
    {
      tezina: 4,
      folder: "zadataci_4b",
      prefix: "P4b",
    },
    {
      tezina: 5,
      folder: "zadataci_5b",
      prefix: "P5b",
    },
  ]

  for (const set of sets) {
    const pitanja = Array.from({ length: IMAGES_PER_SET }, (_, i) => {
      const index = i + 1
      const godina = START_YEAR + Math.floor(i / 4)

      return {
        tezina: set.tezina,
        godina,
        razina: razinaEnum.Pcelice,
        photoURL: `tasks/pcelice/${set.folder}/${set.prefix}${String(index).padStart(2, "0")}.png`,
      }
    })

    await prisma.pitanje.createMany({
      data: pitanja,
    })
  }

  console.log("✅ Seed gotov – 96 pitanja dodano")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })