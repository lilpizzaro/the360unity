"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardNav from "@/components/DashboardNav";
import { MessageCircle, Code, Book, UserPlus, UserMinus } from "lucide-react";
import toast from "react-hot-toast";

interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
  jobTitle: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  skills: string[];
  followersCount: number;
  followingCount: number;
}

// Add isFollowing property to track follow status
interface UserProfileWithFollowStatus extends UserProfile {
  isFollowing?: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

interface ForumActivity {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  replies: number;
}

export default function UserProfilePage() {
  const { username } = useParams();
  const { user: currentUser, isLoaded: isUserLoaded } = useUser();
  const [user, setUser] = useState<UserProfileWithFollowStatus | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [forumActivity, setForumActivity] = useState<ForumActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching profile for username:", username);
        
        // Fetch user profile data from Clerk
        const response = await fetch(`/api/users/profile/${username}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Profile fetch error:", response.status, errorData);
          throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }
        
        const userData = await response.json();
        console.log("User data received:", userData);
        
        // Check if current user is following this profile
        if (isUserLoaded && currentUser && currentUser.id !== userData.id) {
          try {
            const followStatusResponse = await fetch(`/api/users/follow/status?followingId=${userData.id}`);
            if (followStatusResponse.ok) {
              const { isFollowing } = await followStatusResponse.json();
              userData.isFollowing = isFollowing;
            }
          } catch (err) {
            console.error("Error checking follow status:", err);
            userData.isFollowing = false;
          }
        }
        
        setUser(userData);
        
        // Fetch user's projects from Supabase
        const projectsResponse = await fetch(`/api/users/${userData.id}/projects`);
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          console.log("Projects data received:", projectsData);
          setProjects(projectsData);
        } else {
          console.error("Error fetching projects:", projectsResponse.statusText);
          setProjects([]);
        }
        
        // Fetch user's forum activity from Supabase
        const forumResponse = await fetch(`/api/users/${userData.id}/forum-activity`);
        if (forumResponse.ok) {
          const forumData = await forumResponse.json();
          console.log("Forum data received:", forumData);
          setForumActivity(forumData);
        } else {
          console.error("Error fetching forum activity:", forumResponse.statusText);
          setForumActivity([]);
        }
      } catch (err) {
        console.error("Error in profile page:", err);
        setError(err instanceof Error ? err.message : "Failed to load user profile");
        setProjects([]);
        setForumActivity([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      fetchUserProfile();
    }
  }, [username, currentUser, isUserLoaded]);

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!isUserLoaded || !currentUser || !user) return;
    
    // Prevent following yourself
    if (currentUser.id === user.id) {
      toast.error("You can't follow yourself");
      return;
    }
    
    setIsFollowLoading(true);
    
    try {
      const endpoint = user.isFollowing ? '/api/users/unfollow' : '/api/users/follow';
      
      // Optimistically update UI
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          isFollowing: !prev.isFollowing,
          followersCount: prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
        };
      });
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followingId: user.id }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Failed to ${user.isFollowing ? 'unfollow' : 'follow'} user`);
      }
      
