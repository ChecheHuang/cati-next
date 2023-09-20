import { type AppRouter } from '@/server'
import { createTRPCReact } from '@trpc/react-query'

const trpcClient = createTRPCReact<AppRouter>({})
export default trpcClient
