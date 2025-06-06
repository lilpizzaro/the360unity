"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/projects", label: "Projects", icon: "🚀" },
  { href: "/forum", label: "Forum", icon: "💬" },
  { href: "/collaborate", label: "Collaborate", icon: "🤝" },
  { href: "/showcase", label: "Showcase", icon: "🌟" }
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          THE360UNITY
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 t-caption transition-colors ${
                pathname === item.href
                  ? "text-cyan"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
