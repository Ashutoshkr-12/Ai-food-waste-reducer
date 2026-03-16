import { Clock, ChefHat, Heart, Star } from 'lucide-react';
import { Recipe, CommunityRecipe } from '@/data/mockData';
import Link from 'next/link';



interface RecipeCardProps {
  recipe:  CommunityRecipe;
  showAuthor?: boolean;
}

export default function RecipeCard({ recipe, showAuthor = false }: RecipeCardProps) {
  const isCommunityRecipe = 'author' in recipe;

  return (
    <Link href={`/recipe-detail/${recipe.id}`}>
      <div className="group bg-[#FFFCF8] rounded-[2rem] overflow-hidden shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-emerald-200">
        <div className="relative h-52 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {recipe.difficulty === 'Easy' && (
              <span className="px-4 py-1.5 bg-linear-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                Easy
              </span>
            )}
            {recipe.cookTime <= 30 && (
              <span className="px-4 py-1.5 bg-linear-to-r from-blue-400 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                Quick
              </span>
            )}
          </div>

          {isCommunityRecipe && (
            <button className="absolute top-4 right-4 p-3 bg-[#FFFCF8]/95 backdrop-blur-sm rounded-2xl hover:bg-[#FFFCF8] shadow-xl">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          )}

          {/* Calorie badge */}
          {recipe.calories && (
            <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#FFFCF8]/95 backdrop-blur-sm rounded-2xl shadow-xl">
              <span className="text-sm font-bold text-gray-900">{recipe.calories} cal</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-xl line-clamp-1 group-hover:bg-linear-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent">
            {recipe.name}
          </h3>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
            <div className="flex items-center gap-2 bg-linear-to-br from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-gray-700">{recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-2 bg-linear-to-br from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-200">
              <ChefHat className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-gray-700">{recipe.difficulty}</span>
            </div>
            {recipe.servings && (
              <div className="flex items-center gap-2 bg-linear-to-br from-amber-50 to-orange-50 px-4 py-2 rounded-xl border border-amber-200">
                <span className="text-amber-600">👥</span>
                <span className="font-semibold text-gray-700">{recipe.servings}</span>
              </div>
            )}
          </div>

          {showAuthor && isCommunityRecipe && (
            <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-purple-400 to-pink-600 shadow-lg" />
                <span className="text-sm font-bold text-gray-900">{recipe.author}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-bold bg-linear-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  {recipe.likes}
                </span>
                <span className="text-gray-500 font-semibold">💬 {recipe.comments || 'hey'}</span>
              </div>
            </div>
          )}

          {!showAuthor && (
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 3).map((ingredient: any, index: any) => (
                <span
                  key={index}
                  className="text-xs px-4 py-2 bg-linear-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-xl font-bold border-2 border-emerald-200"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span className="text-xs px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 text-gray-600 rounded-xl font-bold border-2 border-gray-200">
                  +{recipe.ingredients.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Match indicator */}
          {recipe.matchPercentage && recipe.matchPercentage >= 75 && (
            <div className="mt-5 pt-5 border-t-2 border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700">Ingredient Match</span>
                <span className="text-sm font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{recipe.matchPercentage}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-400 via-green-500 to-teal-500 rounded-full"
                  style={{ width: `${recipe.matchPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}