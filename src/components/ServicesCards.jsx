import React, { useState, useRef } from 'react';
import { Cpu, Database, Terminal } from 'lucide-react';

const SERVICES = [
  {
    id: 'service-1',
    title: 'Full-Stack MERN Development',
    description: 'Engineering high-performance web applications using MongoDB, Express, React, and Node.js. Building clean APIs, responsive frontends, and scalable client-server architectures.',
    glowColor: 'rgba(0, 255, 102, 0.15)', // Neon Matrix Green
    borderColor: 'group-hover:border-matrix/40',
    icon: <Cpu className="w-6 h-6 text-matrix" />,
    badge: 'const type = "MERN_STACK";'
  },
  {
    id: 'service-2',
    title: 'Firebase Cloud Solutions',
    description: 'Architecting secure serverless backends and real-time database structures. Integrating Firebase Auth, Firestore real-time subscriptions, cloud storage, and hosting configurations.',
    glowColor: 'rgba(0, 255, 255, 0.15)', // Cyber Cyan
    borderColor: 'group-hover:border-cyber/40',
    icon: <Database className="w-6 h-6 text-cyber" />,
    badge: 'const type = "FIREBASE_CLOUD";'
  },
  {
    id: 'service-3',
    title: 'AI & Machine Learning Systems',
    description: 'Deploying Machine Learning models and building RAG-based pipelines with LLMs. Automating data workflows and connecting intelligent APIs to modern applications.',
    glowColor: 'rgba(139, 92, 246, 0.15)', // Electric Violet
    borderColor: 'group-hover:border-electric/40',
    icon: <Terminal className="w-6 h-6 text-electric" />,
    badge: 'const type = "AI_ML_PIPELINE";'
  }
];

function ServiceCard({ service }) {
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-lg glass-hud border border-zinc-850 p-6 flex flex-col justify-between h-[230px] shadow-lg transition-all duration-500 overflow-hidden group ${service.borderColor}`}
    >
      {/* Position-tracking radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, ${service.glowColor}, transparent 80%)`
        }}
      />

      {/* Card Header & Icon */}
      <div className="z-10 flex items-start justify-between">
        <div className="p-3 bg-zinc-950/80 rounded-md border border-zinc-900 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <span className="font-mono text-[9px] text-zinc-500 bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-900">
          {service.badge}
        </span>
      </div>

      {/* Card Body Title & Text */}
      <div className="z-10 space-y-2 mt-4">
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-4">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {SERVICES.map((srv) => (
        <ServiceCard key={srv.id} service={srv} />
      ))}
    </div>
  );
}
