"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  GithubIcon, 
  RocketIcon,
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
import StarButton from "./StarButton";
import UserAvatar from "./UserAvatar";

interface Technology {
  name: string;
  color: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  technologies: (Technology | string)[];
  stars: number;
  isStarred?: boolean;
  featured?: boolean;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  author,
  githubUrl,
  liveUrl,
  technologies,
  stars,
  isStarred = false,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get tech icon based on tech name
  const getTechIcon = (tech: string) => {
    if (!tech) return <CodeIcon size={12} className="text-cyan" />;
    
    switch(tech.toLowerCase()) {
      case 'react':
        return <ReactIcon size={12} className="text-cyan" />;
      case 'next.js':
        return <NextjsIcon size={12} className="text-cyan" />;
      case 'vue.js':
      case 'vue':
        return <VueIcon size={12} className="text-cyan" />;
      case 'angular':
        return <AngularIcon size={12} className="text-cyan" />;
      case 'node.js':
      case 'node':
        return <NodejsIcon size={12} className="text-cyan" />;
      case 'python':
        return <PythonIcon size={12} className="text-cyan" />;
      case 'typescript':
        return <TypeScriptIcon size={12} className="text-cyan" />;
      case 'javascript':
      case 'js':
        return <JavaScriptIcon size={12} className="text-cyan" />;
      case 'go':
        return <GoIcon size={12} className="text-cyan" />;
      case 'rust':
        return <RustIcon size={12} className="text-cyan" />;
      case 'docker':
        return <DockerIcon size={12} className="text-cyan" />;
      case 'aws':
        return <AwsIcon size={12} className="text-cyan" />;
      case 'graphql':
        return <GraphQLIcon size={12} className="text-cyan" />;
      default:
        return <CodeIcon size={12} className="text-cyan" />;
    }
  };

  return (
    <div
      className={`bg-white/5 rounded-xl overflow-hidden border ${
        featured ? "border-cyan/30" : "border-white/10"
      } backdrop-blur-sm transition-all duration-300 hover:bg-white/10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-lg text-gray-400">No Image</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-2 left-2 bg-cyan/80 text-xs font-medium py-1 px-2 rounded-full backdrop-blur-sm">
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StarButton 
            projectId={id} 
            initialStarCount={stars} 
            isStarred={isStarred}
            size="sm"
          />
        </div>
      </div>

      {/* Project Info */}
      <div className="p-3 md:p-5">
        <h3 className="font-semibold text-lg mb-1 text-white">{title}</h3>
        <p className="text-sm text-white/70 mb-3 line-clamp-2">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {technologies.slice(0, 3).map((tech, index) => {
            // Handle both string and object technologies
            const techName = typeof tech === 'string' ? tech : tech.name;
            const techColor = typeof tech === 'string' ? 'white' : (tech.color || 'white');
            
            return (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full bg-${techColor}/20 text-${techColor} border border-${techColor}/30 flex items-center gap-1`}
              >
                {getTechIcon(techName)}
                {techName || 'Other'}
              </span>
            );
          })}
          {technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
              +{technologies.length - 3}
            </span>
          )}
        </div>

        {/* View Project Button */}
        <Link
          href={`/projects/${id}`}
          className="block w-full text-center mb-4 bg-cyan/20 border border-cyan/30 text-cyan rounded-lg py-2 hover:bg-cyan/30 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
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

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar 
              src={author?.avatar} 
              alt={author?.name || "User"} 
              size="sm" 
              fallbackText={author?.name || "User"}
            />
            <span className="text-xs text-white/70">{author?.name || "User"}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <GithubIcon size={16} />
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <RocketIcon size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 