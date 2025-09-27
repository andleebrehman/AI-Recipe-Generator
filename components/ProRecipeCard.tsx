import React from 'react';

interface ProRecipeCardProps {
  recipeName: string;
}

const ProRecipeCard: React.FC<ProRecipeCardProps> = ({ recipeName }) => {
  return (
    <div className="w-full max-w-2xl bg-slate-800/30 backdrop-blur-sm border border-[var(--neon-primary)]/30 rounded-2xl p-6 md:p-8 transition-all duration-300 animate-fade-in relative overflow-hidden hover:shadow-lg hover:shadow-[var(--neon-primary)]/20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
        <div className="text-center z-20 relative">
            <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-[var(--neon-primary-light)] drop-shadow-[0_0_8px_var(--neon-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-300 drop-shadow-[0_0_5px_var(--neon-primary-light)] mb-2">"{recipeName}"</h2>
            <p className="text-lg font-semibold text-[var(--neon-primary-light)] mb-4">A Legendary Recipe Awaits...</p>
            <p className="text-slate-400 mb-6">This recipe is reserved for our Pro members. Unlock it to reveal its secrets.</p>
            <button
                className="px-8 py-3 bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[var(--neon-secondary)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--neon-secondary)]/50"
            >
                Unlock with Pro
            </button>
        </div>
    </div>
  );
};

export default ProRecipeCard;