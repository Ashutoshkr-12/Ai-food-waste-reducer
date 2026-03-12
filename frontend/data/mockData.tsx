// Mock data for FridgeWise app

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiresIn: number; // days
  category: string;
  addedDate: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  servings: number;
  calories?: number;
  likes?: number;
  comments?: number;
  author?: string;
  instructions?: string[];
  matchPercentage?: number;
  createdAt?: string;
}

export interface CommunityRecipe extends Recipe {
  author: string;
  authorAvatar?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Cherry Tomatoes',
    quantity: '250g',
    expiresIn: 2,
    category: 'Vegetables',
    addedDate: '2026-03-09'
  },
  {
    id: '2',
    name: 'Spinach',
    quantity: '1 bunch',
    expiresIn: 1,
    category: 'Vegetables',
    addedDate: '2026-03-10'
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: '500g',
    expiresIn: 3,
    category: 'Protein',
    addedDate: '2026-03-08'
  },
  {
    id: '4',
    name: 'Mozzarella Cheese',
    quantity: '200g',
    expiresIn: 7,
    category: 'Dairy',
    addedDate: '2026-03-04'
  },
  {
    id: '5',
    name: 'Bell Peppers',
    quantity: '3 pieces',
    expiresIn: 5,
    category: 'Vegetables',
    addedDate: '2026-03-06'
  },
  {
    id: '6',
    name: 'Mushrooms',
    quantity: '200g',
    expiresIn: 2,
    category: 'Vegetables',
    addedDate: '2026-03-09'
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    quantity: '500ml',
    expiresIn: 4,
    category: 'Dairy',
    addedDate: '2026-03-07'
  },
  {
    id: '8',
    name: 'Avocado',
    quantity: '2 pieces',
    expiresIn: 1,
    category: 'Fruits',
    addedDate: '2026-03-10'
  },
  {
    id: '9',
    name: 'Blueberries',
    quantity: '150g',
    expiresIn: 3,
    category: 'Fruits',
    addedDate: '2026-03-08'
  },
  {
    id: '10',
    name: 'Pasta',
    quantity: '500g',
    expiresIn: 365,
    category: 'Pantry',
    addedDate: '2025-12-01'
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Caprese Pasta Salad',
    image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc3MzEyNDE3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 20,
    difficulty: 'Easy',
    ingredients: ['Cherry Tomatoes', 'Mozzarella Cheese', 'Pasta', 'Spinach'],
    servings: 4,
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
    id: '2',
    name: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkfGVufDF8fHx8MTc3MzIwMDU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 25,
    difficulty: 'Easy',
    ingredients: ['Chicken Breast', 'Spinach', 'Cherry Tomatoes', 'Avocado'],
    servings: 2,
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
    id: '3',
    name: 'Veggie Stir Fry',
    image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc3MzA5MDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 15,
    difficulty: 'Easy',
    ingredients: ['Bell Peppers', 'Mushrooms', 'Spinach'],
    servings: 3,
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
  {
    id: '4',
    name: 'Tomato Soup',
    image: 'https://images.unsplash.com/photo-1692776407523-8f3c4678ad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBzb3VwJTIwYm93bHxlbnwxfHx8fDE3NzMxODIxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 30,
    difficulty: 'Easy',
    ingredients: ['Cherry Tomatoes'],
    servings: 4,
    calories: 180,
    instructions: [
      'Roast cherry tomatoes with garlic and olive oil at 400°F for 20 minutes',
      'Transfer roasted tomatoes to a pot',
      'Add vegetable broth and bring to a simmer',
      'Blend until smooth using an immersion blender',
      'Season with salt, pepper, and fresh basil'
    ]
  },
  {
    id: '5',
    name: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1609158087148-3bae840bcfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzczMTg0MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 10,
    difficulty: 'Easy',
    ingredients: ['Avocado', 'Cherry Tomatoes'],
    servings: 2,
    calories: 290,
    instructions: [
      'Toast your favorite bread until golden',
      'Mash ripe avocado with lime juice, salt, and pepper',
      'Spread avocado mixture generously on toast',
      'Top with halved cherry tomatoes',
      'Optional: add red pepper flakes or everything bagel seasoning'
    ]
  },
  {
    id: '6',
    name: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1656582117142-ce539fec964f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJyeSUyMHNtb290aGllJTIwYm93bHxlbnwxfHx8fDE3NzMxOTI3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 5,
    difficulty: 'Easy',
    ingredients: ['Blueberries', 'Greek Yogurt'],
    servings: 1,
    calories: 250,
    instructions: [
      'Blend frozen blueberries with Greek yogurt until smooth',
      'Add a splash of milk if needed for consistency',
      'Pour into a bowl',
      'Top with fresh berries, granola, and honey',
      'Enjoy immediately for best texture'
    ]
  },
  {
    id: '7',
    name: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1609770424775-39ec362f2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMHJpc290dG98ZW58MXx8fHwxNzczMjA1MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 35,
    difficulty: 'Medium',
    ingredients: ['Mushrooms', 'Mozzarella Cheese'],
    servings: 4,
    calories: 380,
    instructions: [
      'Sauté sliced mushrooms in butter until golden',
      'Add arborio rice and toast for 2 minutes',
      'Gradually add warm broth, stirring constantly',
      'Continue adding broth and stirring for 20-25 minutes',
      'Stir in cheese and butter, season to taste'
    ]
  }
];

