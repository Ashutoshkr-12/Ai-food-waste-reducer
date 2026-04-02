import { Clock, ChefHat, Pointer, ArrowBigRight, ChevronRight} from 'lucide-react';
import { CachedRecipe } from '@/lib/types/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function UserRecipeCard( {recipe,i}: {recipe: CachedRecipe; i: number}) {

  return (
<Accordion type="single" collapsible defaultValue={String(i)}>
  <AccordionItem value={String(i)}>
    <AccordionTrigger>{recipe.title}</AccordionTrigger>
    <AccordionContent>
     <div className="max-h-100 overflow-y-auto">
    <div className='flex justify-center'>
      
       <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-64 h-64 object-cover group-hover:scale-105"
          /> 
        </div>
      
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-xl line-clamp-1 group-hover:bg-linear-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
            <div className="flex items-center gap-2 bg-linear-to-br from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-gray-700">{recipe.time_minutes} time taken</span>
            </div>
            <div className="flex items-center gap-2 bg-linear-to-br from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-200">
              <ChefHat className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-gray-700">
                
            {recipe.time_minutes <= 15 && <>Quick</>}
            {recipe.time_minutes > 15 && recipe.time_minutes <= 25 && <>Moderate</>}
            {recipe.time_minutes > 25 && recipe.time_minutes <= 35 && <>Time-consuming</>}
                </span>
            </div>
          </div>
           <div className="p-6"> 

         
            <div className="flex flex-wrap gap-2">
              {Array.isArray(recipe.ingredients) && 
              recipe.ingredients.map((ingredient: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-4 py-2 bg-linear-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-xl font-bold border-2 border-emerald-200"
                >
                  {ingredient}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-10">
              {recipe.steps.map((step: any, index: any) => (
                <span
                  key={index}
                  className="flex gap-2 py-2 border border-green-400 px-2 rounded-xl "
                >
                  {"=> "} 
                  {step}
                </span>
              ))}
            </div>
          </div>
          </div>
          </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
         
     
  );
}