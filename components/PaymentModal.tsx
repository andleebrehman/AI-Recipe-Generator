import React from 'react';

interface PaymentModalProps {
  planTitle: string;
  price: string;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ planTitle, price, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-slate-900 border border-[var(--neon-primary)]/50 rounded-2xl p-8 shadow-2xl shadow-[var(--neon-primary)]/20 m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors" aria-label="Close">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary-light)] mb-2">
          Subscribe to {planTitle}
        </h2>
        <p className="text-center text-slate-400 mb-6">You are about to be charged <span className="font-bold text-white">{price}/month</span>.</p>

        <div className="bg-yellow-900/50 border border-yellow-500/60 text-yellow-300 text-xs text-center rounded-lg p-3 mb-6">
            <strong>This is a demo only.</strong> Do not enter real payment information.
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardName" className="block text-sm font-semibold text-[var(--neon-secondary-light)] mb-1">Cardholder Name</label>
              <input type="text" id="cardName" placeholder="Cosmic Chef" className="w-full p-3 bg-slate-800/80 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] transition-all duration-300 outline-none" />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-semibold text-[var(--neon-secondary-light)] mb-1">Card Number</label>
              <input type="text" id="cardNumber" placeholder="**** **** **** 1234" className="w-full p-3 bg-slate-800/80 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] transition-all duration-300 outline-none" />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="expiry" className="block text-sm font-semibold text-[var(--neon-secondary-light)] mb-1">Expiry</label>
                <input type="text" id="expiry" placeholder="MM / YY" className="w-full p-3 bg-slate-800/80 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] transition-all duration-300 outline-none" />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvc" className="block text-sm font-semibold text-[var(--neon-secondary-light)] mb-1">CVC</label>
                <input type="text" id="cvc" placeholder="123" className="w-full p-3 bg-slate-800/80 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] transition-all duration-300 outline-none" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 w-full px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] text-white hover:shadow-[var(--neon-secondary)]/50"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
