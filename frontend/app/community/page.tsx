'use client'
import { useState } from 'react';
import { Plus, TrendingUp, Clock, Users } from 'lucide-react';
import Header  from '@/components/Header';
import BottomNav  from '@/components/BottomNav';
import RecipeCard  from '@/components/RecipeCard';
import { Button } from '@//components/ui/button';
import { mockCommunityRecipes } from '@/data/mockData';

export default function Community() {
  const [filter, setFilter] = useState<'trending' | 'recent' | 'following'>('trending');

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Community Recipes" showNotifications />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-linear-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-lg">Share & Discover</h2>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Join our community of food waste warriors. Share your recipes and learn from others!
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Share Your Recipe
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFilter('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'trending'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'recent'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'following'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Following
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3 border border-neutral-200 text-center">
            <div className="text-xl font-bold text-neutral-900">1.2K</div>
            <div className="text-xs text-neutral-600">Recipes</div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-neutral-200 text-center">
            <div className="text-xl font-bold text-neutral-900">50K</div>
            <div className="text-xs text-neutral-600">Members</div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-neutral-200 text-center">
            <div className="text-xl font-bold text-neutral-900">85%</div>
            <div className="text-xs text-neutral-600">Less Waste</div>
          </div>
        </div>

        {/* Community Recipes Feed */}
        <div className="space-y-4">
          {mockCommunityRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showAuthor />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="rounded-full px-8">
            Load More Recipes
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
