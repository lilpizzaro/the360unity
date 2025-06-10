import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { RocketIcon, UserIcon, MessageCircleIcon, GlobeIcon, LightbulbIcon, GithubIcon, CodeIcon, ChevronDownIcon } from "@/components/icons";
import { MenuIcon } from "lucide-react";
import TrueFocus from "@/components/TrueFocus";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import BeamsBackground from "@/components/BeamsBackground";

export default async function Home() {
  // Get the current user with the newer pattern
  const user = await currentUser();
  const userId = user?.id;
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
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
          <div className="flex items-center">
            {/* User Button for Desktop */}
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

            {/* Mobile Navigation */}
            <div className="flex items-center md:hidden">
              {userId ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center justify-center px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/sign-in" 
                    className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/sign-up" 
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium text-white shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="start" className="section flex-col text-center relative overflow-hidden pt-20 sm:pt-24">
          {/* Light Beams Background */}
          <BeamsBackground
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#0ea5e9"
            speed={1.5}
            scale={0.2}
            rotation={45}
            opacity={0.5}
          />
          
          {/* Hero Text */}
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <TrueFocus 
                sentence="Connect with other developers"
                manualMode={false}
                blurAmount={5}
                borderColor="#0ea5e9"
                glowColor="rgba(14, 165, 233, 0.6)"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </div>

            <div className="fade-in space-y-4">
              <div className="max-w-2xl mx-auto opacity-90">
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={3}
                  blurStrength={6}
                  textClassName="t-lg"
                >
                  The360Unity is a community platform designed for developers to share their projects, learn from each other, collaborate, and grow together.
                </ScrollReveal>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href={userId ? "/dashboard" : "/sign-up"} className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in md:hidden">
            <Link href="#what" className="btn-circle">
              <ChevronDownIcon size={16} />
            </Link>
          </div>
        </section>

        {/* What Section */}
        <section id="what" className="section flex-col py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top bottom"
                scrollEnd="top center"
                stagger={0.03}
                containerClassName="text-cyan"
              >
                What We Offer
              </ScrollFloat>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="fade-in bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <RocketIcon size={48} className="text-cyan" />
                </div>
                <h3 className="t-heading-sm mb-4">Share Your Projects</h3>
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={2}
                    blurStrength={5}
                    textClassName="t-base"
                  >
                    Showcase your latest projects, get feedback from the community, and discover amazing work from other developers.
                  </ScrollReveal>
                </div>
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
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={2}
                    blurStrength={5}
                    textClassName="t-base"
                  >
                    Create a compelling developer profile that showcases your skills, technologies, and contributions to the community.
                  </ScrollReveal>
                </div>
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
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={2}
                    blurStrength={5}
                    textClassName="t-base"
                  >
                    Join discussions, participate in code reviews, and collaborate on projects with developers from around the world.
                  </ScrollReveal>
                </div>
                <Link href="/sign-up" className="mt-4 inline-block text-cyan hover:underline">
                  Join community →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="section flex-col py-20 relative overflow-hidden">
          {/* Light Beams Background */}
          <BeamsBackground
            beamWidth={1.5}
            beamHeight={12}
            beamNumber={15}
            lightColor="#a855f7"
            speed={1}
            scale={0.15}
            rotation={-30}
            opacity={0.3}
          />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="mb-8">
                <ScrollFloat
                  animationDuration={1.5}
                  ease="elastic.out(1, 0.3)"
                  scrollStart="top bottom"
                  scrollEnd="top center"
                  stagger={0.04}
                  containerClassName="text-white"
                >
                  Why Choose The360Unity?
                </ScrollFloat>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Benefits List */}
              <div className="space-y-8">
                <div className="fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <RocketIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Discover New Opportunities</h3>
                  </div>
                  <div className="opacity-80">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={5}
                      textClassName="t-base"
                    >
                      Connect with like-minded developers, discover job opportunities, and find collaborators for your next big project.
                    </ScrollReveal>
                  </div>
                </div>

                <div className="fade-in-delay-1">
                  <div className="flex items-center gap-3 mb-4">
                    <LightbulbIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Learn and Grow</h3>
                  </div>
                  <div className="opacity-80">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={5}
                      textClassName="t-base"
                    >
                      Access tutorials, join study groups, and learn from experienced developers in our supportive community.
                    </ScrollReveal>
                  </div>
                </div>

                <div className="fade-in-delay-2">
                  <div className="flex items-center gap-3 mb-4">
                    <CodeIcon size={24} className="text-cyan" />
                    <h3 className="t-heading-md text-cyan">Build Together</h3>
                  </div>
                  <div className="opacity-80">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={5}
                      textClassName="t-base"
                    >
                      Find team members for hackathons, open source projects, or startup ideas. Build something amazing together.
                    </ScrollReveal>
                  </div>
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
              <div className="mb-8">
                <ScrollFloat
                  animationDuration={0.8}
                  ease="power4.out"
                  scrollStart="top bottom"
                  scrollEnd="top center"
                  stagger={0.02}
                  containerClassName="text-purple-300"
                >
                  Got Any Questions?
                </ScrollFloat>
              </div>
              <div className="opacity-80">
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={4}
                  textClassName="t-lg"
                >
                  Here's what you might be wondering about The360Unity. Got another question? Feel free to contact us.
                </ScrollReveal>
              </div>
            </div>

            <div className="space-y-6">
              {/* FAQ Items */}
              <div className="fade-in bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">What is The360Unity?</h3>
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={1.5}
                    blurStrength={4}
                    textClassName="t-base"
                  >
                    The360Unity is a community platform designed for developers to share projects, collaborate, learn, and grow together. Whether you're a beginner or experienced developer, you'll find valuable connections and opportunities here.
                  </ScrollReveal>
                </div>
              </div>

              <div className="fade-in-delay-1 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">Is The360Unity free?</h3>
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={1.5}
                    blurStrength={4}
                    textClassName="t-base"
                  >
                    Yes! The360Unity is free to join and use. We believe in making developer collaboration accessible to everyone, regardless of their background or experience level.
                  </ScrollReveal>
                </div>
              </div>

              <div className="fade-in-delay-2 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">What can I share on my profile?</h3>
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={1.5}
                    blurStrength={4}
                    textClassName="t-base"
                  >
                    You can showcase your projects, list your technical skills, share your GitHub repositories, write about your development journey, and connect with other developers who share similar interests.
                  </ScrollReveal>
                </div>
              </div>

              <div className="fade-in-delay-3 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="t-heading-sm mb-3">How do I get started?</h3>
                <div className="opacity-80">
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={1.5}
                    blurStrength={4}
                    textClassName="t-base"
                  >
                    Simply click the "Join the Community" button above to create your developer profile and start connecting with other developers right away!
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="section flex-col py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <ScrollFloat
                animationDuration={1.2}
                ease="back.out(1.7)"
                scrollStart="top bottom"
                scrollEnd="top center"
                stagger={0.05}
                containerClassName="text-cyan"
              >
                Ready to join the community?
              </ScrollFloat>
            </div>
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
