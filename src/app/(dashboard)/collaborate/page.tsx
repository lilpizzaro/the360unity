"use client";

import { useState } from "react";
import Link from "next/link";

const collaborationRooms = [
  {
    id: 1,
    title: "React Component Library Build",
    description: "Building a comprehensive React component library with TypeScript. Looking for frontend developers to help with styling and testing.",
    host: "Sarah Chen",
    participants: 3,
    maxParticipants: 5,
    tech: ["React", "TypeScript", "Storybook"],
    status: "active",
    type: "project",
    difficulty: "Intermediate",
    timeZone: "PST",
    nextSession: "Today, 3:00 PM"
  },
  {
    id: 2,
    title: "Algorithm Practice Session",
    description: "Daily coding challenges and algorithm practice. Perfect for interview prep and improving problem-solving skills.",
    host: "Alex Kumar",
    participants: 2,
    maxParticipants: 4,
    tech: ["JavaScript", "Python", "Algorithms"],
    status: "active",
    type: "learning",
    difficulty: "All Levels",
    timeZone: "EST",
    nextSession: "Tomorrow, 10:00 AM"
  },
  {
    id: 3,
    title: "DevOps Infrastructure Setup",
    description: "Setting up CI/CD pipeline for a microservices architecture. Need help with Docker, Kubernetes, and monitoring.",
    host: "Maria Rodriguez",
    participants: 4,
    maxParticipants: 6,
    tech: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    status: "active",
    type: "project",
    difficulty: "Advanced",
    timeZone: "CET",
    nextSession: "Tomorrow, 2:00 PM"
  },
  {
    id: 4,
    title: "Open Source Contribution Hour",
    description: "Weekly session to contribute to open source projects. Great for beginners and experienced developers alike.",
    host: "David Kim",
    participants: 1,
    maxParticipants: 8,
    tech: ["Git", "Open Source", "Various"],
    status: "scheduled",
    type: "learning",
    difficulty: "Beginner",
    timeZone: "PST",
    nextSession: "Friday, 6:00 PM"
  }
];

const codeSnippets = [
  {
    id: 1,
    title: "React Custom Hook for API Calls",
    author: "Jennifer Wu",
    language: "TypeScript",
    shared: "2 hours ago",
    likes: 12,
    comments: 5
  },
  {
    id: 2,
    title: "Python Data Processing Pipeline",
    author: "Tom Johnson",
    language: "Python",
    shared: "4 hours ago",
    likes: 8,
    comments: 3
  },
  {
    id: 3,
    title: "CSS Animation Utilities",
    author: "Lisa Park",
    language: "CSS",
    shared: "1 day ago",
    likes: 15,
    comments: 7
  }
];

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [roomFilter, setRoomFilter] = useState("all");

  const filteredRooms = collaborationRooms.filter(room => {
    if (roomFilter === "all") return true;
    return room.type === roomFilter;
  });

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="t-heading-lg mb-4">Collaboration Hub</h1>
            <p className="t-lg opacity-80">Code together, learn together, build together</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/collaborate/new-room" className="btn-primary text-base px-6 py-3">
              Create Room
            </Link>
            <Link href="/collaborate/code-share" className="bg-cyan/20 border border-cyan/30 text-cyan rounded-full text-base px-6 py-3 hover:bg-cyan/30 transition-colors">
              Share Code
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-6 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("rooms")}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === "rooms"
                ? "text-cyan border-b-2 border-cyan"
                : "text-white/70 hover:text-white"
            }`}
          >
            Collaboration Rooms
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === "code"
                ? "text-cyan border-b-2 border-cyan"
                : "text-white/70 hover:text-white"
            }`}
          >
            Code Sharing
          </button>
          <button
            onClick={() => setActiveTab("pair")}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === "pair"
                ? "text-cyan border-b-2 border-cyan"
                : "text-white/70 hover:text-white"
            }`}
          >
            Pair Programming
          </button>
        </div>

        {/* Collaboration Rooms Tab */}
        {activeTab === "rooms" && (
          <div>
            {/* Room Filters */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setRoomFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  roomFilter === "all"
                    ? "bg-cyan/20 border-cyan/50 text-cyan border"
                    : "bg-white/5 border-white/20 text-white/80 border hover:bg-white/10"
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => setRoomFilter("project")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  roomFilter === "project"
                    ? "bg-cyan/20 border-cyan/50 text-cyan border"
                    : "bg-white/5 border-white/20 text-white/80 border hover:bg-white/10"
                }`}
              >
                Project Rooms
              </button>
              <button
                onClick={() => setRoomFilter("learning")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  roomFilter === "learning"
                    ? "bg-cyan/20 border-cyan/50 text-cyan border"
                    : "bg-white/5 border-white/20 text-white/80 border hover:bg-white/10"
                }`}
              >
                Learning Sessions
              </button>
            </div>

            {/* Rooms Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  {/* Room Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        room.status === "active" ? "bg-green-400" : "bg-yellow-400"
                      }`}></div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        room.type === "project"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-blue-500/20 text-blue-300"
                      }`}>
                        {room.type === "project" ? "🚀 Project" : "📚 Learning"}
                      </span>
                    </div>
                    <span className="text-xs opacity-70">{room.difficulty}</span>
                  </div>

                  {/* Room Title & Description */}
                  <h3 className="t-heading-sm mb-3">{room.title}</h3>
                  <p className="t-base opacity-80 mb-4 line-clamp-2">{room.description}</p>

                  {/* Host Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {room.host.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{room.host}</div>
                      <div className="text-xs opacity-70">Host • {room.timeZone}</div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Room Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm opacity-70">
                    <span>👥 {room.participants}/{room.maxParticipants} participants</span>
                    <span>📅 {room.nextSession}</span>
                  </div>

                  {/* Join Button */}
                  <button className="w-full btn-primary text-center py-3">
                    {room.status === "active" ? "Join Room" : "Schedule to Join"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Sharing Tab */}
        {activeTab === "code" && (
          <div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Code Shares */}
              <div className="lg:col-span-2">
                <h2 className="t-heading-sm mb-6">Recent Code Shares</h2>
                <div className="space-y-6">
                  {codeSnippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{snippet.title}</h3>
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                              {snippet.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm opacity-70">{snippet.author} • {snippet.shared}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                          {snippet.language}
                        </span>
                      </div>

                      {/* Code Preview */}
                      <div className="bg-black/30 rounded-lg p-4 mb-4 overflow-x-auto">
                        <pre className="text-sm text-green-400 font-mono">
                          {snippet.language === "TypeScript" && `
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url).then(res => res.json())
      .then(setData).finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};`}
                          {snippet.language === "Python" && `
