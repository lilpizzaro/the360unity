"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import { 
  RocketIcon, 
  CodeIcon, 
  MessageCircleIcon, 
  GithubIcon, 
  LightbulbIcon,
  ReactIcon,
  NextjsIcon,
  VueIcon,
  AngularIcon,
  NodejsIcon,
  PythonIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  GoIcon,
  RustIcon,
  DockerIcon,
  AwsIcon,
  GraphQLIcon
} from "@/components/icons";

const techStacks = [
  "All", "React", "Next.js", "Vue.js", "Angular", "Node.js", "Python",
  "TypeScript", "JavaScript", "Go", "Rust", "Docker", "AWS", "GraphQL"
];

type Project = {
  id: number;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
  technologies: string[];
  repoUrl: string;
  demoUrl?: string;
  category: string;
  categoryName: string;
  status: string;
  stars: number;
  forks: number;
  views: number;
  createdAt: string;
  featured: boolean;
};

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL('/api/projects', window.location.origin);
        if (selectedTech !== "All") {
          url.searchParams.append("technology", selectedTech);
        }
        if (searchQuery) {
          url.searchParams.append("search", searchQuery);
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [selectedTech, searchQuery]);

  // Get tech icon based on tech name
  const getTechIcon = (tech: string) => {
    if (!tech) return <CodeIcon size={16} className="text-cyan" />;
    
    switch(tech.toLowerCase()) {
      case 'react':
        return <ReactIcon size={16} className="text-cyan" />;
      case 'next.js':
        return <NextjsIcon size={16} className="text-cyan" />;
      case 'vue.js':
        return <VueIcon size={16} className="text-cyan" />;
      case 'angular':
        return <AngularIcon size={16} className="text-cyan" />;
      case 'node.js':
        return <NodejsIcon size={16} className="text-cyan" />;
      case 'python':
        return <PythonIcon size={16} className="text-cyan" />;
      case 'typescript':
        return <TypeScriptIcon size={16} className="text-cyan" />;
      case 'javascript':
        return <JavaScriptIcon size={16} className="text-cyan" />;
      case 'go':
        return <GoIcon size={16} className="text-cyan" />;
      case 'rust':
        return <RustIcon size={16} className="text-cyan" />;
      case 'docker':
        return <DockerIcon size={16} className="text-cyan" />;
      case 'aws':
        return <AwsIcon size={16} className="text-cyan" />;
      case 'graphql':
        return <GraphQLIcon size={16} className="text-cyan" />;
      case 'all':
        return <CodeIcon size={16} className="text-cyan" />;
      default:
        return <CodeIcon size={16} className="text-cyan" />;
    }
  };

  // Get icon based on project title or category
  const getProjectIcon = (project: Project) => {
    const title = project.title.toLowerCase();
    
    if (title.includes('ai') || title.includes('machine learning')) {
      return <LightbulbIcon size={32} className="text-cyan" />;
    } else if (title.includes('ide') || title.includes('code') || project.category === 'web') {
      return <CodeIcon size={32} className="text-cyan" />;
    } else if (title.includes('chat') || title.includes('message')) {
      return <MessageCircleIcon size={32} className="text-cyan" />;
    } else {
      return <RocketIcon size={32} className="text-cyan" />;
    }
  };

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Discover Projects</h1>
            <p className="t-lg opacity-80">Explore amazing projects built by our developer community</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search projects, descriptions, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20"
              />
              <div className="absolute right-4 top-4 text-white/50">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
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

            {/* Technology Filter */}
            <div>
              <h3 className="t-heading-sm mb-4">Filter by Technology</h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedTech === tech
                        ? "bg-cyan/20 border-cyan/50 text-cyan border"
                        : "bg-white/5 border-white/20 text-white/80 border hover:bg-white/10"
                    }`}
                  >
                    {getTechIcon(tech)}
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-white/70">
              Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
              {selectedTech !== "All" && ` for "${selectedTech}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-6 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              <p className="mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <>
              {projects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group ${
                        project.featured ? "ring-2 ring-cyan/30" : ""
                      }`}
                    >
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="inline-flex items-center gap-1 bg-cyan/20 text-cyan text-xs px-3 py-1 rounded-full mb-4">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>Featured</span>
                        </div>
                      )}
                      
                      {/* Project Icon & Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          {getProjectIcon(project)}
                        </div>
                        <div>
                          <h3 className="t-heading-sm mb-1 group-hover:text-cyan transition-colors">
                            <Link href={`/projects/${project.id}`}>
                              {project.title}
                            </Link>
                          </h3>
                          <div className="inline-flex items-center gap-1 text-xs text-white/60">
                            <span className="capitalize">{project.categoryName}</span>
                            <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="mb-4 text-white/80 t-md line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1"
                            >
                              {getTechIcon(tech)}
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-white/5 rounded-md border border-white/10">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* View Project Button */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="block w-full text-center mb-4 bg-cyan/20 border border-cyan/30 text-cyan rounded-lg py-2 hover:bg-cyan/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        </svg>
                        <span>View Project</span>
                      </Link>
                      
                      {/* Author & Stats */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                            {project.author.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-white/70">{project.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <GithubIcon size={14} className="text-white/60" />
                            <span className="text-xs text-white/60">{project.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              className="text-white/60"
                            >
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            <span className="text-xs text-white/60">{project.forks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mb-4 inline-block p-3 bg-white/5 rounded-full">
                    <RocketIcon size={32} className="text-white/40" />
                  </div>
                  <h3 className="t-heading-sm mb-2">No projects found</h3>
                  <p className="text-white/60 max-w-md mx-auto mb-6">
                    {selectedTech !== "All" || searchQuery
                      ? "Try adjusting your filters or search query to find projects."
                      : "Be the first to share a project with the community!"}
                  </p>
                  <Link 
                    href="/projects/new" 
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Share a Project
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Submit Project CTA */}
          {!loading && !error && projects.length > 0 && (
            <div className="text-center bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="t-heading-md mb-4">Share Your Project</h2>
              <p className="t-base opacity-80 mb-6 max-w-2xl mx-auto">
                Built something amazing? Share it with the community and get feedback, collaborators, and recognition for your work.
              </p>
              <Link href="/projects/new" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                <RocketIcon size={18} />
                Submit Your Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
