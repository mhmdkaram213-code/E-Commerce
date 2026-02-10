import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const protectedPages = ['/profile', '/cart', '/wishList']
const authPages = ['/register', '/login']
export default async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.next()
        } else {
            const redirectUrl = new URL('/login', process.env.NEXTAUTH_URL)
            redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
            return NextResponse.redirect(redirectUrl)
        }
    }
    if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.next()
        } else {
            const redirectUrl = new URL('/', process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectUrl)
        }
    }
    return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!login|register|allorders).*)'
  ]
}
