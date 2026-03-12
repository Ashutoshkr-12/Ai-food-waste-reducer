import { Settings, Award, BookOpen, Share2, TrendingDown, ChefHat } from 'lucide-react';

import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { userStats, mockRecipes } from '@/data/mockData';
import Link from 'next/link';


export default function Profile() {
  const savedRecipes = mockRecipes.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header showSettings />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-linear-to-br from-green-600 to-green-700 text-white rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl border-4 border-white/30">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Alex Johnson</h2>
              <p className="text-green-100">Food Waste Warrior 🌱</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userStats.recipesCookedCount}</div>
              <div className="text-xs text-green-100 mt-1">Recipes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userStats.savedRecipesCount}</div>
              <div className="text-xs text-green-100 mt-1">Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userStats.sharedRecipesCount}</div>
              <div className="text-xs text-green-100 mt-1">Shared</div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 mb-6">
          <h3 className="font-semibold text-lg text-neutral-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            Your Impact
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Food Saved</span>
                <span className="font-semibold text-neutral-900">{userStats.foodSaved}</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Waste Reduction</span>
                <span className="font-semibold text-neutral-900">{userStats.wasteReductionScore}%</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">Eco Champion</div>
                    <div className="text-sm text-neutral-600">Level 5</div>
                  </div>
                </div>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 mb-6">
          <h3 className="font-semibold text-lg text-neutral-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🌟', label: 'First Recipe' },
              { emoji: '🔥', label: '7 Day Streak' },
              { emoji: '♻️', label: 'Zero Waste' },
              { emoji: '👥', label: 'Community' }
            ].map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center text-2xl mb-2 mx-auto">
                  {achievement.emoji}
                </div>
                <div className="text-xs text-neutral-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Recipes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Saved Recipes
            </h3>
            <button className="text-sm text-green-600 hover:text-green-700">
              View All
            </button>
          </div>

          <div className="grid gap-3">
            {savedRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 flex gap-3 hover:shadow-lg transition-shadow">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <h4 className="font-medium text-neutral-900 mb-1 line-clamp-1">
                      {recipe.name}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      <span>{recipe.cookTime} min</span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Shared Recipes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              My Shared Recipes
            </h3>
            <button className="text-sm text-green-600 hover:text-green-700">
              Share New
            </button>
          </div>

          <Link href="/community">
            <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl mx-auto mb-3">
                <ChefHat className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-purple-900 mb-1">
                Share Your Recipe
              </h4>
              <p className="text-sm text-purple-700 mb-4">
                Help others reduce food waste with your recipes
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">
                Get Started
              </Button>
            </div>
          </Link>
        </div>

        {/* Settings Links */}
        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">
          {[
            { icon: Settings, label: 'Settings', href: '#' },
            { icon: Award, label: 'Achievements', href: '#' },
            { icon: BookOpen, label: 'Recipe History', href: '#' }
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center justify-between p-4 hover:bg-neutral-50 border-b border-neutral-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-neutral-600" />
                <span className="text-neutral-900">{item.label}</span>
              </div>
              <span className="text-neutral-400">→</span>
            </a>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
