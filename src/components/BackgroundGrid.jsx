import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-50 bg-obsidian overflow-hidden select-none pointer-events-none">
      {/* Glow spots in the background */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-electric-glow blur-[120px] animate-pulse-slow" 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyber-glow blur-[150px] animate-pulse-slow" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-[35%] left-[25%] w-[40%] h-[40%] rounded-full bg-matrix-glow blur-[130px] animate-pulse-slow" 
        style={{ animationDelay: '4s' }} 
      />

      {/* Grid Mesh Background Overlay */}
      <div className="absolute inset-0 digital-grid digital-grid-mask" />

      {/* Sweeping scanline effect */}
      <div 
        className="absolute inset-x-0 h-[25vh] scanline opacity-30 pointer-events-none"
        style={{
          animation: 'scan 12s linear infinite',
        }}
      />
      
      {/* Vibe lines - horizontal digital borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-matrix/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber/20 to-transparent" />
    </div>
  );
}
