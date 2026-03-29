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


export interface Ingredient {
  id: string;
  title?: string;
  name?: string;
  quantity: string;
  expiry_days?: string ; 
  image_url: string ;
  confidence: number | null;
}



export interface FridgeItem {
  id: string;
  title?: string;
  name?: string;
  quantity: string;
  expiry_date?: Date; 
  image_url: string ;
  confidence: number | null;
}

export interface Recipe {
  id: number;
  user_id: string;
  title?: string;
  description: string;
  image_url?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  steps: string[];
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