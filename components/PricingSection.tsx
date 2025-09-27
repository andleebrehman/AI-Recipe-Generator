import React from 'react';

interface Plan {
    title: string;
    price: string;
    features: string[];
    recommended?: boolean;
}

const pricingPlans: Plan[] = [
    {
        title: "Pro Chef",
        price: "$4.99",
        features: [
            "Unlock all 'Hard' recipes",
            "Save up to 100 recipes",
            "Advanced search filters",
            "Priority support"
        ],
        recommended: true
    },
    {
        title: "Cosmic Chef",
        price: "$9.99",
        features: [
            "Everything in Pro Chef",
            "Exclusive cosmic ingredients",
            "AI-powered meal planning",
            "Save unlimited recipes"
        ],
        recommended: true
    }
];

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`flex flex-col bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 w-full sm:w-80 hover:shadow-lg hover:shadow-[var(--neon-primary)]/20 ${plan.recommended ? 'border-[var(--neon-primary)]' : 'border-slate-700'}`}>
        <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-[var(--neon-primary-light)]' : 'text-white'}`}>{plan.title}</h3>
        <p className="text-4xl font-extrabold mb-6">
            {plan.price}
            <span className="text-base font-medium text-slate-400">/ month</span>
        </p>
        <ul className="space-y-3 mb-8 text-slate-300">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button 
            className={`mt-auto w-full px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${plan.recommended ? 'bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] text-white hover:shadow-[var(--neon-secondary)]/50' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
        >
            Subscribe Now
        </button>
    </div>
);


const PricingSection: React.FC = () => {
    return (
        <section className="w-full mt-20 pt-8">
            <div className="w-full max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary-light)] mb-4">
                    Unlock Your Culinary Superpowers
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Choose a plan to access legendary recipes and advanced features.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {pricingPlans.map(plan => (
                     <PricingCard key={plan.title} plan={plan} />
                ))}
            </div>
        </section>
    );
};

export default PricingSection;