import { campaignRouter } from './routers/campaignRouter'
import { nameListRouter } from './routers/nameListRouter'
import { templatePhoneRouter } from './routers/templatePhoneRouter'
import { router } from './trpc'

export const appRouter = router({
  templatePhone: templatePhoneRouter,
  campaign: campaignRouter,
  nameList: nameListRouter,
})

export type AppRouter = typeof appRouter
