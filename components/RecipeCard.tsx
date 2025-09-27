import React, { useState } from 'react';
import { Recipe } from '../types';
import TypewriterText from './TypewriterText';

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
  onShare: (recipe: Recipe) => void;
  onRatingChange: (recipeId: string, rating: number) => void;
}

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
    const colorClass = {
        'Easy': 'border-lime-400 text-lime-400',
        'Medium': 'border-yellow-400 text-yellow-400',
        'Hard': 'border-red-400 text-red-400',
    }[difficulty] || 'border-gray-400 text-gray-400';

    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${colorClass}`}>
            {difficulty}
        </span>
    );
};

const StarRating: React.FC<{ rating: number; onRatingChange: (newRating: number) => void }> = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-[var(--neon-secondary-light)] transition-transform duration-200 hover:scale-125 focus:outline-none focus:scale-125"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                    <svg
                        className="w-5 h-5"
                        fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </button>
            ))}
        </div>
    );
};


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSaved, onToggleSave, onShare, onRatingChange }) => {
  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-[var(--neon-primary)]/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--neon-primary)]/20 hover:border-[var(--neon-primary)]/60 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-[var(--neon-secondary)]/20 pb-4">
            <h2 className="text-3xl font-bold text-[var(--neon-secondary-light)] drop-shadow-[0_0_5px_var(--neon-secondary-light)]">{recipe.recipeName}</h2>
            <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-slate-300 text-sm">{recipe.cookTime}</span>
                <DifficultyBadge difficulty={recipe.difficulty} />
            </div>
        </div>

        <p className="text-slate-300 mb-6 italic">{recipe.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-semibold text-[var(--neon-primary-light)] mb-3">Ingredients</h3>
                <ul className="space-y-2">
                    {recipe.ingredients.map((ing, index) => (
                        <li key={index} className="flex items-start text-slate-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                             <svg className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[var(--neon-secondary-light)]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                           <span className="[animation:neon-pulse_3s_ease-in-out_infinite]" style={{ animationDelay: `${index * 150}ms` }}><span className="font-semibold">{ing.quantity}</span> {ing.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-[var(--neon-primary-light)] mb-3">Instructions</h3>
                <ol className="space-y-3 list-decimal list-inside">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="text-slate-200 leading-relaxed marker:text-[var(--neon-secondary-light)] marker:font-bold animate-fade-in" style={{ animationDelay: `${(recipe.ingredients.length + index) * 80}ms` }}>
                            <TypewriterText 
                                text={step}
                                startDelay={(recipe.ingredients.length + index) * 80 + 300}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Rate this recipe:</span>
              <StarRating rating={recipe.rating || 0} onRatingChange={(newRating) => onRatingChange(recipe.id, newRating)} />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onShare(recipe)}
                className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-[var(--neon-secondary-light)] font-semibold rounded-full transition-colors duration-200"
              >
                Share
              </button>
              <button
                onClick={() => onToggleSave(recipe)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isSaved
                    ? 'bg-red-500/20 hover:bg-red-500/40 text-red-400'
                    : 'bg-[var(--neon-primary)]/20 hover:bg-[var(--neon-primary)]/40 text-[var(--neon-primary-light)]'
                }`}
              >
                {isSaved ? 'Unsave Recipe' : 'Save Recipe'}
              </button>
            </div>
        </div>
    </div>
  );
};

export default RecipeCard;