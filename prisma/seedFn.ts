export const generatePhoneNumber = () => {
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
export const getRandomItems = (() => {
  const originalArray = [
    {
      question: '你最喜歡的餐廳是什麼？',
      options: ['中餐', '西餐', '日本料理', '韓國料理', '意大利菜'],
      type: '多選',
    },
    {
      question: '你最喜歡的寵物是什麼？',
      options: ['狗', '貓', '魚', '兔子', '鳥'],
      type: '單選',
    },
    {
      question: '你最喜歡的旅遊目的地是哪裡？',
      options: ['海灘', '山區', '城市', '鄉村'],
      type: '單選',
    },
    {
      question: '你最喜歡的電影類型是什麼？',
      options: ['動作', '愛情', '喜劇', '科幻', '恐怖'],
      type: '多選',
    },
    {
      question: '你最喜歡的音樂流派是什麼？',
      options: ['流行', '搖滾', '爵士', '古典', '嘻哈'],
      type: '多選',
    },
    {
      question: '你最喜歡的運動是什麼？',
      options: ['足球', '籃球', '網球', '乒乓球', '羽毛球'],
      type: '多選',
    },
    {
      question: '你最喜歡的季節是哪個？',
      options: ['春季', '夏季', '秋季', '冬季'],
      type: '單選',
    },
    {
      question: '你最喜歡的顏色是什麼？',
      options: ['紅色', '藍色', '綠色', '黃色', '紫色'],
      type: '多選',
    },
    {
      question: '你最喜歡的水果是什麼？',
      options: ['蘋果', '香蕉', '橙子', '草莓', '葡萄'],
      type: '多選',
    },
    {
      question: '你最喜歡的電視劇類型是什麼？',
      options: ['劇情', '懸疑', '喜劇', '科幻', '犯罪'],
      type: '多選',
    },
    {
      question: '你最喜歡的運動員是誰？',
      type: '填空',
    },
    {
      question: '你最喜歡的書籍類型是什麼？',
      type: '填空',
    },
    {
      question: '你最喜歡的節日是哪個？',
      options: ['春節', '聖誕節', '感恩節', '中秋節'],
      type: '單選',
    },
    {
      question: '你最喜歡的動物是什麼？',
      options: ['獅子', '熊', '大象', '猩猩'],
      type: '單選',
    },
    {
      question: '你最喜歡的飲料是什麼？',
      options: ['咖啡', '茶', '果汁', '汽水'],
      type: '多選',
    },
    {
      question: '你最喜歡的城市是哪個？',
      options: ['紐約', '東京', '倫敦', '巴黎'],
      type: '多選',
    },
    {
      question: '你最喜歡的職業是什麼？',
      options: ['醫生', '律師', '工程師', '老師'],
      type: '多選',
    },
  ]

  return () => {
    const itemsCount = Math.floor(Math.random() * 5) + 1
    const selectedItems = []

    for (let i = 0; i < itemsCount && originalArray.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * originalArray.length)
      const selectedItem = originalArray.splice(randomIndex, 1)[0]
      selectedItems.push(selectedItem)
    }
    return selectedItems
  }
})()
export const generateRandomDates = (
  year: string,
): { begin_date: Date; end_date: Date } => {
  const currentYear = parseInt(year, 10)
  const begin_date = generateRandomDate(currentYear)
  const end_date = new Date(
    begin_date.getFullYear(),
    begin_date.getMonth() + 3,
    begin_date.getDate(),
  )
  function generateRandomDate(year: number): Date {
    const date = new Date()
    date.setFullYear(year)
    date.setMonth(Math.floor(Math.random() * 12))
    const maxDay = new Date(year, date.getMonth() + 1, 0).getDate()
    date.setDate(Math.floor(Math.random() * maxDay) + 1)
    return date
  }

  return { begin_date, end_date }
}
