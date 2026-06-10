import React, { useState, useEffect, useRef } from 'react';

const EDUCATION_DATA = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institution: 'GIFT University, Gujranwala',
    period: '2022 – 2026',
    accentColor: 'matrix',
    details: [
      'Specializing in Full-Stack Web Engineering and Machine Learning frameworks.',
      'Core Coursework: Algorithms & Data Structures, Object-Oriented Programming, Database Management Systems, and Artificial Intelligence.',
      'Designing intelligent systems, vector databases, and real-time client-server communication channels.'
    ],
    badge: 'Higher Education'
  },
  {
    id: 'edu-2',
    degree: 'Intermediate (ICS // Computer Science)',
    institution: 'Govt Faqeer Muhammad Faqeer (FMF) Post Graduate College, Peoples Colony',
    period: '2020 – 2022',
    accentColor: 'cyber',
    details: [
      'Focused on Computer Science, Mathematics, and Physics foundation parameters.',
      'Built core understandings of logic gates, software scripting logic, and algebraic computations.',
      'Developed initial programming interest and designed basic desktop console utilities.'
    ],
    badge: 'College'
  },
  {
    id: 'edu-3',
    degree: 'Matriculation (Science)',
    institution: 'Govt High School Danser',
    period: '2018 – 2020',
    accentColor: 'electric',
    details: [
      'Core Subjects: Computer Science, Mathematics, Physics, and Chemistry.',
      'Excelled in mathematics, logic formulations, and analytical science experiments.'
    ],
    badge: 'High School'
  }
];

function EduNode({ edu, index }) {
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

  const currentTheme = themeColors[edu.accentColor] || themeColors.matrix;

  return (
    <div 
      ref={elementRef}
      className="relative pl-8 sm:pl-12 pb-10 last:pb-0 group"
    >
      {/* Visual Circle Dot */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2 z-10">
        <div 
          className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-700 bg-zinc-950 flex items-center justify-center ${
            active 
              ? `${currentTheme.text} border-current scale-110` 
              : 'border-zinc-800 text-zinc-650'
          }`}
          style={{
            boxShadow: active ? `0 0 10px ${currentTheme.glow}` : 'none'
          }}
        />
      </div>

      {/* Card Wrapper */}
      <div className={`glass-hud rounded-lg border p-5 transition-all duration-500 bg-zinc-950/20 ${
        active ? 'border-zinc-800/80 shadow-md' : 'border-zinc-900/60'
      } ${currentTheme.border}`}>
        
        {/* Header info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <div className="text-left">
            <h3 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-white transition-colors duration-300">
              {edu.degree}
            </h3>
            <p className="text-zinc-500 text-xs font-mono mt-0.5">
              {edu.institution}
            </p>
          </div>
          <span className="font-mono text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full self-start select-none">
            {edu.period}
          </span>
        </div>

        {/* Details Bullets */}
        <ul className="space-y-1.5 text-zinc-400 text-xs leading-relaxed list-inside list-disc">
          {edu.details.map((detail, idx) => (
            <li key={idx} className="hover:text-zinc-200 transition-colors">
              {detail}
            </li>
          ))}
        </ul>

        {/* Tech/Education micro badge */}
        <div className="mt-4 flex select-none">
          <span className={`text-[8px] font-mono font-semibold px-2 py-0.5 rounded border ${currentTheme.badge}`}>
            {edu.badge}
          </span>
        </div>

      </div>
    </div>
  );
}

export default function Education() {
  return (
    <div className="relative max-w-xl mx-auto py-6">
      {/* Vertical tracking line */}
      <div className="absolute left-0 top-10 bottom-4 w-[1px] bg-zinc-850" />
      
      <div className="space-y-0">
        {EDUCATION_DATA.map((edu, index) => (
          <EduNode key={edu.id} edu={edu} index={index} />
        ))}
      </div>
    </div>
  );
}
