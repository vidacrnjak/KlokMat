const { PrismaClient } = require("../src/generated/prisma")
const prisma = new PrismaClient()
const fs = require("fs")
const path = require("path")

async function main() {
  // First, get all Ecolier questions to know their IDs
  const ecolierPitanja = await prisma.pitanje.findMany({
    where: {
      razina: "Ecolier",
    },
    orderBy: [
      { tezina: "asc" },
      { idPitanje: "asc" },
    ],
  })

  console.log(`Found ${ecolierPitanja.length} Ecolier questions`)

  if (ecolierPitanja.length === 0) {
    console.log("⚠️  No Ecolier questions found. Please run seed-ecolier.js first.")
    return
  }

  const sets = [
    { tezina: 3, folder: "zadatci_3b_rj", prefix: "E3b" },
    { tezina: 4, folder: "zadatci_4b_rj", prefix: "E4b" },
    { tezina: 5, folder: "zadatci_5b_rj", prefix: "E5b" },
  ]

  const data = []
  const projectRoot = path.join(__dirname, "..")

  for (const set of sets) {
    const pitanjaForTezina = ecolierPitanja.filter(p => p.tezina === set.tezina)
    
    for (let i = 0; i < pitanjaForTezina.length; i++) {
      const pitanje = pitanjaForTezina[i]
      const index = i + 1
      const filename = `${set.prefix}${String(index).padStart(2, "0")}rj.png`
      const filePath = path.join(projectRoot, "public", "tasks", "ecolier", set.folder, filename)

      // Check if the explanation file exists
      if (fs.existsSync(filePath)) {
        data.push({
          idPitanje: pitanje.idPitanje,
          photoURL: `tasks/ecolier/${set.folder}/${filename}`,
        })
      } else {
        console.log(`⚠️  File not found: ${filename} - using default`)
        data.push({
          idPitanje: pitanje.idPitanje,
          photoURL: `tasks/ecolier/nema_objasnjenja.png`,
        })
      }
    }
  }

  if (data.length > 0) {
    await prisma.objasnjenje.createMany({
      data,
      skipDuplicates: true,
    })
    console.log(`✅ ${data.length} Ecolier objašnjenja dodana`)
  } else {
    console.log("⚠️  No explanation files found")
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
