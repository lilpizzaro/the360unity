"use client";

import { useState, useEffect } from "react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import {
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
  GraphQLIcon,
  CodeIcon
} from "./icons";

interface ProjectsShowcaseProps {
  limit?: number;
  showFilters?: boolean;
}

export default function ProjectsShowcase({ limit, showFilters = true }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<string>("all");
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Filter projects based on selected filter
  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    if (filter === "popular") return project.stars > 50;
    
    // Filter by technology - handle both string and object technologies
    return project.technologies?.some?.(tech => {
      const techName = typeof tech === 'string' ? tech : tech.name;
      return techName?.toLowerCase() === filter.toLowerCase();
    }) || false;
  });

  // Get unique technologies for filter - handle both string and object technologies
  const technologies = Array.from(
    new Set(
      projects.flatMap(project => 
        project.technologies?.map?.(tech => {
          return typeof tech === 'string' ? tech : tech.name;
        }).filter(Boolean) || []
      )
    )
  );

  // Limit the number of projects if specified
  const displayedProjects = limit 
    ? filteredProjects.slice(0, limit) 
    : filteredProjects;

  // Get tech icon based on tech name
  const getTechIcon = (tech: string) => {
    if (!tech) return <CodeIcon size={14} className="text-white" />;
    
    switch(tech.toLowerCase()) {
      case 'react':
        return <ReactIcon size={14} className="text-white" />;
      case 'next.js':
        return <NextjsIcon size={14} className="text-white" />;
      case 'vue.js':
      case 'vue':
        return <VueIcon size={14} className="text-white" />;
      case 'angular':
        return <AngularIcon size={14} className="text-white" />;
      case 'node.js':
      case 'node':
        return <NodejsIcon size={14} className="text-white" />;
      case 'python':
        return <PythonIcon size={14} className="text-white" />;
      case 'typescript':
        return <TypeScriptIcon size={14} className="text-white" />;
      case 'javascript':
      case 'js':
        return <JavaScriptIcon size={14} className="text-white" />;
      case 'go':
        return <GoIcon size={14} className="text-white" />;
      case 'rust':
        return <RustIcon size={14} className="text-white" />;
      case 'docker':
        return <DockerIcon size={14} className="text-white" />;
      case 'aws':
        return <AwsIcon size={14} className="text-white" />;
      case 'graphql':
        return <GraphQLIcon size={14} className="text-white" />;
      default:
        return <CodeIcon size={14} className="text-white" />;
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit || 3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/5 rounded-xl p-4 h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "all"
                ? "bg-cyan text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "featured"
                ? "bg-cyan text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setFilter("popular")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "popular"
                ? "bg-cyan text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Popular
          </button>
          
          {/* Technology filters */}
          {technologies.slice(0, 5).map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                filter === tech
                  ? "bg-cyan text-black"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {getTechIcon(tech)}
              {tech}
            </button>
          ))}
        </div>
      )}

      {projects.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-lg opacity-70">No projects found</p>
          <a href="/projects/new" className="text-cyan hover:underline mt-2 inline-block">
            Create your first project
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              image={project.image} 
              technologies={project.technologies || []}
              author={{
                name: project.author?.name || '',
                avatar: project.author?.avatar
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
} 