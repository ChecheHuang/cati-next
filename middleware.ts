import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/administrator/login',
  },
})

export const config = {
  matcher: ['/administrator/cati/:path*'],
}
