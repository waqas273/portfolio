import React, { useState, useEffect } from 'react';
import { Terminal, User, Cpu, FolderGit2, Briefcase, Mail, Download, GraduationCap, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const SECTIONS = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll spy implementation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180; // trigger offset
      
      // Special case for bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set starting active tab
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (section, active) => {
    const cls = `w-4 h-4 transition-colors ${active ? 'text-matrix' : 'text-zinc-400 group-hover:text-cyber'}`;
    switch(section) {
      case 'home': return <Terminal className={cls} />;
      case 'about': return <User className={cls} />;
      case 'skills': return <Cpu className={cls} />;
      case 'projects': return <FolderGit2 className={cls} />;
      case 'experience': return <Briefcase className={cls} />;
      case 'education': return <GraduationCap className={cls} />;
      case 'contact': return <Mail className={cls} />;
      default: return <Terminal className={cls} />;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop HUD Navigation Bar (Fixed Top) */}
      <header className="hidden lg:block fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <div className="glass-hud rounded-lg px-4 py-3 flex items-center justify-between border-l-2 border-l-matrix shadow-2xl">
          
          {/* Logo / Telemetry Left Block */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_#00ff66]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-white">
                SYS: ACTIVE
              </span>
            </div>
          </div>

          {/* Navigation Links Block */}
          <nav className="flex items-center space-x-1">
            {SECTIONS.map((sec) => {
              const active = activeSection === sec;
              return (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`group relative px-3 py-1.5 rounded-md flex items-center space-x-2 font-mono text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                    active 
                      ? 'text-matrix bg-matrix/10 border-b border-matrix/40' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {getIcon(sec, active)}
                  <span>{sec}</span>
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-matrix border-glow-matrix rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button Right Block */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <div className="h-6 w-[1px] bg-zinc-800" />
            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                alert("CV Download action triggered! (Resume PDF link goes here)");
              }}
              className="relative inline-flex items-center space-x-2 px-4 py-1.5 rounded-md bg-matrix/10 border border-matrix text-matrix font-mono text-xs font-semibold tracking-wider uppercase hover:bg-matrix hover:text-obsidian transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(0,255,102,0.15)] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] animate-[pulse_2.5s_infinite]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Top Navbar with Hamburger Drawer */}
      <header className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 w-[92%] z-50">
        <div className="glass-hud rounded-lg px-4 py-3 flex items-center justify-between border-l-2 border-l-matrix shadow-2xl">
          
          {/* Logo / Status Left */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_#00ff66]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-white">
              SYS: ACTIVE
            </span>
          </div>

          {/* Controls Right */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-1.5 rounded-md border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-matrix hover:text-matrix transition-all duration-300 flex items-center justify-center focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isDrawerOpen ? <X className="w-5 h-5 text-matrix" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Slide-down Drawer Panel */}
        <div
          className={`absolute top-14 left-0 w-full glass-hud rounded-lg border border-zinc-800/80 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${
            isDrawerOpen ? 'max-h-[420px] opacity-100 py-4 translate-y-0' : 'max-h-0 opacity-0 py-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col space-y-1.5 px-4">
            {SECTIONS.map((sec) => {
              const active = activeSection === sec;
              return (
                <button
                  key={sec}
                  onClick={() => {
                    scrollToSection(sec);
                    setIsDrawerOpen(false);
                  }}
                  className={`group w-full px-4 py-2.5 rounded-md flex items-center space-x-3 font-mono text-xs font-medium tracking-wide uppercase transition-all duration-350 ${
                    active 
                      ? 'text-matrix bg-matrix/10 border-l-2 border-matrix' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {getIcon(sec, active)}
                  <span>{sec}</span>
                </button>
              );
            })}

            {/* CV Download Action at bottom of Drawer */}
            <div className="pt-3 border-t border-zinc-900 flex justify-center mt-2">
              <a
                href="#cv"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDrawerOpen(false);
                  alert("CV Download action triggered! (Resume PDF link goes here)");
                }}
                className="w-full text-center inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md bg-matrix/10 border border-matrix text-matrix font-mono text-xs font-semibold tracking-wider uppercase hover:bg-matrix hover:text-obsidian transition-all duration-300 shadow-[0_0_10px_rgba(0,255,102,0.15)] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
