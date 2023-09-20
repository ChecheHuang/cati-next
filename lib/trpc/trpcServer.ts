import { appRouter } from '@/server'

const trpcServer = appRouter.createCaller({})

export default trpcServer
