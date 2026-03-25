import { Ingredient } from "@/lib/types/types";
import { Calendar, Edit2, AlertCircle } from "lucide-react";

interface IngredientCardProps {
  ingredient: Ingredient;
  index: number;
  onEdit: (index: number, field: string, value: any) => void;
}

export default function IngredientCard({
  ingredient,
  index,
  onEdit,
}: IngredientCardProps) {
  const getBglinear = (daysLeft: number) => {
    if (daysLeft <= 1) return "from-red-50 via-orange-50 to-amber-50";
    if (daysLeft <= 3) return "from-amber-50 via-yellow-50 to-orange-50";
    return "from-emerald-50 via-green-50 to-teal-50";
  };

  const getBorderColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "border-red-200";
    if (daysLeft <= 3) return "border-amber-200";
    return "border-emerald-200";
  };

  const getIconlinear = (daysLeft: number) => {
    if (daysLeft <= 1) return "from-red-400 to-orange-600";
    if (daysLeft <= 3) return "from-amber-400 to-orange-600";
    return "from-emerald-400 to-green-600";
  };

  const getProgresslinear = (daysLeft: number) => {
    if (daysLeft <= 1) return "from-red-400 via-orange-500 to-amber-500";
    if (daysLeft <= 3) return "from-amber-400 via-yellow-500 to-orange-500";
    return "from-emerald-400 via-green-500 to-teal-500";
  };

  const getProgressWidth = (daysLeft: number) => {
    const maxDays = 7;
    const percentage = Math.min((daysLeft / maxDays) * 100, 100);
    return percentage;
  };

  return (
    <div
      className={`relative bg-linear-to-br ${getBglinear(ingredient.expiry_date)} rounded-[2rem] p-6 border-2 ${getBorderColor(ingredient.expiry_date)} shadow-xl hover:shadow-2xl overflow-hidden`}
    >
      {/* Decorative linear orb */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FFFCF8]/40 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-5">
         
          <div className="w-20 h-20 rounded-[1.25rem] bg-[#FFFCF8]/70 backdrop-blur-sm border-2 border-[#FFFCF8] flex items-center justify-center text-4xl shrink-0 shadow-xl hover:scale-105">
            <img src={ingredient.image_url!} alt="img" />
          </div>

          <div className="flex-1 min-w-0">
            <input
              className="font-bold border px-2 rounded-2xl text-gray-900 text-xl mb-2 w-full"
              value={ingredient.title}
              onChange={(e) => onEdit(index, "name", e.target.value)}
            />
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                onEdit(index, "quantity", Number(e.target.value))
              }
              className="px-3 py-1 rounded"
            />
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
                {ingredient.expiry_date === 0
                  ? "Expires today!"
                  : ingredient.expiry_date === 1
                    ? "Expires tomorrow"
                    : `${ingredient.expiry_date} days left`}
              </span>
            </div>

            {ingredient.expiry_date <= 1 && (
              <div className="flex items-center gap-1.5 bg-linear-to-r from-red-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                <AlertCircle className="w-4 h-4" />
                Urgent
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-[#FFFCF8]/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-[#FFFCF8]">
            <div
              className={`h-full bg-linear-to-r ${getProgresslinear(ingredient.expiry_date)} rounded-full shadow-lg`}
              style={{ width: `${getProgressWidth(ingredient.expiry_date)}%` }}
            />
          </div>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-[#FFFCF8]/70 backdrop-blur-sm shadow-lg border border-[#FFFCF8]">
             { `${Math.round(ingredient.confidence! * 100)}% confident`}
            </span>

            {/* Freshness indicator */}
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.ceil(ingredient.expiry_date / 2.5)
                      ? `bg-linear-to-r ${getIconlinear(ingredient.expiry_date)} shadow-md`
                      : "bg-gray-300"
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
