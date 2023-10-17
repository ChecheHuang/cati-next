import {
  generatePhoneNumber,
  generateRandomDates,
  getRandomItems,
} from './seedFn'
import prismadb from '@/lib/prismadb'
import { fakerZH_TW } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const reset = async () => {
  await prisma.admin.deleteMany()
  await prisma.name_list.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.phone_template.deleteMany()
  await prisma.$queryRaw`ALTER TABLE admin AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE campaign AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE phone_template AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE name_list AUTO_INCREMENT = 1;`
}
const phoneTemplateSeed = async () => {
  const idLength = 10
  const dataRandomLength = 500
  const generateUniquePhoneNumber = generatePhoneNumber()

  const templateData = []
  const ids = Array(idLength)
    .fill('')
    .map((_, index) => index + 1)

  for (const template_id of ids) {
    const idDataLength = Math.floor(Math.random() * dataRandomLength) + 1
    for (let i = 0; i < idDataLength; i++) {
      const name = fakerZH_TW.person.fullName()
      const phone = generateUniquePhoneNumber()
      templateData.push({
        template_id,
        template_name: 'template_name' + template_id.toString(),
        name,
        phone,
      })
    }
  }

  await prisma.phone_template.createMany({
    data: templateData,
  })
}
const campaignSeed = async () => {
  const dataLength = 3
  const currentYear = new Date().getFullYear()
  const seedData = Array(dataLength)
    .fill(true)
    .map((_, index) => {
      const code = (currentYear - index).toString()
      const questions = getRandomItems()
      const { begin_date, end_date } = generateRandomDates(code)
      const current_active = index === 0
      return {
        code,
        name: code + '活動',
        current_active,
        questions,
        begin_date,
        end_date,
      }
    })
  await prismadb.campaign.createMany({
    data: seedData,
  })
}

const nameListSeed = async () => {
  const campaignArr = (await prismadb.campaign.findMany()).map(
    (item) => item.id,
  )
  const maxTemplateId =
    (
      await prismadb.phone_template.findFirst({
        select: { template_id: true },
        orderBy: {
          template_id: 'desc',
        },
      })
    )?.template_id || 0

  for (const campaign_id of campaignArr) {
    for (let template_id = 1; template_id < maxTemplateId + 1; template_id++) {
      // if (Math.random() < 0.5) continue
      const phoneTemplateData = await prismadb.phone_template.findMany({
        select: { id: true, template_id: true, name: true, phone: true },
        where: {
          template_id,
        },
      })
      const maxSort = await prismadb.name_list.groupBy({
        by: ['campaign_id'],
        _max: {
          sort: true,
        },
        where: {
          campaign_id,
        },
      })
      const sort = (maxSort[0]?._max?.sort || 0) + 1

      const data = phoneTemplateData.map((item) => {
        const { id: phone_template_id, ...data } = item
        return { ...data, phone_template_id, campaign_id, sort }
      })
      await prismadb.name_list.createMany({
        data,
      })
    }
  }
}

const adminSeed = async () => {
  const hashedPassword = await bcrypt.hash('password', 12)
  await prisma.admin.create({
    data: {
      name: 'name',
      password: hashedPassword,
    },
  })
}

async function main() {
  await reset()
  console.log('reset done')
  console.log('Start seeding ...')
  await adminSeed()
  await phoneTemplateSeed()
  await campaignSeed()
  await nameListSeed()
  console.log('Seeding finished ...')
}

void main()
