"use client"
import { Settings, Award, BookOpen, Share2, TrendingDown } from 'lucide-react';
import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { getMeStats } from '@/lib/api/stats';
import { useEffect, useState } from 'react';
import { mockRecipes, User, UserStats } from '@/lib/types/types';
import { getMe } from '@/lib/api/user';
import { getMyRecipes } from '@/lib/api/community';

export default function Profile() {
  const { getToken } = useAuth();
  const savedRecipes = mockRecipes.slice(0, 3);
  const [stats, setStats] = useState<UserStats>()
 const [ recipes, setRecipes] = useState([])
 const [ user,setUser] = useState<User>();
 const [loading, setLoading] = useState(true);

useEffect(() => {
  if(!loading) return;
   const getMyStat =async() => {
    setLoading(true)
    const token = await getToken()
    const res = await getMeStats(token!)
    const user = await getMe(token!);
    const myRecipes = await getMyRecipes(token!)
    setRecipes(myRecipes)
    setStats(res)
    setUser(user)

    setLoading(false)
   }
    getMyStat()
},[getToken])

if (loading) {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">

      {/* Header skeleton */}
      <div className="h-16 bg-white border-b animate-pulse" />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">

        {/* Profile card */}
        <div className="rounded-3xl p-6 bg-gray-200 animate-pulse h-40" />

        {/* Stats */}
        <div className="bg-white rounded-3xl p-6 space-y-4">

          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>

        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6">

          <div className="h-5 w-40 bg-gray-200 rounded mb-4 animate-pulse" />

          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>

        </div>


        {/* Saved recipes skeleton */}
        <div className="space-y-3">

          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />

          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}

        </div>


        {/* My recipes skeleton */}
        <div className="space-y-3">

          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />

          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}

        </div>

      </div>

    </div>
  )
}

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
              <h2 className="text-2xl font-bold mb-1">{user?.clerk_id.slice(0,10)}</h2>
              <p className="text-green-100">Food Waste Warrior 🌱</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{recipes.length}</div>
              <div className="text-xs text-green-100 mt-1">Recipes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-green-100 mt-1">Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">3</div>
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
                <span className="font-semibold text-neutral-900">{stats?.food_saved}</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Waste Reduction</span>
                <span className="font-semibold text-neutral-900">{stats?.waste_reduced}%</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
             <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">items saved</span>
                <span className="font-semibold text-neutral-900">{stats?.items_added}%</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '0%' }} />
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
                    src={recipe.image_url} 
                    alt={recipe.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <h4 className="font-medium text-neutral-900 mb-1 line-clamp-1">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      <span>20 min</span>
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
       {/* My Shared Recipes */}
<div className="mb-6">

  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
      <Share2 className="w-5 h-5" />
      My Shared Recipes
    </h3>
  </div>


  {recipes.length === 0 && (
    <p className="text-sm text-gray-400">
      You haven't shared any recipes yet
    </p>
  )}


  <div className="grid gap-3">

    {recipes.map((recipe: any) => (

      <Link key={recipe.id} href={`/recipe/${recipe.id}`}>

        <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 flex gap-3 hover:shadow-lg transition-shadow">

          <img
            src={recipe.image_url}
            className="w-24 h-24 object-cover"
          />

          <div className="flex-1 p-3">

            <h4 className="font-medium text-neutral-900 mb-1">
              {recipe.title}
            </h4>

            <div className="text-sm text-neutral-600">
              ❤️ {recipe.likes_count} • 💬 {recipe.comments_count}
            </div>

          </div>

        </div>

      </Link>

    ))}

  </div>

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
