"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardNav from "@/components/DashboardNav";
import { RocketIcon, UploadIcon, XIcon } from "@/components/icons";
import ProjectFileUpload from "@/components/ProjectFileUpload";
import { Toaster, toast } from "sonner";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    technologies: "",
    category: "web",
    status: "in_progress"
  });
  const [projectId, setProjectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'details' | 'files'>('details');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setCoverImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Process technologies
      const technologies = formData.technologies
        .split(",")
        .map(tech => tech.trim())
        .filter(tech => tech !== "");
      
      if (technologies.length === 0) {
        throw new Error("Please enter at least one technology");
      }
      
      // First, create the project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          repoUrl: formData.repoUrl,
          demoUrl: formData.demoUrl,
          technologies,
          category: formData.category,
          status: formData.status
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create project");
      }
      
      // Get the created project
      const project = await response.json();
      setProjectId(project.id);
      
      // Upload cover image if selected
      if (coverImage && project.id) {
        const imageFormData = new FormData();
        imageFormData.append('projectId', project.id.toString());
        imageFormData.append('file', coverImage);
        imageFormData.append('isCoverImage', 'true');
        
        const imageResponse = await fetch('/api/projects/files', {
          method: 'POST',
          body: imageFormData,
          credentials: 'include',
        });
        
        if (!imageResponse.ok) {
          toast.error("Project created but failed to upload cover image");
        } else {
          toast.success("Project and cover image uploaded successfully");
        }
      }
      
      // Move to file upload step
      setStep('files');
    } catch (err) {
      console.error("Error creating project:", err);
      setError(err.message || "Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFilesComplete = () => {
    // Redirect to projects page
    router.push("/projects");
  };

  return (
    <>
      <DashboardNav />
      <Toaster position="top-right" />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Create New Project</h1>
            <p className="t-base opacity-80">
              Share your project with the community and get feedback from other developers.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}
            
            {step === 'details' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="e.g. AI Chat Application"
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="Describe your project, its features, and what makes it unique..."
                  />
                </div>

                {/* Repository URL */}
                <div>
                  <label htmlFor="repoUrl" className="block text-sm font-medium mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    id="repoUrl"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="e.g. https://github.com/yourusername/project"
                  />
                </div>

                {/* Demo URL */}
                <div>
                  <label htmlFor="demoUrl" className="block text-sm font-medium mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="demoUrl"
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="e.g. https://your-project.vercel.app"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                    Technologies Used (comma separated) *
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    required
                    value={formData.technologies}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="e.g. React, Node.js, MongoDB"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    >
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="desktop">Desktop Application</option>
                      <option value="ai">AI/Machine Learning</option>
                      <option value="game">Game Development</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-2">
                      Project Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                    >
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="planning">Planning/Concept</option>
                      <option value="looking_for_help">Looking for Contributors</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Image
                  </label>
                  <div className="space-y-2">
                    {coverImagePreview ? (
                      <div className="relative w-full h-48 border border-white/10 rounded-lg overflow-hidden">
                        <Image 
                          src={coverImagePreview}
                          alt="Cover Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveCoverImage}
                          className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70"
                        >
                          <XIcon size={16} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/40"
                      >
                        <UploadIcon size={24} className="text-white/50 mb-2" />
                        <p className="text-sm text-white/70">Click to upload a cover image</p>
                        <p className="text-xs text-white/50 mt-1">PNG, JPG, WebP (max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCoverImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary px-6 py-3 flex items-center gap-2"
                  >
                    <RocketIcon size={18} />
                    {isLoading ? "Creating..." : "Continue to Files"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-xl font-medium mb-2">Upload Project Files</h2>
                  <p className="text-sm opacity-80">
                    Upload screenshots, demos, or other files to showcase your project. (Optional)
                  </p>
                </div>
                
                {projectId && <ProjectFileUpload projectId={projectId} />}
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleFilesComplete}
                    className="btn-primary px-6 py-3 flex items-center gap-2"
                  >
                    <RocketIcon size={18} />
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 