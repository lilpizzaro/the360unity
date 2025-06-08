"use client";

import { useState } from "react";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export default function GitHubIntegration() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);

  const fetchRepos = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "User not found"
            : "Failed to fetch repositories"
        );
      }
      
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev => 
      prev.includes(repoId)
        ? prev.filter(id => id !== repoId)
        : [...prev, repoId]
    );
  };

  const importSelectedRepos = async () => {
    if (selectedRepos.length === 0) {
      setError("Please select at least one repository to import");
      return;
    }

    setIsLoading(true);
    
    try {
      // Get the selected repo objects
      const reposToImport = selectedRepos.map(id => repos.find(repo => repo.id === id));
      
      // Convert GitHub repos to project format
      for (const repo of reposToImport) {
        if (!repo) continue;
        
        // Try to fetch languages for the repository
        let technologies = [];
        try {
          if (repo.language) {
            // If we already have a language, use it
            technologies = [repo.language];
          } else {
            // Otherwise try to fetch languages from GitHub API
            const langResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
            if (langResponse.ok) {
              const langData = await langResponse.json();
              technologies = Object.keys(langData).slice(0, 5); // Get up to 5 languages
            }
          }
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error);
        }
        
        // If we still have no technologies, provide defaults
        if (!technologies.length) {
          technologies = ["JavaScript"]; // Default to JavaScript if no language is detected
        }
        
        // Create a project for each selected repo
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            title: repo.name,
            description: repo.description || `A GitHub project imported from ${username}/${repo.name}`,
            repoUrl: repo.html_url,
            technologies,
            category: 'web', // Default category
            status: 'completed'
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to import ${repo.name}`);
        }
      }
      
      toast.success(`Successfully imported ${selectedRepos.length} ${selectedRepos.length === 1 ? 'repository' : 'repositories'}`);
      
      // Clear selections and refresh page after successful import
      setSelectedRepos([]);
      
      // Refresh the page after a short delay to show the new projects
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error importing repositories:", error);
      setError(error instanceof Error ? error.message : "Failed to import repositories");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
        />
        <button
          onClick={fetchRepos}
          disabled={isLoading}
          className="btn-primary px-6 py-3 w-full"
        >
          {isLoading ? "Loading..." : "Fetch Repositories"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-white">
          {error}
        </div>
      )}

      {repos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="t-heading-sm">Repositories for {username}</h3>
            <button
              onClick={importSelectedRepos}
              disabled={selectedRepos.length === 0 || isLoading}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                selectedRepos.length > 0 && !isLoading
                  ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-white"
                  : "bg-white/5 text-white/50 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                  <span>Importing...</span>
                </>
              ) : (
                <>Import Selected ({selectedRepos.length})</>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={`flex items-center p-4 rounded-lg border transition-all ${
                  selectedRepos.includes(repo.id)
                    ? "bg-cyan-500/10 border-cyan-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRepos.includes(repo.id)}
                  onChange={() => toggleRepoSelection(repo.id)}
                  className="mr-4 h-5 w-5 accent-cyan-500"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{repo.name}</h4>
                    {repo.fork && (
                      <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">
                        Fork
                      </span>
                    )}
                    <span className="ml-auto flex items-center text-xs opacity-70">
                      <span className="mr-1">⭐</span>
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex items-center mt-2">
                    {repo.language && (
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                        {repo.language}
                      </span>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs text-cyan hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 