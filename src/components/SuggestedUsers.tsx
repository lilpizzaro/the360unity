"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserPlus, UserMinus, RefreshCw, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar";

interface SuggestedUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  followersCount: number;
  isFollowing: boolean;
}

export default function SuggestedUsers() {
  const { user, isLoaded } = useUser();
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followingInProgress, setFollowingInProgress] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isLoaded && user) {
      fetchSuggestedUsers();
    } else if (isLoaded && !user) {
      setLoading(false);
      setSuggestedUsers([]);
    }
  }, [user, isLoaded]);

  const fetchSuggestedUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get real users from Clerk through our API
      const response = await fetch('/api/users/suggested');
      if (!response.ok) {
        throw new Error('Failed to fetch suggested users');
      }
              const data = await response.json();
        setSuggestedUsers(data);
    } catch (err) {
      console.error('Error fetching suggested users:', err);
      setError('Failed to load suggested users');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!user || followingInProgress.has(userId)) return;
    
    // Mark this user as being processed
    setFollowingInProgress(prev => new Set(prev).add(userId));

    // Update UI state immediately for better user experience
    setSuggestedUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId
          ? { ...u, isFollowing: true, followersCount: u.followersCount + 1 }
          : u
      )
    );

    try {
      // Use the API endpoint instead of direct Supabase call
      const response = await fetch('/api/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followingId: userId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to follow user');
      }
      
      toast.success('User followed successfully');
    } catch (err) {
      console.error('Error following user:', err);
      
      // Revert UI change if there was an error
      setSuggestedUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId
            ? { ...u, isFollowing: false, followersCount: u.followersCount - 1 }
            : u
        )
      );
      toast.error(err instanceof Error ? err.message : 'Failed to follow user');
    } finally {
      // Remove this user from being processed
      setFollowingInProgress(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleUnfollow = async (userId: string) => {
    if (!user || followingInProgress.has(userId)) return;
    
    // Mark this user as being processed
    setFollowingInProgress(prev => new Set(prev).add(userId));

    // Update UI state immediately for better user experience
    setSuggestedUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId
          ? { ...u, isFollowing: false, followersCount: u.followersCount - 1 }
          : u
      )
    );

    try {
      // Use the API endpoint for unfollowing
      const response = await fetch('/api/users/unfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followingId: userId }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to unfollow user');
      }
      
      toast.success('User unfollowed successfully');
    } catch (err) {
      console.error('Error unfollowing user:', err);
      
      // Revert UI change if there was an error
      setSuggestedUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId
            ? { ...u, isFollowing: true, followersCount: u.followersCount + 1 }
            : u
        )
      );
      toast.error(err instanceof Error ? err.message : 'Failed to unfollow user');
    } finally {
      // Remove this user from being processed
      setFollowingInProgress(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        <h3 className="t-heading-sm mb-4">Suggested Developers</h3>
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 md:space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-white/10 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        <h3 className="t-heading-sm mb-4">Suggested Developers</h3>
        <p className="text-sm opacity-70">Sign in to see suggested developers</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        <h3 className="t-heading-sm mb-4">Suggested Developers</h3>
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 md:space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-white/10 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        <h3 className="t-heading-sm mb-4">Suggested Developers</h3>
        <div className="text-center py-4">
          <p className="text-sm text-red-400 mb-2">{error}</p>
          <button 
            onClick={fetchSuggestedUsers}
            className="text-sm text-cyan hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (suggestedUsers.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        <h3 className="t-heading-sm mb-4">Suggested Developers</h3>
        <div className="text-center py-4">
          <p className="text-sm opacity-70">No suggested users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
            <UserIcon size={16} className="text-cyan" />
          </div>
          <h3 className="text-lg font-bold">Suggested Developers</h3>
        </div>
        <button 
          onClick={fetchSuggestedUsers} 
          className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Refresh suggested users"
        >
          <RefreshCw size={16} className="text-white/70" />
        </button>
      </div>
      
      {error ? (
        <div className="text-center py-4">
          <p className="text-sm text-red-400 mb-2">{error}</p>
          <button 
            onClick={fetchSuggestedUsers}
            className="text-sm text-cyan hover:underline"
          >
            Try again
          </button>
        </div>
      ) : suggestedUsers.length > 0 ? (
        <div className="space-y-3">
          {suggestedUsers.map((suggestedUser) => (
            <div key={suggestedUser.id} className="flex items-center justify-between">
              <Link href={`/profile/${suggestedUser.username}`} className="flex items-center space-x-3 flex-1 min-w-0">
                <UserAvatar 
                  src={suggestedUser.imageUrl}
                  alt={`${suggestedUser.firstName} ${suggestedUser.lastName}`.trim() || 'User profile'}
                  size="md"
                  fallbackText={suggestedUser.firstName || suggestedUser.username}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">
                    {(suggestedUser.firstName || '') + ' ' + (suggestedUser.lastName || '')}
                  </div>
                  <div className="text-xs text-white/70 truncate">
                    @{suggestedUser.username}
                  </div>
                </div>
              </Link>
              
              <button
                onClick={() => suggestedUser.isFollowing ? handleUnfollow(suggestedUser.id) : handleFollow(suggestedUser.id)}
                disabled={followingInProgress.has(suggestedUser.id)}
                className={`ml-2 p-2 rounded-full flex items-center justify-center min-w-[36px] h-[36px] ${
                  suggestedUser.isFollowing
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-cyan/20 text-cyan hover:bg-cyan/30'
                } transition-colors`}
                aria-label={suggestedUser.isFollowing ? "Unfollow" : "Follow"}
              >
                {followingInProgress.has(suggestedUser.id) ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : suggestedUser.isFollowing ? (
                  <UserMinus size={16} />
                ) : (
                  <UserPlus size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-white/70">No suggested users found</p>
        </div>
      )}
    </div>
  );
} 