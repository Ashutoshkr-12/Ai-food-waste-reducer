'use client'
import { useEffect, useState } from 'react';
import { Sparkles, SlidersHorizontal, Search } from 'lucide-react';
import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import { suggestRecipes } from '@/lib/api/recipes';
import { useAuth } from '@clerk/nextjs';
import UserRecipeCard from '@/components/UserRecipeCard';
import { CachedRecipe } from '@/lib/types/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function RecipeSuggestions() {
  const { getToken } = useAuth();
  const [recipe, setRecipes] = useState<CachedRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [prioritizeExpiring, setPrioritizeExpiring] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await getToken();
      await new Promise(res => setTimeout(res, 200))
      const res = await suggestRecipes(token!);
      console.log("res:", res);

      setRecipes(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  fetchData();
}, []);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Recipe Suggestions" showNotifications />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* AI Banner */}
        <div className="bg-linear-to-br from-green-600 to-green-700 text-white rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-lg">AI-Powered Recipes</h2>
          </div>
          <p className="text-green-100 text-sm">
            Based on your current fridge inventory, we've found {recipe.length} perfect recipes for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search recipes..."
              className="w-full h-12 pl-10 pr-4 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50">
            <SlidersHorizontal className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Priority Toggle */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <div className="font-medium text-amber-900">Prioritize Expiring Food</div>
                <div className="text-sm text-amber-700">Save ingredients expiring soon</div>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={prioritizeExpiring}
              onChange={(e) => setPrioritizeExpiring(e.target.checked)}
              className="w-12 h-6 appearance-none bg-neutral-300 rounded-full relative cursor-pointer transition-colors checked:bg-amber-600 before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-6"
            />
          </label>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
            All Recipes
          </button>
          <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium whitespace-nowrap hover:bg-neutral-50">
            Easy
          </button>
          <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium whitespace-nowrap hover:bg-neutral-50">
            Quick ({"<"}30 min)
          </button>
          <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium whitespace-nowrap hover:bg-neutral-50">
            Vegetarian
          </button>
        </div>

        {/* Recipe Grid */}
        {loading ?  
     <div className="grid gap-4 mb-6">
    {[1,2,3].map((_, i) => (
      <div key={i} className="p-4 border rounded-xl">
        <Skeleton className="h-40 w-full mb-3" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
  : 
  <div className="grid gap-4 mb-6">
          {recipe.map((recipe,i) => (
            <UserRecipeCard key={i} recipe={recipe} i={i} />
          ))}
        </div> }
      </div>
      <BottomNav />
    </div>
  );
}
