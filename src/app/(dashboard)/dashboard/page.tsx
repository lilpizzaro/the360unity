"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeIcon, LightbulbIcon, MessageCircleIcon, RocketIcon, UserIcon, TrendingUpIcon, CalendarIcon, StarIcon, BellIcon } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SuggestedUsers from "@/components/SuggestedUsers";
import { useUser } from "@clerk/nextjs";

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
  const { user, isLoaded } = useUser();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projectCount: 0,
    collaborationCount: 0,
    starsCount: 0,
    forumCount: 0,
    projectsThisWeek: 0,
    collaborationsNew: 0,
    starsThisMonth: 0,
    forumReplies: 0
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
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          
          const projectsThisWeek = projectsData.filter((p: any) => {
            const createdAt = new Date(p.created_at);
            return createdAt >= oneWeekAgo;
          }).length;
          
          const starsThisMonth = projectsData.reduce((sum: number, p: any) => {
            // Assuming each project has a created_at field for when it was starred
            // This is a simplification - in a real app you'd track when stars were given
            const createdAt = new Date(p.created_at);
            return sum + (createdAt >= oneMonthAgo ? (p.stars || 0) : 0);
          }, 0);
          
          setStats(prevStats => ({
            ...prevStats,
            projectCount: projectsData.length,
            starsCount: projectsData.reduce((sum: number, p: any) => sum + (p.stars || 0), 0),
            projectsThisWeek,
            starsThisMonth
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
          const forumReplies = forumData.reduce((sum: number, t: any) => sum + (t.replies || 0), 0);
          
          setStats(prevStats => ({
            ...prevStats,
            forumCount: forumData.length,
            forumReplies
          }));
        }
        
        // Fetch collaboration stats
        const collabRes = await fetch('/api/collaboration/stats');
        if (collabRes.ok) {
          const collabData = await collabRes.json();
          
          // For simplicity, assume 1 new collaboration if any exist
          const collaborationsNew = collabData.count > 0 ? 1 : 0;
          
          setStats(prevStats => ({
            ...prevStats,
            collaborationCount: collabData.count || 0,
            collaborationsNew
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
      <div className="min-h-screen pt-20 md:pt-24 px-4 md:px-6 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading with personalized greeting */}
          <div className="mb-5 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {isLoaded && user ? `Hey ${user.firstName || user.username}! ` : 'Dashboard'}
            </h1>
            <p className="text-white/70 text-sm md:text-base">Your developer hub and activity center</p>
          </div>
          
          {/* Stats Summary with improved visuals */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan/20 rounded-xl md:rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-lg flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center mr-4">
                <RocketIcon size={20} className="text-purple-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Total Projects</div>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold mr-2">{stats.projectCount}</div>
                  {stats.projectsThisWeek > 0 && (
                    <div className="text-xs text-green-400">+{stats.projectsThisWeek} this week</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 rounded-xl md:rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-lg flex items-center">
              <div className="w-12 h-12 rounded-full bg-cyan/30 flex items-center justify-center mr-4">
                <CodeIcon size={20} className="text-cyan" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Active Collaborations</div>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold mr-2">{stats.collaborationCount}</div>
                  {stats.collaborationsNew > 0 && (
                    <div className="text-xs text-green-400">+{stats.collaborationsNew} new</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl md:rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-lg flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-500/30 flex items-center justify-center mr-4">
                <StarIcon size={20} className="text-yellow-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Stars Earned</div>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold mr-2">{stats.starsCount}</div>
                  {stats.starsThisMonth > 0 && (
                    <div className="text-xs text-green-400">+{stats.starsThisMonth} this month</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl md:rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-lg flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mr-4">
                <MessageCircleIcon size={20} className="text-green-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Forum Activity</div>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold mr-2">{stats.forumCount}</div>
                  {stats.forumReplies > 0 && (
                    <div className="text-xs text-green-400">+{stats.forumReplies} replies</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-6 md:mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan/30 flex items-center justify-center">
                  <TrendingUpIcon size={18} className="text-white" />
                </div>
                <h2 className="text-lg md:text-xl font-bold">Featured Projects</h2>
              </div>
              <Link href="/projects" className="text-cyan hover:underline flex items-center gap-1 text-sm bg-white/5 px-3 py-1 rounded-full">
                <span className="hidden sm:inline">View All Projects</span>
                <span className="sm:hidden">View All</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <ProjectsShowcase limit={3} showFilters={false} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Recent Activity */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Recent Projects */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan/30 flex items-center justify-center">
                      <RocketIcon size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Your Projects</h2>
                  </div>
                  <Link href="/projects/new" className="btn-primary text-xs md:text-sm px-3 py-2 flex items-center gap-1 rounded-full">
                    <span className="hidden sm:inline">New Project</span>
                    <span className="sm:hidden">New</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </Link>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl animate-pulse">
                        <div className="w-2/3 h-12"></div>
                        <div className="w-1/4 h-12"></div>
                      </div>
                    ))
                  ) : recentProjects.length > 0 ? (
                    recentProjects.map((project, index) => (
                      <Link href={`/projects/${project.id}`} key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div>
                          <div className="font-semibold text-white mb-1">{project.name}</div>
                          <div className="text-xs text-white/70">{project.tech}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-cyan mb-1">{project.status}</div>
                          <div className="text-xs text-white/70 flex items-center justify-end gap-1">
                            <StarIcon size={12} className="text-yellow-400" />
                            {project.stars}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-white/5 rounded-xl">
                      <RocketIcon size={32} className="text-white/30 mx-auto mb-3" />
                      <p className="text-sm opacity-70 mb-3">No projects yet</p>
                      <Link href="/projects/new" className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-1 rounded-full">
                        <span>Create your first project</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Forum Activity */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                      <MessageCircleIcon size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Forum Activity</h2>
                  </div>
                  <Link href="/forum" className="text-cyan hover:underline flex items-center gap-1 text-sm bg-white/5 px-3 py-1 rounded-full">
                    View All
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl animate-pulse">
                        <div className="w-3/4 h-12"></div>
                        <div className="w-1/5 h-6"></div>
                      </div>
                    ))
                  ) : forumThreads.length > 0 ? (
                    forumThreads.map((thread, index) => (
                      <Link href={`/forum/${thread.id}`} key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{thread.title}</div>
                          <div className="text-xs text-white/70 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs">{thread.category}</span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} />
                              {thread.time}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-white/70 flex items-center gap-1">
                          <MessageCircleIcon size={14} />
                          {thread.replies}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-white/5 rounded-xl">
                      <MessageCircleIcon size={32} className="text-white/30 mx-auto mb-3" />
                      <p className="text-sm opacity-70 mb-3">No forum activity</p>
                      <Link href="/forum/new" className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-1 rounded-full">
                        <span>Start a discussion</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Recent Activity Timeline */}
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 flex items-center justify-center">
                    <BellIcon size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold">Activity Timeline</h2>
                </div>
                
                <div className="relative pl-6 border-l border-white/10 space-y-4">
                  {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-white/30"></div>
                        <div className="text-sm text-white/50 mb-1 animate-pulse w-16 h-4"></div>
                        <div className="p-3 md:p-4 bg-white/5 rounded-xl animate-pulse h-16"></div>
                      </div>
                    ))
                  ) : (
                    <>
                      {stats.projectCount > 0 && (
                        <div className="relative">
                          <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-cyan"></div>
                          <div className="text-sm text-white/50 mb-1">Today</div>
                          <div className="p-3 md:p-4 bg-white/5 rounded-xl">
                            <div className="font-medium mb-1">Your Projects</div>
                            <div className="text-sm text-white/70">You have {stats.projectCount} active project{stats.projectCount !== 1 ? 's' : ''}</div>
                          </div>
                        </div>
                      )}
                      
                      {stats.starsCount > 0 && (
                        <div className="relative">
                          <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-white/30"></div>
                          <div className="text-sm text-white/50 mb-1">This Month</div>
                          <div className="p-3 md:p-4 bg-white/5 rounded-xl">
                            <div className="font-medium mb-1">Stars Received</div>
                            <div className="text-sm text-white/70">Your projects have received {stats.starsCount} star{stats.starsCount !== 1 ? 's' : ''}</div>
                          </div>
                        </div>
                      )}
                      
                      {stats.forumCount > 0 && (
                        <div className="relative">
                          <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-white/30"></div>
                          <div className="text-sm text-white/50 mb-1">Recent Activity</div>
                          <div className="p-3 md:p-4 bg-white/5 rounded-xl">
                            <div className="font-medium mb-1">Forum Participation</div>
                            <div className="text-sm text-white/70">You've participated in {stats.forumCount} forum thread{stats.forumCount !== 1 ? 's' : ''}</div>
                          </div>
                        </div>
                      )}
                      
                      {stats.projectCount === 0 && stats.starsCount === 0 && stats.forumCount === 0 && (
                        <div className="relative">
                          <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-white/30"></div>
                          <div className="text-sm text-white/50 mb-1">Get Started</div>
                          <div className="p-3 md:p-4 bg-white/5 rounded-xl">
                            <div className="font-medium mb-1">Welcome to The 360 Unity!</div>
                            <div className="text-sm text-white/70">Create a project or join a discussion to see your activity here</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Recommendations */}
            <div className="space-y-4 md:space-y-6">
              {/* Suggested Users */}
              <SuggestedUsers />
              
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                    <LightbulbIcon size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold">Quick Actions</h2>
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

              {/* Learning Resources */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500/30 to-rose-500/30 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">Learning Resources</h2>
                </div>
                
                <div className="space-y-3">
                  <Link href="/docs/getting-started" className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="font-medium mb-1">Getting Started Guide</div>
                    <div className="text-sm text-white/70">Learn the platform basics</div>
                  </Link>
                  
                  <Link href="/docs/api-reference" className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="font-medium mb-1">API Documentation</div>
                    <div className="text-sm text-white/70">Integrate with our platform</div>
                  </Link>
                  
                  <Link href="/docs/tutorials" className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="font-medium mb-1">Video Tutorials</div>
                    <div className="text-sm text-white/70">Step-by-step guides</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
