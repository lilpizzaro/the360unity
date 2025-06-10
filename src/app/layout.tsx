import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import ClerkProvider from "@/components/ClerkProvider";
import Script from "next/script";
import DevToolsProvider from "@/components/DevToolsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#632cfb",
};

export const metadata: Metadata = {
  title: "The360Unity - Developer Community",
  description: "A community platform for developers to share projects, collaborate, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Add disable-devtool from CDN as a fallback */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/disable-devtool@latest" 
          disable-devtool-auto="true" 
          disable-menu="true"
          disable-select="false"
          disable-copy="false"
          disable-cut="false"
          disable-paste="false"
          clear-log="true"
          strategy="afterInteractive"
        />
        
        {/* Modified script to block developer tools without constant reloading */}
        <Script id="block-devtools" strategy="afterInteractive">
          {`
            (function() {
              // Only run in production or when explicitly enabled
              if (typeof window === 'undefined' || 
                  (window.location.hostname === 'localhost' && !window.location.search.includes('block_devtools=true'))) {
                return;
              }
              
              // Block F12 key and other shortcuts
              document.addEventListener('keydown', function(e) {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                    (e.ctrlKey && e.shiftKey && e.key === 'J') || 
                    (e.ctrlKey && e.key === 'U')) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Less aggressive detection with longer intervals
              let devtoolsOpen = false;
              let reloadAttempts = 0;
              const MAX_RELOAD_ATTEMPTS = 2;
              
              // Function to check devtools status
              function checkDevTools() {
                // Use a more reliable method with less false positives
                const threshold = 160;
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;
                
                // Only trigger if we're confident devtools is open
                if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
                  devtoolsOpen = true;
                  if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
                    reloadAttempts++;
                    alert('Developer tools are not allowed on this site.');
                    window.location.href = '/';
                  }
                } else if (!(widthThreshold || heightThreshold)) {
                  devtoolsOpen = false;
                }
              }
              
              // Check less frequently to avoid performance issues
              setInterval(checkDevTools, 3000);
            })();
          `}
        </Script>
        
        <Script id="disable-react-devtools" strategy="beforeInteractive">
          {`
            // Disable React DevTools in production
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
              // Define the __REACT_DEVTOOLS_GLOBAL_HOOK__ with dummy functions
              const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
              
              if (typeof devTools === 'object') {
                // Replace all methods with no-op functions
                for (const key in devTools) {
                  if (key === 'renderers') {
                    // Keep the renderers object but make it empty
                    devTools[key] = new Map();
                  } else {
                    // Replace all other methods with no-op functions
                    devTools[key] = typeof devTools[key] === 'function' 
                      ? () => {} 
                      : null;
                  }
                }
              }
            }
          `}
        </Script>
        <Script id="show-loading-on-route-change" strategy="beforeInteractive">
          {`
            // Show loading screen on route change
            if (typeof window !== 'undefined') {
              let loadingTimeout;
              
              window.addEventListener('beforeunload', () => {
                const loadingEl = document.getElementById('app-loading');
                if (loadingEl) {
                  loadingEl.style.display = 'flex';
                  loadingEl.style.opacity = '1';
                }
              });
            }
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClerkProvider>
          <DevToolsProvider>
            <ClientBody>{children}</ClientBody>
          </DevToolsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
