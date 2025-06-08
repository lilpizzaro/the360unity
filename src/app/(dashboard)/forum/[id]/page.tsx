"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import { ArrowLeftIcon, MessageCircleIcon } from "@/components/icons";
import { useUser } from "@clerk/nextjs";

type Thread = {
  id: number;
  title: string;
  content: string;
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
};

type Reply = {
  id: number;
  content: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
  isAnswer: boolean;
};

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const threadId = params.id as string;

  // Fetch thread data
  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would fetch from an API endpoint
        // For now, we'll just use our in-memory data from the API route
        const response = await fetch('/api/forum');
        if (!response.ok) {
          throw new Error("Failed to fetch discussions");
        }
        
        const threads = await response.json();
        const thread = threads.find((t: Thread) => t.id === parseInt(threadId));
        
        if (!thread) {
          throw new Error("Thread not found");
        }
        
        setThread(thread);
        
        // Fetch actual replies from API
        const repliesResponse = await fetch(`/api/forum/comments?postId=${threadId}`);
        if (!repliesResponse.ok) {
          throw new Error("Failed to fetch replies");
        }
        const repliesData = await repliesResponse.json();
        setReplies(repliesData);
      } catch (err) {
        console.error("Error fetching thread:", err);
        setError(err.message || "Failed to load discussion. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (threadId) {
      fetchThread();
    }
  }, [threadId]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle reply submission
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send reply to API
      const response = await fetch('/api/forum/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: parseInt(threadId),
          content: replyContent
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to post reply");
      }
      
      const newReply = await response.json();
      
      // Add new reply to the list
      setReplies([...replies, newReply]);
      setReplyContent("");
      
      // Update thread with new reply count
      if (thread) {
        setThread({
          ...thread,
          replies: thread.replies + 1,
          lastActivity: new Date().toISOString(),
          lastAuthor: user?.fullName || user?.username || "Anonymous"
        });
      }
    } catch (err) {
      console.error("Error posting reply:", err);
      alert("Failed to post reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <DashboardNav />
        <div className="min-h-screen pt-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !thread) {
    return (
      <>
        <DashboardNav />
        <div className="min-h-screen pt-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 p-6 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              <p className="mb-4">{error || "Thread not found"}</p>
              <button 
                onClick={() => router.push("/forum")} 
                className="px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors"
              >
                Back to Forum
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/forum" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Forum
            </Link>
          </div>

          {/* Thread Header */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-sm bg-white/10 px-2 py-1 rounded-full mr-2">
                {thread.categoryName}
              </span>
              {thread.pinned && (
                <span className="text-xs bg-cyan/20 text-cyan px-2 py-1 rounded-full mr-2">
                  Pinned
                </span>
              )}
              {thread.solved && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Solved
                </span>
              )}
            </div>

            <h1 className="t-heading-lg mb-4">{thread.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {thread.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {thread.author.imageUrl ? (
                  <img 
                    src={thread.author.imageUrl} 
                    alt={thread.author.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {thread.author.name[0]}
                  </div>
                )}
                <div>
                  <div className="font-medium">{thread.author.name}</div>
                  <div className="text-sm text-white/70">{formatDate(thread.createdAt)}</div>
                </div>
              </div>

              <div className="text-sm text-white/70">
                <span>{thread.views} views</span>
                <span className="mx-2">•</span>
                <span>{thread.replies} replies</span>
              </div>
            </div>

            {/* Thread Content */}
            <div className="prose prose-invert max-w-none">
              <p>{thread.content}</p>
            </div>
          </div>

          {/* Replies */}
          <div className="mb-8">
            <h2 className="t-heading-md mb-6">Replies ({replies.length})</h2>

            {replies.length > 0 ? (
              <div className="space-y-6">
                {replies.map((reply) => (
                  <div 
                    key={reply.id} 
                    className={`bg-white/5 rounded-2xl p-6 backdrop-blur-sm border ${
                      reply.isAnswer ? "border-green-500/30" : "border-white/10"
                    }`}
                  >
                    {reply.isAnswer && (
                      <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full mb-4">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Solution
                      </div>
                    )}
                    
                    {/* Author Info */}
                    <div className="flex items-center mb-4">
                      {reply.author.imageUrl ? (
                        <img 
                          src={reply.author.imageUrl} 
                          alt={reply.author.name} 
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                          {reply.author.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{reply.author.name}</div>
                        <div className="text-xs text-white/70">{formatDate(reply.createdAt)}</div>
                      </div>
                    </div>

                    {/* Reply Content */}
                    <div className="prose prose-invert max-w-none">
                      <p>{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-white/70 mb-2">No replies yet</p>
                <p className="text-white/70">Be the first to reply to this discussion!</p>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {isLoaded && user ? (
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="t-heading-sm mb-4">Post a Reply</h3>
              <form onSubmit={handleReplySubmit}>
                <div className="mb-4">
                  <textarea
                    rows={6}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply here..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className="btn-primary px-6 py-3 flex items-center gap-2"
                  >
                    <MessageCircleIcon size={18} />
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center">
              <p className="mb-4">You need to sign in to reply to this discussion</p>
              <Link href="/sign-in" className="btn-primary px-6 py-3 inline-block">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 