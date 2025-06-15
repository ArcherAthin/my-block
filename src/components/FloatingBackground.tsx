
import { useEffect, useState } from 'react';

const FloatingBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] via-[#24243e] to-[#0f0c29] animate-gradient-shift" />
      
      {/* Secondary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6ec4]/20 via-[#7873f5]/30 to-[#00f2fe]/20 animate-pulse" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-10 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(255,110,196,0.3), rgba(120,115,245,0.2), rgba(0,242,254,0.1))',
            animationDelay: `${particle.delay}s`,
            animationDuration: '8s'
          }}
        />
      ))}
      
      {/* Hexagon patterns */}
      <div className="absolute top-20 left-20 w-32 h-32 opacity-5 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        </svg>
      </div>
      
      {/* Blurred rings */}
      <div className="absolute bottom-32 right-32 w-64 h-64 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] animate-pulse" />
      <div className="absolute top-64 right-20 w-48 h-48 rounded-full opacity-15 blur-2xl bg-gradient-to-r from-[#00f2fe] to-[#7873f5] animate-float" />
    </div>
  );
};

export default FloatingBackground;
