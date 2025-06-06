"use client";

import { useState } from "react";
import Link from "next/link";

const featuredProjects = [
  {
    id: 1,
    title: "Real-time Collaborative Editor",
    author: "Sarah Chen",
    description: "A powerful collaborative text editor with real-time synchronization, syntax highlighting, and voice chat integration.",
    image: "💻",
    tech: ["React", "WebSocket", "Node.js", "Monaco Editor"],
    github: "https://github.com/sarahchen/collab-editor",
    demo: "https://collab-editor.demo.com",
    stars: 1247,
    forks: 89,
    issues: 12,
    featured: true,
    codePreview: `
// Real-time cursor synchronization
const useCursor = (roomId: string) => {
  const [cursors, setCursors] = useState<Cursor[]>([]);

  useEffect(() => {
    socket.on('cursor-update', (data) => {
      setCursors(prev => updateCursor(prev, data));
    });
  }, [roomId]);

  return { cursors, updateCursor };
};`,
    liveFeatures: ["Real-time editing", "Voice chat", "Syntax highlighting", "Version control"],
    metrics: {
      performance: 95,
      accessibility: 88,
      bestPractices: 92,
      seo: 85
    }
  },
  {
    id: 2,
    title: "AI-Powered Code Review Bot",
    author: "Alex Kumar",
    description: "Intelligent code review assistant that provides suggestions, detects bugs, and ensures best practices.",
    image: "🤖",
    tech: ["Python", "TensorFlow", "FastAPI", "GitHub API"],
    github: "https://github.com/alexk/code-review-ai",
    demo: "https://code-review-ai.demo.com",
    stars: 856,
    forks: 134,
    issues: 8,
    featured: true,
    codePreview: `
# AI model for code analysis
class CodeAnalyzer:
    def __init__(self):
        self.model = load_model('code_review_v2')

    def analyze_diff(self, diff: str) -> List[Suggestion]:
        tokens = self.tokenize(diff)
        predictions = self.model.predict(tokens)
        return self.format_suggestions(predictions)`,
    liveFeatures: ["Bug detection", "Performance tips", "Security analysis", "Style guide"],
    metrics: {
      performance: 88,
      accessibility: 94,
      bestPractices: 96,
      seo: 90
    }
  },
  {
    id: 3,
    title: "Microservices Orchestrator",
    author: "Maria Rodriguez",
    description: "Visual tool for designing, deploying, and monitoring microservices architecture with automated scaling.",
    image: "🔧",
    tech: ["Vue.js", "Go", "Docker", "Kubernetes"],
    github: "https://github.com/mariar/microservices-orchestrator",
    demo: "https://orchestrator.demo.com",
    stars: 623,
    forks: 78,
    issues: 15,
    featured: true,
    codePreview: `
// Service discovery and load balancing
func (lb *LoadBalancer) RouteRequest(req *Request) *Service {
    services := lb.getHealthyServices(req.ServiceName)
    if len(services) == 0 {
        return nil
    }
    return lb.selectService(services, req)
}`,
    liveFeatures: ["Visual designer", "Auto-scaling", "Health monitoring", "Load balancing"],
    metrics: {
      performance: 93,
      accessibility: 85,
      bestPractices: 89,
      seo: 82
    }
  }
];

const categories = [
  { id: "all", name: "All Projects", count: 156 },
  { id: "frontend", name: "Frontend", count: 45 },
  { id: "backend", name: "Backend", count: 38 },
  { id: "fullstack", name: "Full Stack", count: 42 },
  { id: "mobile", name: "Mobile", count: 21 },
  { id: "ai", name: "AI/ML", count: 28 },
  { id: "devops", name: "DevOps", count: 19 }
];

export default function ShowcasePage() {
  const [selectedProject, setSelectedProject] = useState(featuredProjects[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="t-heading-lg mb-4">Project Showcase</h1>
            <p className="t-lg opacity-80">Explore interactive demos and learn from amazing projects</p>
          </div>
          <Link href="/showcase/submit" className="btn-primary text-base px-6 py-3 mt-4 md:mt-0">
            Submit Project
          </Link>
        </div>

        {/* Featured Projects Carousel */}
        <div className="mb-8">
          <h2 className="t-heading-sm mb-6">🌟 Featured Projects</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`flex-shrink-0 w-80 p-4 rounded-xl transition-all duration-300 ${
                  selectedProject.id === project.id
                    ? "bg-cyan/20 border-cyan/50 border"
                    : "bg-white/5 border-white/10 border hover:bg-white/10"
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{project.image}</span>
                  <div className="text-left">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-70">{project.author}</p>
                  </div>
                </div>
                <div className="flex space-x-2 text-xs">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/10 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Project Display */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Project Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Project Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">{selectedProject.image}</span>
                    <div>
                      <h2 className="t-heading-md mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                          {selectedProject.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm opacity-70">{selectedProject.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      📁 Code
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cyan/20 border border-cyan/30 text-cyan rounded-full text-sm px-4 py-2 hover:bg-cyan/30 transition-colors"
                    >
                      🚀 Demo
                    </a>
                  </div>
                </div>

                <p className="t-base opacity-80 mb-4">{selectedProject.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-white/10 rounded-full text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Stats */}
                <div className="flex items-center space-x-6 text-sm opacity-70">
                  <span>⭐ {selectedProject.stars} stars</span>
                  <span>🍴 {selectedProject.forks} forks</span>
                  <span>🐛 {selectedProject.issues} issues</span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-white/10">
                {["overview", "code", "demo", "metrics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-cyan border-b-2 border-cyan bg-cyan/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="font-semibold mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProject.liveFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-green-400 mr-3">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div>
                    <h3 className="font-semibold mb-4">Code Preview</h3>
                    <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono">
                        {selectedProject.codePreview}
                      </pre>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm opacity-70">
                        Main language: {selectedProject.tech[0]}
                      </span>
                      <button className="text-cyan text-sm hover:underline">
                        View full repository →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "demo" && (
                  <div>
                    <h3 className="font-semibold mb-4">Interactive Demo</h3>
                    <div className="bg-black/30 rounded-lg p-8 text-center">
                      <div className="text-6xl mb-4">🖥️</div>
                      <p className="mb-4">Experience the live application</p>
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base px-6 py-3"
                      >
                        Open Demo
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === "metrics" && (
                  <div>
                    <h3 className="font-semibold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      {Object.entries(selectedProject.metrics).map(([metric, score]) => (
                        <div key={metric} className="flex items-center justify-between">
                          <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  score >= 90 ? "bg-green-500" :
                                  score >= 80 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="t-heading-sm mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? "bg-cyan/20 text-cyan"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm opacity-70">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* GitHub Integration */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="t-heading-sm mb-4">GitHub Integration</h3>
              <p className="text-sm opacity-70 mb-4">
                Connect your GitHub to automatically showcase your repositories
              </p>
              <button className="w-full btn-primary text-center py-3">
                Connect GitHub
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="t-heading-sm mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">📤</span>
                    <span>Submit Project</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">💡</span>
                    <span>Get Feedback</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">🤝</span>
                    <span>Find Collaborators</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* More Projects */}
        <div className="text-center bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
          <h2 className="t-heading-md mb-4">Explore More Projects</h2>
          <p className="t-base opacity-80 mb-6">
            Discover hundreds of amazing projects built by our community
          </p>
          <Link href="/projects" className="btn-primary text-base px-8 py-3">
            Browse All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
