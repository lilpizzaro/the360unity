"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import CodeCollaboration from "@/components/CodeCollaboration";

// Remove placeholder data and replace with empty arrays
const collaborationRooms = [];
const codeSnippets = [];

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [roomFilter, setRoomFilter] = useState("all");
  const [activeCollabTool, setActiveCollabTool] = useState<string | null>(null);
  const [whiteboardContent, setWhiteboardContent] = useState<string>("");
  const [sharedNotes, setSharedNotes] = useState<string>("# Shared Notes\nType your collaborative notes here...");
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const filteredRooms = collaborationRooms.filter(room => {
    if (roomFilter === "all") return true;
    return room.type === roomFilter;
  });

  const handleWhiteboardChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWhiteboardContent(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSharedNotes(e.target.value);
  };

  // Clean up screen sharing when component unmounts
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [screenStream]);

  // Start screen sharing
  const startScreenShare = async () => {
    try {
      // Request screen sharing permission and get the stream
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: false
      });
      
      // Save the stream reference for later cleanup
      setScreenStream(stream);
      
      // Set the stream as the source for the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Handle when user stops sharing via the browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
      
      setScreenShareActive(true);
    } catch (error) {
      console.error("Error starting screen share:", error);
      alert("Failed to start screen sharing. Please make sure you have permission to share your screen.");
      setScreenShareActive(false);
    }
  };

  // Stop screen sharing
  const stopScreenShare = () => {
    if (screenStream) {
      // Stop all tracks in the stream
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    
    // Clear the video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setScreenShareActive(false);
  };

  // Toggle screen sharing
  const toggleScreenShare = () => {
    if (screenShareActive) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  const renderCollabToolContent = () => {
    switch(activeCollabTool) {
      case "whiteboard":
        return (
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Whiteboard</h3>
              <button 
                onClick={() => setActiveCollabTool(null)}
                className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <textarea
              value={whiteboardContent}
              onChange={handleWhiteboardChange}
              placeholder="Draw or write ideas here..."
              className="w-full h-60 bg-white/5 text-white border border-white/10 rounded p-3 font-mono"
            />
          </div>
        );
      case "notes":
        return (
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Shared Notes</h3>
              <button 
                onClick={() => setActiveCollabTool(null)}
                className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <textarea
              value={sharedNotes}
              onChange={handleNotesChange}
              className="w-full h-60 bg-white/5 text-white border border-white/10 rounded p-3 font-mono"
            />
          </div>
        );
      case "screen":
        return (
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Screen Sharing</h3>
              <button 
                onClick={() => setActiveCollabTool(null)}
                className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="bg-black/50 rounded flex flex-col items-center">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                className={`w-full rounded ${screenShareActive ? 'block' : 'hidden'}`}
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
              
              {!screenShareActive && (
                <div className="flex flex-col items-center justify-center h-60 w-full">
                  <div className="mb-3 text-gray-400">No screen being shared</div>
                  <button 
                    onClick={startScreenShare}
                    className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded"
                  >
                    Share Your Screen
                  </button>
                  <p className="mt-4 text-xs text-gray-500 max-w-md text-center">
                    Your screen will be visible to all participants in the collaboration room. 
                    You can share an application window or your entire screen.
                  </p>
                </div>
              )}
              
              {screenShareActive && (
                <div className="p-4 w-full">
                  <div className="flex items-center justify-between bg-green-500/20 text-green-300 p-2 rounded mb-3">
                    <span>Screen sharing is active</span>
                    <button 
                      onClick={stopScreenShare}
                      className="px-3 py-1 bg-red-500/30 text-red-300 rounded hover:bg-red-500/50"
                    >
                      Stop Sharing
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>Your screen is now visible to other participants in the room.</p>
                    <p>You can stop sharing at any time by clicking the button above or closing the sharing dialog in your browser.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-4 md:px-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="t-heading-lg mb-2 md:mb-4">Collaborate</h1>
            <p className="t-md md:t-lg opacity-80">
              Work together with other developers in real-time on projects and code.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left Column - Code Collaboration */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 mb-4 md:mb-8">
                <h2 className="t-heading-sm md:t-heading-md mb-4 md:mb-6">Code Collaboration</h2>
                <CodeCollaboration />
              </div>
              
              {/* Collaboration Tool Content Area */}
              {activeCollabTool && (
                <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 mb-4 md:mb-8">
                  {renderCollabToolContent()}
                </div>
              )}
            </div>

            {/* Right Column - Collaboration Tools */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <h2 className="t-heading-sm mb-4 md:mb-6">Collaboration Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:space-y-4">
                  <button 
                    className="w-full text-left p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl hover:bg-white/10 transition-colors"
                    onClick={() => setActiveCollabTool("whiteboard")}
                  >
                    <div className="flex items-start">
                      <span className="text-xl md:text-2xl mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                      </span>
                      <div className="text-left">
                        <div className="font-semibold">Whiteboard</div>
                        <div className="text-xs md:text-sm opacity-70">Visual brainstorming</div>
                      </div>
                    </div>
                  </button>

                  <button 
                    className="w-full text-left p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl hover:bg-white/10 transition-colors"
                    onClick={() => setActiveCollabTool("notes")}
                  >
                    <div className="flex items-start">
                      <span className="text-xl md:text-2xl mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <line x1="10" y1="9" x2="8" y2="9"></line>
                        </svg>
                      </span>
                      <div className="text-left">
                        <div className="font-semibold">Shared Notes</div>
                        <div className="text-xs md:text-sm opacity-70">Collaborative documentation</div>
                      </div>
                    </div>
                  </button>

                  <button 
                    className="w-full text-left p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl hover:bg-white/10 transition-colors"
                    onClick={() => setActiveCollabTool("screen")}
                  >
                    <div className="flex items-start">
                      <span className="text-xl md:text-2xl mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </span>
                      <div className="text-left">
                        <div className="font-semibold">Screen Sharing</div>
                        <div className="text-xs md:text-sm opacity-70">Show your work in real-time</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <h2 className="t-heading-sm mb-4 md:mb-6">Recent Collaborations</h2>
                <div className="grid grid-cols-1 gap-3 md:space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm md:text-base">React Component Review</div>
                      <span className="text-xs opacity-70">2h ago</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="mr-2">with</span>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xs border border-black">
                          A
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-xs border border-black">
                          J
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm md:text-base">API Integration Session</div>
                      <span className="text-xs opacity-70">1d ago</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="mr-2">with</span>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-xs border border-black">
                          S
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm md:text-base">Bug Fix Pair Programming</div>
                      <span className="text-xs opacity-70">3d ago</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="mr-2">with</span>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-xs border border-black">
                          M
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-xs border border-black">
                          R
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs border border-black">
                          D
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
