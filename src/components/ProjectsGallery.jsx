import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Terminal, Code, ArrowUpRight, FolderGit2, Loader2, AlertCircle } from 'lucide-react';

// Fallback high-fidelity local mock data in case Firestore is empty or connecting
const FALLBACK_PROJECTS = [
  {
    id: 'mock-1',
    title: 'Quantum Cyber Dashboard',
    description: 'High-performance developer tracking matrix linking Firestore telemetry streams with WebSockets for visual analytics.',
    techStack: ['React', 'Firebase', 'Tailwind', 'PostCSS'],
    liveLink: 'https://example.com/quantum',
    githubLink: 'https://github.com/example/quantum',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    category: 'Full-Stack',
    fileName: 'Dashboard.tsx'
  },
  {
    id: 'mock-2',
    title: 'Holographic Neural Engine',
    description: 'Offline-first client-side neural representation renderer constructed using Vite and raw shaders.',
    techStack: ['Vite', 'ThreeJS', 'GLSL', 'CSS3'],
    liveLink: 'https://example.com/neural',
    githubLink: 'https://github.com/example/neural',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    category: 'Frontend',
    fileName: 'NeuralEngine.js'
  },
  {
    id: 'mock-3',
    title: 'Secure Handshake Core API',
    description: 'Modular authentication clusters and transaction routing protocols securing database operations via Cloud Functions.',
    techStack: ['NodeJS', 'Express', 'Auth0', 'Firebase'],
    liveLink: 'https://example.com/api',
    githubLink: 'https://github.com/example/api',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    category: 'Full-Stack',
    fileName: 'ServerPort.go'
  }
];

// 3D-Tilt Card Subcomponent
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to element bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation degree (max 8 degrees tilt for premium structural physics)
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  // Format tech stack array as code declaration text
  const formatTechStackCode = (stack) => {
    return `const tech = [${stack.map(s => `'${s}'`).join(', ')}];`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative rounded-lg overflow-hidden glass-hud border transition-all duration-300 ${
        isHovered 
          ? 'border-matrix/50 shadow-[0_0_25px_rgba(0,255,102,0.12)]' 
          : 'border-zinc-850'
      } flex flex-col h-[400px] select-none`}
    >
      {/* Code Editor Tab Header */}
      <div className="bg-zinc-950/90 px-4 py-2 border-b border-zinc-900 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-matrix/80 shadow-[0_0_4px_#00ff66]" />
          <span className="text-zinc-400 font-semibold">{project.fileName || 'project.js'}</span>
        </div>
        <span className="text-zinc-600 uppercase tracking-widest">{project.category}</span>
      </div>

      {/* Project Banner Image */}
      <div className="h-40 relative overflow-hidden bg-zinc-950/80">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 transition-transform duration-500 hover:scale-110" 
        />
        {/* Glow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
      </div>

      {/* Card Content body */}
      <div className="flex-1 p-5 bg-zinc-950/30 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        <div className="space-y-4 mt-4">
          {/* Tech Stack Array Code Badges */}
          <div className="font-mono text-[10px] text-cyber/90 bg-zinc-900/60 p-2 rounded border border-zinc-900 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-electric font-semibold">const</span>{' '}
            <span className="text-white">stack</span>{' '}
            <span className="text-cyber">=</span>{' '}
            <span className="text-cyber">[</span>
            {project.techStack.map((tech, i) => (
              <React.Fragment key={tech}>
                <span className="text-matrix">'{tech}'</span>
                {i < project.techStack.length - 1 && <span className="text-zinc-500">, </span>}
              </React.Fragment>
            ))}
            <span className="text-cyber">]</span>
            <span className="text-zinc-400">;</span>
          </div>

          {/* Action Links */}
          <div className="flex justify-between items-center text-xs font-mono border-t border-zinc-900/60 pt-3">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-zinc-500 hover:text-white transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>View Code</span>
            </a>
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-matrix hover:text-white transition-colors"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Projects Gallery Component
export default function ProjectsGallery() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Category Filter State
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Full-Stack', 'Frontend'];

  // Firestore read hook
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Connect to 'projects' collection
        const colRef = collection(db, 'projects');
        const snapshot = await getDocs(colRef);
        
        if (snapshot.empty) {
          // If Firestore collection is empty, load our fallback data
          console.warn("Firestore 'projects' collection is empty. Utilizing fallback mock data.");
          setProjects(FALLBACK_PROJECTS);
          setFilteredProjects(FALLBACK_PROJECTS);
        } else {
          const list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(list);
          setFilteredProjects(list);
        }
        setError(null);
      } catch (err) {
        console.error("Firestore fetch error: ", err);
        // Fallback on error to ensure app runs perfectly
        setError("FIREBASE_CONNECTION_TIMEOUT // LOADING LOCAL FALLBACK");
        setProjects(FALLBACK_PROJECTS);
        setFilteredProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter selection handler
  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    if (cat === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === cat));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Category Filter and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        
        {/* Animated Filter Toggles */}
        <div className="flex items-center space-x-1.5 bg-zinc-950/60 p-1.5 rounded-lg border border-zinc-900">
          {filters.map((cat) => {
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded transition-all duration-300 relative uppercase tracking-wider ${
                  active 
                    ? 'text-matrix font-semibold' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 bg-matrix/10 border-b border-matrix/50 rounded -z-10" />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Database Status Alert bar */}
        {error ? (
          <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-500/80 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/20">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-[10px] font-mono text-matrix/80 bg-matrix/5 px-2.5 py-1 rounded border border-matrix/20">
            <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
            <span>DATABASE: CONNECTED</span>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-8 h-8 text-cyber animate-spin" />
          <span className="font-mono text-xs text-zinc-500 tracking-wider">RETRIEVING SOURCE MODULES...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty States */
        <div className="p-8 rounded-lg glass-hud border border-zinc-800 text-center py-16">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase">QUERY_EMPTY // NO_MODULES</h3>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto font-sans">
            No projects matched the selected category. Adjust the filter or synchronize local databases.
          </p>
        </div>
      ) : (
        /* Project Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

    </div>
  );
}
