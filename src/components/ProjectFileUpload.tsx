import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { XIcon, UploadIcon, FileIcon, ImageIcon, FileTextIcon, FileArchiveIcon } from './icons';
import { toast } from 'sonner';

interface ProjectFileUploadProps {
  projectId: number;
  onFilesChange?: (files: string[]) => void;
  existingFiles?: string[];
}

export default function ProjectFileUpload({ projectId, onFilesChange, existingFiles = [] }: ProjectFileUploadProps) {
  const [files, setFiles] = useState<string[]>(existingFiles || []);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!projectId) {
      toast.error("Project ID is missing");
      return;
    }
    
    setUploading(true);
    
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('projectId', projectId.toString());
        formData.append('file', file);
        
        console.log(`Uploading file: ${file.name} for project: ${projectId}`);
        
        const response = await fetch('/api/projects/files', {
          method: 'POST',
          body: formData,
          credentials: 'include', // Include cookies for auth
        });
        
        if (!response.ok) {
          let errorMessage = 'Failed to upload file';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            console.error("Error parsing error response:", e);
          }
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (data.files && Array.isArray(data.files)) {
          setFiles(data.files);
          
          if (onFilesChange) {
            onFilesChange(data.files);
          }
          
          toast.success(`File ${file.name} uploaded successfully`);
        } else {
          console.error("Invalid response format:", data);
          toast.error("Invalid server response");
        }
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  }, [projectId, onFilesChange]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxSize: 50 * 1024 * 1024, // 50MB
    accept: {
      'image/*': [],
      'application/pdf': [],
      'text/*': [],
      'application/zip': [],
    }
  });
  
  const handleDeleteFile = async (fileUrl: string) => {
    if (!projectId) {
      toast.error("Project ID is missing");
      return;
    }
    
    try {
      const response = await fetch(`/api/projects/files?projectId=${projectId}&fileUrl=${encodeURIComponent(fileUrl)}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies for auth
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to delete file';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (data.files && Array.isArray(data.files)) {
        setFiles(data.files);
        
        if (onFilesChange) {
          onFilesChange(data.files);
        }
        
        toast.success('File deleted successfully');
      } else {
        console.error("Invalid response format:", data);
        toast.error("Invalid server response");
      }
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error(error.message || 'Failed to delete file');
    }
  };
  
  const getFileIcon = (fileUrl: string) => {
    const extension = fileUrl?.split('.').pop()?.toLowerCase();
    
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

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadIcon className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-xs text-gray-500">
            Supports images, PDFs, text files, and archives (max 50MB)
          </p>
        </div>
      </div>
      
      {uploading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm">Uploading...</span>
        </div>
      )}
      
      {files && files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Uploaded files</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((fileUrl, index) => (
              <Card key={`${fileUrl}-${index}`} className="overflow-hidden">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    {getFileIcon(fileUrl)}
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium truncate hover:underline"
                    >
                      {getFileName(fileUrl)}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteFile(fileUrl);
                    }}
                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 