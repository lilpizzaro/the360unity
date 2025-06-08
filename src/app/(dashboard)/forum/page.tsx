"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import { 
  MessageCircleIcon, 
  ChatBubbleIcon, 
  ReactIcon, 
  NextjsIcon, 
  TypeScriptIcon, 
  NodejsIcon, 
  DevOpsIcon, 
  BriefcaseIcon, 
  MegaphoneIcon 
} from "@/components/icons";

const categories = [
  { id: "all", name: "All Topics", icon: <ChatBubbleIcon size={20} className="text-white/80" />, count: 0 },
  { id: "react", name: "React", icon: <ReactIcon size={20} className="text-cyan" />, count: 0 },
  { id: "nextjs", name: "Next.js", icon: <NextjsIcon size={20} className="text-white/80" />, count: 0 },
  { id: "typescript", name: "TypeScript", icon: <TypeScriptIcon size={20} className="text-cyan" />, count: 0 },
  { id: "nodejs", name: "Node.js", icon: <NodejsIcon size={20} className="text-green-400" />, count: 0 },
  { id: "devops", name: "DevOps", icon: <DevOpsIcon size={20} className="text-orange-400" />, count: 0 },
  { id: "career", name: "Career", icon: <BriefcaseIcon size={20} className="text-purple-400" />, count: 0 },
  { id: "general", name: "General", icon: <MegaphoneIcon size={20} className="text-white/80" />, count: 0 }
];

type Thread = {
  id: number;
  title: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
  category: string;
  categoryName: string;
  replies: number;
  views: number;
  createdAt: string;
  lastActivity: string;
  lastAuthor: string;
  pinned: boolean;
  solved: boolean;
  tags: string[];
  content?: string;
};

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Fetch threads from API
  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL('/api/forum', window.location.origin);
        if (selectedCategory !== "all") {
          url.searchParams.append("category", selectedCategory);
        }
        if (searchQuery) {
          url.searchParams.append("search", searchQuery);
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch discussions");
        }
        
        const data = await response.json();
        setThreads(data);
        
        // Calculate category counts
        const counts: Record<string, number> = { all: data.length };
        data.forEach((thread: Thread) => {
          counts[thread.category] = (counts[thread.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      } catch (err) {
        console.error("Error fetching discussions:", err);
        setError("Failed to load discussions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchThreads();
  }, [selectedCategory, searchQuery]);

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Sort threads
  const sortedThreads = [...threads].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-20 px-4 md:px-6 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Community Forum</h1>
              <p className="text-sm md:text-base text-white/70">Connect, learn, and share knowledge with fellow developers</p>
            </div>
            <Link href="/forum/new" className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3 mt-4 md:mt-0 flex items-center justify-center gap-2 rounded-full shadow-lg">
              <MessageCircleIcon size={18} />
              Start Discussion
            </Link>
          </div>

          {/* Mobile Categories Horizontal Scroll */}
          <div className="md:hidden mb-4 overflow-x-auto mobile-scroll pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 p-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-cyan/20 border-cyan/50 text-cyan border"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs opacity-70 bg-white/10 px-1.5 py-0.5 rounded-full">{categoryCounts[category.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 md:gap-8">
            {/* Sidebar - Categories (Desktop Only) */}
            <div className="hidden md:block lg:col-span-1">
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 sticky top-24 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Categories</h3>

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
                        <span className="text-sm opacity-70">{categoryCounts[category.id] || 0}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Forum Stats */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="font-semibold mb-4">Forum Stats</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-70">Total Threads</span>
                      <span>{categoryCounts.all || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Total Posts</span>
                      <span>{threads.reduce((acc, thread) => acc + (thread.replies || 0), threads.length)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Active Users</span>
                      <span>{new Set(threads.filter(t => t.author).map(t => t.author.id)).size}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 w-full overflow-hidden">
              {/* Search Bar */}
              <div className="relative mb-4 md:mb-6">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/20 rounded-xl md:rounded-2xl backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </div>

              {/* Active Category Display (Mobile) */}
              <div className="md:hidden mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    {categories.find(c => c.id === selectedCategory)?.name || "All Topics"}
                  </h3>
                  <div className="text-sm text-white/70">
                    {categoryCounts[selectedCategory] || 0} threads
                  </div>
                </div>
              </div>

              {/* Threads List */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
                </div>
              ) : error ? (
                <div className="mb-6 p-4 md:p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                  <p className="mb-4">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : sortedThreads.length === 0 ? (
                <div className="py-8 md:py-12 text-center bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
                  <div className="mb-4 inline-block p-3 bg-white/10 rounded-full">
                    <MessageCircleIcon size={32} className="text-white/40" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">No discussions found</h3>
                  <p className="text-white/60 max-w-md mx-auto mb-6 text-sm md:text-base">
                    {selectedCategory !== "all" || searchQuery
                      ? "Try adjusting your filters or search query."
                      : "Be the first to start a discussion in our community!"}
                  </p>
                  <Link 
                    href="/forum/new" 
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Start Discussion
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4 w-full">
                  {sortedThreads.map((thread) => (
                    <Link
                      key={thread.id}
                      href={`/forum/${thread.id}`}
                      className="block bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg w-full"
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              {thread.categoryName}
                            </span>
                            {thread.pinned && (
                              <span className="text-xs bg-cyan/20 text-cyan px-2 py-1 rounded-full">
                                Pinned
                              </span>
                            )}
                            {thread.solved && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                Solved
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-base md:text-lg mb-2 truncate">{thread.title}</h3>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {thread.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80"
                              >
                                #{tag}
                              </span>
                            ))}
                            {thread.tags.length > 3 && (
                              <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80">
                                +{thread.tags.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="text-xs md:text-sm text-white/70">
                            By <span className="text-cyan">{thread.author.name}</span> • Last reply {formatRelativeTime(thread.lastActivity)}
                          </div>
                        </div>

                        <div className="text-right text-xs md:text-sm text-white/70 ml-3 flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            <MessageCircleIcon size={14} />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>{thread.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination (only show if there are threads) */}
              {!loading && !error && sortedThreads.length > 0 && (
                <div className="flex justify-center mt-6 md:mt-8">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-cyan/20 text-cyan rounded-full">
                      1
                    </button>
                    <button className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
