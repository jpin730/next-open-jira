import { type NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest): NextResponse {
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '')
    const checkMongoIDRegExp = /^[0-9a-fA-F]{24}$/
    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone()
      url.pathname = '/api/bad-request'
      url.search = `?message=${id} is not a valid Mongo Id`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/entries/:path*',
}
