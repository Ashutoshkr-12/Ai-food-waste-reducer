export interface User {
    id: number
    clerk_id: string
    email?: string | null;
    username?: string | null
}
export type ScanItem = {
  name: string
  quantity: number
  expiry_date: string
  image_url?: string | null
}

export type CachedRecipe = {
    i: number;
    title: string;
    steps: string[];
    description: string;
    image_url: string;
    difficulty: string;
    ingredients: string[];
    time_minutes: number;
}

export interface Ingredient {
  id: number;
  title?: string;
  name?: string;
  quantity: string;
  expiry_days?: string ; 
  image_url: string ;
  confidence: number | null;
}

export interface FridgeItem {
  id: number;
  title?: string;
  name?: string;
  quantity: string;
  expiry_date?: Date; 
  image_url: string ;
  confidence: number | null;
}

export interface Recipe {
  id: number;
  user_id?: string;
  title?: string;
  description?: string;
  image_url?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  steps?: string[];
  calories?: number;
  likes_count?: number;
  comments_count?: number;
  author?: string;
  instructions?: string[];
  matchPercentage?: number;
  createdAt?: string;
}

export interface CommunityRecipe extends Recipe {
  author: string;
  authorAvatar?: string;
  likes_count: number;
  comments_count: number;
  createdAt: string;
}

export interface UserStats {
  food_saved: number;
  items_added: number;
  waste_reduced: number;
}

export interface Detection  {
  id?: number;
  item?: string;
  title?: string;
  image_url: string | undefined;
  expiry_days: string;
  quantity?: number;
  confidence?: number;
  bbox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Caprese Pasta Salad',
    image_url: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc3MzEyNDE3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    difficulty: 'Easy',
    ingredients: ['Cherry Tomatoes', 'Mozzarella Cheese', 'Pasta', 'Spinach'],
    calories: 420,
    matchPercentage: 95,
    instructions: [
      'Cook pasta according to package instructions',
      'Halve cherry tomatoes and cube mozzarella',
      'Toss warm pasta with tomatoes, mozzarella, and fresh spinach',
      'Drizzle with olive oil and balsamic vinegar',
      'Season with salt, pepper, and fresh basil'
    ]
  },
  {
    id: 2,
    title: 'Grilled Chicken Salad',
    image_url: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkfGVufDF8fHx8MTc3MzIwMDU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    
    difficulty: 'Easy',
    ingredients: ['Chicken Breast', 'Spinach', 'Cherry Tomatoes', 'Avocado'],
    
    calories: 380,
    matchPercentage: 100,
    instructions: [
      'Season chicken breast with salt, pepper, and herbs',
      'Grill chicken for 6-7 minutes per side until cooked through',
      'Let chicken rest for 5 minutes, then slice',
      'Arrange spinach on plates, top with tomatoes and avocado',
      'Add sliced chicken and drizzle with your favorite dressing'
    ]
  },
  {
    id: 3,
    title: 'Veggie Stir Fry',
    image_url: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc3MzA5MDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',

    difficulty: 'Easy',
    ingredients: ['Bell Peppers', 'Mushrooms', 'Spinach'],

    calories: 210,
    matchPercentage: 85,
    instructions: [
      'Heat oil in a large wok or pan over high heat',
      'Add sliced bell peppers and stir fry for 2 minutes',
      'Add sliced mushrooms and cook for 3 minutes',
      'Toss in spinach and cook until wilted',
      'Season with soy sauce, garlic, and ginger'
    ]
  },

];