import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

export default function Dashboard() {
  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="t-heading-lg mb-4">Welcome to your Dashboard</h1>
          <p className="t-lg opacity-80">Manage your projects, connect with developers, and grow your skills.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-3xl mb-2">🚀</div>
            <div className="t-heading-sm mb-1">12</div>
            <div className="t-base opacity-70">Projects Shared</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-3xl mb-2">👥</div>
            <div className="t-heading-sm mb-1">48</div>
            <div className="t-base opacity-70">Connections</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-3xl mb-2">⭐</div>
            <div className="t-heading-sm mb-1">156</div>
            <div className="t-base opacity-70">Stars Earned</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-3xl mb-2">💡</div>
            <div className="t-heading-sm mb-1">23</div>
            <div className="t-base opacity-70">Forum Posts</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Projects */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="t-heading-sm">Your Recent Projects</h2>
                <Link href="/projects/new" className="btn-primary text-sm px-4 py-2">
                  New Project
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { name: "AI Chat Application", tech: "Next.js, OpenAI", status: "Active", stars: 24 },
                  { name: "Task Manager", tech: "React, Node.js", status: "Complete", stars: 12 },
                  { name: "Weather Dashboard", tech: "Vue.js, API", status: "In Progress", stars: 8 }
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="font-semibold text-white mb-1">{project.name}</div>
                      <div className="text-sm opacity-70">{project.tech}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-cyan mb-1">{project.status}</div>
                      <div className="text-sm opacity-70">⭐ {project.stars}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forum Activity */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="t-heading-sm">Recent Forum Activity</h2>
                <Link href="/forum" className="text-cyan text-sm hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Best practices for React hooks?", category: "React", replies: 12, time: "2h ago" },
                  { title: "TypeScript vs JavaScript in 2025", category: "General", replies: 8, time: "4h ago" },
                  { title: "Need help with deployment", category: "DevOps", replies: 5, time: "1d ago" }
                ].map((thread, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{thread.title}</div>
                      <div className="text-sm opacity-70">{thread.category} • {thread.time}</div>
                    </div>
                    <div className="text-sm opacity-70">
                      {thread.replies} replies
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Recommendations */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h2 className="t-heading-sm mb-6">Quick Actions</h2>

              <div className="space-y-3">
                <Link href="/projects" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🚀</span>
                    <div>
                      <div className="font-semibold">Browse Projects</div>
                      <div className="text-sm opacity-70">Discover amazing work</div>
                    </div>
                  </div>
                </Link>

                <Link href="/forum" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">💬</span>
                    <div>
                      <div className="font-semibold">Join Discussions</div>
                      <div className="text-sm opacity-70">Ask questions & help others</div>
                    </div>
                  </div>
                </Link>

                <Link href="/collaborate" className="block w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🤝</span>
                    <div>
                      <div className="font-semibold">Find Collaborators</div>
                      <div className="text-sm opacity-70">Team up on projects</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recommended Developers */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h2 className="t-heading-sm mb-6">Developers to Follow</h2>

              <div className="space-y-4">
                {[
                  { name: "Alex Chen", role: "Full Stack Engineer", tech: "React, Node.js", mutual: 5 },
                  { name: "Maria Rodriguez", role: "Frontend Developer", tech: "Vue.js, TypeScript", mutual: 3 },
                  { name: "David Kim", role: "DevOps Engineer", tech: "Docker, AWS", mutual: 7 }
                ].map((dev, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {dev.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{dev.name}</div>
                        <div className="text-xs opacity-70">{dev.role}</div>
                        <div className="text-xs opacity-50">{dev.tech}</div>
                      </div>
                    </div>
                    <button className="btn-primary text-xs px-3 py-1">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
