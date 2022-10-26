import { NextResponse } from 'next/server'

/** @type string */
const regions = process.env.NEXT_PUBLIC_UNSUPPORTED_REGIONS || ''

const unavailableTo = regions.split(',').filter((x) => !!x)

/**
 *
 * @param {import("next/server").NextRequest} req
 * @returns {Promise<Response | undefined> | Response | undefined}
 */
function handleBuildManifest (req) {
  if (req.url.includes('buildManifest')) {
    const response = NextResponse.rewrite(new URL('/buildManifest.js', req.url))
    response.headers.set('Access-Control-Allow-Origin', 'null')
    return response
  }
}

/**
 *
 * @param {import("next/server").NextRequest} req
 * @returns {Promise<Response | undefined> | Response | undefined}
 */
function handleHtmlPages (req) {
  const isHTMLPage = typeof req.headers.get('accept') === 'string' && (req.headers.get('accept').includes('text/html') || req.headers.get('accept').includes('application/xhtml+xml'))

  const country = req.geo?.country || ''

  if (!isHTMLPage || !country || unavailableTo.length === 0) {
    return
  }

  const unavailable = unavailableTo.indexOf(country) > -1
  const landingPage = req.nextUrl.clone().pathname === '/unavailable'

  if (unavailable && !landingPage) {
    const response = NextResponse.rewrite(new URL('/unavailable', req.url), { status: 451 })
    response.headers.set('Access-Control-Allow-Origin', 'null')
    return response
  }
}

/**
 *
 * @param {import("next/server").NextRequest} req
 * @returns {Promise<Response | undefined> | Response | undefined}
 */
export function middleware (req) {
  console.log({
    intial: true,
    url: req.url,
    header: req.headers.get('accept')
  })

  let response = handleBuildManifest(req)

  if (response) {
    console.log({
      url: req.url,
      header: req.headers.get('accept'),
      return: 'handleBuildManifest'
    })
    return response
  }

  response = handleHtmlPages(req)

  if (response) {
    console.log({
      url: req.url,
      header: req.headers.get('accept'),
      return: 'handleHtmlPages'
    })
    return response
  }

  console.log({
    url: req.url,
    header: req.headers.get('accept'),
    return: 'direct'
  })
  response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', 'null')
  return response
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: [
    '/:path',
    '/(.*)'
  ]
}
