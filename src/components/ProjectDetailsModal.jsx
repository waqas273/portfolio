import React, { useState, useEffect } from 'react';
import { Terminal, X, ChevronLeft, ChevronRight, ArrowUpRight, Code, Cpu, Shield, Layers, Pause, Play, CheckCircle2, Monitor, ExternalLink, Sparkles } from 'lucide-react';

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
      
      {/* Top Floating IDE Header Bar */}
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

        {/* Close Action Button */}
        <button
          onClick={onClose}
          className="group px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-matrix hover:bg-matrix/10 transition-all duration-300 flex items-center space-x-2 font-mono text-xs select-none shadow-lg active:scale-95"
        >
          <span className="font-bold">← BACK TO PROJECTS</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-950 text-[9px] text-zinc-500 group-hover:text-matrix font-mono">[ESC]</span>
        </button>
      </header>

      {/* Main Studio Viewport Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col space-y-6">
        
        {/* Project Title & Category Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-matrix">
              <span className="flex items-center space-x-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>// PROJECT_SPECIFICATIONS_STUDIO</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400 uppercase tracking-widest">{project.category} MODULE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
              {project.title}
            </h1>
          </div>

          {/* Quick Header CTA Buttons */}
          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-matrix/10 border border-matrix/50 text-matrix font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-matrix hover:text-obsidian transition-all shadow-[0_0_12px_rgba(0,255,102,0.15)]"
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
                className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-zinc-800 hover:text-white transition-all"
              >
                <Code className="w-4 h-4 text-cyber" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Expanded Screenshot Carousel & Dynamic Page Explanations (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Carousel Container Box */}
            <div className="glass-hud rounded-xl border border-zinc-800/80 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Window Header */}
              <div className="bg-zinc-950/95 px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between font-mono text-[10px] select-none">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-matrix/80" />
                  <span className="ml-2 text-zinc-400 font-bold uppercase">// INTERFACE_SCREENSHOTS_VIEWPORT</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-zinc-400 font-mono font-bold">
                    [{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                  </span>
                  {slides.length > 1 && (
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono flex items-center space-x-1 font-bold ${
                      isAutoPlaying ? 'bg-matrix/10 text-matrix border border-matrix/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isAutoPlaying ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
                      <span>{isAutoPlaying ? 'AUTO-SLIDING 4s' : 'PAUSED ON HOVER'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* High-Definition Image Viewport */}
              <div 
                className="relative h-[320px] sm:h-[440px] lg:h-[480px] bg-zinc-950 overflow-hidden group select-none flex items-center justify-center p-2"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <img
                  key={currentSlide.url + currentIndex}
                  src={currentSlide.url}
                  alt={`Screenshot ${currentIndex + 1}`}
                  className="w-full h-full object-contain rounded transition-all duration-500 animate-fadeIn"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Manual Navigation Chevrons */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/85 border border-zinc-800 text-zinc-300 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-2xl backdrop-blur-md"
                      title="Previous Screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/85 border border-zinc-800 text-zinc-300 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-2xl backdrop-blur-md"
                      title="Next Screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Interactive Thumbnail Strip Reel */}
              {slides.length > 1 && (
                <div className="bg-zinc-950/90 border-t border-zinc-800/80 p-3 flex items-center justify-center space-x-2.5 overflow-x-auto scrollbar-none">
                  {slides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-16 h-11 rounded overflow-hidden border transition-all duration-300 shrink-0 ${
                        currentIndex === idx 
                          ? 'border-matrix shadow-[0_0_12px_rgba(0,255,102,0.4)] scale-105 opacity-100' 
                          : 'border-zinc-800 opacity-50 hover:opacity-100 hover:border-zinc-600'
                      }`}
                    >
                      <img src={slide.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white bg-zinc-950/80 px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Dynamic Page-Specific Explanation HUD Panel */}
            <div className="glass-hud rounded-xl border border-zinc-800/80 p-5 space-y-3 shadow-xl relative overflow-hidden bg-zinc-950/70">
              <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-900 pb-2.5">
                <span className="text-matrix uppercase tracking-wider font-bold flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>// PAGE_EXPLANATION [FEATURE #{currentIndex + 1}]</span>
                </span>
                <span className="text-zinc-500 text-[10px] font-mono">
                  PAGE {currentIndex + 1} OF {slides.length}
                </span>
              </div>
              <p className="text-zinc-200 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap pl-3.5 border-l-2 border-matrix/60 pt-0.5">
                {currentSlide.caption || currentSlide.explanation || 'No page explanation provided for this screenshot.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Executive Summary, Tech Stack, Features & Action CTA Dock (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Executive Summary Card */}
            <div className="glass-hud rounded-xl border border-zinc-800/80 p-6 space-y-3.5 shadow-xl bg-zinc-950/50">
              <span className="font-mono text-xs text-cyber uppercase tracking-wider block font-bold flex items-center space-x-1.5">
                <Monitor className="w-4 h-4 text-cyber" />
                <span>// EXECUTIVE_SUMMARY</span>
              </span>
              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Architecture Tech Stack Code Box */}
            <div className="glass-hud rounded-xl border border-zinc-800/80 p-5 space-y-2.5 shadow-xl font-mono text-xs bg-zinc-950/70">
              <span className="text-zinc-400 text-[11px] block font-bold uppercase tracking-wider">
                // ARCHITECTURE_STACK
              </span>
              <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-900 text-cyber/90 overflow-x-auto whitespace-nowrap">
                <span className="text-electric font-bold">const</span>{' '}
                <span className="text-white font-bold">techStack</span>{' '}
                <span className="text-cyber font-bold">=</span>{' '}
                <span className="text-cyber">[</span>
                <div className="pl-4 py-1.5 space-y-1">
                  {project.techStack?.map((tech, i) => (
                    <div key={tech}>
                      <span className="text-matrix font-semibold">'{tech}'</span>
                      {i < project.techStack.length - 1 && <span className="text-zinc-500">,</span>}
                    </div>
                  ))}
                </div>
                <span className="text-cyber font-bold">]</span>
                <span className="text-zinc-400 font-bold">;</span>
              </div>
            </div>

            {/* Core Capabilities Checklist */}
            {project.features && project.features.length > 0 && (
              <div className="glass-hud rounded-xl border border-zinc-800/80 p-5 space-y-3 shadow-xl bg-zinc-950/50">
                <span className="font-mono text-xs text-matrix uppercase tracking-wider block font-bold">
                  // CORE_CAPABILITIES
                </span>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-300">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-matrix shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action CTA Dock */}
            <div className="space-y-3 pt-2">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-lg bg-matrix text-obsidian font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.3)] active:scale-95"
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
                  className="w-full py-3.5 px-5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all duration-300 active:scale-95"
                >
                  <Code className="w-4 h-4 text-cyber" />
                  <span>VIEW REPOSITORY CODE</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
