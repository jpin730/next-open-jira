import { type NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest): NextResponse {
  const id = req.nextUrl.pathname.split('/').at(-1) ?? ''
  const checkMongoIDRegExp = /^[0-9a-fA-F]{24}$/
  if (!checkMongoIDRegExp.test(id)) {
    const message = `${id} is not a valid Mongo Id`
    return NextResponse.json(
      {
        message,
      },
      { status: 400 },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/entries/:id+',
}
