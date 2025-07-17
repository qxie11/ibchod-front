import React from 'react';

/**
 * Loader component inspired by https://codepen.io/sconway/pen/pmJpNw
 */
export const Loader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    role="status"
    aria-label="Loading"
  >
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-b-transparent border-blue-500"></div>
      <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-b-transparent border-blue-300 animate-spin-slow"></div>
      <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-b-transparent border-blue-200 animate-spin-slower"></div>
    </div>
    <span className="sr-only">Načítání...</span>
    <style>{`
      @keyframes spin-slow {
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 2s linear infinite;
      }
      @keyframes spin-slower {
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slower {
        animation: spin-slower 3.5s linear infinite;
      }
    `}</style>
  </div>
);

export default Loader;
