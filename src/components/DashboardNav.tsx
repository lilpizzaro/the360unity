"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">The360Unity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/dashboard"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/dashboard")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/projects")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/forum"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/forum")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Forum
            </Link>
            <Link
              href="/collaborate"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/collaborate")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Collaborate
            </Link>
            <Link
              href="/showcase"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/showcase")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Showcase
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <Link
              href="/profile"
              className={`hidden md:block mr-4 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive("/profile")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Profile
            </Link>
            <div className="relative">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonTrigger: "focus:shadow-none focus:ring-2 focus:ring-white/20 rounded-full",
                    userButtonPopoverCard: "bg-black/80 border border-white/10 shadow-xl",
                    userButtonPopoverFooter: "hidden",
                    userButtonPopoverActionButton: "hover:bg-white/10 text-white",
                    userButtonPopoverActionButtonText: "text-white",
                    userPreviewMainIdentifier: "text-white",
                    userPreviewSecondaryIdentifier: "text-white/70",
                    userButtonPopoverActionButtonIcon: "text-white",
                    userButtonPopoverIcon: "text-white",
                    userProfileSectionPrimaryButton: "text-white hover:bg-white/10",
                    userProfileSectionSecondaryButton: "text-white hover:bg-white/10",
                    userButtonPopoverActionButtonIconBox: "text-white",
                    userProfilePage: "text-white",
                  },
                  variables: {
                    colorText: "white",
                    colorTextSecondary: "rgba(255, 255, 255, 0.7)",
                    colorBackground: "rgba(0, 0, 0, 0.8)",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
