import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

const MILESTONES = [
  {
    id: 'milestone-1',
    title: 'Full-Stack & AI Engineer',
    company: 'Freelance Solutions',
    period: '2025 - PRESENT',
    accent: 'matrix',
    details: [
      'Architecting RAG-based search pipelines with vector embeddings and custom context extraction.',
      'Developing AI-driven web apps using OpenAI and Gemini APIs with function-calling integrations.',
      'Building high-performance client dashboards and API platforms using the MERN stack and Firebase.'
    ],
    tech: ['React.js', 'Node.js', 'Firebase', 'MongoDB', 'RAG', 'LLMs']
  },
  {
    id: 'milestone-2',
    title: 'Full-Stack Developer',
    company: 'Pixel & Code Studio',
    period: '2023 - 2025',
    accent: 'cyber',
    details: [
      'Configured secure serverless backends and real-time database feeds using Firebase Firestore.',
      'Optimized MongoDB transaction speeds and wrote clean RESTful APIs in Express.js.',
      'Trained text classification ML models and built automated categorization workflows.'
    ],
    tech: ['React.js', 'Express.js', 'Firebase Auth', 'MongoDB', 'Machine Learning']
  },
  {
    id: 'milestone-3',
    title: 'Associate Web Developer',
    company: 'DevCore Technologies',
    period: '2022 - 2023',
    accent: 'electric',
    details: [
      'Scaffolded custom dashboard controls and interactive data tables using React.js and Tailwind CSS.',
      'Integrated backend Node.js endpoints with secure JWT authentication layers.',
      'Refactored legacy UI components, boosting page speed scores by 40%.'
    ],
    tech: ['React.js', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Javascript']
  }
];

function TimelineNode({ milestone, index }) {
  const [active, setActive] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const themeColors = {
    matrix: {
      text: 'text-matrix',
      border: 'hover:border-matrix/30 hover:shadow-[0_0_18px_rgba(0,255,102,0.1)]',
      glow: 'rgba(0, 255, 102, 0.3)',
      badge: 'bg-matrix/10 text-matrix border-matrix/20'
    },
    cyber: {
      text: 'text-cyber',
      border: 'hover:border-cyber/30 hover:shadow-[0_0_18px_rgba(0,255,255,0.1)]',
      glow: 'rgba(0, 255, 255, 0.3)',
      badge: 'bg-cyber/10 text-cyber border-cyber/20'
    },
    electric: {
      text: 'text-electric',
      border: 'hover:border-electric/30 hover:shadow-[0_0_18px_rgba(139,92,246,0.1)]',
      glow: 'rgba(139, 92, 246, 0.3)',
      badge: 'bg-electric/10 text-electric border-electric/20'
    }
  };

  const currentTheme = themeColors[milestone.accent] || themeColors.matrix;

  return (
    <div 
      ref={elementRef}
      className="relative pl-8 sm:pl-12 pb-10 last:pb-0 group"
    >
      {/* Circle dot on vertical line */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2 z-10">
        <div 
          className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-700 bg-zinc-950 ${
            active 
              ? `${currentTheme.text} border-current scale-110` 
              : 'border-zinc-800 text-zinc-650'
          }`}
          style={{
            boxShadow: active ? `0 0 10px ${currentTheme.glow}` : 'none'
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className={`glass-hud rounded-lg border p-5 transition-all duration-500 bg-zinc-950/20 ${
        active ? 'border-zinc-800/80 shadow-md' : 'border-zinc-900/60'
      } ${currentTheme.border}`}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-white transition-colors duration-300">
              {milestone.title}
            </h3>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5 select-none">
              {milestone.company}
            </p>
          </div>
          <span className="font-mono text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full self-start select-none">
            {milestone.period}
          </span>
        </div>

        {/* Short bullet details */}
        <ul className="space-y-1.5 text-zinc-400 text-xs leading-relaxed list-inside list-disc">
          {milestone.details.map((detail, dIdx) => (
            <li key={dIdx} className="hover:text-zinc-200 transition-colors">
              {detail}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 select-none">
          {milestone.tech.map((t, tIdx) => (
            <span key={tIdx} className={`text-[8px] font-mono font-semibold px-2 py-0.5 rounded border ${currentTheme.badge}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GitTimeline() {
  return (
    <div className="relative max-w-xl mx-auto py-8">
      {/* Vertical tracking line */}
      <div className="absolute left-0 top-10 bottom-4 w-[1px] bg-zinc-850" />
      
      <div className="space-y-0">
        {MILESTONES.map((mst, index) => (
          <TimelineNode key={mst.id} milestone={mst} index={index} />
        ))}
      </div>

      {/* Verification badge */}
      <div className="flex justify-start pl-8 sm:pl-12 mt-8 select-none">
        <div className="glass-hud rounded border border-zinc-900 bg-zinc-950/40 px-3 py-1.5 flex items-center space-x-2 font-mono text-[9px] text-matrix">
          <ShieldCheck className="w-3.5 h-3.5 text-matrix" />
          <span>EXPERIENCE: VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
