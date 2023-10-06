import { campaignRouter } from './routers/campaignRouter'
import { templatePhoneRouter } from './routers/templatePhoneRouter'
import { router } from './trpc'

export const appRouter = router({
  templatePhone: templatePhoneRouter,
  campaign: campaignRouter,
})

export type AppRouter = typeof appRouter
