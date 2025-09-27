
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--neon-primary)]/50 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-[var(--neon-secondary)]/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-4 border-lime-500/50 animate-ping"></div>
      </div>
      <p className="text-[var(--neon-secondary-light)] text-lg font-medium animate-pulse tracking-widest">
        Conjuring Recipes...
      </p>
    </div>
  );
};

export default Loader;