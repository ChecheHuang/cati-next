enum QuestionTypeEnum {
  single = '單選',
  multiple = '多選',
  fill = '填空',
}

type QuestionType =
  | {
      question: string
      options: string[]
      type: Exclude<QuestionTypeEnum, QuestionTypeEnum.fill>
    }
  | {
      question: string
      type: Exclude<
        QuestionTypeEnum,
        QuestionTypeEnum.single | QuestionTypeEnum.multiple
      >
    }

const questionArr: QuestionType[] = [
  {
    question: '你最喜歡的電視劇類型是什麼？',
    options: ['劇情', '懸疑'],
    type: QuestionTypeEnum.multiple,
  },
  {
    question: '你最喜歡的運動員是誰？',
    type: QuestionTypeEnum.fill,
  },

  {
    question: '你最喜歡的節日是哪個？',
    options: ['春節'],
    type: QuestionTypeEnum.single,
  },
]
questionArr.map((item) => {
  if (item.type === QuestionTypeEnum.fill) {
    console.log(item)
  }
  console.log(item)
})
