import React, { useState, useEffect } from 'react';
import { Terminal, X, ChevronLeft, ChevronRight, ArrowUpRight, Code, Cpu, Shield, Layers, Pause, Play, CheckCircle2, Monitor, ExternalLink, Sparkles, Check } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Normalize gallery slides
  const slides = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [{ url: project.image, caption: project.description || 'Main System Interface' }];

  // Keyboard shortcut for closing modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Auto-sliding interval timer (4 seconds)
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div className="fixed inset-0 z-[9999] bg-obsidian/95 backdrop-blur-2xl overflow-y-auto font-sans text-zinc-300 flex flex-col">
      
      {/* 1. TOP FLOATING STUDIO HEADER */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl backdrop-blur-md">
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-matrix animate-pulse shadow-[0_0_10px_#00ff66]" />
          <span className="text-white font-bold tracking-wider uppercase">
            SPECIFICATION_VIEWER // {project.fileName || 'module.js'}
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-matrix/10 border border-matrix/30 text-matrix text-[10px] font-semibold">
            {project.category || 'Full-Stack'}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="group px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-matrix hover:bg-matrix/10 transition-all duration-300 flex items-center space-x-2 font-mono text-xs select-none shadow-lg active:scale-95"
        >
          <span className="font-bold">← BACK TO PROJECTS</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-950 text-[9px] text-zinc-500 group-hover:text-matrix font-mono">[ESC]</span>
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col space-y-6">
        
        {/* 2. PROJECT HERO TITLE & TOP ACTION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-matrix">
              <span className="flex items-center space-x-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyber" />
                <span>// PROJECT_SPECIFICATIONS_STUDIO</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400 uppercase tracking-widest">{project.category} MODULE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {project.title}
            </h1>
          </div>

          {/* Quick Header CTAs */}
          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-matrix text-obsidian font-extrabold uppercase tracking-wider flex items-center space-x-2 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] active:scale-95"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold uppercase tracking-wider flex items-center space-x-2 hover:bg-zinc-800 hover:text-white transition-all"
              >
                <Code className="w-4 h-4 text-cyber" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        {/* 3. TOP SECTION: CAROUSEL (LEFT 7 COLS) & CORE CAPABILITIES (RIGHT 5 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Compact Screenshot Viewport & Thumbnails (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-hud rounded-xl border border-zinc-800/90 shadow-2xl overflow-hidden flex flex-col bg-zinc-950/80">
              
              {/* Header Bar */}
              <div className="bg-zinc-950/95 px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between font-mono text-xs select-none">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-matrix/80" />
                  <span className="ml-2 text-zinc-300 font-bold uppercase tracking-wider">// INTERFACE_SCREENSHOTS</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-zinc-400 font-mono font-bold text-xs">
                    [{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                  </span>
                  {slides.length > 1 && (
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono flex items-center space-x-1 font-bold ${
                      isAutoPlaying ? 'bg-matrix/10 text-matrix border border-matrix/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isAutoPlaying ? <Play className="w-2.5 h-2.5 animate-pulse" /> : <Pause className="w-2.5 h-2.5" />}
                      <span>{isAutoPlaying ? 'AUTO-SLIDING 4s' : 'PAUSED'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Compact High-Definition Viewport */}
              <div 
                className="relative h-[280px] sm:h-[360px] lg:h-[400px] bg-zinc-950 overflow-hidden group select-none flex items-center justify-center p-2"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <img
                  key={currentSlide.url + currentIndex}
                  src={currentSlide.url}
                  alt={`Screenshot ${currentIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg transition-all duration-500 animate-fadeIn"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/20 pointer-events-none" />

                {/* Navigation Chevrons */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-200 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-2xl backdrop-blur-md"
                      title="Previous Screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-200 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-2xl backdrop-blur-md"
                      title="Next Screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Interactive Thumbnail Reel */}
              {slides.length > 1 && (
                <div className="bg-zinc-950/95 border-t border-zinc-800/80 p-2.5 flex items-center justify-center space-x-2 overflow-x-auto scrollbar-none">
                  {slides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-16 h-11 rounded overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                        currentIndex === idx 
                          ? 'border-matrix shadow-[0_0_12px_rgba(0,255,102,0.4)] scale-105 opacity-100 ring-2 ring-matrix/30' 
                          : 'border-zinc-850 opacity-50 hover:opacity-100 hover:border-zinc-600'
                      }`}
                    >
                      <img src={slide.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white bg-zinc-950/90 px-1 rounded font-bold">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Active Page Caption Banner */}
            <div className="glass-hud rounded-xl border border-zinc-850 p-4 shadow-xl bg-zinc-950/70 flex items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-2 overflow-hidden">
                <Layers className="w-4 h-4 text-matrix shrink-0" />
                <span className="text-matrix font-bold uppercase shrink-0">// CAPTION:</span>
                <span className="text-zinc-300 font-sans text-xs sm:text-sm truncate">
                  {currentSlide.caption || currentSlide.explanation || 'Main System Interface Overview'}
                </span>
              </div>
              <span className="text-zinc-500 text-[10px] shrink-0 font-mono">
                {currentIndex + 1}/{slides.length}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE CAPABILITIES (5 Cols) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <div className="glass-hud rounded-xl border border-zinc-800/90 p-6 shadow-xl bg-zinc-950/50 flex-1 flex flex-col justify-between hover:border-zinc-700 transition-all space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold text-electric uppercase tracking-wider">
                    <Shield className="w-4 h-4 text-electric" />
                    <span>CORE_CAPABILITIES</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-electric animate-pulse" />
                </div>

                {project.features && project.features.length > 0 ? (
                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-200">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-2 rounded bg-zinc-900/40 border border-zinc-850/50">
                        <Check className="w-4 h-4 text-matrix shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-zinc-500 font-mono text-xs italic p-4 text-center">
                    Full-Stack Modular Architecture • High performance responsive UI • Real-time database integration.
                  </div>
                )}
              </div>

              <div className="font-mono text-[10px] text-zinc-500 border-t border-zinc-900/80 pt-3 flex items-center justify-between">
                <span>MODULE SPECIFICATIONS</span>
                <span className="text-matrix font-bold">✓ VERIFIED</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4. BOTTOM SECTION: EXECUTIVE SUMMARY & TECH STACK (2 COLUMNS) */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyber border-b border-zinc-900 pb-2">
            <Cpu className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider">// ARCHITECTURE OVERVIEW & TECH STACK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* EXECUTIVE SUMMARY CARD */}
            <div className="glass-hud rounded-xl border border-zinc-800/90 p-6 space-y-4 shadow-xl bg-zinc-950/50 flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold text-cyber uppercase">
                    <Monitor className="w-4 h-4" />
                    <span>EXECUTIVE_SUMMARY</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyber" />
                </div>
                <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>
              <div className="font-mono text-[10px] text-zinc-600 border-t border-zinc-900/80 pt-3">
                STATUS: DEPLOYED & VERIFIED
              </div>
            </div>

            {/* ARCHITECTURE TECH STACK BADGES CARD */}
            <div className="glass-hud rounded-xl border border-zinc-800/90 p-6 space-y-4 shadow-xl bg-zinc-950/50 flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold text-matrix uppercase">
                    <Cpu className="w-4 h-4" />
                    <span>TECH_STACK_BADGES</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-matrix" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                  {project.techStack?.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-200 font-semibold flex items-center space-x-1.5 shadow-sm hover:border-matrix/50 transition-colors"
                    >
                      <Code className="w-3.5 h-3.5 text-matrix" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-[10px] text-zinc-600 border-t border-zinc-900/80 pt-3">
                TOTAL: {project.techStack?.length || 0} FRAMEWORKS & TOOLS
              </div>
            </div>

          </div>
        </section>

        {/* 5. BOTTOM ACTION DOCK */}
        <footer className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs pb-6">
          <div className="flex items-center space-x-2 text-zinc-500 text-xs">
            <span className="w-2 h-2 rounded-full bg-matrix" />
            <span>PROJECT NODE: <strong className="text-zinc-200">#01 // DEPLOYED & VERIFIED</strong></span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-matrix text-obsidian font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] active:scale-95"
              >
                <span>LAUNCH LIVE DEMO APPLICATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
              >
                <Code className="w-4 h-4 text-cyber" />
                <span>VIEW CODE</span>
              </a>
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}
