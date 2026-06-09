import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, ArrowUpRight, Compass, ShieldAlert, Cpu } from 'lucide-react';

const DEFAULT_TYPEWRITER = 'const profile = { status: "Building Next-Gen Web Apps", stack: "React & Firebase" };';

const INITIAL_LOGS = [
  '[INF] SYSTEM: Booting compilation systems...',
  '[INF] COMPILER: Mapping modules under /src/*',
  '[OK]  COMPILER: Loaded postcss.config.js & tailwind.config.js.',
  '[OK]  VITE: Local server running at http://localhost:5173/',
  '[INF] MONITOR: Established connection to Firebase Firestore.',
];

const LOG_TEMPLATES = [
  () => `[INF] COMPILER: Hot Module Replacement (HMR) synchronized.`,
  () => `[OK]  DATABASE: Auth token refreshed successfully.`,
  () => `[OK]  DATABASE: Firestore listener subscribed to 'projects' collection.`,
  () => `[INF] CLIENT: Handshake verified from IP ${Math.floor(Math.random() * 150) + 50}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.`,
  () => `[OK]  METRICS: Frame budget 60fps (16.67ms render latency).`,
  () => `[OK]  MONITOR: Virtual heap usage ${Math.floor(Math.random() * 10) + 18}.4MB / 128MB.`,
  () => `[INF] PING: Database write response: ${Math.floor(Math.random() * 20) + 12}ms.`,
  () => `[OK]  SYSTEM: Memory sweep complete. Garbage collection freed ${(Math.random() * 2 + 0.5).toFixed(1)}MB.`,
];

export default function Hero({ profile = {} }) {
  const name = profile.name || 'Elite Full-Stack Architect';
  const role = profile.role || 'Visual Architect & Full-Stack Engineer';
  const about = profile.about || 'I am a Full-Stack Engineer designing high-performance interfaces, cloud structures, and interactive layouts. Leveraging modular technologies to bridge code speed with clean visual art.';
  
  // Format focus tags dynamically inside typewriter text
  const typewriterText = profile.focusTags
    ? `const profile = { focus: [${profile.focusTags.split(',').map(t => `"${t.trim()}"`).join(', ')}] };`
    : DEFAULT_TYPEWRITER;

  // Typewriter state
  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  
  // Terminal states
  const [logs, setLogs] = useState(INITIAL_LOGS);
  
  // Page load fade-in state
  const [isLoaded, setIsLoaded] = useState(false);
  
  const terminalContainerRef = useRef(null);

  // Trigger page load fade-in
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Reset typewriter when profile variables change (live update feedback)
  useEffect(() => {
    setTypedText('');
    setTypeIndex(0);
  }, [typewriterText]);

  // Typewriter effect logic
  useEffect(() => {
    if (typeIndex < typewriterText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + typewriterText.charAt(typeIndex));
        setTypeIndex(prev => prev + 1);
      }, 45); // Speed of typing
      return () => clearTimeout(timeout);
    }
  }, [typeIndex, typewriterText]);

  // Terminal logging loop logic
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogs(prev => {
        const newLog = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)]();
        const list = [...prev, newLog];
        if (list.length > 25) {
          list.shift();
        }
        return list;
      });
    }, 2500);

    return () => clearInterval(logInterval);
  }, []);

  // Scroll to bottom of terminal internally when logs update (prevents viewport scroll jumps)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[85vh] py-12 transition-all duration-1000 transform ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      
      {/* LEFT PANEL: Typographic Content */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
        
        {/* Typewriter Code Block */}
        <div className="font-mono text-xs sm:text-sm bg-zinc-950/60 p-4 rounded-md border border-zinc-800/80 text-matrix relative inline-block max-w-full overflow-x-auto select-all">
          <span className="text-zinc-500 mr-2 select-none">&gt;</span>
          <span>{typedText}</span>
          <span className="w-1.5 h-4 bg-matrix ml-1 inline-block animate-pulse align-middle" />
        </div>

        {/* Dynamic Name & Role blocks */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {name}
          </h1>
          <div className="flex items-center space-x-2 font-mono text-sm sm:text-lg text-cyber font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-ping shadow-[0_0_8px_#00ffff]" />
            <span>{role}</span>
          </div>
        </div>

        {/* Short Subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
          {about}
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          
          {/* Explore Projects Button */}
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative overflow-hidden px-6 py-3 rounded bg-zinc-900 border border-matrix text-matrix font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-matrix hover:text-obsidian hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(0,255,102,0.15)] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]"
          >
            {/* Sweeping scanline absolute overlay */}
            <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="flex items-center space-x-2 relative z-10">
              <Compass className="w-4 h-4" />
              <span>View Projects</span>
            </span>
          </button>

          {/* Contact Me Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative overflow-hidden px-6 py-3 rounded bg-zinc-900/50 border border-cyber text-cyber font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-cyber hover:text-obsidian hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          >
            {/* Sweeping scanline absolute overlay */}
            <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="flex items-center space-x-2 relative z-10">
              <ArrowUpRight className="w-4 h-4" />
              <span>Contact Me</span>
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Live IDE Terminal */}
      <div className="lg:col-span-5 w-full">
        <div className="glass-hud rounded-lg border border-zinc-800/80 shadow-2xl overflow-hidden flex flex-col h-[320px] sm:h-[360px]">
          
          {/* Terminal Title Bar */}
          <div className="bg-zinc-950/90 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-matrix/60" />
              <span className="ml-2 text-zinc-400 font-semibold flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5 text-cyber/80" />
                <span>terminal_agent.log</span>
              </span>
            </div>
            <div className="flex items-center space-x-1.5 font-semibold">
              <Cpu className="w-3 h-3 text-matrix animate-pulse" />
              <span className="text-zinc-400">VITE v8.0_ACTIVE</span>
            </div>
          </div>

          {/* Terminal Output Terminal */}
          <div 
            ref={terminalContainerRef}
            className="flex-1 p-5 bg-zinc-950/30 overflow-y-auto font-mono text-[11px] leading-relaxed text-zinc-400 space-y-1.5 scrollbar-thin"
          >
            {logs.map((log, index) => {
              let textClass = 'text-zinc-400';
              if (log.startsWith('[OK]')) textClass = 'text-matrix';
              else if (log.startsWith('[WRN]')) textClass = 'text-amber-400';
              else if (log.startsWith('[ERR]')) textClass = 'text-rose-500';

              return (
                <div key={index} className="flex items-start">
                  <span className="text-zinc-600 select-none mr-2 font-bold">{index + 1}.</span>
                  <span className={textClass}>{log}</span>
                </div>
              );
            })}
          </div>

          {/* Terminal Status bar footer */}
          <div className="bg-zinc-950/80 px-4 py-2 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-500 tracking-wider">
            <div>MODE: COMPILER // STATE: ACTIVE</div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-matrix rounded-full animate-ping" />
              <span className="text-matrix">ONLINE</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
