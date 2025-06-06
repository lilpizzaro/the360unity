"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

const categories = [
  { id: "all", name: "All Topics", icon: "💬", count: 156 },
  { id: "react", name: "React", icon: "⚛️", count: 42 },
  { id: "nextjs", name: "Next.js", icon: "🔺", count: 28 },
  { id: "typescript", name: "TypeScript", icon: "🔷", count: 35 },
  { id: "nodejs", name: "Node.js", icon: "🟢", count: 31 },
  { id: "devops", name: "DevOps", icon: "🔧", count: 23 },
  { id: "career", name: "Career", icon: "💼", count: 18 },
  { id: "general", name: "General", icon: "🗣️", count: 47 }
];

const threads = [
  {
    id: 1,
    title: "Best practices for React hooks in 2025?",
    author: "Alex Chen",
    category: "react",
    categoryName: "React",
    replies: 23,
    views: 156,
    lastActivity: "2 hours ago",
    lastAuthor: "Sarah Kim",
    pinned: true,
    solved: false,
    tags: ["hooks", "best-practices", "react-18"]
  },
  {
    id: 2,
    title: "How to implement real-time features with WebSockets?",
    author: "Maria Rodriguez",
    category: "nodejs",
    categoryName: "Node.js",
    replies: 15,
    views: 89,
    lastActivity: "4 hours ago",
    lastAuthor: "David Kim",
    pinned: false,
    solved: true,
    tags: ["websockets", "real-time", "socket.io"]
  },
  {
    id: 3,
    title: "TypeScript vs JavaScript in large projects",
    author: "Jennifer Wu",
    category: "typescript",
    categoryName: "TypeScript",
    replies: 31,
    views: 234,
    lastActivity: "6 hours ago",
    lastAuthor: "Tom Johnson",
    pinned: false,
    solved: false,
    tags: ["typescript", "javascript", "architecture"]
  },
  {
    id: 4,
    title: "Docker deployment strategies for microservices",
    author: "Robert Zhang",
    category: "devops",
    categoryName: "DevOps",
    replies: 12,
    views: 67,
    lastActivity: "8 hours ago",
    lastAuthor: "Lisa Park",
    pinned: false,
    solved: false,
    tags: ["docker", "microservices", "deployment"]
  },
  {
    id: 5,
    title: "Breaking into tech as a self-taught developer",
    author: "Emily Davis",
    category: "career",
    categoryName: "Career",
    replies: 45,
    views: 312,
    lastActivity: "1 day ago",
    lastAuthor: "Michael Brown",
    pinned: false,
    solved: false,
    tags: ["career", "self-taught", "job-search"]
  },
  {
    id: 6,
    title: "Next.js 15 new features discussion",
    author: "Kevin Liu",
    category: "nextjs",
    categoryName: "Next.js",
    replies: 18,
    views: 124,
    lastActivity: "1 day ago",
    lastAuthor: "Anna Wilson",
    pinned: false,
    solved: false,
    tags: ["nextjs", "react", "web-development"]
  }
];

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter(thread => {
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedThreads = filteredThreads.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="t-heading-lg mb-4">Community Forum</h1>
            <p className="t-lg opacity-80">Connect, learn, and share knowledge with fellow developers</p>
          </div>
          <Link href="/forum/new" className="btn-primary text-base px-6 py-3 mt-4 md:mt-0">
            Start Discussion
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 sticky top-24">
              <h3 className="t-heading-sm mb-6">Categories</h3>

              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-cyan/20 border-cyan/50 text-cyan border"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm opacity-70">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Forum Stats */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-semibold mb-4">Forum Stats</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Total Threads</span>
                    <span>156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Total Posts</span>
                    <span>1,342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Active Users</span>
                    <span>89</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search discussions, authors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20"
              />
              <div className="absolute right-4 top-4 text-white/50">
                🔍
              </div>
            </div>

            {/* Thread List */}
            <div className="space-y-4">
              {sortedThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Thread Title and Badges */}
                      <div className="flex items-center mb-3">
                        {thread.pinned && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full mr-2">
                            📌 Pinned
                          </span>
                        )}
                        {thread.solved && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full mr-2">
                            ✅ Solved
                          </span>
                        )}
                        <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full">
                          {thread.categoryName}
                        </span>
                      </div>

                      {/* Thread Title */}
                      <Link href={`/forum/thread/${thread.id}`}>
                        <h3 className="t-heading-sm mb-3 group-hover:text-cyan transition-colors cursor-pointer">
                          {thread.title}
                        </h3>
                      </Link>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/70"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Author and Activity Info */}
                      <div className="flex items-center justify-between text-sm opacity-70">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                            {thread.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>Started by {thread.author}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>👁️ {thread.views} views</span>
                          <span>💬 {thread.replies} replies</span>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="mt-3 text-sm opacity-60 border-t border-white/10 pt-3">
                        Last reply by {thread.lastAuthor} • {thread.lastActivity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredThreads.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="t-heading-sm mb-2">No discussions found</h3>
                <p className="text-white/70 mb-6">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : `No discussions in this category yet`
                  }
                </p>
                <Link href="/forum/new" className="btn-primary">
                  Start the First Discussion
                </Link>
              </div>
            )}

            {/* Pagination */}
            {filteredThreads.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-cyan/20 border-cyan/50 text-cyan rounded-lg border">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
