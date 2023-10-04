import prismadb from '@/lib/prismadb'
import { fakerZH_TW } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const reset = async () => {
  await prisma.admin.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.name_list.deleteMany()
  await prisma.phone_template.deleteMany()
  await prisma.$queryRaw`ALTER TABLE admin AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE campaign AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE name_list AUTO_INCREMENT = 1;`
  await prisma.$queryRaw`ALTER TABLE phone_template AUTO_INCREMENT = 1;`
}
const phoneTemplateSeed = async () => {
  const idLength = 5
  const dataRandomLength = 50
  const generateUniquePhoneNumber = generatePhoneNumber()

  const templateData = []
  const ids = Array(idLength)
    .fill('')
    .map((_, index) => (index + 1).toString())

  for (const template_id of ids) {
    const idDataLength = Math.floor(Math.random() * dataRandomLength) + 1
    const template_name = fakerZH_TW.company.name()
    for (let i = 0; i < idDataLength; i++) {
      const name = fakerZH_TW.person.fullName()
      const phone = generateUniquePhoneNumber()
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
const campaignSeed = async () => {
  console.log('campaign seed start...')
  const dataLength = 1
  const currentYear = new Date().getFullYear()
  const seedData = Array(dataLength)
    .fill(true)
    .map((_, index) => {
      const code = (currentYear - index).toString()
      const questions = [
        {
          question: '你最喜歡的餐廳是?',
          options: ['美食', '餐廳', '美食與餐廳'],
          type: '多選',
        },
        {
          question: '你最喜歡的寵物是?',
          options: ['貓', '狗', '貓與狗'],
          type: '單選',
        },
        {
          question: '你最喜歡哪裡?',
          type: '填空',
        },
      ]
      return {
        code,
        name: code + '活動',
        questions,
        begin_date: new Date(),
        end_date: new Date(),
      }
    })
  const seed = await prismadb.campaign.createMany({
    data: seedData,
  })
  // console.log(seed)
  console.log('campaign seed end...')
}

const adminSeed = async () => {
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
  await campaignSeed()
  console.log('Seeding finished ...')
}

void main()

function generatePhoneNumber() {
  const generatedNumbers = new Set()

  function isValidPhoneNumber(number: string) {
    return /^09\d{8}$/.test(number)
  }

  function generateUniquePhoneNumber() {
    let phoneNumber = ''

    do {
      phoneNumber = '09'
      for (let i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10)
      }
    } while (
      !isValidPhoneNumber(phoneNumber) ||
      generatedNumbers.has(phoneNumber)
    )

    generatedNumbers.add(phoneNumber)
    return phoneNumber
  }

  return generateUniquePhoneNumber
}
