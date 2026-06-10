import React, { useState, useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const EDUCATION_DATA = [
  {
    id: 'edu-1',
    degree: 'BS in Computer Science',
    institution: 'GIFT University, Gujranwala',
    period: '2022 – 2026',
    accentColor: 'matrix',
    accentGlow: 'rgba(0, 255, 102, 0.1)',
    badge: 'University',
    details: [
      'Specializing in Web Engineering and Machine Learning integrations.',
      'Core: OOP, Algorithms, Database Management, and AI workflows.',
      'Building interactive MERN apps and serverless Firebase databases.'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Intermediate (ICS)',
    institution: 'Govt FMF Post Graduate College',
    period: '2020 – 2022',
    accentColor: 'cyber',
    accentGlow: 'rgba(0, 255, 255, 0.1)',
    badge: 'College // peoples colony',
    details: [
      'Core focus on Computer Science, Mathematics, and Physics.',
      'Gained logic gates insights, binary mathematics, and software scripting.',
      'Graduated with strong Pre-Engineering/ICS credentials.'
    ]
  },
  {
    id: 'edu-3',
    degree: 'Matriculation (Science)',
    institution: 'Govt High School Danser',
    period: '2018 – 2020',
    accentColor: 'electric',
    accentGlow: 'rgba(139, 92, 246, 0.1)',
    badge: 'High School',
    details: [
      'Focus areas: Mathematics, Physics, Chemistry, and Computer Science.',
      'Built foundations in algebra formulations and science metrics.'
    ]
  }
];

function EduCard({ edu }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const hoverBorders = {
    matrix: 'hover:border-matrix/30 hover:shadow-[0_0_22px_rgba(0,255,102,0.15)]',
    cyber: 'hover:border-cyber/30 hover:shadow-[0_0_22px_rgba(0,255,255,0.15)]',
    electric: 'hover:border-electric/30 hover:shadow-[0_0_22px_rgba(139,92,246,0.15)]',
  };

  const textColors = {
    matrix: 'text-matrix',
    cyber: 'text-cyber',
    electric: 'text-electric',
  };

  const bgColors = {
    matrix: 'bg-matrix/10',
    cyber: 'bg-cyber/10',
    electric: 'bg-electric/10',
  };

  const bgGlowColor = hoverBorders[edu.accentColor] || '';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-lg glass-hud border border-zinc-800 p-5 flex flex-col justify-between shadow-xl transition-all duration-500 group min-h-[300px] ${bgGlowColor}`}
    >
      {/* Spotlight cursor glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, ${edu.accentGlow}, transparent 80%)`
        }}
      />

      {/* Header controls bar */}
      <div className="flex justify-between items-center z-10 mb-3 pb-2.5 border-b border-zinc-900 select-none">
        <div className="flex items-center space-x-1.5">
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/50" />
            <span className="w-2 h-2 rounded-full bg-amber-500/50" />
            <span className={`w-2 h-2 rounded-full ${bgColors[edu.accentColor]} border border-zinc-850`} />
          </div>
          <span className={`text-[8px] font-mono tracking-wider font-semibold pl-2 uppercase ${bgColors[edu.accentColor]} px-2 py-0.5 rounded ${textColors[edu.accentColor]}`}>
            {edu.badge}
          </span>
        </div>
        <div className="text-[9px] font-mono text-zinc-550 flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{edu.period}</span>
        </div>
      </div>

      {/* Main Degree details */}
      <div className="z-10 flex-1 flex flex-col justify-start text-left mt-1">
        <h3 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-white transition-colors duration-300">
          {edu.degree}
        </h3>
        <p className="text-zinc-500 text-xs font-mono mt-0.5 mb-3">
          {edu.institution}
        </p>

        {/* Short bullets */}
        <ul className="space-y-1.5 text-zinc-400 text-xs leading-relaxed pl-1.5 list-inside list-disc">
          {edu.details.map((detail, idx) => (
            <li key={idx} className="hover:text-zinc-200 transition-colors">
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer tags */}
      <div className="z-10 flex justify-between items-center text-[9px] font-mono text-zinc-550 mt-4 border-t border-zinc-900 pt-2.5 select-none">
        <div>EDU_NODE // STATUS: OK</div>
        <div className={`flex items-center space-x-1 ${textColors[edu.accentColor]} font-semibold`}>
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="uppercase text-[8px]">degree_locked</span>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {EDUCATION_DATA.map((edu) => (
        <EduCard key={edu.id} edu={edu} />
      ))}
    </div>
  );
}
