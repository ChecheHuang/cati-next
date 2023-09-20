import { templatePhoneRouter } from './routers/templatePhone'
import { router } from './trpc'

export const appRouter = router({
  templatePhone: templatePhoneRouter,
})

export type AppRouter = typeof appRouter
