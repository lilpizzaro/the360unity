"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import { MessageCircleIcon } from "@/components/icons";

export default function NewThreadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    tags: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Process tags
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");
      
      // Send data to API
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          tags
        }),
        credentials: 'include'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (err) {
        console.error("Failed to parse response:", err);
        responseData = { error: "Invalid server response" };
      }
      
      if (!response.ok) {
        console.error("API error:", response.status, responseData);
        
        if (response.status === 401) {
          // Handle auth error specifically
          setError("You need to be signed in to create a discussion. Please sign in and try again.");
          // Redirect to sign in after a short delay
          setTimeout(() => {
            router.push("/sign-in?redirect_url=" + encodeURIComponent("/forum/new"));
          }, 2000);
          return;
        }
        
        throw new Error(responseData?.error || "Failed to create discussion");
      }
      
      // Redirect to forum page
      router.push("/forum");
    } catch (error) {
      console.error("Error creating discussion:", error);
      setError(error.message || "Failed to create discussion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Create New Discussion</h1>
            <p className="t-base opacity-80">
              Start a new discussion thread in the developer community forum.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thread Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  placeholder="e.g. Best practices for React hooks?"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                >
                  <option value="general">General Discussion</option>
                  <option value="react">React</option>
                  <option value="nextjs">Next.js</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="nodejs">Node.js</option>
                  <option value="python">Python</option>
                  <option value="devops">DevOps</option>
                  <option value="design">UI/UX Design</option>
                  <option value="career">Career Advice</option>
                  <option value="help">Help Wanted</option>
                </select>
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  placeholder="e.g. hooks, state-management, performance"
                />
                <p className="text-xs opacity-70 mt-1">
                  Add relevant tags to help others find your discussion
                </p>
              </div>

              {/* Thread Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Discussion Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  required
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono text-sm"
                  placeholder="Write your discussion content here... Markdown is supported."
                />
                <p className="text-xs opacity-70 mt-2">
                  Tip: You can use Markdown to format your text, add code blocks, and more.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-6 py-3 flex items-center gap-2"
                >
                  <MessageCircleIcon size={18} />
                  {isLoading ? "Creating..." : "Post Discussion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 