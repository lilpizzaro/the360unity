"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Project } from '@/lib/supabase';
import { FileIcon, ImageIcon, FileTextIcon, FileArchiveIcon, ArrowLeftIcon } from './icons';

interface ProjectFilesProps {
  project: Project;
  isOwner?: boolean;
}

export default function ProjectFiles({ project, isOwner = false }: ProjectFilesProps) {
  const [files, setFiles] = useState<string[]>(project.files || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project?.files?.length > 0) {
      setFiles(project.files);
    } else if (project?.id) {
      fetchProjectFiles();
    }
  }, [project?.id, project?.files]);

  const fetchProjectFiles = async () => {
    if (!project?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects/files?projectId=${project.id}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch project files';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error: any) {
      console.error('Error fetching project files:', error);
      setError(error.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };
  
  const getFileIcon = (fileUrl: string) => {
    if (!fileUrl) return <FileIcon className="h-5 w-5" />;
    
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return <ImageIcon className="h-5 w-5" />;
    } else if (['pdf', 'doc', 'docx'].includes(extension || '')) {
      return <FileTextIcon className="h-5 w-5" />;
    } else if (['zip', 'rar', '7z'].includes(extension || '')) {
      return <FileArchiveIcon className="h-5 w-5" />;
    } else {
      return <FileIcon className="h-5 w-5" />;
    }
  };
  
  const getFileName = (fileUrl: string) => {
    if (!fileUrl) return 'file';
    
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/');
      return pathParts[pathParts.length - 1];
    } catch (error) {
      console.error("Error parsing file URL:", error);
      return fileUrl.split('/').pop() || 'file';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg bg-red-500/10 border-red-500/30">
        <p className="text-red-300">{error}</p>
        <button 
          onClick={fetchProjectFiles} 
          className="mt-2 text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg">
        <p className="text-gray-500">No files available for this project</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Files</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {files.map((fileUrl, index) => {
          if (!fileUrl) return null;
          
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
            fileUrl.split('.').pop()?.toLowerCase() || ''
          );
          
          return (
            <Card key={`${fileUrl}-${index}`} className="overflow-hidden">
              <CardContent className="p-0">
                {isImage ? (
                  <div className="relative aspect-video">
                    <img 
                      src={fileUrl} 
                      alt={getFileName(fileUrl)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show a fallback
                        e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                      }}
                    />
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full p-1"
                    >
                      <ArrowLeftIcon className="h-4 w-4 rotate-[135deg]" />
                    </a>
                  </div>
                ) : (
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(fileUrl)}
                      <span className="font-medium truncate max-w-[200px]">
                        {getFileName(fileUrl)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <a 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <span>View</span>
                        <ArrowLeftIcon className="h-3 w-3 rotate-[135deg]" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 