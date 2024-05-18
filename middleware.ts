import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiPrefixRoute, authRoute, publicRoute } from "./routes/routes"

const { auth } = NextAuth(authConfig)
 
export default auth((req) => {
  const isLoddingIn = !!req.auth
  const {nextUrl} = req
  const isPrefixApiRoute = nextUrl.pathname.startsWith(apiPrefixRoute)
  const isPublicRoute = publicRoute.includes(nextUrl.pathname)
  const isAuthRoute = authRoute.includes(nextUrl.pathname)


  if (isPrefixApiRoute) {
    return
  }
  if (isAuthRoute) {
    if (isLoddingIn) {
        return Response.redirect(new URL("/settings",nextUrl))
    }
    return
  }
  if (!isLoddingIn && !isPublicRoute) {
    
    return Response.redirect(new URL("/auth/login",nextUrl))
  }
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };