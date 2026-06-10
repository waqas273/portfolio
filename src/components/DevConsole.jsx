import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Play, CheckCircle2 } from 'lucide-react';

const QUERIES = [
  {
    id: 'focus',
    label: 'Main Focus',
    command: 'run developer.get_focus()',
    answer: 'I build advanced full-stack systems. My projects utilize either a traditional server-based MERN stack (MongoDB, Express, React, Node.js) or a modern serverless backend (React + Firebase), integrated with intelligent AI/ML models.'
  },
  {
    id: 'ai-rag',
    label: 'AI & RAG Systems',
    command: 'run developer.get_ai_capabilities()',
    answer: 'I design and deploy Retrieval-Augmented Generation (RAG) search pipelines. This includes setting up vector embeddings, semantic database queries, and integrating OpenAI & Gemini models to automate complex text workflows.'
  },
  {
    id: 'mern',
    label: 'MERN Stack Dev',
    command: 'run developer.get_mern_stack()',
    answer: 'I engineer robust server-based applications using MongoDB, Express.js, React.js, and Node.js. I design modular RESTful API endpoints, secure JSON Web Token (JWT) authorization routes, and custom relational schemas.'
  },
  {
    id: 'firebase',
    label: 'React + Firebase',
    command: 'run developer.get_firebase_info()',
    answer: 'I build modern, scalable serverless applications using React.js integrated with Firebase services. This includes configuring Firestore real-time synchronization, Firebase Auth database rules, cloud storage, and hosting configurations.'
  }
];

export default function DevConsole() {
  const [activeQuery, setActiveQuery] = useState(QUERIES[0]);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText('');

    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + activeQuery.answer.charAt(index));
        index++;
        if (index >= activeQuery.answer.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15); // Fast typing speed for professional feel

      return () => clearInterval(interval);
    }, 200);

    return () => {
      clearTimeout(delayTimer);
      setIsTyping(false);
    };
  }, [activeQuery]);

  return (
    <div className="max-w-3xl mx-auto w-full glass-hud preserve-dark rounded-lg border border-zinc-850 overflow-hidden shadow-2xl">
      {/* Console Window Header */}
      <div className="bg-zinc-950/90 px-4 py-2.5 border-b border-zinc-850 flex items-center justify-between font-mono text-[10px] text-zinc-500 select-none">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/50" />
          <span className="w-2 h-2 rounded-full bg-amber-500/50" />
          <span className="w-2 h-2 rounded-full bg-matrix/50" />
          <span className="ml-2 text-zinc-400 font-semibold flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyber/80" />
            <span>sys_ai_playground.exe</span>
          </span>
        </div>
        <span className="text-zinc-600 animate-pulse text-[8px]">CONNECTION: ACTIVE</span>
      </div>

      {/* Console Panel Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Navigation Chips */}
        <div className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r border-zinc-850 bg-zinc-950/20 flex flex-col justify-start space-y-2 select-none">
          <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-650 font-bold mb-1">// SELECT_QUERY_PARAMETERS</span>
          {QUERIES.map((q) => {
            const isSelected = q.id === activeQuery.id;
            return (
              <button
                key={q.id}
                onClick={() => {
                  if (!isTyping && q.id !== activeQuery.id) {
                    setActiveQuery(q);
                  }
                }}
                disabled={isTyping}
                className={`w-full text-left font-mono text-xs px-3 py-2.5 rounded border transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-matrix/10 border-matrix/30 text-matrix shadow-[0_0_12px_rgba(0,255,102,0.08)]'
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/70 disabled:opacity-50'
                }`}
              >
                <span>{q.label}</span>
                <Play className={`w-2.5 h-2.5 transition-transform ${isSelected ? 'translate-x-0.5 text-matrix fill-matrix' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Command Output Terminal */}
        <div className="md:col-span-8 p-5 bg-zinc-950/40 min-h-[180px] flex flex-col justify-between font-mono text-xs leading-relaxed text-zinc-350">
          <div className="space-y-3">
            {/* Command Input Simulation */}
            <div className="flex items-center space-x-2 text-zinc-500">
              <span className="text-matrix">guest@portfolio:~$</span>
              <span className="text-white font-medium">{activeQuery.command}</span>
            </div>

            {/* Answer Display */}
            <div className="pl-4 border-l border-zinc-800 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line relative min-h-[60px]">
              {displayedText}
              {/* Pulsing Flashing Terminal Cursor */}
              {isTyping && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-matrix animate-pulse vertical-middle" />
              )}
            </div>
          </div>

          {/* Terminal Footer Status */}
          <div className="flex justify-between items-center text-[9px] text-zinc-550 border-t border-zinc-900/60 pt-3 mt-4 select-none">
            <div className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-matrix" />
              <span>Query processed successfully.</span>
            </div>
            <div>STATUS: OK</div>
          </div>
        </div>

      </div>
    </div>
  );
}
