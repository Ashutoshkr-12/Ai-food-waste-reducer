'use client'
import { useEffect, useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import  Header  from '@/components/Header';
import  BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { getFridge } from '@/lib/api/fridge';
import { Ingredient } from '@/lib/types/types';
import FridgeItemCard from '@/components/FridgeItemCard';


export default function MyFridge() {
  const [filter, setFilter] = useState<'all' | 'expiring'>('all');
  const { getToken } = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await getToken();
      const data = await getFridge(token!);
      //  console.log("FRIDGE DATA:", data);

      setIngredients(data);

    } catch (err) {
      console.log("error fetching fridge:", err);
    } finally {
      setLoading(false);
    }
  }; 
  fetchData();
}, []);

{loading && (
  <div className="text-center">Loading...</div>
)}

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="My Fridge" showNotifications showBack />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search ingredients..."
              className="w-full h-12 pl-10 pr-4 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50">
            <SlidersHorizontal className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-neutral-200">
            <div className="text-2xl font-bold text-neutral-900">{ingredients.length}</div>
            <div className="text-sm text-neutral-600">Total Items</div>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <div className="text-2xl font-bold text-amber-900"></div>
            <div className="text-sm text-amber-700">Expiring Soon</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            All Items ({ingredients.length})
          </button>
          <button
            onClick={() => setFilter('expiring')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'expiring' 
                ? 'bg-amber-600 text-white' 
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            Expiring 
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Link href="/recipes" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700 rounded-full">
              Generate Recipes
            </Button>
          </Link>
          <Link href="/save-expiring" className="flex-1">
            <Button variant="outline" className="w-full rounded-full border-amber-600 text-amber-600 hover:bg-amber-50">
              Save Expiring
            </Button>
          </Link>
        </div>

        {/* Ingredients List */}
        <div className="space-y-3 mb-6">
          {ingredients.map((ingredient) => (
            <FridgeItemCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>

        {/* Add Item Button */}
        <Link href="/scan-fridge">
          <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 flex items-center justify-center z-30">
            <Plus className="w-6 h-6" />
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
