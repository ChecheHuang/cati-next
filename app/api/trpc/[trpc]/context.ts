import { getUserAuth } from '@/app/api/auth/[...nextauth]/options'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const { session } = await getUserAuth()

  return {
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
