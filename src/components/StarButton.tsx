import { useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

interface StarButtonProps {
  projectId: string | number;
  initialStarCount: number;
  isStarred?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export default function StarButton({
  projectId,
  initialStarCount = 0,
  isStarred = false,
  size = 'md',
  showCount = true,
  className = ''
}: StarButtonProps) {
  const { isSignedIn } = useUser();
  const [starred, setStarred] = useState(isStarred);
  const [starCount, setStarCount] = useState(initialStarCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleStar = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to star projects');
      return;
    }

    if (!projectId) {
      console.error('Project ID is missing');
      toast.error('Cannot star project: missing ID');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log(`Attempting to star project with ID: ${projectId}`);
      
      const response = await fetch(`/api/projects/${projectId}/star`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`Star API response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server error: ${errorText}`);
        throw new Error(`Failed to star project: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Star API response data:', data);
      
      setStarred(data.action === 'starred');
      setStarCount(data.starsCount);
      
      toast.success(`Project ${data.action}!`);
    } catch (error) {
      console.error('Error starring project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to star project');
    } finally {
      setIsLoading(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base'
  };

  return (
    <button
      onClick={handleStar}
      disabled={isLoading}
      className={`flex items-center gap-1.5 rounded-full transition-all ${
        starred
          ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
      } ${sizeClasses[size]} ${className}`}
      aria-label={starred ? 'Unstar project' : 'Star project'}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
      ) : (
        <Star
          size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
          className={starred ? 'fill-yellow-300' : ''}
        />
      )}
      {showCount && <span>{starCount}</span>}
    </button>
  );
} 