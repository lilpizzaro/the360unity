"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import GitHubIntegration from "@/components/GitHubIntegration";
import ProjectsShowcase from "@/components/ProjectsShowcase";

const categories = [
  { id: "all", name: "All Projects", count: 0 },
  { id: "frontend", name: "Frontend", count: 0 },
  { id: "backend", name: "Backend", count: 0 },
  { id: "fullstack", name: "Full Stack", count: 0 },
  { id: "mobile", name: "Mobile", count: 0 },
  { id: "ai", name: "AI/ML", count: 0 },
  { id: "devops", name: "DevOps", count: 0 }
];

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Project Showcase</h1>
            <p className="t-lg opacity-80">
              Showcase your projects and discover amazing work from other developers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - GitHub Integration */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h2 className="t-heading-sm mb-6">Import from GitHub</h2>
                <GitHubIntegration />
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h2 className="t-heading-sm mb-6">Showcase Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Your Projects</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Total Stars</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Featured Projects</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Profile Views</span>
                    <span className="font-semibold">-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Projects */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="t-heading-md">Your Projects</h2>
                <Link href="/dashboard/new-project" className="btn-primary text-sm px-4 py-2">
                  Add Project
                </Link>
              </div>

              <div className="space-y-6">
                <ProjectsShowcase showFilters={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
