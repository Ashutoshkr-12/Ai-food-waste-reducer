import { Calendar, Edit2, AlertCircle } from 'lucide-react';
import { Ingredient } from '@/data/mockData';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const getBglinear = (daysLeft: number) => {
    if (daysLeft <= 1) return 'from-red-50 via-orange-50 to-amber-50';
    if (daysLeft <= 3) return 'from-amber-50 via-yellow-50 to-orange-50';
    return 'from-emerald-50 via-green-50 to-teal-50';
  };

  const getBorderColor = (daysLeft: number) => {
    if (daysLeft <= 1) return 'border-red-200';
    if (daysLeft <= 3) return 'border-amber-200';
    return 'border-emerald-200';
  };

  const getIconlinear = (daysLeft: number) => {
    if (daysLeft <= 1) return 'from-red-400 to-orange-600';
    if (daysLeft <= 3) return 'from-amber-400 to-orange-600';
    return 'from-emerald-400 to-green-600';
  };

  const getProgresslinear = (daysLeft: number) => {
    if (daysLeft <= 1) return 'from-red-400 via-orange-500 to-amber-500';
    if (daysLeft <= 3) return 'from-amber-400 via-yellow-500 to-orange-500';
    return 'from-emerald-400 via-green-500 to-teal-500';
  };

  const getProgressWidth = (daysLeft: number) => {
    const maxDays = 7;
    const percentage = Math.min((daysLeft / maxDays) * 100, 100);
    return percentage;
  };

  const getEmoji = (category: string, name: string) => {
    if (name.includes('Tomato')) return '🍅';
    if (name.includes('Spinach')) return '🥬';
    if (name.includes('Mushroom')) return '🍄';
    if (name.includes('Avocado')) return '🥑';
    if (name.includes('Pepper')) return '🫑';
    if (category === 'Vegetables') return '🥬';
    if (category === 'Protein') return '🍗';
    if (category === 'Dairy') return '🧀';
    if (category === 'Fruits') return '🍎';
    return '🌾';
  };

  return (
    <div className={`relative bg-linear-to-br ${getBglinear(ingredient.expiresIn)} rounded-[2rem] p-6 border-2 ${getBorderColor(ingredient.expiresIn)} shadow-xl hover:shadow-2xl overflow-hidden`}>
      {/* Decorative linear orb */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FFFCF8]/40 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-5">
          {/* Emoji Icon */}
          <div className="w-20 h-20 rounded-[1.25rem] bg-[#FFFCF8]/70 backdrop-blur-sm border-2 border-[#FFFCF8] flex items-center justify-center text-4xl shrink-0 shadow-xl hover:scale-105">
            {getEmoji(ingredient.category, ingredient.name)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-xl mb-2 truncate">{ingredient.name}</h3>
            <p className="text-sm font-bold text-gray-700 bg-[#FFFCF8]/60 backdrop-blur-sm px-4 py-2 rounded-xl inline-block border border-[#FFFCF8]">
              {ingredient.quantity}
            </p>
          </div>

          <button className="p-2.5 bg-[#FFFCF8]/70 backdrop-blur-sm hover:bg-[#FFFCF8] rounded-xl shadow-lg border border-[#FFFCF8]">
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Expiration Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-sm font-bold text-gray-700">
              <Calendar className="w-5 h-5" />
              <span>
                {ingredient.expiresIn === 0 ? 'Expires today!' : 
                 ingredient.expiresIn === 1 ? 'Expires tomorrow' :
                 `${ingredient.expiresIn} days left`}
              </span>
            </div>
            
            {ingredient.expiresIn <= 1 && (
              <div className="flex items-center gap-1.5 bg-linear-to-r from-red-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                <AlertCircle className="w-4 h-4" />
                Urgent
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-[#FFFCF8]/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-[#FFFCF8]">
            <div
              className={`h-full bg-linear-to-r ${getProgresslinear(ingredient.expiresIn)} rounded-full shadow-lg`}
              style={{ width: `${getProgressWidth(ingredient.expiresIn)}%` }}
            />
          </div>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-[#FFFCF8]/70 backdrop-blur-sm shadow-lg border border-[#FFFCF8]">
              {ingredient.category}
            </span>
            
            {/* Freshness indicator */}
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.ceil(ingredient.expiresIn / 2.5) ? `bg-linear-to-r ${getIconlinear(ingredient.expiresIn)} shadow-md` : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}