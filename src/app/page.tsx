import Image from "next/image";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RocketIcon, UserIcon, MessageCircleIcon, GlobeIcon, LightbulbIcon, GithubIcon, CodeIcon, ChevronDownIcon } from "@/components/icons";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            THE360UNITY
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#start" className="nav-link t-caption">Start</Link>
            <Link href="#what" className="nav-link t-caption">What</Link>
            <Link href="#why" className="nav-link t-caption">Why</Link>
            <Link href="#faq" className="nav-link t-caption">FAQ</Link>
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Button Placeholder - will be replaced with Clerk */}
            <div className="hidden md:flex items-center space-x-4">
              {userId ? (
                <>
                  <Link href="/dashboard" className="nav-link t-caption hover:text-cyan">
                    Dashboard
                  </Link>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                  </div>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="nav-link t-caption hover:text-cyan">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="btn-primary t-caption">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile CTA */}
            <Link href={userId ? "/dashboard" : "/sign-up"} className="btn-primary t-caption sm:hidden text-xs px-4 py-2">
              {userId ? "Dashboard" : "Join"}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="start" className="section flex-col text-center relative overflow-hidden pt-24">
          {/* Phone Mockups - Parallax Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Phone 1 - Developer Portfolio */}
              <div className="absolute transform -rotate-12 translate-x-[-200px] translate-y-[-50px] opacity-80 float-animation">
                <div className="w-[200px] h-[400px] bg-black/20 rounded-[30px] border border-white/20 backdrop-blur-sm p-4">
                  <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[20px] flex flex-col items-center justify-center text-xs">
                    <div className="w-16 h-16 bg-white/20 rounded-full mb-4 flex items-center justify-center">
                      <UserIcon size={32} className="text-white" />
                    </div>
                    <div className="text-white/80 text-center">
                      <div className="font-semibold">Developer Profile</div>
                      <div className="text-xs opacity-70">Full Stack Dev</div>
                      <div className="mt-2 text-xs">React • Node.js • Python</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Project Showcase */}
              <div className="absolute transform rotate-12 translate-x-[200px] translate-y-[50px] opacity-80 float-animation-delay-2">
                <div className="w-[200px] h-[400px] bg-black/20 rounded-[30px] border border-white/20 backdrop-blur-sm p-4">
                  <div className="w-full h-full bg-gradient-to-b from-green-500/20 to-blue-500/20 rounded-[20px] flex flex-col items-center justify-center text-xs">
                    <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                      <RocketIcon size={32} className="text-white" />
                    </div>
                    <div className="text-white/80 text-center">
                      <div className="font-semibold">AI Chat App</div>
                      <div className="text-xs opacity-70">⭐ 1.2k stars</div>
                      <div className="mt-2 text-xs">Next.js • OpenAI • TypeScript</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 - Community Chat */}
              <div className="transform translate-y-[20px] float-animation-delay-1">
                <div className="w-[220px] h-[440px] bg-black/20 rounded-[35px] border border-white/20 backdrop-blur-sm p-5">
                  <div className="w-full h-full bg-gradient-to-b from-purple-500/20 to-pink-500/20 rounded-[25px] flex flex-col items-center justify-center text-sm">
                    <div className="w-20 h-20 bg-white/20 rounded-full mb-6 flex items-center justify-center text-2xl">
                      <MessageCircleIcon size={40} className="text-white" />
                    </div>
                    <div className="text-white/80 text-center">
                      <div className="font-semibold">Dev Community</div>
                      <div className="text-xs opacity-70 mt-1">5.2k active developers</div>
                      <div className="mt-4 text-xs">
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <RocketIcon size={14} className="text-white" /> React Best Practices
                        </div>
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <LightbulbIcon size={14} className="text-white" /> Code Review Circle
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <GithubIcon size={14} className="text-white" /> Startup Projects
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="t-heading-xl animate-text mb-8">
              Connect with
              <br />
              <span className="text-cyan">other developers</span>
            </h1>

            <div className="fade-in space-y-4">
              <p className="t-lg max-w-2xl mx-auto opacity-90">
                The360Unity is a community platform designed for developers to share their projects, learn from each other, collaborate, and grow together.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href={userId ? "/dashboard" : "/sign-up"} className="btn-primary text-base px-8 py-3">
                  {userId ? "Go to Dashboard" : "Join the platform"}
                </Link>
                <span className="text-white/70">or</span>
                <Link href="#what" className="text-cyan hover:underline">
                  find out more
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in">
            <Link href="#what" className="btn-circle">
              <ChevronDownIcon size={16} />
            </Link>
          </div>
        </section>

        {/* What Section */}
        <section id="what" className="section flex-col py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="t-heading-lg mb-16 animate-text">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="fade-in bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <RocketIcon size={48} className="text-cyan" />
                </div>
                <h3 className="t-heading-sm mb-4">Share Your Projects</h3>
                <p className="t-base opacity-80">
                  Showcase your latest projects, get feedback from the community, and discover amazing work from other developers.
                </p>
                <Link href="/sign-up" className="mt-4 inline-block text-cyan hover:underline">
                  Start sharing →
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="fade-in-delay-1 bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <UserIcon size={48} className="text-cyan" />
                </div>
                <h3 className="t-heading-sm mb-4">Build Your Profile</h3>
                <p className="t-base opacity-80">
                  Create a compelling developer profile that showcases your skills, technologies, and contributions to the community.
                </p>
                <Link href="/sign-up" className="mt-4 inline-block text-cyan hover:underline">
                  Create profile →
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="fade-in-delay-2 bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <MessageCircleIcon size={48} className="text-cyan" />
                </div>
                <h3 className="t-heading-sm mb-4">Collaborate & Learn</h3>
                <p className="t-base opacity-80">
                  Join discussions, participate in code reviews, and collaborate on projects with developers from around the world.
                </p>
                <Link href="/sign-up" className="mt-4 inline-block text-cyan hover:underline">
                  Join community →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="section flex-col py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="t-heading-lg mb-8 animate-text">
                Why Choose The360Unity?
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Benefits List */}
              <div className="space-y-8">
                <div className="fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <RocketIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Discover New Opportunities</h3>
                  </div>
                  <p className="t-base opacity-80">
                    Connect with like-minded developers, discover job opportunities, and find collaborators for your next big project.
                  </p>
                </div>

                <div className="fade-in-delay-1">
                  <div className="flex items-center gap-3 mb-4">
                    <LightbulbIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Learn and Grow</h3>
                  </div>
                  <p className="t-base opacity-80">
                    Access tutorials, join study groups, and learn from experienced developers in our supportive community.
                  </p>
                </div>

                <div className="fade-in-delay-2">
                  <div className="flex items-center gap-3 mb-4">
                    <CodeIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Build Together</h3>
                  </div>
                  <p className="t-base opacity-80">
                    Find team members for hackathons, open source projects, or startup ideas. Build something amazing together.
                  </p>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <GlobeIcon size={64} className="text-white" />
                    </div>
                    <p className="t-heading-sm">Global Developer Network</p>
                    <p className="t-base opacity-70 mt-2">5,000+ active developers</p>
                    <div className="mt-6">
                      <Link href="/sign-up" className="btn-primary text-sm px-6 py-2">
                        Join the network
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section flex-col py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="t-heading-lg mb-8 animate-text">
                Got Any Questions?
              </h2>
              <p className="t-lg opacity-80">
                Here's what you might be wondering about The360Unity. Got another question? Feel free to contact us.
              </p>
            </div>

            <div className="space-y-6">
              {/* FAQ Items */}
              <div className="fade-in bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">What is The360Unity?</h3>
                <p className="t-base opacity-80">
                  The360Unity is a community platform designed for developers to share projects, collaborate, learn, and grow together. Whether you're a beginner or experienced developer, you'll find valuable connections and opportunities here.
                </p>
              </div>

              <div className="fade-in-delay-1 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">Is The360Unity free?</h3>
                <p className="t-base opacity-80">
                  Yes! The360Unity is free to join and use. We believe in making developer collaboration accessible to everyone, regardless of their background or experience level.
                </p>
              </div>

              <div className="fade-in-delay-2 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">What can I share on my profile?</h3>
                <p className="t-base opacity-80">
                  You can showcase your projects, list your technical skills, share your GitHub repositories, write about your development journey, and connect with other developers who share similar interests.
                </p>
              </div>

              <div className="fade-in-delay-3 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">How do I get started?</h3>
                <p className="t-base opacity-80">
                  Simply click the "Join the Community" button above to create your developer profile and start connecting with other developers right away!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="section flex-col py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="t-heading-lg mb-8 animate-text">
              Ready to join the community?
            </h2>
            <Link href={userId ? "/dashboard" : "/sign-up"} className="btn-primary text-lg px-12 py-4 bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300">
              {userId ? "Go to Dashboard" : "Join The360Unity"}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white mb-2">THE360UNITY</div>
              <p className="t-base opacity-70">
                © {new Date().getFullYear()} The360Unity<br />
                Made with ❤ for developers
              </p>
            </div>

            <div className="flex space-x-8">
              <div>
                <h4 className="t-caption mb-3 text-white">Platform</h4>
                <ul className="space-y-2 text-sm opacity-70">
                  <li><Link href="#" className="hover:text-cyan transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-cyan transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="t-caption mb-3 text-white">Support</h4>
                <ul className="space-y-2 text-sm opacity-70">
                  <li><Link href="mailto:hello@the360unity.com" className="hover:text-cyan transition-colors">Email us</Link></li>
                  <li><Link href="#" className="hover:text-cyan transition-colors">Help Center</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
