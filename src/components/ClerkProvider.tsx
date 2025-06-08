"use client";

import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs";

export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseClerkProvider 
      appearance={{
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-opacity",
          card: "bg-black/50 backdrop-blur-md border border-white/10",
          headerTitle: "text-white",
          headerSubtitle: "text-white/70",
          socialButtonsBlockButton: "bg-white/5 hover:bg-white/10 border border-white/10",
          socialButtonsBlockButtonText: "text-white",
          formFieldLabel: "text-white/70",
          formFieldInput: "bg-white/5 border border-white/10 text-white",
          footerActionText: "text-white/70",
          footerActionLink: "text-cyan hover:text-cyan/80",
          logoBox: "hidden",
          logoImage: "hidden",
          // Hide branding elements
          badge: "hidden",
          footer: "hidden",
          footerAction: "py-4",
          // Customizing the colors and styles
          rootBox: "bg-transparent",
          main: "bg-transparent",
          navbar: "hidden",
          navbarButtons: "hidden",
          identityPreview: "bg-white/10 border-white/10",
        },
        variables: {
          // Remove Clerk-specific color scheme
          colorPrimary: "rgb(14, 165, 233)", // Tailwind cyan-500
          colorText: "white",
          colorTextSecondary: "rgba(255, 255, 255, 0.7)",
          colorBackground: "rgba(0, 0, 0, 0.3)",
          colorInputText: "white",
          colorInputBackground: "rgba(255, 255, 255, 0.05)",
          borderRadius: "0.5rem",
        }
      }}
    >
      {children}
    </BaseClerkProvider>
  );
} 