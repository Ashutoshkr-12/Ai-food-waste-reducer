"use client"
import {useEffect, useState } from 'react';
import { Heart, Share2, Clock, ChefHat, Users, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { getRecipeById } from '@/lib/api/SingleRecipe';
import { Recipe } from '@/lib/types/types';
import { useAuth } from '@clerk/nextjs';
import { likeRecipe } from '@/lib/api/likes';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import { addComment, getComment } from '@/lib/api/comments';

export default function RecipeDetail() {
  const { id } = useParams();
  const {getToken} = useAuth();
  const navigate = useRouter();
  const [recipe,setRecipe] = useState<Recipe>()
  const [isSaved, setIsSaved] = useState(false);
  const [liked,setLiked] = useState(false)
  const [comments,setComments] = useState<any>([])
  const [commentText, setCommentText] = useState("")
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await getRecipeById(Number(id));
      // console.log("response", res);
      if (res) setRecipe(res);
    };

    const fetchRecipeComments = async () => {
      const res = await getComment(Number(id))
      if(res) setComments(res)
    }
    fetchRecipe();
    fetchRecipeComments();
  }, [id]);

 const handleLiked = async () => {
  const token = await getToken();

  const res = await likeRecipe(Number(id), token!);

  if (!res) return;

  setLiked(res.message === "Liked");
  setRecipe((prev) =>
    prev
      ? {
          ...prev,
          likes_count: res.likes_count,
        }
      : prev
  );
};

const handleComments = async() => {
  if(!commentText) return;

  const token = await getToken();

  const res = await addComment(
    Number(id),
    commentText,
    token!
  );

  setComments((prev:any) => [...prev, res])
   setCommentText("");
}

const handleFollowing = () => {
  setFollowing(prev => !prev)
}
 if(!recipe) return <>not found</>

 

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Image Header */}
      <div className="relative h-80">
        <img 
          src={recipe.image_url} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => navigate.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-xl">←</span>
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-green-600 text-green-600' : 'text-neutral-700'}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-5 h-5 text-neutral-700" />
          </button>
        </div>
         {recipe.ingredients.length > 8 ? (
          <div className="py-6 border-t border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Nutrition</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-900">550</div>
                <div className="text-sm text-green-700">Calories</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">Balanced</div>
                <div className="text-sm text-blue-700">Nutrition</div>
              </div>
            </div>
          </div>
        ):( 
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#FFFCF8]/95 backdrop-blur-sm rounded-2xl shadow-xl">
          <span className="text-sm font-bold text-gray-900">280 cal</span>
        </div>
            )}
          
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Title and Meta */}
        <div className="py-6 border-b border-neutral-200">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{recipe.title}</h1>
          
          <div className="flex items-center gap-6 text-neutral-600 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>25 min</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>{recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>4 servings</span>
            </div>
          </div>
         
        <div className="py-6 border-t border-neutral-200">
          <div className="flex items-center gap-6">
             
          <button className="flex items-center gap-2" onClick={handleLiked}>
            <Heart
              className={`w-6 h-6 ${
                liked ? "fill-red-600 text-red-600" : "text-gray-300"
              }`}
            />
            <span className="font-medium">{recipe.likes_count}</span>
          </button>
             <Drawer>
              <DrawerTrigger>
                <span className="text-2xl">💬</span>
                <span className="font-medium">{recipe.comments_count}</span>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] flex flex-col">

                <DrawerHeader>
                  <DrawerTitle>Comments</DrawerTitle>
                </DrawerHeader>


                {/* COMMENTS LIST */}
                <div className="flex-1 overflow-y-auto px-4 space-y-4">

                  {comments.length === 0 && (
                    <p className="text-gray-400 text-sm">
                      No comments yet
                    </p>
                  )}

                   {comments.map((c: any) => (
                    <div
                      key={c.id}
                      className="bg-gray-100 rounded-xl p-3 flex justify-between gap-3"
                    >
                      <div className='flex gap-3'>
                      <div className="text-sm font-semibold border rounded-full px-2 bg-green-500">
                        {c.user_id}
                      </div>
                      <div className="text-sm text-gray-700">
                        {c.content}
                      </div>
                      </div>
                      <div className="text-sm right-0 text-gray-700">
                        {c.created_at}
                      </div>
                      </div>
                      
                  ))} 

                </div>


                {/* INPUT */}
                <DrawerFooter className="border-t">

                  <div className="flex gap-2">

                    <Input
                      placeholder="write a comment"
                      value={commentText}
                      onChange={(e) =>
                        setCommentText(e.target.value)
                      }
                    />

                    <Button onClick={handleComments}>
                      Send
                    </Button>

                  </div>

                </DrawerFooter>

              </DrawerContent>
            </Drawer>
          <button className="flex items-center gap-2 text-neutral-700 hover:text-blue-600">
            
            
          </button>
          </div>
        </div>

          {true && (
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600" />
                <div>
                  <div className="font-medium text-neutral-900">{recipe.author}</div>
                  <div className="text-sm text-neutral-600">Recipe Creator</div>
                </div>
              </div>
              <Button variant="outline" onClick={handleFollowing} className="rounded-full">
               {following ? <div className='text-green-500'>following</div> : <>Follow</>} 
              </Button>
            </div>
          )}
        </div>

        {/* Ingredients */}
        <div className="py-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Ingredients</h2>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                </div>
                <span className="text-neutral-900">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Instructions */}
        {recipe.steps && (
          <div className="py-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.steps.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-neutral-700 pt-1">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
