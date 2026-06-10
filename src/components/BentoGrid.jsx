import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Cpu } from 'lucide-react';

const SKILLS_DATA = [
  {
    id: 'mern',
    title: 'MERN Full-Stack',
    subtitle: 'Traditional server-based web applications',
    icon: Cpu,
    accentColor: 'matrix',
    accentGlow: 'rgba(0, 255, 102, 0.1)',
    badge: 'MERN Stack',
    skills: [
      { name: 'React.js Client Library', percent: 95, badge: 'Expert' },
      { name: 'Node.js & Express APIs', percent: 94, badge: 'Expert' },
      { name: 'MongoDB Database Schemas', percent: 88, badge: 'Expert' }
    ]
  },
  {
    id: 'firebase',
    title: 'React + Firebase',
    subtitle: 'Scalable serverless cloud architectures',
    icon: Database,
    accentColor: 'cyber',
    accentGlow: 'rgba(0, 255, 255, 0.1)',
    badge: 'Serverless // Cloud',
    skills: [
      { name: 'React + Firebase SDK', percent: 93, badge: 'Expert' },
      { name: 'Firestore Real-time DB', percent: 92, badge: 'Expert' },
      { name: 'Firebase Auth & Security', percent: 90, badge: 'Advanced' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Intelligent Systems',
    subtitle: 'Machine Learning models and automated pipelines',
    icon: Terminal,
    accentColor: 'electric',
    accentGlow: 'rgba(139, 92, 246, 0.1)',
    badge: 'AI // Workflow',
    skills: [
      { name: 'Machine Learning (ML)', percent: 88, badge: 'Expert' },
      { name: 'RAG-Based Pipelines', percent: 90, badge: 'Expert' },
      { name: 'Git & Command Line CLI', percent: 85, badge: 'Advanced' }
    ]
  }
];

function SkillCard({ cardData }) {
  const { title, subtitle, icon: Icon, accentColor, accentGlow, badge, skills } = cardData;
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
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

  const bgGlowColor = hoverBorders[accentColor] || '';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-lg glass-hud border border-zinc-800 p-6 flex flex-col justify-between shadow-xl transition-all duration-500 group min-h-[350px] ${bgGlowColor}`}
    >
      {/* Spotlight hover effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${accentGlow}, transparent 80%)`
        }}
      />

      {/* Top Header tab bar */}
      <div className="flex justify-between items-center z-10 mb-4 pb-3 border-b border-zinc-900 select-none">
        <div className="flex items-center space-x-2">
          {/* Window control dots */}
          <div className="flex space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className={`w-2.5 h-2.5 rounded-full ${bgColors[accentColor]} border border-zinc-800`} />
          </div>
          <span className={`text-[9px] font-mono tracking-wider font-semibold pl-2 uppercase ${bgColors[accentColor]} px-2 py-0.5 rounded ${textColors[accentColor]}`}>
            {badge}
          </span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 flex items-center space-x-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-${accentColor} animate-pulse`} />
          <span className="uppercase text-[9px]">{accentColor}_online</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="z-10 mb-4 select-none">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 ${textColors[accentColor]}`} />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            {title}
          </h3>
        </div>
        <p className="text-[10px] text-zinc-500 font-sans mt-1">
          {subtitle}
        </p>
      </div>

      {/* Skills list */}
      <div className="z-10 flex-1 space-y-4 my-2">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1.5 group/skill">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-zinc-300 group-hover/skill:text-white transition-colors flex items-center space-x-1.5">
                <span className={`w-1 h-1 rounded-full bg-${accentColor}`} />
                <span>{skill.name}</span>
              </span>
              <div className="flex items-center space-x-2 select-none">
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 font-semibold group-hover/skill:border-zinc-700 transition-colors uppercase">
                  {skill.badge}
                </span>
                <span className={`font-mono font-bold text-[10px] ${textColors[accentColor]}`}>
                  {skill.percent}%
                </span>
              </div>
            </div>

            {/* Glowing Tip Progress Bar */}
            <div className="relative w-full py-1">
              <div className="w-full h-1.5 bg-zinc-900/60 dark:bg-zinc-900/40 rounded-full overflow-hidden border border-zinc-850">
                <div 
                  className={`h-full rounded-full transition-all duration-[1200ms] ease-out bg-${accentColor}`}
                  style={{ width: animated ? `${skill.percent}%` : '0%' }}
                />
              </div>
              {/* Glowing micro dot tracking progress tip */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-lg transition-all duration-[1200ms] ease-out pointer-events-none"
                style={{ 
                  left: animated ? `${skill.percent}%` : '0%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 6px #fff, 0 0 12px var(--color-${accentColor})`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Footer */}
      <div className="z-10 flex justify-between items-center text-[9px] font-mono text-zinc-550 mt-4 border-t border-zinc-900 pt-3 select-none">
        <div>SYS_STACK // MODULE: OK</div>
        <div className={`${textColors[accentColor]} uppercase font-bold tracking-widest text-[8px]`}>
          [ACTIVE_TELEMETRY]
        </div>
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {SKILLS_DATA.map((cardData) => (
        <SkillCard key={cardData.id} cardData={cardData} />
      ))}
    </div>
  );
}
