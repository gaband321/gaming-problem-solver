// Core data types used throughout the application

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  pros: string[];
  cons: string[];
  whySolves: string;
  viewUrl: string;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface SavedProblem {
  id: string;
  user_id: string;
  problem_text: string;
  matched_products: string[]; // product IDs
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
