import React, { useState, useEffect } from 'react';
import { Terminal, User, Cpu, FolderGit2, Briefcase, Mail, Download, Wifi } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [ping, setPing] = useState(24);
  const [time, setTime] = useState('');

  // Live telemetry (time & fake ping fluctuations to mimic active dashboard)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    
    updateTime();
    const timerInterval = setInterval(updateTime, 1000);
    
    const pingInterval = setInterval(() => {
      setPing(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + change;
        return next > 45 ? 45 : next < 12 ? 12 : next;
      });
    }, 4000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(pingInterval);
    };
  }, []);

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
            <div className="h-4 w-[1px] bg-zinc-800" />
            <div className="flex items-center space-x-1 font-mono text-[10px] text-zinc-500">
              <Wifi className="w-3.5 h-3.5 text-cyber/80" />
              <span>PING: </span>
              <span className="text-zinc-400 font-semibold">{ping}ms</span>
            </div>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <div className="font-mono text-[10px] text-zinc-500">
              <span>LOC: </span>
              <span className="text-zinc-400 font-semibold">{time || '00:00:00'}</span>
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

      {/* Mobile HUD Dock (Fixed Bottom) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
        <div className="glass-hud rounded-full py-3 px-4 flex items-center justify-around shadow-2xl border-t border-t-matrix/20">
          {SECTIONS.map((sec) => {
            const active = activeSection === sec;
            return (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`group p-2.5 rounded-full relative transition-all duration-300 ${
                  active 
                    ? 'bg-matrix/15 text-matrix' 
                    : 'text-zinc-500 hover:text-white'
                }`}
                aria-label={`Scroll to ${sec}`}
              >
                {getIcon(sec, active)}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-matrix border-glow-matrix" />
                )}
              </button>
            );
          })}
          
          <div className="w-[1px] h-6 bg-zinc-800" />
          <ThemeToggle />
          <div className="w-[1px] h-6 bg-zinc-800" />

          {/* Mobile Floating CV Action */}
          <button
            onClick={() => alert("CV Download action triggered!")}
            className="p-2.5 rounded-full bg-matrix text-obsidian border border-matrix shadow-[0_0_15px_rgba(0,255,102,0.4)] animate-pulse"
            aria-label="Download CV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
