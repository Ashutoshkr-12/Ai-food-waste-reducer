"use client"
import {useState } from 'react';
import { Heart, Share2, Clock, ChefHat, Users, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockRecipes, mockCommunityRecipes } from '@/data/mockData';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RecipeDetail() {
  const { id }:any = useSearchParams();
  const navigate = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  // Find recipe from both sources
  const recipe = [...mockRecipes, ...mockCommunityRecipes].find(r => r.id === id);

  if (!recipe) {
    return <div className="min-h-screen flex items-center justify-center">Recipe not found</div>;
  }

  const isCommunityRecipe = 'author' in recipe;

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Image Header */}
      <div className="relative h-80">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => navigate.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-xl">←</span>
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-green-600 text-green-600' : 'text-neutral-700'}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-5 h-5 text-neutral-700" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Title and Meta */}
        <div className="py-6 border-b border-neutral-200">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{recipe.name}</h1>
          
          <div className="flex items-center gap-6 text-neutral-600 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>{recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          {isCommunityRecipe && (
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600" />
                <div>
                  <div className="font-medium text-neutral-900">{recipe.author}</div>
                  <div className="text-sm text-neutral-600">Recipe Creator</div>
                </div>
              </div>
              <Button variant="outline" className="rounded-full">
                Follow
              </Button>
            </div>
          )}
        </div>

        {/* Ingredients */}
        <div className="py-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Ingredients</h2>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                </div>
                <span className="text-neutral-900">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {recipe.instructions && (
          <div className="py-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-neutral-700 pt-1">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Info */}
        {recipe.calories && (
          <div className="py-6 border-t border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Nutrition</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-900">{recipe.calories}</div>
                <div className="text-sm text-green-700">Calories</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">Balanced</div>
                <div className="text-sm text-blue-700">Nutrition</div>
              </div>
            </div>
          </div>
        )}

        {/* Community Stats */}
        {isCommunityRecipe && (
          <div className="py-6 border-t border-neutral-200">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-neutral-700 hover:text-red-600">
                <Heart className="w-6 h-6" />
                <span className="font-medium">{recipe.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-neutral-700 hover:text-blue-600">
                <span className="text-xl">💬</span>
                <span className="font-medium">{recipe.comments}</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
          <div className="max-w-md mx-auto">
            <Button className="w-full h-14 bg-green-600 hover:bg-green-700 rounded-full text-lg">
              🍳 Start Cooking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
