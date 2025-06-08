import React from "react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import DashboardNav from "@/components/DashboardNav";
import { RocketIcon, GithubIcon, UserIcon } from "@/components/icons";
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
} from "@/components/icons";
import { Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProjectFiles from "@/components/ProjectFiles";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  author_id: string;
  author_name: string;
  technologies: string[];
  repo_url: string;
  demo_url: string;
  category: string;
  category_name: string;
  status: string;
  created_at: string;
  files: string[];
  views: number;
};

// Define the params type to match Next.js expectations
interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

// This is now a server component
export default async function ProjectDetailPage({ params }: PageProps) {
  const { userId } = auth();
  const user = await currentUser();
  const projectId = params.id;
  
  // Fetch project data server-side
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
  
  // Increment view count
  await supabase
    .from('projects')
    .update({ views: (project?.views || 0) + 1 })
    .eq('id', projectId);
  
  // Check if user is the project owner
  const isOwner = userId === project?.author_id;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get tech icon based on tech name
  const getTechIcon = (tech: string) => {
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

  if (!project || error) {
    return (
      <>
        <DashboardNav />
        <div className="min-h-screen pt-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-6 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
              <p className="mb-4">{error?.message || "Project not found"}</p>
              <Link
                href="/projects"
                className="px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors"
              >
                Back to Projects
              </Link>
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
        <div className="max-w-5xl mx-auto">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="t-heading-lg">{project.title}</h1>
              <div className="flex space-x-3">
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 px-4 py-2"
                  >
                    <GithubIcon size={16} />
                    <span>View Code</span>
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan/20 border border-cyan/30 text-cyan rounded-lg px-4 py-2 hover:bg-cyan/30 transition-colors flex items-center gap-2"
                  >
                    <RocketIcon size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies && project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80 flex items-center gap-1"
                >
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <UserIcon size={14} />
                <span>{project.author_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(project.created_at)}</span>
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
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>{project.category_name}</span>
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
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                </svg>
                <span>{project.views} views</span>
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-medium mb-4">About this project</h2>
              <p className="whitespace-pre-wrap">{project.description}</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Project Files</h3>
              <ProjectFiles project={project} isOwner={isOwner} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 