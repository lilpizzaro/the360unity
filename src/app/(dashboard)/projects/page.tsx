"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

const techStacks = [
  "All", "React", "Next.js", "Vue.js", "Angular", "Node.js", "Python",
  "TypeScript", "JavaScript", "Go", "Rust", "Docker", "AWS", "GraphQL"
];

const projects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "A smart task management app with AI suggestions and natural language processing for better productivity.",
    author: "Sarah Chen",
    tech: ["React", "Node.js", "OpenAI", "TypeScript"],
    stars: 342,
    forks: 67,
    image: "🤖",
    github: "https://github.com/sarahchen/ai-task-manager",
    demo: "https://ai-tasks.demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Real-time Collaboration IDE",
    description: "Browser-based IDE with real-time collaboration, code sharing, and integrated video chat for pair programming.",
    author: "Alex Kumar",
    tech: ["Vue.js", "WebSocket", "Node.js", "WebRTC"],
    stars: 156,
    forks: 23,
    image: "💻",
    github: "https://github.com/alexk/collab-ide",
    demo: "https://collab-ide.demo.com"
  },
  {
    id: 3,
    title: "DevOps Pipeline Visualizer",
    description: "Interactive dashboard for visualizing and monitoring CI/CD pipelines with real-time status updates.",
    author: "Maria Rodriguez",
    tech: ["Angular", "D3.js", "Go", "Docker"],
    stars: 89,
    forks: 12,
    image: "🔄",
    github: "https://github.com/mariar/pipeline-viz"
  },
  {
    id: 4,
    title: "API Documentation Generator",
    description: "Automatically generate beautiful, interactive API documentation from your code with live examples.",
    author: "David Kim",
    tech: ["Next.js", "TypeScript", "Swagger", "MDX"],
    stars: 234,
    forks: 45,
    image: "📚",
    github: "https://github.com/davidk/api-docs-gen",
    demo: "https://api-docs.demo.com"
  },
  {
    id: 5,
    title: "Microservices Monitoring",
    description: "Comprehensive monitoring solution for microservices with distributed tracing and performance analytics.",
    author: "Jennifer Wu",
    tech: ["React", "GraphQL", "Rust", "AWS"],
    stars: 198,
    forks: 34,
    image: "📊",
    github: "https://github.com/jennw/microservices-monitor"
  },
  {
    id: 6,
    title: "Code Review Assistant",
    description: "AI-powered code review tool that provides intelligent suggestions and detects potential issues.",
    author: "Tom Johnson",
    tech: ["Python", "React", "TensorFlow", "Docker"],
    stars: 167,
    forks: 28,
    image: "🔍",
    github: "https://github.com/tomj/code-review-ai"
  }
];

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesTech = selectedTech === "All" || project.tech.includes(selectedTech);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

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
              🔍
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTech === tech
                      ? "bg-cyan/20 border-cyan/50 text-cyan border"
                      : "bg-white/5 border-white/20 text-white/80 border hover:bg-white/10"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {selectedTech !== "All" && ` for "${selectedTech}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group ${
                project.featured ? "ring-2 ring-cyan/30" : ""
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="inline-block bg-cyan/20 text-cyan text-xs px-3 py-1 rounded-full mb-4">
                  ⭐ Featured
                </div>
              )}

              {/* Project Icon */}
              <div className="text-4xl mb-4">{project.image}</div>

              {/* Project Info */}
              <h3 className="t-heading-sm mb-3 group-hover:text-cyan transition-colors">
                {project.title}
              </h3>

              <p className="t-base opacity-80 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Author */}
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                  {project.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm opacity-70">{project.author}</span>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm opacity-70">
                  <span>⭐ {project.stars}</span>
                  <span>🍴 {project.forks}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-center text-sm py-2"
                >
                  View Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-cyan/20 border border-cyan/30 text-cyan rounded-full text-center text-sm py-2 hover:bg-cyan/30 transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Project CTA */}
        <div className="text-center bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
          <h2 className="t-heading-md mb-4">Share Your Project</h2>
          <p className="t-base opacity-80 mb-6 max-w-2xl mx-auto">
            Built something amazing? Share it with the community and get feedback, collaborators, and recognition for your work.
          </p>
          <Link href="/projects/new" className="btn-primary text-base px-8 py-3">
            Submit Your Project
          </Link>
        </div>
      </div>
    </>
  );
}
