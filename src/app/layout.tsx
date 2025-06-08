import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import ClerkProvider from "@/components/ClerkProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The360Unity - Developer Community",
  description: "A community platform for developers to share projects, collaborate, and grow together.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#632cfb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
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
          <ClientBody>{children}</ClientBody>
        </ClerkProvider>
      </body>
    </html>
  );
}
