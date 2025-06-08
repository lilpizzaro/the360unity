"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, RocketIcon, MessageCircleIcon, CodeIcon, UserIcon } from "./icons";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <div className="mobile-bottom-nav md:hidden">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${
          isActive("/dashboard") ? "text-cyan" : "text-white/70"
        }`}
      >
        <HomeIcon size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link
        href="/projects"
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${
          isActive("/projects") ? "text-cyan" : "text-white/70"
        }`}
      >
        <RocketIcon size={24} />
        <span className="text-xs mt-1">Projects</span>
      </Link>
      
      <Link
        href="/forum"
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${
          isActive("/forum") ? "text-cyan" : "text-white/70"
        }`}
      >
        <MessageCircleIcon size={24} />
        <span className="text-xs mt-1">Forum</span>
      </Link>
      
      <Link
        href="/collaborate"
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${
          isActive("/collaborate") ? "text-cyan" : "text-white/70"
        }`}
      >
        <CodeIcon size={24} />
        <span className="text-xs mt-1">Collab</span>
      </Link>
      
      <Link
        href="/profile"
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${
          isActive("/profile") ? "text-cyan" : "text-white/70"
        }`}
      >
        <UserIcon size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
} 