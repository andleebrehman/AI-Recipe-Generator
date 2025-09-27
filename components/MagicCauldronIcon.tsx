import React from 'react';

const MagicCauldronIcon: React.FC = () => (
    <svg 
        width="64" 
        height="64" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
    >
        <defs>
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path d="M2 10.95C2 10.95 2 15 2 15C2 17.2091 3.79086 19 6 19H18C20.2091 19 22 17.2091 22 15C22 15 22 10.95 22 10.95" stroke="var(--neon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19" stroke="var(--neon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 11V10C22 7.23858 19.7614 5 17 5H7C4.23858 5 2 7.23858 2 10V11" stroke="var(--neon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 8C9.92211 7.00933 10.8755 6.45267 12 6.5C13.1245 6.54733 14.0779 7.104 15 8" stroke="var(--neon-primary)" strokeWidth="1.5" strokeLinecap="round" filter="url(#neon-glow)"/>
        <path d="M7 11C7.66667 10 9.2 9.5 10 10C10.8 10.5 10.5 12 11.5 12C12.5 12 13.2 10.5 14 10C14.8 9.5 16.3333 10 17 11" stroke="var(--neon-primary-light)" strokeWidth="1.5" strokeLinecap="round" filter="url(#neon-glow)"/>
    </svg>
);

export default MagicCauldronIcon;