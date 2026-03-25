
export type ScanItem = {
  name: string
  quantity: number
  expiry_date: string
  image_url?: string | null
}


export interface Ingredient {
  id: string;
  title: string;
  quantity: string;
  expiry_date: number; 
  image_url: string | null;
  confidence: number | null;
}

