import React from 'react';
import { GeminiStarIcon } from './Icons';

interface LoaderProps {
    loadingState: 'analyzing' | 'creating';
}

const Loader: React.FC<LoaderProps> = ({ loadingState }) => {
  const messages = {
    analyzing: "Peering into the digital void...",
    creating: "Giving form to the ether...",
  };

  if (loadingState === 'analyzing') {
      return (
        <div className="flex flex-col items-center justify-center gap-6 text-slate-400 p-8">
            <div className="relative w-28 h-28">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-pulse"></div>
                {/* Slower rotating ring */}
                <div 
                    className="absolute inset-2 border-2 border-cyan-500/40 rounded-full" 
                    style={{ animation: 'spin 5s linear infinite reverse' }}>
                </div>
                {/* Fast rotating inner ring with dashes */}
                 <div 
                    className="absolute inset-5 border-2 border-cyan-500 rounded-full border-dashed" 
                    style={{ animation: 'spin 3s linear infinite' }}>
                </div>
                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                     <GeminiStarIcon className="w-10 h-10 text-cyan-300" />
                </div>
            </div>
            <p className="text-lg font-medium tracking-wider">{messages[loadingState]}</p>
        </div>
      );
  }

  if (loadingState === 'creating') {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-slate-400 p-8 w-full h-full">
            <svg width="120" height="120" viewBox="0 0 24 24" className="text-purple-400">
                <defs>
                    <filter id="ghostGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0" result="glow" />
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
                </defs>
                <g style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <path
                        d="M5 11.16C5 15.19 8.13 19 12 19s7-3.81 7-7.84c0-2.7-1.55-5.11-3.89-6.46A.5.5 0 0015 4.15V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v.15a.5.5 0 00.11.45C6.55 6.05 5 8.46 5 11.16z"
                        fill="currentColor"
                        className="text-purple-400/10"
                        style={{ filter: 'url(#ghostGlow)' }}
                    />
                    <path
                        d="M5 11.16C5 15.19 8.13 19 12 19s7-3.81 7-7.84c0-2.7-1.55-5.11-3.89-6.46A.5.5 0 0015 4.15V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v.15a.5.5 0 00.11.45C6.55 6.05 5 8.46 5 11.16z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-draw-once"
                    />
                    <circle cx="10" cy="11" r="1" fill="currentColor" className="animate-fade-in-eyes" style={{ animationDelay: '1.5s' }} />
                    <circle cx="14" cy="11" r="1" fill="currentColor" className="animate-fade-in-eyes" style={{ animationDelay: '1.7s' }} />
                </g>
            </svg>
            <p className="text-lg font-medium tracking-wider">{messages[loadingState]}</p>
        </div>
      );
  }
  
  return null;
};

export default Loader;