      toast.success(user.isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
    } catch (err) {
      console.error('Error toggling follow status:', err);
      
      // Revert UI state on error
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          isFollowing: !prev.isFollowing,
          followersCount: !prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
        };
      });
      
      toast.error(err instanceof Error ? err.message : 'Failed to update follow status');
    } finally {
      setIsFollowLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <>
        <DashboardNav />
        <div className="min-h-screen pt-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <DashboardNav />
        <div className="min-h-screen pt-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 rounded-xl md:rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="text-center py-10">
                <h2 className="text-xl md:text-2xl font-bold mb-4">User Not Found</h2>
                <p className="text-white/70 mb-6">{error || "The user profile you're looking for doesn't exist or has been removed."}</p>
                <Link href="/dashboard" className="btn-primary">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Update the follow button in the JSX
  const followButton = (
    <button 
      onClick={handleFollowToggle}
      disabled={!isUserLoaded || !currentUser || isFollowLoading || currentUser.id === user.id}
      className={`px-6 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
        !isUserLoaded || !currentUser || currentUser.id === user.id
          ? 'bg-white/10 text-white/50 cursor-not-allowed'
          : user.isFollowing
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 shadow-lg'
      }`}
    >
      {isFollowLoading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : user.isFollowing ? (
        <>
          <UserMinus size={16} />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus size={16} />
          Follow
        </>
      )}
    </button>
  );

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-4 md:px-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="w-24 h-24 md:w-32 md:h-32">
                {user.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold">
                    {user.firstName?.[0] || user.username?.[0] || "U"}
                  </div>
                )}
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="text-lg text-white/70 mb-2">@{user.username}</div>
                <div className="text-white/80 mb-4">{user.jobTitle || "Developer"}</div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  {user.location && (
                    <div className="text-sm text-white/70 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {user.location}
                    </div>
                  )}
                  
                  <div className="text-sm text-white/70">
                    <span className="font-medium text-white">{user.followersCount || 0}</span> followers
                  </div>
                  
                  <div className="text-sm text-white/70">
                    <span className="font-medium text-white">{user.followingCount || 0}</span> following
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {user.website && (
                    <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      🔗 Website
                    </a>
                  )}
                  {user.github && (
                    <a href={user.github.startsWith('http') ? user.github : `https://github.com/${user.github.replace(/^@|https:\/\/github\.com\//g, '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      💻 GitHub
                    </a>
                  )}
                  {user.twitter && (
                    <a href={user.twitter.startsWith('http') ? user.twitter : `https://twitter.com/${user.twitter.replace(/^@|https:\/\/twitter\.com\//g, '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      🐦 Twitter
                    </a>
                  )}
                </div>
              </div>
              
              {/* Follow Button - Right Side */}
              <div className="md:self-start">
                {followButton}
              </div>
            </div>
            
            {/* Bio */}
            {user.bio && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-white/80">{user.bio}</p>
              </div>
            )}
            
            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="text-xs bg-white/10 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-6">
            <button
              className={`px-4 py-3 font-medium text-sm md:text-base ${
                activeTab === "projects" 
                  ? "border-b-2 border-cyan text-cyan" 
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              <div className="flex items-center">
                <Code size={16} className="mr-2" />
                Projects
              </div>
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm md:text-base ${
                activeTab === "forum" 
                  ? "border-b-2 border-cyan text-cyan" 
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("forum")}
            >
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-2" />
                Forum Activity
              </div>
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === "projects" && (
            <div>
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(project => (
                    <Link 
                      key={project.id} 
                      href={`/projects/${project.id}`}
                      className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="h-40 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 relative">
                        {project.imageUrl && (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 truncate">{project.title}</h3>
                        <p className="text-sm text-white/70 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-xs text-white/60">
                          <span>{formatDate(project.createdAt)}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                              </svg>
                              {project.likes}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                              </svg>
                              {project.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-8 text-center">
                  <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                    <Code size={24} className="text-white/40" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Projects Yet</h3>
                  <p className="text-white/60">This user hasn't created any projects yet.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "forum" && (
            <div>
              {forumActivity.length > 0 ? (
                <div className="space-y-4">
                  {forumActivity.map(thread => (
                    <Link 
                      key={thread.id} 
                      href={`/forum/${thread.id}`}
                      className="block bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium mb-2">{thread.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-white/70">
                            <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
                              {thread.category}
                            </span>
                            <span>{formatDate(thread.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-white/70">
                          <MessageCircle size={14} className="mr-1" />
                          {thread.replies}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-8 text-center">
                  <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                    <MessageCircle size={24} className="text-white/40" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Forum Activity</h3>
                  <p className="text-white/60">This user hasn't posted in the forum yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 