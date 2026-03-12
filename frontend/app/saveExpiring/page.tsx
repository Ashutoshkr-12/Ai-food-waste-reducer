import { AlertCircle, Clock } from 'lucide-react';
import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import  RecipeCard  from '@/components/RecipeCard';
import { mockIngredients, mockRecipes } from '@/data/mockData';
import Link from 'next/link';

export default function SaveExpiring() {
  const expiringIngredients = mockIngredients.filter(i => i.expiresIn <= 2);
  
  // Filter recipes that use expiring ingredients
  const expiringRecipes = mockRecipes.filter(recipe => 
    recipe.ingredients.some(ing => 
      expiringIngredients.some(exp => exp.name.includes(ing) || ing.includes(exp.name))
    )
  );

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Save Expiring Food" showBack />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Alert Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-semibold text-red-900 mb-2">
                {expiringIngredients.length} Items Need Attention
              </h2>
              <p className="text-sm text-red-700">
                These ingredients are expiring within 2 days. Cook them today to avoid waste!
              </p>
            </div>
          </div>
        </div>

        {/* Expiring Ingredients */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-neutral-900 mb-4">Ingredients Expiring Soon</h3>
          <div className="grid grid-cols-2 gap-3">
            {expiringIngredients.map((ingredient) => (
              <div 
                key={ingredient.id}
                className="bg-white rounded-2xl p-4 border-2 border-red-200"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3 mx-auto text-2xl">
                  {ingredient.name.includes('Tomato') ? '🍅' :
                   ingredient.name.includes('Spinach') ? '🥬' :
                   ingredient.name.includes('Mushroom') ? '🍄' :
                   ingredient.name.includes('Avocado') ? '🥑' : '🥗'}
                </div>
                <h4 className="font-medium text-neutral-900 text-sm text-center mb-1">
                  {ingredient.name}
                </h4>
                <div className="flex items-center justify-center gap-1 text-xs text-red-600">
                  <Clock className="w-3 h-3" />
                  <span>
                    {ingredient.expiresIn === 0 ? 'Today!' : 
                     ingredient.expiresIn === 1 ? 'Tomorrow' :
                     `${ingredient.expiresIn} days`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cook Today Recommendation */}
        <div className="bg-linear-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="text-xl">👨‍🍳</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Today's Recommendation</h3>
              <p className="text-amber-100 text-sm mb-3">
                We found {expiringRecipes.length} recipes that use your expiring ingredients
              </p>
              <Link href="/recipes">
                <button className="bg-white text-amber-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-50">
                  View All Recipes
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Suggested Recipes */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-neutral-900 mb-4">Recipes Using Expiring Food</h3>
          <div className="grid gap-4">
            {expiringRecipes.slice(0, 3).map((recipe) => (
              <div key={recipe.id} className="relative">
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">
                  Use Soon!
                </div>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <span>💡</span> Food Preservation Tips
          </h3>
          <ul className="space-y-1 text-sm text-green-800">
            <li>• Freeze herbs in olive oil for later use</li>
            <li>• Blanch vegetables before freezing</li>
            <li>• Store tomatoes at room temperature</li>
            <li>• Keep mushrooms in paper bags</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
