import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    console.log("Protecting route:", request.url);
    await auth.protect();
  } else {
    console.log("Public route accessed:", request.url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|static|.*\\..*).*)", // Match all non-static routes
    "/api/(.*)", // Match all API routes
  ],
};
