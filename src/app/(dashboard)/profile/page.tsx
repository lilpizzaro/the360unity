"use client";

import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState({
    bio: "",
    jobTitle: "",
    location: "",
    website: "",
    github: "",
    twitter: "",
    skills: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data once the user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      setFormData({
        bio: user.unsafeMetadata?.bio as string || "",
        jobTitle: user.unsafeMetadata?.jobTitle as string || "",
        location: user.unsafeMetadata?.location as string || "",
        website: user.unsafeMetadata?.website as string || "",
        github: user.unsafeMetadata?.github as string || "",
        twitter: user.unsafeMetadata?.twitter as string || "",
        skills: (user.unsafeMetadata?.skills as string[] || []).join(", ")
      });
    }
  }, [isLoaded, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert skills from comma-separated string to array
      const skills = formData.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");
      
      // Update user metadata directly using unsafeMetadata
      await user?.update({
        unsafeMetadata: {
          bio: formData.bio,
          jobTitle: formData.jobTitle,
          location: formData.location,
          website: formData.website,
          github: formData.github,
          twitter: formData.twitter,
          skills
        }
      });
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen pt-24 px-6 flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Your Profile</h1>
            <p className="t-base opacity-80">
              Customize your developer profile to showcase your skills and experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Preview */}
            <div className="md:col-span-1">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 sticky top-24">
                <div className="flex flex-col items-center mb-6">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || "Profile"} 
                      className="w-24 h-24 rounded-full mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {user?.firstName?.[0] || user?.username?.[0] || "U"}
                    </div>
                  )}
                  <h2 className="t-heading-sm text-center">{user?.fullName || user?.username}</h2>
                  <p className="text-sm opacity-70 text-center">{formData.jobTitle || "Developer"}</p>
                  <p className="text-sm opacity-70 text-center mt-1">{formData.location || "Location"}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">About</h3>
                    <p className="text-sm opacity-80">{formData.bio || "No bio yet"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills ? 
                        formData.skills.split(",").map((skill, index) => (
                          <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded-md">
                            {skill.trim()}
                          </span>
                        )) : 
                        <span className="text-xs opacity-70">No skills added</span>
                      }
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Links</h3>
                    <div className="space-y-1">
                      {formData.website && (
                        <div className="flex items-center text-sm">
                          <span className="mr-2">🔗</span>
                          <span className="text-cyan">{formData.website}</span>
                        </div>
                      )}
                      {formData.github && (
                        <div className="flex items-center text-sm">
                          <span className="mr-2">💻</span>
                          <span className="text-cyan">{formData.github}</span>
                        </div>
                      )}
                      {formData.twitter && (
                        <div className="flex items-center text-sm">
                          <span className="mr-2">🐦</span>
                          <span className="text-cyan">{formData.twitter}</span>
                        </div>
                      )}
                      {!formData.website && !formData.github && !formData.twitter && (
                        <span className="text-xs opacity-70">No links added</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                    {error}
                  </div>
                )}
                
                {isSaved && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                    Profile updated successfully!
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                      placeholder="e.g. Full Stack Developer"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                      placeholder="e.g. React, Node.js, TypeScript"
                    />
                  </div>

                  {/* Links */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Links</h3>
                    
                    {/* Website */}
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    {/* GitHub */}
                    <div>
                      <label htmlFor="github" className="block text-sm font-medium mb-2">
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    
                    {/* Twitter */}
                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                        Twitter
                      </label>
                      <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary px-6 py-3 w-full"
                    >
                      {isLoading ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 