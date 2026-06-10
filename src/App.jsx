import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundGrid from './components/BackgroundGrid';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ProjectsGallery from './components/ProjectsGallery';
import ServicesCards from './components/ServicesCards';
import DevConsole from './components/DevConsole';
import Education from './components/Education';
import ContactTerminal from './components/ContactTerminal';
import AdminDashboard from './components/AdminDashboard';
import { Database, FolderClosed, Cpu, LayoutGrid, ArrowUp } from 'lucide-react';
import dpImage from './assets/DP.jpg';
import { auth, db, storage } from './firebase'; // Ensures firebase initializes
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [profile, setProfile] = useState(null);
  const [avatarTilt, setAvatarTilt] = useState({ x: 0, y: 0 });

  const handleAvatarMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factor = 12; // degree of tilt
    setAvatarTilt({
      x: -(y / (box.height / 2)) * factor,
      y: (x / (box.width / 2)) * factor
    });
  };

  const handleAvatarMouseLeave = () => {
    setAvatarTilt({ x: 0, y: 0 });
  };

  // Native hash-based router listener
  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch developer profile data dynamically from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const docRef = doc(db, 'profile', 'developer');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (err) {
        console.error("Error reading profile DB: ", err);
      }
    };
    fetchProfileData();
  }, [route]); // re-fetch profile variables when switching views

  // Route switch rendering
  if (route === '#/admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-matrix/30 selection:text-matrix text-zinc-300">
      {/* Visual background systems */}
      <BackgroundGrid />

      {/* Floating HUD Navbar */}
      <Navbar />

      {/* Core Portfolio Content Containers */}
      <main className="container mx-auto px-4 pt-24 lg:pt-32 pb-20 max-w-6xl">
        
        {/* HOME SECTION */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-12">
          <Hero profile={profile || {}} />
        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 min-h-[60vh] flex flex-col justify-center">
          <div className="max-w-5xl w-full">
            <div className="mb-6 space-y-1">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-matrix uppercase block">
                // SYSTEM.PROFILE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans flex items-center gap-3">
                <span>About Me</span>
                <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Profile</span>
                <span className="h-[2px] flex-grow bg-gradient-to-r from-matrix/30 via-zinc-800/20 to-transparent ml-4 hidden sm:block" />
              </h2>
            </div>
            
            {/* Unified System Configuration Window */}
            <div className="glass-hud preserve-dark rounded-lg border border-zinc-800/80 shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="bg-zinc-950/90 px-4 py-2 border-b border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-500 select-none">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/60 animate-[pulse_2s_infinite]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/60 animate-[pulse_2s_infinite_0.5s]" />
                  <span className="w-2 h-2 rounded-full bg-matrix/60 animate-[pulse_2s_infinite_1s]" />
                  <span className="ml-2 text-zinc-400 font-semibold tracking-wider">about_me.config</span>
                </div>
                <span className="font-mono text-[8px] text-matrix animate-pulse">SECURE_DIAGNOSTICS</span>
              </div>
              
              {/* Content Panel Grid */}
              <div className="p-6 sm:p-8 bg-zinc-950/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column - Narrative and telemetry */}
                <div className="md:col-span-7 space-y-6 order-2 md:order-1">
                  
                  {/* Biography styled paragraph */}
                  <div className="relative border-l-2 border-matrix/50 pl-4 space-y-1">
                    <span className="font-mono text-[9px] sm:text-[10px] text-matrix uppercase tracking-wider font-semibold">// executive_summary</span>
                    <p className="leading-relaxed text-zinc-350 font-sans text-sm sm:text-base">
                      {profile?.about || 'I focus on bridging clean frontend architecture with robust database engines. Whether deploying traditional server-based sites using the MERN stack (MongoDB, Express, React, Node.js) or scaling serverless applications via React + Firebase, I design modular codebases and integrate intelligent AI vector-search RAG pipelines to automate user interactions.'}
                    </p>
                  </div>

                  {/* Telemetry Mock Editor */}
                  <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 overflow-hidden shadow-xl">
                    {/* Editor Tab Bar */}
                    <div className="bg-zinc-950/90 px-3 py-1.5 border-b border-zinc-800/80 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-matrix/50" />
                        <span className="ml-2 bg-zinc-900 px-2 py-0.5 rounded text-zinc-300 font-semibold flex items-center space-x-1 border-t border-l border-zinc-800">
                          <span className="text-amber-500 font-bold text-[8px]">JS</span>
                          <span>developer.js</span>
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600">utf-8 // LF</span>
                    </div>
                    
                    {/* Editor Code Area */}
                    <div className="p-4 bg-zinc-950/35 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-400 select-all overflow-x-auto whitespace-pre">
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">1</span>
                        <span className="text-zinc-500">// active profile telemetry diagnostics</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">2</span>
                        <span><span className="text-purple-400 font-semibold">const</span> <span className="text-blue-400">developer</span> = &#123;</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">3</span>
                        <span>&nbsp;&nbsp;name: <span className="text-cyan-400">"{profile?.name || 'Muhammad Waqas'}"</span>,</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">4</span>
                        <span>&nbsp;&nbsp;role: <span className="text-cyan-400">"{profile?.role || 'AI-Driven Full-Stack Engineer'}"</span>,</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">5</span>
                        <span>&nbsp;&nbsp;focus: [</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">6</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;{profile?.focusTags 
                          ? profile.focusTags.split(',').map((f, i) => (
                              <span key={i}>
                                <span className="text-amber-400">"{f.trim()}"</span>
                                {i < profile.focusTags.split(',').length - 1 ? ', ' : ''}
                              </span>
                            ))
                          : <>
                              <span className="text-amber-400">"React"</span>, <span className="text-amber-400">"Node"</span>, <span className="text-amber-400">"Firebase"</span>, <span className="text-amber-400">"AI integrations"</span>
                            </>
                        }</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">7</span>
                        <span>&nbsp;&nbsp;],</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">8</span>
                        <span>&nbsp;&nbsp;status: <span className="text-matrix font-semibold">"OPEN_TO_COLLABORATION"</span>,</span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">9</span>
                        <span>&nbsp;&nbsp;activeTelemetry: <span className="text-purple-400 font-semibold">true</span></span>
                      </div>
                      <div className="flex">
                        <span className="text-zinc-700 select-none w-6 text-right pr-2 border-r border-zinc-900 mr-2">10</span>
                        <span>&#125;;</span>
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Highlights Telemetry */}
                  <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-[9px] text-zinc-500">
                    <div className="p-3 bg-zinc-950/20 rounded border border-zinc-900/60 hover:border-matrix/30 transition-colors flex flex-col space-y-1">
                      <span className="text-matrix uppercase tracking-wider font-semibold">// stack_core</span>
                      <span className="text-zinc-300 font-sans font-semibold text-[10px] sm:text-xs">React & Node</span>
                    </div>
                    <div className="p-3 bg-zinc-950/20 rounded border border-zinc-900/60 hover:border-cyber/30 transition-colors flex flex-col space-y-1">
                      <span className="text-cyber uppercase tracking-wider font-semibold">// db_layer</span>
                      <span className="text-zinc-300 font-sans font-semibold text-[10px] sm:text-xs">Firebase Cloud</span>
                    </div>
                    <div className="p-3 bg-zinc-950/20 rounded border border-zinc-900/60 hover:border-electric/30 transition-colors flex flex-col space-y-1">
                      <span className="text-electric uppercase tracking-wider font-semibold">// integration</span>
                      <span className="text-zinc-300 font-sans font-semibold text-[10px] sm:text-xs">AI APIs & LLMs</span>
                    </div>
                  </div>

                </div>
                
                {/* Right Column - DP Avatar Box */}
                <div className="md:col-span-5 flex justify-center order-1 md:order-2">
                  <div 
                    className="relative group cursor-pointer p-4 rounded-lg bg-zinc-950/5 hover:bg-zinc-950/15 border border-transparent hover:border-zinc-900/30 transition-all duration-500"
                    onMouseMove={handleAvatarMouseMove}
                    onMouseLeave={handleAvatarMouseLeave}
                    style={{
                      transform: `perspective(1000px) rotateX(${avatarTilt.x}deg) rotateY(${avatarTilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                      transition: avatarTilt.x === 0 && avatarTilt.y === 0 ? 'all 0.5s ease-out' : 'none'
                    }}
                  >
                    
                    {/* Viewport container with padding and rotating outer dials */}
                    <div className="relative p-4 rounded-full border border-zinc-850 bg-zinc-950/30 group-hover:border-matrix/20 transition-all duration-500">
                      {/* Rotating mechanical outer dashed dial (clockwise) */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-matrix/20 group-hover:border-matrix/40 animate-[spin_40s_linear_infinite] pointer-events-none" />
                      
                      {/* Rotating mechanical inner dotted dial (counter-clockwise) */}
                      <div className="absolute inset-2 rounded-full border border-dotted border-cyber/20 group-hover:border-cyber/40 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />
                      
                      {/* Glowing Sonar ring (pulses outwards) */}
                      <div className="absolute inset-0 rounded-full border border-matrix/30 sonar-ring pointer-events-none" />
                      
                      {/* Inner Viewport Circle */}
                      <div className="relative rounded-full overflow-hidden w-56 h-56 sm:w-64 sm:h-64 border border-zinc-850 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 flex items-center justify-center group-hover:border-matrix/40 group-hover:shadow-[0_0_25px_var(--color-matrix-glow)] transition-all duration-500 shadow-inner z-10">
                        
                        {/* Developer portrait - completely clean (fills the circle, zooms on hover) */}
                        <img 
                          src={dpImage} 
                          alt={profile?.name || 'Developer Avatar'} 
                          className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" 
                        />
                        
                      </div>
                    </div>

                    {/* HUD Corner bracket accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-zinc-800/80 group-hover:border-matrix/30 transition-all pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-zinc-800/80 group-hover:border-matrix/30 transition-all pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-zinc-800/80 group-hover:border-matrix/30 transition-all pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-zinc-800/80 group-hover:border-matrix/30 transition-all pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* EDUCATION SECTION */}
        <section id="education" className="py-20 flex flex-col justify-center">
          <div className="mb-8 text-left sm:text-center sm:mx-auto max-w-2xl space-y-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-matrix uppercase block">
              // ACADEMICS.QUALIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans justify-start sm:justify-center flex items-center gap-3">
              <span>Academic Foundation</span>
              <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Education</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed pt-2">
              Trace of academic milestones, credentials, and computer science study details.
            </p>
          </div>
          <Education />
        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 flex flex-col justify-center">
          <div className="mb-8 space-y-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-cyber uppercase block">
              // TECH.CORE_STACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans flex items-center gap-3">
              <span>Technical Skills</span>
              <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Command Center</span>
              <span className="h-[2px] flex-grow bg-gradient-to-r from-cyber/30 via-zinc-800/20 to-transparent ml-4 hidden sm:block" />
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed pt-2">
              Professional engineering dashboard outlining specialized technical domains, automated proficiency ratings, and live system metrics.
            </p>
          </div>
          <BentoGrid />
        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 flex flex-col justify-center">
          <div className="mb-8 space-y-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-electric uppercase block">
              // PORTFOLIO.WORKS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans flex items-center gap-3">
              <span>Featured Projects</span>
              <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Repository</span>
              <span className="h-[2px] flex-grow bg-gradient-to-r from-electric/30 via-zinc-800/20 to-transparent ml-4 hidden sm:block" />
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed pt-2">
              Dynamically compiled project nodes synced directly from the cloud database, structured with tilt-physics widgets.
            </p>
          </div>
          <ProjectsGallery />
        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 flex flex-col justify-center space-y-16">
          
          {/* Services segment */}
          <div>
            <div className="mb-8 space-y-1">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-matrix uppercase block">
                // CAPABILITIES.SERVICES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans flex items-center gap-3">
                <span>Expertise & Services</span>
                <span className="h-[2px] flex-grow bg-gradient-to-r from-matrix/30 via-zinc-800/20 to-transparent ml-4 hidden sm:block" />
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed pt-2">
                Core engineering expertise mapped to high-fidelity, optimized, and connected architectures.
              </p>
            </div>
            <ServicesCards />
          </div>

          {/* Interactive Dev Console Simulator */}
          <div>
            <div className="mb-8 text-left sm:text-center sm:mx-auto max-w-2xl space-y-1">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-cyber uppercase block">
                // INTERACTIVE.SIMULATOR
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans justify-start sm:justify-center flex items-center gap-3">
                <span>AI Agent Simulator</span>
                <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Command Console</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed pt-2">
                Interact with my query console simulation to retrieve live system profiles, RAG structures, and focus parameters.
              </p>
            </div>
            <DevConsole />
          </div>

        </section>

        {/* Divider line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 flex flex-col justify-center">
          <div className="mb-8 text-center mx-auto max-w-xl space-y-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-cyber uppercase block">
              // CONTACT.DISPATCHER
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans justify-center flex items-center gap-3">
              <span>Get In Touch</span>
              <span className="text-zinc-500 font-mono text-lg sm:text-2xl font-light">/ Message Board</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed pt-2">
              Compile your parameters inside the JSON dispatcher structure below to send a network packet directly to my mailbox.
            </p>
          </div>
          <ContactTerminal />
        </section>

      </main>

      {/* Futuristic Telemetry Footer */}
      <footer className="w-full bg-zinc-950/80 border-t border-zinc-900 py-8 font-mono text-[10px] text-zinc-500 relative">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Uptime and systems stat logs */}
          <div className="flex items-center space-x-3 text-zinc-650 flex-wrap justify-center">
            <span className="flex items-center space-x-1.5 text-matrix/90">
              <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
              <span>STATUS: ONLINE</span>
            </span>
            <span className="text-zinc-800">|</span>
            <span>PORTFOLIO_ACTIVE: 100%</span>
            <span className="text-zinc-800">|</span>
            <span>SEC_PORT: 443</span>
            <span className="text-zinc-800">|</span>
            <span>NODE_V: v20.11.0</span>
          </div>

          {/* Social flags CLI links */}
          <div className="flex items-center space-x-4 text-xs">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-matrix transition-all duration-300 font-mono"
            >
              --github
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-cyber transition-all duration-300 font-mono"
            >
              --linkedin
            </a>
            <a 
              href="mailto:developer@obsidian.io" 
              className="text-zinc-400 hover:text-electric transition-all duration-300 font-mono"
            >
              --email
            </a>
            <a 
              href="#cv" 
              onClick={(e) => { e.preventDefault(); alert("CV Download action triggered!"); }} 
              className="text-zinc-400 hover:text-amber-400 transition-all duration-300 font-mono"
            >
              --cv
            </a>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded border border-zinc-900 bg-zinc-950/80 text-zinc-400 hover:border-matrix hover:text-matrix hover:shadow-[0_0_12px_rgba(0,255,102,0.25)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
