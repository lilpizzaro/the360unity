"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { MenuIcon, XIcon } from "./icons";

export default function DashboardNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              className={`mr-4 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
                  }
                }}
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                type="button"
                className="bg-white/5 rounded-lg p-2 inline-flex items-center justify-center text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XIcon className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/dashboard")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/projects")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/forum"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/forum")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Forum
            </Link>
            <Link
              href="/collaborate"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/collaborate")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Collaborate
            </Link>
            <Link
              href="/showcase"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/showcase")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Showcase
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
