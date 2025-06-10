import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)"
];

// Custom middleware function to check for developer tools
function blockDevTools(request: NextRequest) {
  // Get the User-Agent header
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if the request is from a known developer tool
  const isDevTool = 
    userAgent.includes('Headless') || 
    userAgent.includes('Puppeteer') || 
    userAgent.includes('Selenium') || 
    userAgent.includes('Playwright') ||
    userAgent.includes('Chrome-Lighthouse');
  
  // Get the hostname to determine if we're in production
  const hostname = request.headers.get('host') || '';
  const isProduction = !hostname.includes('localhost') && !hostname.includes('127.0.0.1');
  
  // If it's a developer tool and we're in production, redirect to the home page
  if (isDevTool && isProduction) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return null; // Continue with the next middleware
}

// Combined middleware that first checks for dev tools, then handles auth
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: publicRoutes,
  
  // Add our custom middleware before auth
  beforeAuth: (req) => {
    const devToolsResponse = blockDevTools(req);
    if (devToolsResponse) return devToolsResponse;
    return NextResponse.next();
  }
});

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};