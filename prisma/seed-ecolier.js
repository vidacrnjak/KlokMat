const { PrismaClient, razinaEnum } = require("../src/generated/prisma")
const prisma = new PrismaClient()

async function main() {
  const START_YEAR = 2024
  const IMAGES_PER_SET = 32

  const sets = [
    {
      tezina: 3,
      folder: "zadatci_3b",
      prefix: "E3b",
    },
    {
      tezina: 4,
      folder: "zadatci_4b",
      prefix: "E4b",
    },
    {
      tezina: 5,
      folder: "zadatci_5b",
      prefix: "E5b",
    },
  ]

  for (const set of sets) {
    const pitanja = Array.from({ length: IMAGES_PER_SET }, (_, i) => {
      const index = i + 1
      const godina = START_YEAR - Math.floor(i / 8)

      return {
        tezina: set.tezina,
        godina,
        razina: razinaEnum.Ecolier,
        photoURL: `tasks/ecolier/${set.folder}/${set.prefix}${String(index).padStart(2, "0")}.png`,
        answerA: "A",
        answerB: "B",
        answerC: "C",
        answerD: "D",
        answerE: "E",
        correctAnswer: null,
      }
    })

    await prisma.pitanje.createMany({
      data: pitanja,
    })
  }

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
