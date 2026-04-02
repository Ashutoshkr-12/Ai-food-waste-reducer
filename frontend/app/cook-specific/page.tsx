'use client'
import { useState } from 'react';
import { Search, Check, X } from 'lucide-react';
import  Header  from '@/components/Header';
import  BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { mockIngredients } from '@/data/mockData';

export default function CookSpecific() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const popularRecipes = [
    'Spaghetti Carbonara',
    'Chicken Stir Fry',
    'Caprese Salad',
    'Mushroom Risotto',
    'Greek Salad',
    'Tomato Soup'
  ];

  const handleRecipeSearch = (recipe: string) => {
    setSelectedRecipe(recipe);
  };

  // Mock recipe requirements
  const recipeRequirements = {
    available: ['Cherry Tomatoes', 'Mozzarella Cheese', 'Spinach'],
    missing: ['Pasta', 'Olive Oil', 'Basil']
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Cook Something Specific" showBack />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search for a recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Popular Searches */}
        {!selectedRecipe && (
          <div className="mb-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Popular Recipes</h3>
            <div className="grid grid-cols-2 gap-3">
              {popularRecipes.map((recipe) => (
                <button
                  key={recipe}
                  onClick={() => handleRecipeSearch(recipe)}
                  className="bg-white rounded-2xl p-4 border border-neutral-200 hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">
                    {recipe.includes('Pasta') || recipe.includes('Spaghetti') ? '🍝' :
                     recipe.includes('Chicken') ? '🍗' :
                     recipe.includes('Salad') ? '🥗' :
                     recipe.includes('Risotto') ? '🍚' :
                     recipe.includes('Soup') ? '🍲' : '🍽️'}
                  </div>
                  <div className="font-medium text-sm text-neutral-900">{recipe}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Analysis */}
        {selectedRecipe && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {selectedRecipe}
              </h3>

              {/* Available Ingredients */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900">You Have</h4>
                </div>
                <div className="space-y-2">
                  {recipeRequirements.available.map((ingredient, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200"
                    >
                      <Check className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-neutral-900">{ingredient}</span>
                      <span className="ml-auto text-sm text-green-600">
                        {mockIngredients.find(i => i.name === ingredient)?.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Ingredients */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900">You Need</h4>
                </div>
                <div className="space-y-2">
                  {recipeRequirements.missing.map((ingredient, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200"
                    >
                      <X className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="text-neutral-900">{ingredient}</span>
                      <button className="ml-auto text-sm text-blue-600 hover:text-blue-700">
                        Buy
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-full"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Search Again
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-full">
                  View Recipe
                </Button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Suggestion</h4>
              <p className="text-sm text-blue-800">
                You have {recipeRequirements.available.length} of {recipeRequirements.available.length + recipeRequirements.missing.length} ingredients. 
                Check our AI recipes for dishes you can make with what you have!
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
