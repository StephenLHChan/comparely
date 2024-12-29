import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  adminRoutesPrefix,
} from "@/lib/routes";

export default auth(req => {
  const { nextUrl } = req;
  const session = req.auth;

  const isLoggedIn = !!session;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix);

  if (isApiAuthRoute) return;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (isAdminRoute && session?.user.role !== "ADMIN") {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("login", nextUrl.origin));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
