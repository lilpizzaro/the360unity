import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import MobileBottomNav from "@/components/MobileBottomNav";

// This is needed to ensure the route is properly compiled
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.userId;
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <DashboardNav />
      {children}
      <MobileBottomNav />
    </div>
  );
} 