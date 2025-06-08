"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeIcon, LightbulbIcon, MessageCircleIcon, RocketIcon, UserIcon } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import ProjectsShowcase from "@/components/ProjectsShowcase";

interface Project {
  id: string;
  name: string;
  tech: string;
  status: string;
  stars: number;
}

interface ForumThread {
  id: string;
  title: string;
  category: string;
  replies: number;
  time: string;
}

export default function Dashboard() {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projectCount: 0,
    collaborationCount: 0,
    starsCount: 0,
    forumCount: 0
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch recent projects data
        const projectsRes = await fetch('/api/projects?limit=3');
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setRecentProjects(
            projectsData.map((p: any) => ({
              id: p.id,
              name: p.title,
              tech: p.technologies?.map((t: any) => t.name).join(', ') || '',
              status: p.status || 'Active',
              stars: p.stars || 0
            }))
          );
          
          // Calculate stats
          setStats(prevStats => ({
            ...prevStats,
            projectCount: projectsData.length,
            starsCount: projectsData.reduce((sum: number, p: any) => sum + (p.stars || 0), 0)
          }));
        }

        // Fetch forum threads data
        const forumRes = await fetch('/api/forum?limit=3');
        if (forumRes.ok) {
          const forumData = await forumRes.json();
          setForumThreads(
            forumData.map((t: any) => ({
              id: t.id,
              title: t.title,
              category: t.category_name || 'General',
              replies: t.replies || 0,
              time: formatRelativeTime(new Date(t.created_at))
            }))
          );
          
          // Update forum stats
          setStats(prevStats => ({
            ...prevStats,
            forumCount: forumData.length
          }));
        }
        
        // Fetch collaboration stats
        const collabRes = await fetch('/api/collaboration/stats');
        if (collabRes.ok) {
          const collabData = await collabRes.json();
          setStats(prevStats => ({
            ...prevStats,
            collaborationCount: collabData.count || 0
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Helper function to format relative time
  function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMins > 0) {
      return `${diffMins}m ago`;
    } else {
      return 'Just now';
    }
  }

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-center mb-2">
                <RocketIcon size={32} className="text-cyan" />
              </div>
              <div className="t-heading-sm mb-1 text-center">{stats.projectCount}</div>
              <div className="t-base opacity-70 text-center">Projects</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-center mb-2">
                <CodeIcon size={32} className="text-cyan" />
              </div>
              <div className="t-heading-sm mb-1 text-center">{stats.collaborationCount}</div>
              <div className="t-base opacity-70 text-center">Collaborations</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-center mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-cyan"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="t-heading-sm mb-1 text-center">{stats.starsCount}</div>
              <div className="t-base opacity-70 text-center">Stars Earned</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-center mb-2">
                <MessageCircleIcon size={32} className="text-cyan" />
              </div>
              <div className="t-heading-sm mb-1 text-center">{stats.forumCount}</div>
              <div className="t-base opacity-70 text-center">Forum Posts</div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="t-heading-md">Featured Projects</h2>
              <Link href="/projects" className="text-cyan hover:underline">
                View All Projects
              </Link>
            </div>
            <ProjectsShowcase limit={3} showFilters={false} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Projects */}
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <RocketIcon size={20} className="text-cyan" />
                    <h2 className="t-heading-sm">Your Recent Projects</h2>
                  </div>
                  <Link href="/projects/new" className="btn-primary text-sm px-4 py-2">
                    New Project
                  </Link>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl animate-pulse">
                        <div className="w-2/3 h-12"></div>
                        <div className="w-1/4 h-12"></div>
                      </div>
                    ))
                  ) : recentProjects.length > 0 ? (
                    recentProjects.map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <div className="font-semibold text-white mb-1">{project.name}</div>
                          <div className="text-sm opacity-70">{project.tech}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-cyan mb-1">{project.status}</div>
                          <div className="text-sm opacity-70 flex items-center justify-end gap-1">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="12" 
                              height="12" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {project.stars}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm opacity-70 mb-2">No projects yet</p>
                      <Link href="/projects/new" className="text-cyan text-sm hover:underline">
                        Create your first project
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Forum Activity */}
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MessageCircleIcon size={20} className="text-cyan" />
                    <h2 className="t-heading-sm">Recent Forum Activity</h2>
                  </div>
                  <Link href="/forum" className="text-cyan text-sm hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl animate-pulse">
                        <div className="w-3/4 h-12"></div>
                        <div className="w-1/5 h-6"></div>
                      </div>
                    ))
                  ) : forumThreads.length > 0 ? (
                    forumThreads.map((thread, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{thread.title}</div>
                          <div className="text-sm opacity-70">{thread.category} • {thread.time}</div>
                        </div>
                        <div className="text-sm opacity-70 flex items-center gap-1">
                          <MessageCircleIcon size={14} />
                          {thread.replies}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm opacity-70 mb-2">No forum activity</p>
                      <Link href="/forum/new" className="text-cyan text-sm hover:underline">
                        Start a discussion
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Recommendations */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <LightbulbIcon size={20} className="text-cyan" />
                  <h2 className="t-heading-sm">Quick Actions</h2>
                </div>

                <div className="space-y-3">
                  <Link href="/projects" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <RocketIcon size={20} className="text-cyan" />
                      </div>
                      <div>
                        <div className="font-semibold">Browse Projects</div>
                        <div className="text-sm opacity-70">Discover amazing work</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/forum" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <MessageCircleIcon size={20} className="text-cyan" />
                      </div>
                      <div>
                        <div className="font-semibold">Join Discussions</div>
                        <div className="text-sm opacity-70">Ask questions & help others</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/collaborate" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <CodeIcon size={20} className="text-cyan" />
                      </div>
                      <div>
                        <div className="font-semibold">Find Collaborators</div>
                        <div className="text-sm opacity-70">Team up on projects</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recommended Developers section removed and will be implemented with real data later */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
