export enum QuestionTypeEnum {
  single = '單選',
  multiple = '多選',
  fill = '填空',
}

// export type QuestionType =
//   | {
//       question: string
//       options: string[]
//       type: Exclude<QuestionTypeEnum, QuestionTypeEnum.fill>
//     }
//   | {
//       question: string
//       type: Exclude<
//         QuestionTypeEnum,
//         QuestionTypeEnum.single | QuestionTypeEnum.multiple
//       >
//     }
export type QuestionType = {
  question: string
  options: string[]
  type: QuestionTypeEnum
}