export const mockCommunityRecipes: CommunityRecipe[] = [
  {
    id: 'c1',
    name: 'Zero-Waste Veggie Soup',
    image: 'https://images.unsplash.com/photo-1692776407523-8f3c4678ad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBzb3VwJTIwYm93bHxlbnwxfHx8fDE3NzMxODIxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 40,
    difficulty: 'Easy',
    ingredients: ['Any leftover vegetables', 'Vegetable broth', 'Herbs'],
    servings: 6,
    calories: 150,
    author: 'Sarah Chen',
    likes: 342,
    comments: 28,
    createdAt: '2026-03-10',
    instructions: [
      'Chop all leftover vegetables into bite-sized pieces',
      'Sauté aromatics in olive oil',
      'Add vegetables and broth, simmer for 30 minutes',
      'Season and enjoy!'
    ]
  },
  {
    id: 'c2',
    name: 'Wilted Greens Frittata',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkfGVufDF8fHx8MTc3MzIwMDU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 25,
    difficulty: 'Easy',
    ingredients: ['Eggs', 'Any greens', 'Cheese'],
    servings: 4,
    calories: 280,
    author: 'Marcus Johnson',
    likes: 189,
    comments: 15,
    createdAt: '2026-03-09',
    instructions: [
      'Whisk eggs with milk and seasonings',
      'Sauté wilted greens in oven-safe pan',
      'Pour egg mixture over greens',
      'Bake at 375°F until set'
    ]
  },
  {
    id: 'c3',
    name: 'Banana Bread (Overripe)',
    image: 'https://images.unsplash.com/photo-1609158087148-3bae840bcfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzczMTg0MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 60,
    difficulty: 'Easy',
    ingredients: ['Overripe bananas', 'Flour', 'Sugar', 'Eggs'],
    servings: 10,
    calories: 220,
    author: 'Emma Rodriguez',
    likes: 521,
    comments: 43,
    createdAt: '2026-03-08',
    instructions: [
      'Mash overripe bananas in a bowl',
      'Mix in eggs, sugar, and vanilla',
      'Fold in flour and baking soda',
      'Bake at 350°F for 50-60 minutes'
    ]
  }
];

export const userStats = {
  foodSaved: '24.5 kg',
  recipesCookedCount: 47,
  wasteReductionScore: 85,
  savedRecipesCount: 12,
  sharedRecipesCount: 3,
  weeklyFoodSaved: 3.2
};