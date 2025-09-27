import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';
import MagicCauldronIcon from './components/MagicCauldronIcon';
import useLocalStorage from './hooks/useLocalStorage';
import ProRecipeCard from './components/ProRecipeCard';
import PricingSection from './components/PricingSection';

type SortOption = 'default' | 'cookTime' | 'difficulty';

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full max-w-2xl mx-auto text-center bg-red-900/50 p-6 rounded-lg border-2 border-red-400/40 animate-[pulse-border_2.5s_ease-in-out_infinite]">
    <div className="flex justify-center items-center mb-4">
      <svg className="w-12 h-12 text-red-400/80 drop-shadow-[0_0_5px_rgba(248,113,113,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p className="text-red-300 text-lg font-semibold">{message}</p>
    <p className="text-red-400/80 mt-2 text-sm">The cosmic energies are unstable. Please adjust your ingredients and try again.</p>
  </div>
);


const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [savedSearchTerm, setSavedSearchTerm] = useState('');
  const [isPro, setIsPro] = useState<boolean>(false);

  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('neonSavedRecipes', []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const decoded = atob(hash);
        const { ingredients: sharedIngredients, recipe: sharedRecipe } = JSON.parse(decoded);
        if (sharedIngredients && sharedRecipe) {
          setIngredients(sharedIngredients);
          setRecipes([sharedRecipe]);
          window.location.hash = ''; 
        }
      } catch (e) {
        console.error("Failed to parse share link", e);
        setError("The share link is invalid or corrupted.");
      }
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleGenerateRecipes = useCallback(async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients to begin the magic.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setSortOption('default');

    try {
      const result = await generateRecipes(ingredients);
      setRecipes(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const handleClear = () => {
    setIngredients('');
    setRecipes([]);
    setError(null);
    setSortOption('default');
  };

  const isRecipeSaved = (recipeId: string) => savedRecipes.some(r => r.id === recipeId);

  const handleToggleSave = (recipe: Recipe) => {
    if (isRecipeSaved(recipe.id)) {
      setSavedRecipes(prev => prev.filter(r => r.id !== recipe.id));
      setToastMessage("Recipe unsaved!");
    } else {
      setSavedRecipes(prev => [...prev, recipe]);
      setToastMessage("Recipe saved!");
    }
  };
  
  const handleRatingChange = (recipeId: string, rating: number) => {
    const updateRecipeList = (list: Recipe[]) =>
      list.map(r => (r.id === recipeId ? { ...r, rating } : r));

    setRecipes(prev => updateRecipeList(prev));
    if (isRecipeSaved(recipeId)) {
        setSavedRecipes(prev => updateRecipeList(prev));
    }
  };

  const handleShareRecipe = (recipe: Recipe) => {
    try {
      const dataToShare = { ingredients, recipe };
      const encoded = btoa(JSON.stringify(dataToShare));
      const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
      navigator.clipboard.writeText(url).then(() => {
        setToastMessage("Share link copied to clipboard!");
      });
    } catch (e) {
      console.error("Failed to create share link", e);
      setError("Could not create a share link.");
    }
  };

  const sortedRecipes = useMemo(() => {
    const recipesToSort = [...recipes];
    if (sortOption === 'cookTime') {
      return recipesToSort.sort((a, b) => (parseInt(a.cookTime) || 999) - (parseInt(b.cookTime) || 999));
    }
    if (sortOption === 'difficulty') {
      const difficultyMap = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
      return recipesToSort.sort((a, b) => difficultyMap[a.difficulty] - difficultyMap[b.difficulty]);
    }
    return recipesToSort;
  }, [recipes, sortOption]);
  
  const filteredSavedRecipes = useMemo(() => {
    if (!savedSearchTerm) return savedRecipes;
    const lowercasedTerm = savedSearchTerm.toLowerCase();
    return savedRecipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(lowercasedTerm) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowercasedTerm))
    );
  }, [savedRecipes, savedSearchTerm]);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans p-4 relative overflow-x-hidden">
      
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-green-500/80 text-white font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--neon-secondary)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[var(--neon-primary)]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <main className="container mx-auto max-w-4xl py-8 md:py-16 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <MagicCauldronIcon />
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary-light)]">
            AI Recipe Generator
          </h1>
        </div>
        

        <p className="text-slate-400 text-center mb-10 max-w-xl">
          Toss your ingredients into the cosmic cauldron and let our AI chef conjure up a magical meal for you.
        </p>

        <div className="w-full max-w-xl mb-6">
          <label htmlFor="ingredients" className="block text-lg font-semibold text-[var(--neon-secondary-light)] mb-2">
            Your Available Ingredients
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken breast, rice, broccoli, soy sauce"
            rows={4}
            className="w-full p-4 bg-slate-800/80 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] transition-all duration-300 outline-none resize-none shadow-inner shadow-slate-900"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGenerateRecipes}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[var(--neon-secondary)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--neon-secondary)]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Brewing...' : 'Generate Recipes'}
            </button>
             <button
              onClick={handleClear}
              disabled={isLoading}
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
        </div>

        <div className="w-full mt-12">
          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          
          {sortedRecipes.length > 0 && (
            <div className="flex justify-end mb-4 max-w-2xl mx-auto">
                <select 
                    value={sortOption} 
                    onChange={e => setSortOption(e.target.value as SortOption)}
                    className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1 text-slate-300 focus:ring-1 focus:ring-[var(--neon-primary)] focus:border-[var(--neon-primary)] outline-none"
                >
                    <option value="default">Sort by...</option>
                    <option value="cookTime">Cook Time</option>
                    <option value="difficulty">Difficulty</option>
                </select>
            </div>
          )}

          <div className="flex flex-col items-center gap-8">
            {sortedRecipes.map((recipe) => (
              (recipe.difficulty === 'Hard' && !isPro) ? (
                <ProRecipeCard key={recipe.id} recipeName={recipe.recipeName} />
              ) : (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isSaved={isRecipeSaved(recipe.id)}
                  onToggleSave={handleToggleSave}
                  onShare={handleShareRecipe}
                  onRatingChange={handleRatingChange}
                />
              )
            ))}
          </div>
        </div>
        
        {(recipes.length === 0 || !isPro) && <PricingSection />}

        {savedRecipes.length > 0 && (
          <section className="w-full mt-16 pt-8 border-t-2 border-[var(--neon-secondary)]/20">
              <div className="w-full max-w-2xl mx-auto text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary-light)] mb-4">
                      Your Saved Recipes
                  </h2>
                   <input
                        type="search"
                        value={savedSearchTerm}
                        onChange={e => setSavedSearchTerm(e.target.value)}
                        placeholder="Search saved recipes..."
                        className="w-full max-w-md p-3 bg-slate-800/80 border-2 border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[var(--neon-secondary)] focus:border-[var(--neon-secondary)] transition-all duration-300 outline-none shadow-inner"
                    />
              </div>
              <div className="flex flex-col items-center gap-8">
                {filteredSavedRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    isSaved={isRecipeSaved(recipe.id)}
                    onToggleSave={handleToggleSave}
                    onShare={handleShareRecipe}
                    onRatingChange={handleRatingChange}
                  />
                ))}
              </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;