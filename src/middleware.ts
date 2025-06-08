import { authMiddleware } from "@clerk/nextjs";

// Define the public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"
];

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: publicRoutes
});

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};