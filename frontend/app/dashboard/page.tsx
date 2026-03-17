import { Camera, Sparkles, AlertCircle, Users, TrendingDown, Leaf, ChefHat, Clock, Star } from 'lucide-react';
import  BottomNav  from '@/components/BottomNav';
import { Button } from '@/components/ui/button'
import { mockIngredients, userStats } from '@/data/mockData'
import Link from 'next/link';
import { getMe } from '@/lib/api/user';


export default async function Dashboard() {
  const expiringIngredients = mockIngredients.filter(i => i.expiresIn <= 2);
  const user: any = getMe();
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 pb-24">
      {/* Beautiful Header with Color Blend */}
      <header className="relative bg-linear-to-br from-emerald-500 via-green-500 to-teal-600 text-white px-4 pt-14 pb-12 overflow-hidden">
        {/* linear orbs for depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-br from-green-400 to-emerald-300 rounded-full mix-blend-overlay filter blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-br from-teal-400 to-cyan-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">FridgeWise</h1>
              <p className="text-emerald-100">Welcome {user.email}! 👋</p>
            </div>
            <Link href="/profile">
              <button className="w-14 h-14 rounded-[1.25rem] bg-[#FFFCF8]/20 backdrop-blur-md border-2 border-[#FFFCF8]/30 flex items-center justify-center shadow-xl hover:bg-[#FFFCF8]/30">
                <span className="text-2xl">👤</span>
              </button>
            </Link>
          </div>

          {/* Stats Card with Beautiful linear */}
          <div className="bg-[#FFFCF8]/15 backdrop-blur-xl rounded-[2rem] p-7 border-2 border-[#FFFCF8]/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFCF8]/20 backdrop-blur-sm border-2 border-[#FFFCF8]/30 flex items-center justify-center">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-xl">This Week's Impact</h2>
                <p className="text-sm text-emerald-100">Keep up the great work!</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FFFCF8]/10 backdrop-blur-sm rounded-[1.5rem] p-5 border-2 border-[#FFFCF8]/20">
                <div className="text-5xl font-bold mb-2">{userStats.weeklyFoodSaved}</div>
                <div className="text-emerald-50 font-semibold mb-3">kg Saved</div>
                <div className="h-2 bg-[#FFFCF8]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-[#FFFCF8]/60 to-[#FFFCF8]/90 rounded-full w-3/4" />
                </div>
              </div>
              <div className="bg-[#FFFCF8]/10 backdrop-blur-sm rounded-[1.5rem] p-5 border-2 border-[#FFFCF8]/20">
                <div className="text-5xl font-bold mb-2">{userStats.wasteReductionScore}%</div>
                <div className="text-emerald-50 font-semibold mb-3">Less Waste</div>
                <div className="h-2 bg-[#FFFCF8]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-[#FFFCF8]/60 to-[#FFFCF8]/90 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-8">
        {/* Quick Actions Grid with Beautiful Color Blends */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/scan-fridge">
            <div className="group relative bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 rounded-[2rem] p-7 shadow-xl border-2 border-white hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-emerald-200/50 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-5 shadow-xl">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Scan Fridge</h3>
                <p className="text-sm text-gray-600 font-medium">AI detection</p>
              </div>
            </div>
          </Link>

          <Link href="/recipe-suggestions">
            <div className="group relative bg-linear-to-br from-purple-50 via-pink-50 to-rose-50 rounded-[2rem] p-7 shadow-xl border-2 border-white hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-purple-200/50 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-5 shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">AI Recipes</h3>
                <p className="text-sm text-gray-600 font-medium">Get ideas</p>
              </div>
            </div>
          </Link>

          <Link href="/save-expiring">
            <div className="group relative bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-[2rem] p-7 shadow-xl border-2 border-white hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-amber-200/50 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-5 shadow-xl">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Save Food</h3>
                <p className="text-sm font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{expiringIngredients.length} expiring</p>
              </div>
            </div>
          </Link>

          <Link href="/community">
            <div className="group relative bg-linear-to-br from-blue-50 via-cyan-50 to-sky-50 rounded-[2rem] p-7 shadow-xl border-2 border-white hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-200/50 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-linear-to-br from-blue-400 to-cyan-600 flex items-center justify-center mb-5 shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Community</h3>
                <p className="text-sm text-gray-600 font-medium">50K+ users</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Expiring Alert with linear */}
        {expiringIngredients.length > 0 && (
          <div className="relative bg-linear-to-br from-red-500 via-orange-500 to-amber-500 text-white rounded-[2rem] p-7 mb-6 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-br from-orange-400 to-amber-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
            </div>
            <div className="relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-[1.25rem] bg-[#FFFCF8]/20 backdrop-blur-sm border-2 border-[#FFFCF8]/30 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">⚠️ Action Needed!</h3>
                  <p className="text-red-50 mb-5 text-lg">
                    {expiringIngredients.length} ingredients need attention - cook them today!
                  </p>
                  <Link href="/save-expiring">
                    <Button className="w-full bg-[#FFFCF8] text-red-600 hover:bg-red-50 rounded-[1.25rem] font-bold h-14 shadow-xl text-lg">
                      Save Food Now →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fridge Overview */}
        <div className="bg-[#FFFCF8] rounded-[2rem] p-7 shadow-xl border-2 border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-100 to-green-200 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="font-bold text-xl text-gray-900">My Fridge</h2>
            </div>
            <Link href="/my-fridge" className="text-sm font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {mockIngredients.slice(0, 3).map((ingredient, index) => (
              <div key={ingredient.id} className="text-center">
                <div className={`relative w-full aspect-square rounded-[1.25rem] ${
                  ingredient.expiresIn <= 1 ? 'bg-linear-to-br from-red-50 to-orange-50 border-2 border-red-200' :
                  ingredient.expiresIn <= 3 ? 'bg-linear-to-br from-amber-50 to-yellow-50 border-2 border-amber-200' :
                  'bg-linear-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
                } flex items-center justify-center mb-3 text-4xl shadow-lg`}>
                  {ingredient.category === 'Vegetables' ? '🥬' :
                   ingredient.category === 'Protein' ? '🍗' :
                   ingredient.category === 'Dairy' ? '🧀' :
                   ingredient.category === 'Fruits' ? '🍎' : '🌾'}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${
                    ingredient.expiresIn <= 1 ? 'bg-linear-to-br from-red-500 to-orange-600' :
                    ingredient.expiresIn <= 3 ? 'bg-linear-to-br from-amber-500 to-orange-600' :
                    'bg-linear-to-br from-emerald-500 to-green-600'
                  } border-3 border-white shadow-lg`} />
                </div>
                <p className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{ingredient.name}</p>
                <p className="text-xs font-semibold text-gray-600">{ingredient.expiresIn}d left</p>
              </div>
            ))}
          </div>

          <Link href="/my-fridge">
            <Button variant="outline" className="w-full rounded-[1.25rem] border-3 border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold h-14 text-base">
              Manage {mockIngredients.length} Items
            </Button>
          </Link>
        </div>

        {/* Daily Recipe with Beautiful linear */}
        <div className="relative bg-linear-to-br from-purple-500 via-pink-500 to-rose-600 text-white rounded-[2rem] overflow-hidden shadow-2xl mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-pink-400 to-rose-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
          </div>
          
          <div className="relative z-10 flex gap-5 p-7">
            <img
              src="https://images.unsplash.com/photo-1752766074879-62b66c5f3477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZyZXNoJTIwc2FsYWQlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NzMyNjIzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Featured recipe"
              className="w-28 h-28 rounded-[1.25rem] object-cover border-4 border-white/30 shadow-2xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-bold bg-[#FFFCF8]/20 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-[#FFFCF8]/30">Today's Pick</span>
              </div>
              <h3 className="font-bold mb-2 text-xl">Fresh Garden Salad</h3>
              <p className="text-purple-100 text-sm mb-4 font-medium">Uses 4 of your ingredients</p>
              <Link href="/recipe-suggestions">
                <Button className="bg-[#FFFCF8] text-purple-600 hover:bg-purple-50 rounded-xl font-bold px-5 h-11 shadow-xl">
                  View Recipe →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Eco Tip with linear */}
        <div className="bg-linear-to-br from-lime-50 via-green-50 to-emerald-50 rounded-[2rem] p-7 border-2 border-green-200 shadow-xl">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-[1.25rem] bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center shrink-0 shadow-xl">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-3 text-xl">💡 Today's Eco Tip</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Store leafy greens in airtight containers with a paper towel to absorb moisture and keep them fresh up to 2x longer!
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}