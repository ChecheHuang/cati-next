import { getUserAuth } from '@/app/api/auth/[...nextauth]/options'
import { appRouter } from '@/server'
import { cookies } from 'next/headers'

const { session } = await getUserAuth()

const trpcServer = appRouter.createCaller({
  session,
  headers: {
    cookie: cookies().toString(),
    'x-trpc-source': 'rsc-invoke',
  },
})

export default trpcServer
