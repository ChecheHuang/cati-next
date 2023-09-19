import prismadb from '@/lib/prismadb'
import prisma from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error('Invalid credentials')
        }
        const user = await prismadb.admin.findFirst({
          where: {
            name: credentials.name,
          },
        })
        if (!user || !user?.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }
        return {
          id: user.id.toString(),
          name: user.name,
          password: user.password,
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
