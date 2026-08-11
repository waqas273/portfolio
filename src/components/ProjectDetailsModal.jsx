import React, { useState, useEffect } from 'react';
import { Terminal, X, ChevronLeft, ChevronRight, ArrowUpRight, Code, Cpu, Shield, Layers, Pause, Play, CheckCircle2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl overflow-y-auto font-sans text-zinc-300 transition-all duration-300 flex flex-col">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 border-b border-zinc-800/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xl backdrop-blur-md">
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_#00ff66]" />
          <span className="text-white font-bold tracking-wider uppercase">
            SPECIFICATION_VIEWER // {project.fileName || 'module.js'}
          </span>
          <span className="hidden sm:inline px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-matrix text-[10px]">
            {project.category || 'Full-Stack'}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="group px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-matrix hover:bg-matrix/10 transition-all duration-300 flex items-center space-x-2 font-mono text-xs select-none"
        >
          <span>← BACK TO PROJECTS</span>
          <span className="hidden sm:inline text-[9px] text-zinc-500 group-hover:text-matrix">[ESC]</span>
        </button>
      </header>

      {/* Main Details Container */}
      <main className="container mx-auto px-4 sm:px-8 py-8 max-w-6xl flex-1 flex flex-col space-y-8">
        
        {/* Project Header Info */}
        <div className="space-y-2 border-l-2 border-matrix pl-4 py-1">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-matrix">
            <span>// SYSTEM_SPECIFICATIONS</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 uppercase tracking-widest">{project.category} MODULE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {project.title}
          </h1>
        </div>

        {/* Grid Layout: Left Column = Carousel & Page Explanations, Right Column = Specs & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Carousel & Page Explanations (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Carousel IDE Window Card */}
            <div className="glass-hud rounded-lg border border-zinc-800/80 shadow-2xl overflow-hidden">
              
              {/* Window Bar Header */}
              <div className="bg-zinc-950/90 px-4 py-2 border-b border-zinc-800/80 flex items-center justify-between font-mono text-[10px] select-none">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                  <span className="w-2 h-2 rounded-full bg-matrix/70" />
                  <span className="ml-2 text-zinc-400 font-semibold">// INTERFACE_SCREENSHOTS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-zinc-500 font-mono">
                    SCREENSHOT [{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                  </span>
                  {slides.length > 1 && (
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono flex items-center space-x-1 ${
                      isAutoPlaying ? 'bg-matrix/10 text-matrix border border-matrix/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isAutoPlaying ? <Play className="w-2 h-2" /> : <Pause className="w-2 h-2" />}
                      <span>{isAutoPlaying ? 'AUTO-SLIDING' : 'PAUSED'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Viewport Box (Mouse Enter Pauses Auto-slide) */}
              <div 
                className="relative h-64 sm:h-96 bg-zinc-950/90 overflow-hidden group select-none flex items-center justify-center"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <img
                  key={currentSlide.url + currentIndex}
                  src={currentSlide.url}
                  alt={`Screenshot ${currentIndex + 1}`}
                  className="w-full h-full object-contain transition-all duration-500 animate-fadeIn"
                />

                {/* Left/Right Navigation Arrows */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-xl"
                      title="Previous Screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-matrix hover:border-matrix hover:scale-110 transition-all opacity-80 group-hover:opacity-100 shadow-xl"
                      title="Next Screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Slide Indicators Dots Bar */}
                {slides.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-zinc-950/80 px-3 py-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'w-5 bg-matrix shadow-[0_0_8px_#00ff66]' : 'w-1.5 bg-zinc-700 hover:bg-zinc-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Page-Specific Explanation Panel */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-5 space-y-2 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-900 pb-2">
                <span className="text-matrix uppercase tracking-wider font-semibold flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>// PAGE_EXPLANATION [FEATURE #{currentIndex + 1}]</span>
                </span>
                <span className="text-zinc-500 text-[10px]">
                  PAGE {currentIndex + 1} OF {slides.length}
                </span>
              </div>
              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-matrix/50 pt-1">
                {currentSlide.caption || currentSlide.explanation || 'No page explanation provided for this section.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Project Specs, Stack, Features & Action Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Overview / Detailed Narrative Box */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-6 space-y-4 shadow-xl">
              <span className="font-mono text-xs text-cyber uppercase tracking-wider block font-semibold">
                // EXECUTIVE_SUMMARY
              </span>
              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Code Box */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-4 space-y-2 shadow-xl font-mono text-xs">
              <span className="text-zinc-500 text-[10px] block font-semibold uppercase">// ARCHITECTURE_STACK</span>
              <div className="bg-zinc-950 p-3 rounded border border-zinc-900 text-cyber/90 overflow-x-auto whitespace-nowrap">
                <span className="text-electric font-semibold">const</span>{' '}
                <span className="text-white">techStack</span>{' '}
                <span className="text-cyber">=</span>{' '}
                <span className="text-cyber">[</span>
                <div className="pl-4 py-1 space-y-0.5">
                  {project.techStack?.map((tech, i) => (
                    <div key={tech}>
                      <span className="text-matrix">'{tech}'</span>
                      {i < project.techStack.length - 1 && <span className="text-zinc-500">,</span>}
                    </div>
                  ))}
                </div>
                <span className="text-cyber">]</span>
                <span className="text-zinc-400">;</span>
              </div>
            </div>

            {/* Key Features List (If present) */}
            {project.features && project.features.length > 0 && (
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-5 space-y-3 shadow-xl">
                <span className="font-mono text-xs text-matrix uppercase tracking-wider block font-semibold">
                  // CORE_CAPABILITIES
                </span>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-matrix shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Live Demo Button (Primary) */}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-md bg-matrix/10 border border-matrix text-matrix font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-matrix hover:text-obsidian transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] active:scale-95"
                >
                  <span>LAUNCH LIVE DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {/* View Code GitHub Button (Optional) */}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all duration-300 active:scale-95"
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
