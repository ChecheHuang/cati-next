import { fakerZH_TW } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const reset = async () => {
  await prisma.admin.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.name_list.deleteMany()
  await prisma.phone_template.deleteMany()
  await prisma.$queryRaw`ALTER TABLE phone_template AUTO_INCREMENT = 1;`
}
const phoneTemplateSeed = async () => {
  const idLength = 12
  const dataRandomLength = 100

  const templateData = []
  const ids = Array(idLength)
    .fill('')
    .map((_, index) => (index + 1).toString())

  for (const template_id of ids) {
    const idDataLength = Math.floor(Math.random() * dataRandomLength) + 1
    const template_name = fakerZH_TW.company.name()
    for (let i = 0; i < idDataLength; i++) {
      const name = fakerZH_TW.person.fullName()
      const phone = fakerZH_TW.phone.number()
      templateData.push({
        template_id,
        template_name,
        name,
        phone,
      })
    }
  }

  await prisma.phone_template.createMany({
    data: templateData,
  })
  console.log('phoneTemplateSeed done')
}

const adminSeed = async () => {
  console.log('adminSeed')
  const hashedPassword = await bcrypt.hash('password', 12)
  await prisma.admin.create({
    data: {
      name: 'name',
      password: hashedPassword,
    },
  })
  console.log('adminSeed done')
}

async function main() {
  await reset()
  console.log('reset done')
  console.log('Start seeding ...')
  await adminSeed()
  await phoneTemplateSeed()
  console.log('Seeding finished ...')
}

void main()