def process_data(data):
    return [
        {**item, 'processed': True}
        for item in data
        if item.get('valid', False)
    ]`}
                          {snippet.language === "CSS" && `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
                        </pre>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm opacity-70">
                          <button className="hover:text-cyan transition-colors">
                            👍 {snippet.likes}
                          </button>
                          <button className="hover:text-cyan transition-colors">
                            💬 {snippet.comments}
                          </button>
                          <button className="hover:text-cyan transition-colors">
                            📋 Copy
                          </button>
                        </div>
                        <button className="text-cyan text-sm hover:underline">
                          View Full Code
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Sharing Tools */}
              <div className="space-y-6">
                {/* Quick Share */}
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="t-heading-sm mb-4">Quick Code Share</h3>
                  <textarea
                    placeholder="Paste your code here..."
                    className="w-full h-32 bg-black/30 border border-white/20 rounded-lg p-3 text-sm font-mono text-white placeholder-white/50 focus:outline-none focus:border-cyan/50"
                  ></textarea>
                  <div className="flex justify-between items-center mt-4">
                    <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
                      <option>JavaScript</option>
                      <option>TypeScript</option>
                      <option>Python</option>
                      <option>CSS</option>
                    </select>
                    <button className="btn-primary text-sm px-4 py-2">
                      Share Code
                    </button>
                  </div>
                </div>

                {/* Live Code Editor */}
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="t-heading-sm mb-4">Live Code Editor</h3>
                  <p className="text-sm opacity-70 mb-4">
                    Create collaborative coding sessions with real-time editing and execution.
                  </p>
                  <button className="w-full btn-primary text-center py-3">
                    Open Code Editor
                  </button>
                </div>

                {/* Screen Share */}
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="t-heading-sm mb-4">Screen Share</h3>
                  <p className="text-sm opacity-70 mb-4">
                    Share your screen for live coding sessions and debugging help.
                  </p>
                  <button className="w-full bg-cyan/20 border border-cyan/30 text-cyan rounded-full text-center py-3 hover:bg-cyan/30 transition-colors">
                    Start Screen Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pair Programming Tab */}
        {activeTab === "pair" && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-6">👥💻</div>
              <h2 className="t-heading-md mb-4">Pair Programming</h2>
              <p className="t-base opacity-80 mb-8">
                Find a programming partner, schedule sessions, and code together in real-time.
                Perfect for learning, problem-solving, and building projects collaboratively.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="font-semibold mb-3">Find a Partner</h3>
                  <p className="text-sm opacity-70 mb-4">
                    Match with developers based on your skills and interests
                  </p>
                  <button className="btn-primary w-full py-2">Find Partner</button>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="font-semibold mb-3">Schedule Session</h3>
                  <p className="text-sm opacity-70 mb-4">
                    Book time slots for focused coding sessions
                  </p>
                  <button className="bg-cyan/20 border border-cyan/30 text-cyan rounded-full w-full py-2 hover:bg-cyan/30 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>

              <Link href="/collaborate/pair-programming" className="btn-primary text-lg px-8 py-4">
                Start Pair Programming
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
