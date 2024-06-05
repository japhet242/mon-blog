import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiPrefixRoute, apiPrefixupload, authRoute, postone, publicRoute } from "./routes/routes"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)
 
export default auth((req) => {
  const isLoddingIn = !!req.auth
  const {nextUrl} = req
  const isPrefixApiRoute = nextUrl.pathname.startsWith(apiPrefixRoute)
  const isPublicRoute = publicRoute.includes(nextUrl.pathname)
  const isAuthRoute = authRoute.includes(nextUrl.pathname)
  const isPrefixApiupload = nextUrl.pathname.startsWith(apiPrefixupload)
  const postdetail = nextUrl.pathname.startsWith(postone)

  if (isPrefixApiRoute || isPrefixApiupload) {
    return NextResponse.next()
  }
  if (isAuthRoute) {
    if (isLoddingIn) {
        return Response.redirect(new URL("/",nextUrl))
    }
    return 
  }
  if (!isLoddingIn && !isPublicRoute && !postdetail) {
    
    return Response.redirect(new URL("/auth/login",nextUrl))
  }
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };